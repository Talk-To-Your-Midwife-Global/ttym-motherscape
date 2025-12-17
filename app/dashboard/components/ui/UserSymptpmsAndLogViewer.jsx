"use client"
import {Drawer} from "vaul";
import Link from "next/link";
import {cn, Log} from "@/app/_lib/utils";
import {useCalendarView} from "@/app/contexts/showCalendarContext";
import {addDays, differenceInDays, format, isAfter, isBefore, isWithinInterval, subDays} from "date-fns";
import {formatDate} from "@/app/_lib/functions";
import {moodEmoticons, symptomEmoticons} from "@/app/dashboard/components/logs";
import {TapWrapper} from "@/app/_components/TapWrapper";
import posthog from "posthog-js";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {toast} from "sonner";
import {useTransition} from "react";


function FaceCard({details}) {
    return (
        <div
            className={cn("bg-white shadow-md h-[44px]", details.emoticon && "w-[44px]  rounded-full text-2xl flex items-center justify-center", details.feelings && "w-fit max-w-[157px] max-h-[44px]  p-2 h-[44px] rounded-md text-sm capitalized")}>
            {details.emoticon && <p className={'truncate'}>{details?.emoticon}</p>}
            {details.feelings && <details className="inline-def w-fit max-w-[157px] max-h-[44px]">
                <summary className={'truncate'}>{details?.feelings}</summary>
                <p>{details.feelings}</p>
            </details>}
        </div>
    )
}

function ExcessCard({num = 0}) {
    return (
        <div
            className={cn("bg-white shadow-md h-[44px] w-[44px]  rounded-full text-lg flex items-center justify-center border border-primaryColor rounded-full text-primaryColor bg-[#0F969C12]")}>
            <Link href={"/dashboard/logs"}>+{num && num}</Link>
        </div>
    )
}

export function UserSymptomsAndLogViewer({
                                             open,
                                             setOpen,
                                             cycleInfo,
                                             showMenstrualQuestion,
                                             showUnConfirmMenstrualDateQuestion,
                                             accessToken
                                         }) {
    const {logs, viewingDate, setIsUsingPredictedCycle, showConfirmPredictedMenstrualDateQuestion} = useCalendarView();
    const [isPending, startTransition] = useTransition();
    const date = formatDate(viewingDate.date);
    Log("interest", {viewingDate: viewingDate})
    const details = logs ? logs[date] : undefined;
    const withoutIcons = [{feelings: []}]; // for the items without icons

    // Processing to get the Icons in the FaceCard Component format
    const moodIcons = details?.mood.map(moo => {
        if (moodEmoticons[moo]) {
            return {
                emoticon: moodEmoticons[moo],
                desc: moo,
                feelings: undefined
            }
        } else {
            withoutIcons[0].feelings.push(moo)
        }
    });

    const symptomIcons = details?.symptoms.map(symp => {
        if (symptomEmoticons[symp]) {
            return {
                emoticon: symptomEmoticons[symp],
                desc: symp,
                feelings: undefined
            }
        } else {
            withoutIcons[0].feelings.push(symp)
        }
    });

    // Grabbing only the necessary ones to display
    const feelings = details ? [...moodIcons, ...symptomIcons, {
        emoticon: '',
        feelings: withoutIcons[0].feelings.join(',')
    }] : undefined;
    const feelingsToDisplay = feelings && feelings.slice(0, 4);
    const count = (feelings && feelings.length > 4 && feelings.slice(4).length > 1) && feelings.slice(4).length || 0;

    Log("UserSymptomsAndLogViewer details", {details, feelings})
    Log("Final computation", {moodIcons, symptomIcons, withoutIcons})

    const isPreviousCycle = cycleInfo && isBefore(viewingDate.date, cycleInfo.periodStartDate);
    const isUpcomingCycle = cycleInfo && isAfter(viewingDate.date, cycleInfo.periodEndDate);

    const makeTransition = (args) => {
        startTransition(async () => {
            const res = await fetch(`${PUBLICHOSTNAME}/${args.route}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: args.jsonBody
            })
            const response = await res.json();
            if (!res.ok) {
                Log(`${args.functionTag} failed`, {response});
                posthog.captureException(`"UserSymptomsAndLogViewer.jsx; handleDateConfirm @ /cycles/start failed", ${JSON.stringify(response)}`);
                toast.error("An error occurred while updating cycle")
            } else {
                Log(`${args.functionTag} success`, {response})
                setIsUsingPredictedCycle(false);
                toast.info('Updating cycle information...')
                window.location.reload() // because all the other SPA related ways of refreshing for Next.js failed to work
            }
        })
    }

    const handleDateConfirm = () => {
        posthog.capture('user_newcycle_indication');

        const jsonBody = JSON.stringify({
            start_date: format(viewingDate.date, "yyyy-MM-dd")
        })

        Log("RestartCalendar.jsx; restart date handleDateConfirm", {jsonBody})

        makeTransition({
            route: "menstrual/cycles/start/",
            method: "POST",
            functionTag: "UserSymptomsAndLogViewer.jsx; handleDateConfirm @ /cycles/start",
            jsonBody
        })
    }

    const handleUnConfirmDate = (date) => {
        posthog.capture('user_newcycle_indication');
        const jsonBody = JSON.stringify({
            end_date: format(date, "yyyy-MM-dd")
        })

        makeTransition({
            route: 'menstrual/cycles/end-period/',
            method: "POST",
            functionTage: "UserSymptomsAndLogViewer.jsx; handleUnConfirmDate() @cycles/end-period",
            jsonBody
        })
    }

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40"/>
                <Drawer.Content
                    className="bg-white text-primaryText shadow-3xl flex flex-col rounded-t-[10px] mt-24 max-w-[432px] h-[242px] fixed bottom-0 left-0 right-0 outline-none p-4">
                    {
                        showMenstrualQuestion &&
                        <div className={"rounded-md px-2 py-1 text-white mb-2 bg-[#E82A73] flex gap-1"}>
                            Spotted blood today? <span className={"underline"} onClick={handleDateConfirm}>Yes, I saw blood</span>
                        </div>
                    }
                    {
                        showUnConfirmMenstrualDateQuestion &&
                        <div className={"rounded-md px-2 py-1 text-white mb-2 bg-gray-500 flex gap-1"}>
                            Spotted blood today?
                            <span className={"underline"}
                                  onClick={() => handleUnConfirmDate(viewingDate.date)}>
                                No blood flow today
                            </span>
                        </div>
                    }
                    {
                        showConfirmPredictedMenstrualDateQuestion &&
                        <div className={"rounded-md px-2 py-1 text-white mb-2 bg-[#E82A73] flex gap-1"}>
                            Spotted blood today?
                            <span className={"underline"}
                                  onClick={() => handleUnConfirmDate(viewingDate.date)}>
                                Yes, I saw blood
                            </span>
                        </div>
                    }

                    <Drawer.Title className={"text-xl flex justify-between font-semibold  mb-6"}>
                        <div>
                            <div>
                                <span>{format(viewingDate.date, 'd MMM') || "Day Month"} - </span>
                                <span> {isPreviousCycle ? "Previous Cycle"
                                    : isUpcomingCycle ? "Upcoming cycle" :
                                        `Cycle Day ${differenceInDays(viewingDate.date, cycleInfo?.periodStartDate)}`}
                                </span>
                            </div>
                            <p className={"font-normal text-[14px] capitalize"}>{viewingDate.stage} phase</p>
                        </div>
                        <div tabIndex={0} onClick={() => setOpen(false)}
                             className={"w-[22px] h-[22px] bg-[#898D8E] rounded-full flex items-center justify-center " +
                                 "text-white"}>
                            <span className={"iconify lucide--x text-[11px]"}></span>
                        </div>
                    </Drawer.Title>
                    <section>
                        <h3>Mood and Symptoms</h3>
                        <div
                            className={"h-[76px] w-full bg-[#E2E2E3] rounded-md mt-2 px-2 flex gap-2 items-center justify-start"}>
                            {!feelings && <div className={"flex-1"}>
                                <p className={"text-[#3A3A3A99]"}>Add your mood and symptoms</p>
                            </div>
                            }
                            {
                                feelings &&
                                <div className={"flex-1 flex gap-2"}>
                                    {
                                        feelingsToDisplay.map(situation => {
                                            return <FaceCard details={situation}/>
                                        })
                                    }

                                    {
                                        count ? <ExcessCard num={count}/> : ""
                                    }
                                </div>
                            }


                            <TapWrapper link={"/dashboard/logs"}
                                        customStyles={".w-[44px] .h-[44px] rounded-full relative top-2"}>
                                <button
                                    className={'bg-primaryColor shadow-md text-white w-[44px] h-[44px] rounded-full flex items-center justify-center'}>
                                    <span
                                        className={"iconify material-symbols--add-2-rounded text-2xl font-bold"}></span>
                                </button>
                            </TapWrapper>
                        </div>
                    </section>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
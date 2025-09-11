import {Drawer} from "vaul";
import Link from "next/link";
import {cn, Log} from "@/app/_lib/utils";
import {useCalendarView} from "@/app/contexts/showCalendarContext";
import {differenceInDays, format} from "date-fns";
import {formatDate} from "@/app/_lib/functions";
import {moodEmoticons, symptomEmoticons} from "@/app/dashboard/components/logs";
import {TapWrapper} from "@/app/_components/TapWrapper";


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

function ExcessCard({num = 1}) {
    return (
        <div
            className={cn("bg-white shadow-md h-[44px] w-[44px]  rounded-full text-lg flex items-center justify-center border border-primaryColor rounded-full text-primaryColor bg-[#0F969C12]")}>
            <Link href={"/dashboard/logs"}>+{num}</Link>
        </div>
    )
}

export function UserSymptomsAndLogViewer({open, setOpen, cycleInfo}) {
    const {logs, viewingDate} = useCalendarView();
    const date = formatDate(viewingDate);
    Log("UserSymptomsAndLogViewer details1", {logs, date})
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
    const count = (feelings && feelings.length > 4) && feelings.slice(4).length;


    Log("UserSymptomsAndLogViewer details", {details, feelings})
    Log("Final computation", {moodIcons, symptomIcons, withoutIcons})

    const isPreviousCycle = differenceInDays(viewingDate, cycleInfo?.periodStartDate) <= 0;

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40"/>
                <Drawer.Content
                    className="bg-white text-primaryText shadow-2xl flex flex-col rounded-t-[10px] mt-24 max-w-[432px] h-[232px] fixed bottom-0 left-0 right-0 outline-none p-4">
                    <Drawer.Title className={"text-xl flex justify-between font-semibold  mb-6"}>
                        <div>
                            <div>
                                <span>{format(viewingDate, 'd MMM') || "Day Month"} - </span>
                                <span> {!isPreviousCycle ? `Cycle Day ${differenceInDays(viewingDate, cycleInfo?.periodStartDate)}` : "Previous Cycle"}</span>
                            </div>
                            <p className={"font-normal text-[14px] capitalize"}>{cycleInfo?.stage} phase</p>
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
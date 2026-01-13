"use client";
import React, {useState, useTransition} from "react";
import {Drawer} from "vaul";
import {IconButton, IconContinuousButton} from "@/app/_components";
import Image from "next/image";
import EditCalendarImg from "@/public/images/editcyclecalendar.png"
import {
    type DateRange,
    DayPicker,
} from "react-day-picker";
import {Log} from "@/app/_lib/utils";
import {addDays, differenceInDays, format, startOfMonth} from "date-fns";
import {AnimatePresence, motion} from "framer-motion";
import {ParseMonthForCalendar} from "@/app/_lib/calendar-utils";


type EditCycleState = {
    periodStart: Date | null;
    periodEnd: DateRange | null;
    nextPeriodStart: null | Date;
}

type EditCycleComponentProps = {
    nextAction?: () => void;
    prevAction?: () => void;
    saveProgressAction?: (name: string, value: string | Date | DateRange) => void;
    submitAction?: () => void;
    closeAction?: () => void;
    state?: EditCycleState,
}

const initialEditCycleState: EditCycleState = {
    periodStart: null,
    periodEnd: {
        from: startOfMonth(new Date()),
        to: addDays(startOfMonth(new Date()), 4),
    },
    nextPeriodStart: null
}

const slideVariants = {
    initial: (direction: "forward" | "backward") => ({
        x: direction === "forward" ? 40 : -40,
        opacity: 0,
    }),
    animate: {
        x: 0,
        opacity: 1,
    },
};
type Cycle = {
    bleed_end_date: string;
    cycle_length: number;
    end_date: string
    id: number;
    ovulation_day: string;
    paused?: boolean;
    predicted?: boolean;
    start_date: string;

}

export function EditCycleFlowMain({shouldOpen, setShouldOpen, id, info}: {
    shouldOpen: boolean;
    setShouldOpen: (val) => void;
    id: number;
    info: Cycle[];
}) {
    const currentCycle: Cycle = info.filter(cycle => cycle.id === id)[0];
    console.log("periodStart", {id, info, currentCycle});

    const [step, setStep] = useState<number>(1);
    const [editCycleState, setEditCycleState] = useState<EditCycleState>({
        periodStart: new Date(currentCycle.start_date),
        periodEnd: {
            from: new Date(currentCycle.start_date),
            to: new Date(currentCycle.bleed_end_date),
        },
        nextPeriodStart: new Date(currentCycle.end_date)
    });
    const [direction, setDirection] = useState<'forward' | "backward">("forward");
    const handleNext = () => {
        if ((step + 1) <= 5) {
            setDirection('forward');
            setStep(step => step + 1);
        }
    }

    const handlePrev = () => {
        if ((step - 1) >= 1) {
            setStep(step => step - 1);
            setDirection('backward');
        }
    }

    const handleClose = () => {
        setShouldOpen(false);
    }

    const handleSave = (name: string, value: Date | DateRange | string) => {
        const newState = {...editCycleState, [name]: value};
        if (name === "periodStart") {
            newState.periodEnd.from = value as Date;
        } else if (name === "periodEnd") {
            value = value as DateRange;
            newState.periodStart = value.from;
        }
        setEditCycleState(newState);
    }

    const handleSubmit = () => {
        Log('id', {id});
    }

    const views = {
        "1": <EditCycleFlowIntro nextAction={handleNext} closeAction={handleClose} state={editCycleState}/>,
        "2": <EditCycleFlowPeriodStart nextAction={handleNext} prevAction={handlePrev} saveProgressAction={handleSave}
                                       state={editCycleState}/>,
        "3": <EditCycleFlowBleedEnd nextAction={handleNext} prevAction={handlePrev} state={editCycleState}
                                    saveProgressAction={handleSave}/>,
        "4": <EditCycleFlowNextPeriodStart nextAction={handleNext} prevAction={handlePrev} state={editCycleState}
                                           saveProgressAction={handleSave}/>,

        "5": <EditCycleFlowSummary nextAction={handleNext} prevAction={handlePrev} state={editCycleState}
                                   submitAction={handleSubmit}/>,
        "6": <EditCycleFlowSuccess/>
    }
    return (
        <EditCycleFlowContainer shouldOpen={shouldOpen} setShouldOpen={setShouldOpen}>
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{duration: 0.25, ease: "easeInOut"}}
                    className="h-full"
                >
                    {views[step]}
                </motion.div>
            </AnimatePresence>
        </EditCycleFlowContainer>
    )
}

export function EditCycleHeader({currentStep, title, subTitle, isQuestion = true}: {
    currentStep: number,
    title: string,
    subTitle: string,
    isQuestion?: boolean
}) {

    const totalNumberOfSteps = 3;
    return (
        <header className={"flex flex-col items-center justify-center text-black"}>
            {isQuestion && <h3>Step <b>{currentStep}</b> of 3</h3>}
            <h2 className={"font-bold "}>{title}</h2>
            <p className={"text-sm text-[#3A3A3A]"}>{subTitle}</p>
        </header>
    )
}

export function EditCycleFlowContainer({children, shouldOpen, setShouldOpen}) {
    return (
        <Drawer.Root open={shouldOpen} onOpenChange={setShouldOpen}>
            <Drawer.Portal>
                <Drawer.Overlay className={"fixed inset-0 bg-black/40"}/>
                <Drawer.Content
                    className={"bg-white flex flex-col  mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none"}>
                    <Drawer.Title
                        className={"w-full h-[200px] rounded-t-[10px] relative overflow-hidden bg-green-radial-bg bg-cover flex flex-col"}>
                        <section id="reading"
                                 className="border border-transparent pt-12 relative top-[70px] ">
                            <div className="relative mx-auto md:container h-72">
                                <div
                                    className="bg-white rounded-[50%] w-[686px] h-full absolute top-0 left-1/2 -translate-x-1/2"></div>
                                <div className="h-full flex .items-center justify-center max-w-[686px] mx-auto">
                                    <div
                                        className=".text-center uppercase -mt-4 sm:-mt-6 md:-mt-8 text-5xl sm:text-6xl md:text-7xl max-w-xs sm:max-w-sm z-20 relative bottom-10">
                                        <Image src={EditCalendarImg} alt={"3D Calendar "} priority={true}/>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Drawer.Title>
                    <section className={'z-10'}>
                        {children}
                    </section>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export function EditCycleFlowIntro({nextAction, closeAction}: EditCycleComponentProps) {
    return (
        // <EditCycleFlow>
        <section className="p-4 bg-white rounded-t-[10px] flex-1 text-black">
            <header className={"flex flex-col justify-center items-center text-center"}>
                <h2 className={"text-2xl font-bold"}>✨ Let&apos;s fix your cycle</h2>
                <p className={"text-[#3A3A3A]"}>Just update what you remember — we&apos;ll handle the rest.</p>
            </header>
            <div className={"flex flex-col items-center justify-center gap-2 mt-3"}>
                <IconContinuousButton text={"Start Editing"} onClickAction={nextAction}/>
                <IconContinuousButton text={"Cancel"} variant={'secondary'} onClickAction={closeAction}/>
            </div>
        </section>
        // </EditCycleFlow>
    )
}

export function EditCycleFlowPeriodStart({nextAction, prevAction, saveProgressAction, state}: EditCycleComponentProps) {
    const [isPending, startTransition] = useTransition();
    Log("periodStart", {state});
    const handleDateChange = (date: Date) => {
        if (date) {
            Log({stateDate: date});
            startTransition(() => {
                saveProgressAction("periodStart", date);
            })
        }
    }

    return (
        <section className={"flex flex-col items-center justify-center gap-5 m-3 bg-white"}>
            <EditCycleHeader currentStep={1} title={'🩸 When did your period start?'}
                             subTitle={"This is the first day you noticed bleeding"}/>
            <DayPicker
                animate
                navLayout="around"
                mode="single"
                startMonth={new Date(new Date().getFullYear(), new Date().getMonth() - 1)}
                endMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
                selected={state.periodStart}
                onSelect={handleDateChange}
                classNames={{
                    today: `border-2 text-black rounded-full`, // Add a border to today's date
                    selected: `border-pink text-white bg-[#E82A73] rounded-full`, // Highlight the selected day
                    day: `text-black`,
                    chevron: `fill-[#000000] border-2 rounded-full`,
                }}
            />
            <div className={"flex flex-col items-center justify-center gap-2 mt-3"}>
                <IconButton text={"Next"} isPending={isPending} onClick={nextAction} loadingText={'Saving...'}/>
                <IconContinuousButton text={"Back"} variant={'secondary'} onClickAction={prevAction}/>
            </div>
        </section>
    )
}


export function EditCycleFlowBleedEnd({nextAction, prevAction, saveProgressAction, state}: EditCycleComponentProps) {

    const handleDateChange = (dateRange: DateRange) => {
        if (dateRange) {
            saveProgressAction("periodEnd", dateRange);
        }
    }

    return (
        // <section>
        <section className={"flex flex-col items-center justify-center gap-5 m-3 bg-white"}>
            <EditCycleHeader currentStep={2} title={'🩸 When did the bleeding end?'}
                             subTitle={"This is the last day you noticed bleeding"}/>
            <DayPicker
                animate
                navLayout="around"
                mode="range"
                min={2}
                max={8}
                startMonth={new Date(new Date().getFullYear(), new Date().getMonth() - 1)}
                endMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
                selected={state.periodEnd}
                onSelect={handleDateChange}
                classNames={{
                    today: `border-2 text-black rounded-full`, // Add a border to today's date
                    selected: `border-pink .text-white bg-[#E82A73] rounded-full`, // Highlight the selected day
                    // root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
                    // week_day: `bg-white`, // eg. Mon, tue,
                    day: `text-black`,
                    range_start: ".border-2 .border-hot-pink rounded-[200px] .bg-[#E82A73] text-white",
                    range_middle: "text-white bg-pink .rounded-full",
                    range_end: "text-white rounded-full",
                    chevron: `fill-[#000000] border-2 rounded-full`, // Change the color of the chevron
                }}
            />
            <div className={"flex flex-col items-center justify-center gap-2 mt-3"}>
                <IconContinuousButton text={"Next"} onClickAction={nextAction}/>
                <IconContinuousButton text={"Back"} variant={'secondary'} onClickAction={prevAction}/>
            </div>

        </section>
    )
}


export function EditCycleFlowNextPeriodStart({
                                                 nextAction,
                                                 prevAction,
                                                 state,
                                                 saveProgressAction
                                             }: EditCycleComponentProps) {
    const handleDateChange = (date: Date) => {
        if (date) {
            saveProgressAction('nextPeriodStart', date)
        }
    }
    return (
        <section className={"flex flex-col items-center justify-center gap-5 m-3 bg-white"}>
            <EditCycleHeader currentStep={4} title={'🔁 When did your next period start?'}
                             subTitle={"We use this to know when this cycle ended."}/>
            <DayPicker
                animate
                navLayout="around"
                mode="single"
                startMonth={new Date(new Date().getFullYear(), new Date().getMonth() - 1)}
                endMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
                selected={state.nextPeriodStart}
                onSelect={handleDateChange}
                // timeZone="UTC"
                classNames={{
                    today: `border-2 text-black rounded-full`, // Add a border to today's date
                    selected: `border-pink text-white bg-[#E82A73] rounded-full`, // Highlight the selected day
                    day: `text-black`,
                    chevron: `fill-[#000000] border-2 rounded-full`,
                }}
            />
            <div className={"flex flex-col items-center justify-center gap-2 mt-3"}>
                <IconContinuousButton text={"Next"} onClickAction={nextAction}/>
                <IconContinuousButton text={"Back"} variant={'secondary'} onClickAction={prevAction}/>
            </div>

        </section>
    )
}


export function EditCycleFlowSummary({prevAction, submitAction, state}: EditCycleComponentProps) {
    return (
        <section>
            <EditCycleHeader currentStep={3} title={'📊 Here’s what we updated'}
                             subTitle={"We use this to know when this cycle ended."}
                             isQuestion={false}/>
            <section className={"ml-5 my-5"}>
                <header className={"text-black"}>
                    <h3 className={"text-[#323232B2] font-bold mb-2"}>Summary</h3>
                    <section className={"grid grid-cols-2 gap-2 mx-auto .border .border-red-100 "}>
                        <div className={""}>
                            <p>Period Started</p>
                            <p>Bleeding Ended</p>
                            {state.nextPeriodStart && <p>Cycle Ended</p>}
                        </div>
                        <div className={"text-[#1E1E1E] font-bold"}>
                            <p>{format(state.periodStart, 'do MMMM, yyyy')}</p>
                            <p>{format(state.periodEnd.to, 'do MMMM, yyyy')} </p>
                            {state.nextPeriodStart && <p>{format(state.nextPeriodStart, 'do MMMM, yyyy')}</p>}
                        </div>
                    </section>
                </header>
            </section>
            <section className={"ml-5 my-5"}>
                <header className={"text-black"}>
                    <h3 className={"text-[#323232B2] font-bold mb-2"}>System-calculated</h3>
                    <section className={"grid grid-cols-2 gap-2 mx-auto .border .border-red-100 "}>
                        <div className={""}>
                            <p>Period Length</p>
                            <p>Cycle length</p>
                            <p>Updated Average</p>
                        </div>
                        <div className={"text-[#1E1E1E] font-bold"}>
                            <p>{differenceInDays(state.periodEnd.to, state.periodStart)} days</p>
                            <p>{differenceInDays(state.nextPeriodStart, state.periodStart)} days</p>
                            <p>Updated Average</p>
                        </div>
                    </section>
                </header>
            </section>
            <div className={"flex flex-col items-center justify-center gap-2 mt-3"}>
                <IconContinuousButton text={"Save changes"} onClickAction={submitAction}/>
                <IconContinuousButton text={"Back"} variant={'secondary'} onClickAction={prevAction}/>
            </div>
        </section>
    )
}

export function EditCycleFlowSuccess() {
    return (
        <section>
            Success
        </section>
    )
}

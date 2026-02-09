"use client";
import { Log } from "@/app/_lib/utils";
import { useState, useTransition } from "react";
import { AnimatePresence, view, motion } from "framer-motion";
import { IconButton, IconContinuousButton } from "@/app/_components";
import { DayPicker } from "react-day-picker";
import { differenceInDays, format } from "date-fns";
import { Drawer } from "vaul";
import EditCalendarImg from "@/public/images/editcyclecalendar.png";
import Image from "next/image";
import { toast } from "sonner";
import { updateUserFlowInfoAction } from "@/app/dashboard/actions/action";
import LeftConfetti from "@/public/images/left-confetti.png";
import RightConfetti from "@/public/images/right-confetti.png";


export const slideVariants = {
  initial: (direction) => ({
    x: direction === "forward" ? 40 : -40,
    opacity: 0
  }),
  animate: {
    x: 0,
    opacity: 1
  }
};


export function EditCycleFlowMain({ shouldOpen, setShouldOpen, id, info, som }) {
  const currentCycle = info.filter(cycle => cycle.id === id)[0];
  Log("periodStart", { id, info, currentCycle });

  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState(1);
  const [editCycleState, setEditCycleState] = useState({
    periodStart: currentCycle?.start_date ? new Date(currentCycle.start_date) : new Date(),
    periodEnd: {
      from: new Date(currentCycle.start_date),
      to: new Date(currentCycle.bleed_end_date)
    },
    nextPeriodStart: new Date(currentCycle.end_date),
    id: id
  });

  const [direction, setDirection] = useState("forward");

  const handleNext = (totalStepCount = 5) => {
    if ((step + 1) <= totalStepCount) {
      setStep(step => step + 1);
      setDirection("forward");
    }
  };

  const handlePrev = () => {
    if ((step - 1) > 0) {
      setStep(step => step - 1);
      setDirection("backward");
    }
  };

  const handleClose = () => {
    setShouldOpen(false);
  };

  const handleSave = (name, value) => {
    const newState = { ...editCycleState, [name]: value };
    if (name === "periodStart") {
      newState.periodEnd.from = value;
    } else if (name === "periodEnd") {
      newState.periodStart = value.from;
    }
    setEditCycleState(newState);
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const reqBody = {
        start_date: format(editCycleState.periodStart, "yyyy-MM-dd"),
        bleed_end_date: format(editCycleState.periodEnd.to, "yyyy-MM-dd"),
        end_date: format(editCycleState.nextPeriodStart, "yyyy-MM-dd"),
        predicted: false,
        paused: false
      };

      const updateUserFlowInfo = await updateUserFlowInfoAction(id, reqBody);

      if (updateUserFlowInfo.success) {
        setStep(step => step + 1);
      } else {
        toast.error(`An error occurred. Kindly retry`);
      }

    });
  };

  const views = {
    "1": <EditCycleFlowIntro nextAction={handleNext} closeAction={handleClose} state={editCycleState} />,
    "2": <EditCycleFlowPeriodStart nextAction={handleNext} closeAction={handleClose} saveProgressAction={handleSave}
                                   state={editCycleState} />,
    "3": <EditCycleFlowBleedEnd nextAction={handleNext} prevAction={handlePrev} state={editCycleState}
                                saveProgressAction={handleSave} />,
    "4": <EditCycleFlowNextPeriodStart nextAction={handleNext} prevAction={handlePrev} state={editCycleState}
                                       saveProgressAction={handleSave} />,
    "5": <EditCycleFlowSummary nextAction={handleNext} prevAction={handlePrev} state={editCycleState}
                               submitAction={handleSubmit} isPending={isPending} />,
    "6": <EditCycleFlowSuccess closeAction={handleClose} />
  };

  return (
    <EditCycleFlowContainer shouldOpen={shouldOpen} setShouldOpen={setShouldOpen} step={step}>
      <AnimatePresence mode={"wait"} custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={"h-full"}
        >
          {views[step]}
        </motion.div>
      </AnimatePresence>
    </EditCycleFlowContainer>
  );
}

export function EditCycleHeader({ currentStep, title, subTitle, isQuestion = true }) {
  const totalNumberOfSteps = 3;
  return (
    <header className="flex flex-col items-center justify-center text-black">
      {isQuestion && (<h3>Step <b>{currentStep}</b> of {totalNumberOfSteps}</h3>)}
      <h2 className={"font-bold"}>{title}</h2>
      <p className={"text-sm text-[#3A3A3A] text-center"}>{subTitle}</p>
    </header>
  );
}

export function EditCycleFlowContainer({ children, shouldOpen, setShouldOpen, step }) {
  return (
    <Drawer.Root open={shouldOpen} onOpenChange={setShouldOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className={"fixed inset-0 bg-black/40"} />
        <Drawer.Content
          className={"bg-white flex flex-col  mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none"}>
          <Drawer.Title
            className={"w-full h-[200px] rounded-t-[10px] relative overflow-hidden bg-green-radial-bg bg-cover flex flex-col"}>
            {step < 6 && <section id="reading"
                                  className="border border-transparent pt-12 relative top-[70px] ">
              <div className="relative mx-auto md:container h-72">
                <div
                  className="bg-white rounded-[50%] w-[686px] h-full absolute top-0 left-1/2 -translate-x-1/2"></div>
                <div className="h-full flex .items-center justify-center max-w-[686px] mx-auto">
                  <div
                    className=".text-center uppercase -mt-4 sm:-mt-6 md:-mt-8 text-5xl sm:text-6xl md:text-7xl max-w-xs sm:max-w-sm z-20 relative bottom-10">
                    <Image src={EditCalendarImg} alt={"3D Calendar "} priority={true} />
                  </div>
                </div>
              </div>
            </section>}

          </Drawer.Title>
          <section className={"z-10"}>
            {children}
          </section>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function EditCycleFlowIntro({ nextAction, closeAction }) {
  return (
    <section className="p-4 bg-white rounded-t-[10px] flex-1 text-black">
      <header className={"flex flex-col justify-center items-center text-center"}>
        <h2 className={"text-2xl font-bold"}>✨ Let&apos;s fix your cycle</h2>
        <p className={"text-[#3A3A3A]"}>Just update what you remember — we&apos;ll handle the rest.</p>
      </header>
      <div className={"flex flex-col items-center justify-center gap-2 mt-3"}>
        <IconContinuousButton text={"Start Editing"} onClickAction={nextAction} />
        <IconContinuousButton text={"Cancel"} variant={"secondary"} onClickAction={closeAction} />
      </div>
    </section>
  );
}

export function EditCycleFlowPeriodStart({ nextAction, closeAction, saveProgressAction, state }) {
  const [isPending, startTransition] = useTransition();

  const handleDateChange = (date) => {
    if (date) {
      Log({ stateDate: date });
      startTransition(() => {
        saveProgressAction("periodStart", date);
      });
    }
  };

  return (
    <section className={"flex flex-col items-center justify-center gap-5 m-3 bg-white"}>
      <EditCycleHeader currentStep={1} title={"🩸 When did your period start?"}
                       subTitle={"This is the first day you noticed bleeding"} />
      <DayPicker
        animate
        navLayout="around"
        mode="single"
        startMonth={new Date(new Date().getFullYear(), new Date().getMonth() - 1)}
        endMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
        selected={state.periodStart}
        onSelect={handleDateChange}
        defaultMonth={new Date(new Date().getFullYear(), new Date(state.periodStart).getMonth())}
        classNames={{
          today: `border-2 text-black rounded-full`, // Add a border to today's date
          selected: `border-pink text-white bg-[#E82A73] rounded-full`, // Highlight the selected day
          day: `text-black`,
          chevron: `fill-[#000000] border-2 rounded-full`
        }}
      />
      <div className={"flex flex-col items-center justify-center gap-2 mt-3"}>
        <IconButton text={"Next"} isPending={isPending} onClick={nextAction} loadingText={"Saving..."} />
        <IconContinuousButton text={"Cancel"} variant={"secondary"} onClickAction={closeAction} />
      </div>
    </section>
  );
}

export function EditCycleFlowBleedEnd({ nextAction, prevAction, saveProgressAction, state }) {
  const handleDateChange = (dateRange) => {
    if (dateRange) {
      saveProgressAction("periodEnd", dateRange);
    }
  };

  return (
    <section className={"flex flex-col items-center justify-center gap-5 m-3 bg-white"}>
      <EditCycleHeader currentStep={2} title={"🩸 When did the bleeding end?"}
                       subTitle={"This is the last day you noticed bleeding"} />
      <DayPicker
        animate
        navLayout="around"
        mode="range"
        min={2}
        max={8}
        defaultMonth={new Date(new Date().getFullYear(), new Date(state.periodStart).getMonth())}
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
          chevron: `fill-[#000000] border-2 rounded-full` // Change the color of the chevron
        }}
      />
      <div className={"flex flex-col items-center justify-center gap-2 mt-3"}>
        <IconContinuousButton text={"Next"} onClickAction={nextAction} />
        <IconContinuousButton text={"Back"} variant={"secondary"} onClickAction={prevAction} />
      </div>
    </section>
  );
}

export function EditCycleFlowNextPeriodStart({ nextAction, prevAction, saveProgressAction, state }) {
  const handleDateChange = (date) => {
    if (date) {
      saveProgressAction("nextPeriodStart", date);
    }
  };

  return (
    <section className={"flex flex-col items-center justify-center gap-5 m-3 bg-white"}>
      <EditCycleHeader currentStep={3} title={"🔁 When did your next period start?"}
                       subTitle={"We use this to know when this cycle ended."} />
      <DayPicker
        animate
        navLayout="around"
        mode="single"
        startMonth={new Date(new Date().getFullYear(), new Date().getMonth() - 1)}
        endMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
        selected={state.nextPeriodStart}
        onSelect={handleDateChange}
        classNames={{
          today: `border-2 text-black rounded-full`, // Add a border to today's date
          selected: `border-pink text-white bg-[#E82A73] rounded-full`, // Highlight the selected day
          day: `text-black`,
          chevron: `fill-[#000000] border-2 rounded-full`
        }}
      />
      <div className={"flex flex-col items-center justify-center gap-2 mt-3"}>
        <IconContinuousButton text={"Next"} onClickAction={nextAction} />
        <IconContinuousButton text={"Back"} variant={"secondary"} onClickAction={prevAction} />
      </div>
    </section>
  );
}


export function EditCycleFlowSummary({ prevAction, submitAction, state, isPending }) {
  return (
    <section>
      <EditCycleHeader currentStep={3} title={"📊 Here’s what we updated"}
                       subTitle={"We use this to know when this cycle ended."}
                       isQuestion={false} />
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
              <p>{format(state.periodStart, "do MMMM, yyyy")}</p>
              <p>{format(state.periodEnd.to, "do MMMM, yyyy")} </p>
              {state.nextPeriodStart && <p>{format(state.nextPeriodStart, "do MMMM, yyyy")}</p>}
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
        <IconContinuousButton text={"Save changes"} onClickAction={submitAction} isPending={isPending} />
        <IconContinuousButton text={"Back"} variant={"secondary"} onClickAction={prevAction} />
      </div>
    </section>
  );
}

export function EditCycleFlowSuccess({ closeAction }) {
  return (
    <section>
      <div className={"flex items-center justify-center gap-2 mt-3"}>
        <Image src={LeftConfetti} alt={"left confetti"} priority={true} />
        <Image src={RightConfetti} alt={"right confetti"} priority={true} />
      </div>
      <header className={"flex flex-col items-center justify-center gap-2 mt-3 text-black"}>
        <h3 className={"text-xl font-bold"}>All Set</h3>
        <div className={"bg-[#0F969C1A] text-primaryColor p-2 rounded-full "}>
          <h4>Update Complete</h4>
        </div>
        <div className={"mx-10"}>
          <p className={"text-center text-[#3A3A3A]"}>
            Your cycle has been updated. We’ll use this to give you better insights going forward.
          </p>
        </div>
      </header>
      <div className={"flex items-center justify-center my-5"}>
        <IconContinuousButton text={"Done"} variant={"primary"} onClickAction={closeAction} />
      </div>
    </section>
  );
}
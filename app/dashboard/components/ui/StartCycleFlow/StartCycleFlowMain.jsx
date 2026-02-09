import { Log } from "@/app/_lib/utils";
import { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";
import { startCycle, updateUserFlowInfoAction } from "@/app/dashboard/actions/action";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import {
  EditCycleFlowBleedEnd,
  EditCycleFlowNextPeriodStart,
  EditCycleFlowPeriodStart, EditCycleFlowSuccess, EditCycleFlowSummary, slideVariants
} from "@/app/dashboard/components/ui/EditCycleFlow";
import { StartCycleFlowContainer } from "@/app/dashboard/components/ui/StartCycleFlow/StartCycleFlowContainer";
import { StartCycleFlowIntro } from "@/app/dashboard/components/ui/StartCycleFlow/StartCycleFlowIntro";
import { StartCycleFlowPeriodStart } from "@/app/dashboard/components/ui/StartCycleFlow/StartCycleFlowPeriodStart";
import { StartCycleFlowIntensity } from "@/app/dashboard/components/ui/StartCycleFlow/StartCycleFlowIntensity";
import {
  StartCyclePeriodRelatedSymptoms
} from "@/app/dashboard/components/ui/StartCycleFlow/StartCyclePeriodRelatedSymptoms";
import { StartCycleFlowSuccess } from "@/app/dashboard/components/ui/StartCycleFlow/StartCycleFlowSuccess";
import { StartCycleFlowNothingToday } from "@/app/dashboard/components/ui/StartCycleFlow/StartCycleFlowNothingToday";


export function StartCycleFlowMain({ shouldOpen, setShouldOpen, id, info, som }) {
  const currentCycle = info.filter(cycle => cycle.id === id)[0];

  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState(1);
  const [startCycleState, setStartCycleState] = useState({
    periodStart: new Date(),
    flowIntensity: "",
    symptoms: []
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
    startTransition(() => {
      const newState = { ...startCycleState, [name]: value };
      setStartCycleState(newState);
    });
  };

  const handleNothingToday = () => {
    setStep("end");
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const startCycleFlow = await startCycle(startCycleState.periodStart);
      if (startCycleFlow.success) {
        setStep(step => step + 1);
      } else {
        toast.error(`An error occurred. Kindly retry`);
      }
    });
  };
  const views = {
    "1": <StartCycleFlowIntro
      nextAction={handleNext}
      closeAction={handleClose}
      nothinhgToday={handleNothingToday}
      state={startCycleState} />,

    "2": <StartCycleFlowPeriodStart
      nextAction={handleNext}
      closeAction={handleClose}
      saveProgressAction={handleSave}
      state={startCycleState} />,

    "3": <StartCycleFlowIntensity
      nextAction={handleNext}
      prevAction={handlePrev}
      state={startCycleState}
      saveProgressAction={handleSave}
      isPending={isPending} />,

    "4": <StartCyclePeriodRelatedSymptoms
      nextAction={handleNext}
      prevAction={handlePrev}
      state={startCycleState}
      saveProgressAction={handleSave}
      submitAction={handleSubmit}
    />,
    "5": <StartCycleFlowSuccess closeAction={handleClose} />,
    "end": <StartCycleFlowNothingToday closeAction={handleClose} />
  };

  return (
    <StartCycleFlowContainer
      shouldOpen={shouldOpen}
      setShouldOpen={setShouldOpen}
      step={step}
    >
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
    </StartCycleFlowContainer>
  );
}

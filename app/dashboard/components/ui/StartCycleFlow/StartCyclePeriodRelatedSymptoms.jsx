import { EditCycleHeader } from "@/app/dashboard/components/ui/EditCycleFlow";
import { symptomEmoticons, symptomsData } from "@/app/dashboard/components/logs";
import { useState } from "react";
import posthog from "posthog-js";
import { IconContinuousButton } from "@/app/_components";

export function StartCyclePeriodRelatedSymptoms({ nextAction, saveProgressAction, submitAction }) {
  const [feelingState, setFeelingState] = useState({ symptoms: [] });

  const handleSymptomsToggle = (item) => {
    posthog.capture("symptom_toggle", { item });
    setFeelingState({
      symptoms: feelingState?.symptoms?.includes(item)
        ? feelingState?.symptoms.filter((i) => i !== item)
        : [...feelingState.symptoms, item]
    });
  };

  const handleClick = () => {
    saveProgressAction({ symptoms: feelingState });
    submitAction();
    nextAction();
  };

  return (
    <section className={"flex flex-col items-center justify-center gap-5 m-3 bg-white"}>
      <EditCycleHeader currentStep={3} title={"🩸 Period-Related Symptoms"}
                       subTitle={"How is your body feeling?"} />

      <section className="flex flex-wrap gap-3 mt-2 h-[200px] overflow-y-scroll">
        {symptomsData.map((symptom, index) => {
          return <input type="button"
                        value={`${symptomEmoticons[symptom]}  ${symptom}`}
                        name="mood"
                        key={index}
                        onClick={() => handleSymptomsToggle(symptom)}
                        className={`cursor-pointer text-sm p-2 px-4 py-2 font-medium capitalize rounded-full .bg-[#0F969C12] text-[#3A3A3A] ${
                          feelingState.symptoms?.includes(symptom) ? "border border-primaryColor rounded-full bg-[#0F969C12] text-primaryColor" : "text-[#3A3A3A] border border-[#D2D2D2] "
                        }`}>
          </input>;
        })}
      </section>
      <section>
        <IconContinuousButton text={"Save today's log"}
                              onClickAction={handleClick}
        />
      </section>
    </section>
  );
}
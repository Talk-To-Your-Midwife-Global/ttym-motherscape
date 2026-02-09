import { EditCycleHeader } from "@/app/dashboard/components/ui/EditCycleFlow";
import { IconContinuousButton } from "@/app/_components";
import { useState } from "react";

export function StartCycleFlowIntensity({ saveProgressAction, nextAction }) {
  const options = ["light", "medium", "heavy", "spotting"];
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    saveProgressAction({ flowIntensity: option });
  };

  return (
    <section className={"flex flex-col items-center justify-center gap-5 m-3 bg-white"}>
      <EditCycleHeader currentStep={2} title={"🩸 Flow Intensity"}
                       subTitle={"How would you describe your flow today?"} />
      <section>
        {options.map((option, index) => {
            if (selectedOption === option) {
              return <IconContinuousButton variant={"secondary"} text={option}
                                           customStyles={"transition-none"}
                                           onClickAction={() => handleOptionSelect(option)} />;
            } else {
              return <IconContinuousButton variant={"secondary"} text={option}
                                           onClickAction={() => handleOptionSelect(option)}
                                           customStyles={"border-[#D9D9D9] text-black transition-none"}
              />;
            }
          }
        )}
        <IconContinuousButton text={"Continue"} onClickAction={nextAction} />
      </section>
    </section>
  );
}
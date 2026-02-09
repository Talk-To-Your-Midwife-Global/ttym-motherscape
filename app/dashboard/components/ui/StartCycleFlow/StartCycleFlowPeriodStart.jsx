import { useTransition } from "react";
import { Log } from "@/app/_lib/utils";
import { DayPicker } from "react-day-picker";
import { IconButton, IconContinuousButton } from "@/app/_components";
import { EditCycleHeader } from "@/app/dashboard/components/ui/EditCycleFlow";


export function StartCycleFlowPeriodStart({ nextAction, closeAction, saveProgressAction, state }) {
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
      <EditCycleHeader currentStep={1} title={"🌸 When did it start?"}
                       subTitle={"Select the first day you noticed bleeding. We'll use this to keep your cycle in sync 💕"} />
      <DayPicker
        animate
        navLayout="around"
        mode="single"
        startMonth={new Date(new Date().getFullYear(), new Date().getMonth() - 1)}
        endMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
        selected={state.periodStart}
        onSelect={handleDateChange}
        defaultMonth={new Date(new Date().getFullYear(), new Date(state.periodStart).getMonth() - 1)}
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
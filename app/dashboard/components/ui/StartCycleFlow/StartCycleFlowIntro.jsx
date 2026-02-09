"use client";
import { IconContinuousButton } from "@/app/_components";

export function StartCycleFlowIntro({ nextAction, nothingToday }) {
  return (
    <section className="p-4 bg-white rounded-t-[10px] flex-1 text-black">
      <header className={"flex flex-col justify-center items-center text-center"}>
        <h2 className={"text-xl font-bold"}>🌸 Quick Check-In</h2>
        <p className={"text-[#3A3A3A] text-sm"}>We just want to make sure your tracking stays accurate 💕</p>
      </header>
      <div className={"flex flex-col items-center justify-center gap-2 mt-3"}>
        <IconContinuousButton text={"🩸 Yes, I’m seeing blood"}
                              variant={"secondary"}
                              customStyles={"text-sm text-black border-[#D9D9D9]"}
                              onClickAction={nextAction} />
        <IconContinuousButton text={"🌿 No, Not yet"}
                              variant={"secondary"}
                              customStyles={"text-sm text-black border-[#D9D9D9]"}
                              onClickAction={nothingToday} />
      </div>
    </section>
  );
}
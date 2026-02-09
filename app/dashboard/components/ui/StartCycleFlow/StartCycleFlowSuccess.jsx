import { IconContinuousButton } from "@/app/_components";

export function StartCycleFlowSuccess({ closeAction }) {
  return (
    <section className={"flex flex-col items-center justify-center gap-5 m-3 bg-white"}>
      <header className={"flex flex-col items-center justify-center gap-2 mt-3 text-black"}>
        <h3 className={"text-xl font-bold"}>💖 All Set for Today</h3>
        <div className={"mx-10"}>
          <p className={"text-center text-[#3A3A3A] text-sm"}>
            Thank you for checking in. Your period details have been saved, and we’ll take it from here 💛
          </p>
        </div>
      </header>
      <div className={"flex items-center justify-center my-5"}>
        <IconContinuousButton text={"Done"} variant={"primary"} onClickAction={closeAction} />
      </div>
    </section>
  );
}
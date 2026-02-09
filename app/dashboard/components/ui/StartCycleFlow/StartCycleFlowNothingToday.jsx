import { IconContinuousButton } from "@/app/_components";

export function StartCycleFlowNothingToday({ closeAction }) {
  return (
    <section className={"flex flex-col items-center justify-center gap-5 m-3 bg-white"}>
      <header className={"flex flex-col items-center justify-center gap-2 mt-3 text-black"}>
        <h3 className={"text-xl font-bold"}>🤍 That’s perfectly okay</h3>
        <div className={"mx-10"}>
          <p className={"text-center text-[#3A3A3A] text-sm"}>
            Bodies aren’t always predictable. We&apos;ll keep an eye on things and let you know when it’s time. You can
            check in anytime if something changes.
          </p>
        </div>
      </header>
      <div className={"flex items-center justify-center my-5"}>
        <IconContinuousButton text={"Done"} variant={"primary"} onClickAction={closeAction} />
      </div>

    </section>
  );
}
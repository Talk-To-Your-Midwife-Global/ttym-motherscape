"use client";
import { Drawer } from "vaul";
import Image from "next/image";
import EditCalendarImg from "@/public/images/editcyclecalendar.png";

export function StartCycleFlowContainer({ children, shouldOpen, setShouldOpen, step }) {
  return (
    <Drawer.Root open={shouldOpen} onOpenChange={setShouldOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className={"fixed inset-0 bg-black/40"} />
        <Drawer.Content
          className={"bg-white flex flex-col  mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none"}>
          <Drawer.Title
            className={"w-full h-[200px] rounded-t-[10px] relative overflow-hidden bg-green-radial-bg bg-cover flex flex-col"}>
            {(step < 6 || step === "end") && <section id="reading"
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
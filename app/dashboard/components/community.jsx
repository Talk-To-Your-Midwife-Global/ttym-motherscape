import {InsightCard} from "@/app/dashboard/components/index";
import Image from "next/image";
import bookMarkIcon from "@/public/icons/bookmark-main.svg"

export function Community() {
    return (
        <section className={"mt-1"}>
            <section className={`flex gap-2 mx-6 my-3`}>
                <div className={`bg-white border-2 flex-1 flex items-center px-2 rounded-3xl`}>
                    <input type={"search"} placeholder={"Search here..."} className={`px-2 outline-none flex-1 text-primaryText`} />
                </div>
                <div className={`bg-primaryColor w-10 h-10 rounded-md flex items-center justify-center`}>
                    <Image src={bookMarkIcon} alt={'bookmark icon'} />
                </div>
            </section>
            <section className={"overflow-x-hidden h-[360px] mb-10 w-full"}>
                <header className={`px-[26px] my-5 text-[#000] font-medium`}>
                    <h1 className={`text-xl`}>My Feed</h1>
                    <section>

                    </section>
                </header>
                <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 p-4`}>
                    <InsightCard/>
                    <InsightCard/>
                    <InsightCard/>
                    <InsightCard/>
                    <InsightCard/>
                </section>
            </section>

            <section className={"overflow-x-hidden h-[260px] w-full"}>
                <header className={`px-[26px] my-5 text-[#000] font-medium`}>
                    <h1 className={`text-xl`}>Popular Questions</h1>
                    <section>

                    </section>
                </header>
                <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 p-4`}>
                    <InsightCard/>
                    <InsightCard/>
                    <InsightCard/>
                    <InsightCard/>
                    <InsightCard/>
                </section>
            </section>
        </section>
    )
}
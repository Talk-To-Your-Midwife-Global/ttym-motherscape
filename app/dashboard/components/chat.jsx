import Image from "next/image"
import messageImage from "@/public/images/message-undraw.svg"
import voice from "@/public/icons/voice.svg"
import {montserrat} from "@/app/fonts";
import {ChatCard} from "@/app/dashboard/components/index";

export function Chat({isPaired = true}) {
    if(isPaired) {
        return (
            <section className="mt-10 flex flex-col gap-2 .items-center px-5">
                <div>
                    <div className={`border-2 rounded-full flex items-center gap-2 bg-white p-2`}>
                        <span className={`iconify lucide--search`}></span>
                        <input type={"search"} name={'search'} placeholder={'Search here...'} className={`flex-1 outline-none bg-transparent text-primaryText`} />
                        {/*<Image src={voice} alt={'search'} />*/}
                    </div>
                </div>
                {/* favourites */}
                <section className={`my-5 flex gap-3 text-[#878787A1] bg-[#F2F2F2BD] border-2 border-dashed rounded-full w-10 h-10 items-center justify-center`}>
                    <div className={`flex items-center`}>
                        <span className={`iconify lucide--plus`}></span>
                    </div>
                </section>

                <section>
                    <ChatCard />
                </section>
            </section>
        )
    }
    if (isPaired === false)
    {
        return(
            <section>
                <section className={'mt-10 flex flex-col gap-2 items-center'}>
                <Image src={messageImage} alt="Chat" />
                <div>
                    <p className={`${montserrat.className} text-primaryText text-sm flex flex-col items-center`}>
                        Hold on, you will be paired with the
                        <span className={`text-primaryColor font-medium`}>Global Midwife</span>
                    </p>
                </div>
            </section>
        </section>
        )
     }


}
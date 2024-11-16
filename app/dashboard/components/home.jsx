"use client"
import {
    CycleCardMain,
    InsightCard,
    ShortCalendar
} from "@/app/dashboard/components/index";
import {montserrat} from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import {sendCurrentFeeling} from "@/app/dashboard/actions/action";
import flower from "@/public/images/name-flower.svg";
import pinkFlower from "@/public/images/flowers-1.svg"
import drip from "@/public/icons/drip.svg"
import clock from "@/public/icons/clock.svg"
import cycle from "@/public/icons/cycle.svg"
import pregnancyIcon from "@/public/icons/pregnancy.svg"
import goodFace from "@/public/icons/faces/good.svg"
import badFace from "@/public/icons/faces/bad.svg"
import angryFace from "@/public/icons/faces/angry.svg"
import tiredFace from "@/public/icons/faces/tired.svg"
import happyFace from "@/public/icons/faces/happy.svg"
import neutralFace from "@/public/icons/faces/neutral.svg"
import eventImg1 from "@/public/images/event-1.png"
import eventImg2 from "@/public/images/event-2.png"
import {useState} from "react";

export function Home({user, data}) {
    const faces = [
        {desc: "good", img: goodFace},
        {desc: "bad", img:badFace},
        {desc: "angry", img: angryFace},
        {desc:"tired", img:tiredFace},
        {desc: "happy", img: happyFace},
        {desc: "neutral", img: neutralFace}
    ]
    const [feelingRecorded, setFeelingRecorded] = useState(false)

    const handleFeeling = async (feeling) => {
        const response =  await sendCurrentFeeling(feeling)
        if (response.success) {
            setFeelingRecorded(response.success)
        } else {
            setFeelingRecorded(false)
        }
    }
    return (
        <section className={"my-2"}>
            <header className={"px-5"}>
                <section className={"text-primaryText"}>
                    <p className={`text-subText text-sm font-medium ${montserrat.className}`}>Welcome 👋</p>
                    <p className={"flex items-center text-3xl"}> {user?.full_name} <Image src={flower} alt={"flower"}/></p>
                </section>
            </header>

        {/*    Calendar goes here   */}
            <section className={"mt-1"}>
                <ShortCalendar withFlower={false} specialDates={data?.calendar} action={{actionText: "See Details", link:"/dashboard/calendar"}}/>
            </section>

        {/*   Other details go here    */}
            <section className={"px-5 my-5 text-primaryText "}>
                <header className={"flex justify-between items-center font-bold text-xl"}>
                    <h2>Today&apos;s Update</h2>
                    <Image src={pinkFlower} alt={"Another flower"}/>
                </header>
               <CycleCardMain data={data} />
            </section>

            <section className={"text-primaryText "}>
                <header className={"px-5 font-bold text-xl"}>
                    <h2>How do you feel today?</h2>
                </header>
                <section className={"flex justify-evenly"}>
                    {!feelingRecorded ?
                        faces.map(face => {
                                return (
                                    <div key={face.desc} className={"flex flex-col items-center"}>
                                        <Image onClick={async () => handleFeeling(face.desc)} src={face.img} alt={"face"} />
                                        <p> {face.desc} </p>
                                    </div>
                                )
                            })
                        :
                        <div className={"bg-white p-4 rounded-md w-full mx-5"}>
                            <p className={`text-primaryColor`}>
                                Feeling recorded today
                            </p>
                        </div>
                    }
                </section>
            </section>

            <section className={"px-5 my-10 "}>
                <header>
                    <div className={"flex justify-between"}>
                        <h2 className={"text-primaryText font-bold text-xl"}>Cycle Insights</h2> <Link href={"/"}>See
                        More</Link> {/* TODO: use the right link*/}
                    </div>
                    <p className={`${montserrat.className} text-subText`}>Personalized health tips based on logged
                        data</p>
                </header>
                <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 p-4`}>
                    <InsightCard/>
                    <InsightCard/>
                    <InsightCard/>
                    <InsightCard/>
                    <InsightCard/>
                </section>
            </section>

            <section className={"px-5 my-10 h-[300px]"}>
                <header>
                    <div className={"flex justify-between"}>
                        <h2 className={"text-primaryText font-bold text-xl"}>Upcoming Event</h2> <Link href={"/"}>See
                        More</Link> {/* TODO: use the right link*/}
                    </div>
                    <p className={`${montserrat.className} text-subText`}>Live Health Talk event by your Global midwife</p>
                </header>
                <section className={"mt-4 flex items-center "}>
                    {/* Since these will be external images TODO: configure external image in tailwind*/}
                    <Image src={eventImg1} alt={`event`} />
                    <Image src={eventImg2} alt={`event`} />
                </section>
            </section>
        </section>
    )
}
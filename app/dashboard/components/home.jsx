"use client"
import {Card, DashboardNav} from "@/app/dashboard/components/index";
import {montserrat} from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import {sendCurrentFeeling} from "@/app/dashboard/actions/action";
import flower from "@/public/images/name-flower.svg";
import pinkFlower from "@/public/images/flowers-1.svg"
import drip from "@/public/icons/drip.svg"
import goodFace from "@/public/icons/faces/good.svg"
import badFace from "@/public/icons/faces/bad.svg"
import angryFace from "@/public/icons/faces/angry.svg"
import tiredFace from "@/public/icons/faces/tired.svg"
import happyFace from "@/public/icons/faces/happy.svg"
import neutralFace from "@/public/icons/faces/neutral.svg"

export function Home() {
    const faces = [
        {desc: "good", img: goodFace},
        {desc: "bad",img:badFace},
        {desc: "angry", img: angryFace},
        {desc:"tired", img:tiredFace},
        {desc: "happy", img: happyFace},
        {desc: "neutral", img: neutralFace}
    ]
    return (
        <section className={"my-3"}>
            <header className={"px-5"}>
                <DashboardNav/>
                <section className={"text-primaryText"}>
                    <p className={`text-subText text-sm font-medium ${montserrat.className}`}>Welcome 👋</p>
                    <p className={"flex items-center text-3xl"}>Trudy Akortia <Image src={flower} alt={"flower"}/></p>
                </section>
            </header>

        {/*    Calendar goes here   */}

        {/*   Other details go here    */}
            <section className={"px-5 my-5 text-primaryText font-bold text-xl"}>
                <header className={"flex justify-between items-center"}>
                    <h2>Today&apos;s Update</h2>
                    <Image src={pinkFlower} alt={"Another flower"}/>
                </header>
                <section className={"mt-4"}>
                    <Card>
                        <Image src={drip} alt={"drip "} />
                    </Card>
                </section>
            </section>

            <section className={"text-primaryText "}>
                <header className={"px-5 font-bold text-xl"}>
                    <h2>How do you feel today?</h2>
                </header>
                <section className={"flex justify-evenly"}>
                    {faces.map(face => {
                        return (
                            <div key={face.desc} className={"flex flex-col items-center"}>
                                <Image onClick={() => sendCurrentFeeling(face.desc)} src={face.img} alt={"face"} />
                                <p> {face.desc} </p>
                            </div>
                        )
                    })}
                </section>
            </section>

            <section className={"px-5 my-10 "}>
                <header>
                    <div className={"flex justify-between"}>
                        <h2 className={"text-primaryText font-bold text-xl"}>Cycle Insights</h2> <Link href={"/seemore"}>See more</Link> {/* TODO: use the right link*/}
                    </div>
                    <p>Personalized health tips based on logged data</p>
                </header>
            </section>

        </section>
    )
}
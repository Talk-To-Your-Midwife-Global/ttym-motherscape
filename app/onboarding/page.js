"use client"
import Image from "next/image"
import { storeUserType } from "../actions"
import { PersonaCard } from "./components"
import midwife from "../../public/images/midwife.svg"
import pregnantImage from "../../public/images/pregnant-woman.svg"
import pregnantTimer from "../../public/images/pregnant-timer.svg"
import redCalendar from "../../public/images/red-calendar.svg"
import { IconButton } from "../components"
import { useState } from "react"

export default function Page() {

    const [enable, setEnable] = useState(true)

    const handleButtonEnabler = () => {
        setEnable(false)
    }

    return (
        <section className="flex flex-col">
            <header className="px-[20px] py-10 font-medium">
                <h1 className="text-2xl text-mainText font-medium">How can we help you today?</h1>
                <p className="text-base text-subText ">Let&apos;s begin by telling us about you</p>
            </header>
            <section className="px-5">
                <PersonaCard onClick={storeUserType} shouldEnable={handleButtonEnabler} heading="Midwife" description="Monitor your pregnancy milestones and access helpful tips.">
                    <Image src={midwife} width={100} height={200} alt="pregnant woman" />
                </PersonaCard>

                <PersonaCard onClick={storeUserType} shouldEnable={handleButtonEnabler} heading="Pregnancy Tracker" description="Monitor your pregnancy milestones and access helpful tips.">
                    <Image src={pregnantImage} width={100} height={200} alt="pregnant woman" />
                </PersonaCard>

                <PersonaCard onClick={storeUserType} shouldEnable={handleButtonEnabler} heading="Getting Pregnant" description="Track ovulation cycles and receive guidance to boost fertility.">
                    <Image src={pregnantTimer} width={100} height={200} alt="pregnant woman" />
                </PersonaCard>

                <PersonaCard onClick={storeUserType} shouldEnable={handleButtonEnabler} heading="Menstrual Cycle Tracker" description="Keep tabs on your period, symptoms, and menstrual health.">
                    <Image src={redCalendar} width={100} height={200} alt="pregnant woman" />
                </PersonaCard>
            </section>
            <section className="fixed bottom-5 w-full flex justify-center">
                <IconButton text="Continue" icon="iconify lucide--arrow-right" href="/onboarding/1" disabled={enable} />
            </section>
        </section>
    )
}
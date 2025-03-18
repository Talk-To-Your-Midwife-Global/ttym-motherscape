"use client"
import Image from "next/image"
import {storeUserType} from "../actions"
import {PersonaCard} from "./components"
import pregnantImage from "../../public/images/pregnancy-profile-img.png"
import redCalendar from "../../public/images/tracker-profile-image.png"
import {IconButton} from "../components"
import {useState} from "react"

export default function Page() {

    const [enable, setEnable] = useState(true)
    const [routeName, setRouteName] = useState('')

    const handleButtonEnabler = (userType) => {
        setEnable(false)
        setRouteName(userType)
        localStorage.setItem('userType', userType)
    }

    return (
        <section className="flex flex-col">
            <header className="px-[20px] pt-5 pb-7 font-medium">
                <h1 className="text-2xl text-mainText font-medium">How can we help you today?</h1>
                <p className="text-base text-subText ">Let&apos;s begin by telling us about you</p>
            </header>
            <section className="px-5">
                <PersonaCard onClick={storeUserType} shouldEnable={handleButtonEnabler} heading="Pregnancy Tracker"
                             description="Monitor your pregnancy milestones and access helpful tips.">
                    <Image src={pregnantImage} width={100} height={100} alt="pregnant woman"/>
                </PersonaCard>
                <PersonaCard onClick={storeUserType} shouldEnable={handleButtonEnabler}
                             heading="Menstrual Cycle Tracker"
                             description="Keep tabs on your period, symptoms, and menstrual health.">
                    <Image src={redCalendar} width={100} height={100} alt="red calendar"/>
                </PersonaCard>
            </section>
            <section className=".fixed relative -bottom-10 w-full flex justify-center">
                <IconButton text="Continue" icon="iconify lucide--arrow-right" href={`/onboarding/${routeName}/1`}
                            disabled={enable}/>
            </section>
        </section>
    )
}
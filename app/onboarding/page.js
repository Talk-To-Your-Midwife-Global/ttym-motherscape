"use client"
import Image from "next/image"
import {storeUserType} from "../_actions"
import {PersonaCard} from "./_components"
import pregnantImage from "../../public/images/pregnancy-profile-img.png"
import redCalendar from "../../public/images/tracker-profile-image.png"
import {IconButton} from "../_components"
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
            <section className="px-5 grid grid-cols-2 gap-5">
                <PersonaCard onClick={storeUserType} color={1} shouldEnable={handleButtonEnabler}
                             heading="Track my pregnancy">
                    <Image src={pregnantImage} width={80} height={100} alt="pregnant woman"/>
                </PersonaCard>
                <PersonaCard onClick={storeUserType} shouldEnable={handleButtonEnabler}
                             heading="Track my period"
                             color={2}>
                    <Image src={redCalendar} width={200} height={100} alt="red calendar"/>
                </PersonaCard>
            </section>
            <section className=".fixed relative -bottom-10 w-full flex justify-center">
                <IconButton text="Continue" icon="iconify lucide--arrow-right" href={`/onboarding/${routeName}/1`}
                            disabled={enable}/>
            </section>
        </section>
    )
}
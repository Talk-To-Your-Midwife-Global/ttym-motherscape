import Link from "next/link"
import Image from "next/image"
import { removeSpaces } from "@/app/lib/functions"
import rafiki from "../../../public/images/rafiki.svg"
import cuate from "../../../public/images/cuate.svg"
import pana from "../../../public/images/pana.svg"
import { IconButton } from "@/app/components"

export function OnboardNav({url, icon="lucide--chevron-right", last=false}) {
    return (
        <nav className="px-[20px] flex justify-between items-center my-5">
            <Link href={url}  className="bg-[#16898E1A] w-12 h-12 rounded-full flex justify-center items-center">
                <span className={`iconify ${icon} text-2xl`}></span>
            </Link>
            {!last ?  <Link href='/onboarding/menstrualcycletracker/3' className="text-primaryColor font-medium">Skip</Link> : ''}
           
        </nav>
    )
}

export function OnboardHeader({heading, description}) {
    return (
        <header className="flex flex-col justify-center items-center my-5 px-[20px]">
            <h2 className="text-4xl w-full font-semibold text-tertiaryColor .leading-normal">{heading}</h2>
            <p className="text-tertiaryColor font-medium">{description}</p>
        </header>
    )
}

export function PersonaCard({children, heading, description, onClick, shouldEnable,}) {
    return (
        <section tabIndex={0} onClick={() => {
            onClick(removeSpaces(heading.toLowerCase()))
            shouldEnable(removeSpaces(heading.toLowerCase()))
            }} className="flex gap-4 border-2 shadow-lg h-[100px] py-3 rounded-3xl mb-8 focus:border-primaryColor">
            <section className="pl-3">
                {children}
            </section>
            <section>
                <h2 className="text-lg text-primaryText font-medium">{heading}</h2>
                <p className="text-sm text-primaryText pr-2">{description}</p>
            </section>
        </section>
    )
}



export function StepOne() {
    return (
        <section>
            <OnboardNav url="/onboarding/menstrualcycletracker/2" />
            <section className="flex flex-col justify-between">
                <OnboardHeader heading="Track Your Cycle with Confidence!" description="Stay on top of your period, symptoms, and mood with personalized insights tailored to your unique cycle." />
                <section className="flex-1 fixed bottom-0">
                    <Image src={rafiki} className="" alt="image of a woman at different stages of pregnancy" />
                </section>
            </section>
        </section>
    )
}

export function StepTwo() {
    return (
        <section>
            <OnboardNav url="/onboarding/menstrualcycletracker/3" />
            <section className="flex flex-col justify-between">
                <OnboardHeader heading="A Community to Rely on" description="A community forum to share your journey or listen to success stories" />
                <section className="flex-1 fixed bottom-5">
                    <Image src={cuate} className="" alt="three women talking" />
                </section>
            </section>
        </section>
    )
}

export function StepThree() {
    return (
        <section className="h-screen">
            <OnboardNav url="/onboarding/" icon="lucide--chevron-left" last={true} />
            <section className="flex flex-col justify-between">
                <OnboardHeader heading="Want to talk to a midwife or a doctor" description="Get in touch with our midwives and doctors to help better your monthly flow" />
                <section className="flex-1">
                    <Image src={pana} className="" alt="three women talking" />
                </section>

                <section className="mt-10 flex flex-col gap-8 justify-center items-center">
                    <IconButton href="/auth/register/" icon="iconify lucide--arrow-right" text="Create Account" disabled={false}/>
                    <Link className="text-primaryColor font-bold" href="/auth/signIn/">
                        Log In
                    </Link>
                </section>
            </section>
        </section>
    )
}
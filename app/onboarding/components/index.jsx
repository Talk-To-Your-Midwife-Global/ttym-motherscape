// "use server"
import Link from "next/link"
import Image from "next/image"
// import { cookies } from "next/headers"
import rafiki from "../../../public/images/rafiki.svg"
import cuate from "../../../public/images/cuate.svg"
import pana from "../../../public/images/pana.svg"
import { Button, IconButton } from "@/app/components"

export function OnboardNav({url}) {
    return (
        <nav className="px-[20px] flex justify-between items-center my-5">
            <Link href={url}  className="bg-[#16898E1A] w-12 h-12 rounded-full flex justify-center items-center">
                <span className="iconify material-symbols-light--chevron-right-rounded text-2xl"></span>
            </Link>
            <Link href={url} className="text-primaryColor font-medium">Skip</Link>
        </nav>
    )
}

export function OnboardHeader({heading, description}) {
    return (
        <header className="flex flex-col justify-center items-center my-5 px-[30px]">
            <h2 className="text-4xl font-semibold text-tertiaryColor leading-normal">{heading}</h2>
            <p className="text-tertiaryColor font-medium">{description}</p>
        </header>
    )
}

export function PersonaCard({children, heading, description, onClick, shouldEnable,}) {
    return (
        <section tabIndex={0} onClick={() => {
            onClick(heading.toLowerCase())
            shouldEnable()
            }} className="flex gap-4 border-2 shadow-lg h-[110px] py-5 rounded-3xl mb-10 focus:border-primaryColor">
            <section className="pl-3">
                {children}
            </section>
            <section>
                <h2 className="text-xl text-primaryText font-medium">{heading}</h2>
                <p className="text-sm text-primaryText pr-2">{description}</p>
            </section>
        </section>
    )
}



export function StepOne() {
    return (
        <section>
            <OnboardNav url="/onboarding/2" />
            <section className="flex flex-col justify-between">
                <OnboardHeader heading="Track Your Cycle with Confidence!" description="Stay on top of your period, symptoms, and mood with personalized insights tailored to your unique cycle." />
                <section className="flex-1 fixed bottom-10">
                    <Image src={rafiki} className="" alt="image of a woman at different stages of pregnancy" />
                </section>
            </section>
        </section>
    )
}

export function StepTwo() {
    return (
        <section>
            <OnboardNav url="/onboarding/3" />
            <section className="flex flex-col justify-between">
                <OnboardHeader heading="A Community to Rely on" description="A community forum to share your journey or listen to success stories" />
                <section className="flex-1 fixed bottom-10">
                    <Image src={cuate} className="" alt="three women talking" />
                </section>
            </section>
        </section>
    )
}

export function StepFour() {
    return (
        <section className="h-screen">
            <OnboardNav url="/onboarding/4" />
            <section className="flex flex-col justify-between">
                <OnboardHeader heading="Want to talk to a midwife or a doctor" description="Get in touch with our midwives and doctors to help better your monthly flow" />
                <section className="flex-1 fixed bottom-10">
                    <Image src={pana} className="" alt="three women talking" />
                </section>
            </section>
        </section>
    )
}

export function StepThree() {
    return (
        <section className="h-screen">
            <OnboardNav url="/" />
            <section className="flex flex-col justify-between .items-center">
                <OnboardHeader heading="Want to talk to a midwife or a doctor" description="Get in touch with our midwives and doctors to help better your monthly flow" />
                <section className="flex-1">
                    <Image src={pana} className="" alt="three women talking" />
                </section>

                <section className="mt-10 flex flex-col gap-10 justify-center items-center">
                    <Link href="/auth/signIn/patient">
                        <IconButton icon="iconify lucide--arrow-right" text="Sign In" disabled={false}/>
                    </Link>
                    <Link href="/auth/register/patient">
                        <Button text="Create Account" variant="secondary" />
                    </Link>
                </section>
            </section>
        </section>
    )
}
import Link from "next/link"
import Image from "next/image"
import rafiki from "../../../public/images/rafiki.svg"
import pana from "../../../public/images/pana.svg"
import pana2 from "../../../public/images/pana2.svg"
import pana3 from "../../../public/images/pana3.svg"
import { Button } from "@/app/components"

export function OnboardNav({url}) {
    return (
        <nav className="px-[20px] flex justify-between items-center my-5">
            <Link href={url}  className="bg-[#16898E1A] w-12 h-12 rounded-full flex justify-center items-center">
                <span className="iconify material-symbols-light--chevron-right-rounded text-2xl"></span>
            </Link>
            <Link href={url} className="text-pink font-medium">Skip</Link>
        </nav>
    )
}

export function OnboardHeader({text}) {
    return (
        <header className="flex justify-center items-center my-5 px-[30px]">
            <h2 className="text-4xl font-medium text-secondary leading-normal">{text}</h2>
        </header>
    )
}

export function StepOne() {
    return (
        <section>
            <OnboardNav url="/onboarding/2" />
            <section className="flex flex-col justify-between">
                <OnboardHeader text="Need help in tracking your pregnancy and mensural cycle" />
                <section className="flex-1">
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
                <OnboardHeader text="A community forum to share your journey or listen to success stories" />
                <section className="flex-1">
                    <Image src={pana} className="" alt="three women talking" />
                </section>
            </section>
        </section>
    )
}

export function StepThree() {
    return (
        <section className="h-screen">
            <OnboardNav url="/onboarding/4" />
            <section className="flex flex-col justify-between">
                <OnboardHeader text="Need help to concieve or get pregnant" />
                <section className="flex-1">
                    <Image src={pana2} className="" alt="three women talking" />
                </section>
            </section>
        </section>
    )
}

export function StepFour() {
    return (
        <section className="h-screen">
            <OnboardNav url="/onboarding/4" />
            <section className="flex flex-col justify-between .items-center">
                <OnboardHeader text="Want to talk to a midwife or a doctor" />
                <section className="flex-1">
                    <Image src={pana3} className="" alt="three women talking" />
                </section>

                <section className="mt-10 flex flex-col gap-10 justify-center items-center">
                    <Link href="#">
                        <Button text="Sign In" />
                    </Link>
                    <Link href="#">
                        <Button text="Create Account" variant="secondary" />
                    </Link>
                <Link href="/" className=".text-center text-pink font-medium mt-2">
                    I am a midwife
                </Link>
                </section>
            </section>
        </section>
    )
}
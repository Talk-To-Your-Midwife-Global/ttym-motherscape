"use client"
import Link from "next/link"
import {removeSpaces} from "@/app/_lib/functions"
import {IconButton} from "@/app/_components"
import {PageSlideAnimator} from "@/app/_components"
import {cn} from "@/app/_lib/utils";
import {SideSliderButtons} from "@/app/onboarding/_components/SideSliderButtons";
import {OnboardHeading} from "@/app/onboarding/_components/OnboardHeading";

export function OnboardNav({url, userType = "menstrualcycletracker", icon = "lucide--chevron-right", last = false}) {
    return (
        <nav className="px-[20px] flex justify-between items-center my-5">
            <Link href={url} className="bg-[#16898E1A] w-12 h-12 rounded-full flex justify-center items-center">
                <span className={`iconify ${icon} text-2xl`}></span>
            </Link>
            {!last ? <Link href={`/onboarding/${userType}/3`}
                           className="text-primaryColor font-medium">Skip</Link> : ''}

        </nav>
    )
}

export function OnboardHeader({heading, description}) {
    return (
        <header className="flex flex-col justify-center items-center my-5 px-[20px]">
            <h2 className="text-3xl w-full font-semibold text-tertiaryColor lg:text-4xl .leading-normal">{heading}</h2>
            <p className="text-tertiaryColor text-sm font-medium">{description}</p>
        </header>
    )
}

export function PersonaCard({children, heading, description, onClick, shouldEnable, color}) {
    const base = "flex flex-col gap-4 justify-center items-center border-2 shadow-lg h-[200px] py-3 rounded-3xl mb-8 focus:border-primaryColor";
    const colors = {
        0: `${base} bg-[#F2F3F4]`,
        1: `${base} bg-[#FFF4F0]`
    }
    return (
        <section tabIndex={0} onClick={() => {
            onClick(removeSpaces(heading.toLowerCase()))
            shouldEnable(removeSpaces(heading.toLowerCase()))
        }} className={color ? colors[color % 2] : ''}>
            <section className="pl-3">
                {children}
            </section>
            <section>
                <h2 className="text-sm text-primaryText font-medium">{heading}</h2>
            </section>
        </section>
    )
}

export function LongPersonaCard({header, desc, actions, bgColor = undefined, illustration = undefined, children}) {
    return (
        <section tabIndex={0} onClick={() => {
            actions.enableButton(removeSpaces(header.toLowerCase()))
        }}
                 className={cn(`w-full max-w-[380px] h-[140px] rounded-xl p-4 flex gap-2 space-between transition .delay-150 duration-300 ease-in-out focus:border-2 focus:border-primaryColor bg-gradient-to-br focus:from-[#0F9C84] focus:to-[#0F9C84]`)}>
            <div className="text-black w-[214px]">
                <h2 className={'text-[16px] font-medium'}>{header}</h2>
                <p className={'text-[14px] '}>{desc}</p>
            </div>
            <div>
                {children}
            </div>
        </section>
    )
}


export function StepOne({userType, children, title, description}) {
    return (
        <SideSliderButtons userType={userType}>
            <section className="overflow-hidden w-screen h-svh bg-onboarding-bg">
                <OnboardNav userType={userType} url={`/onboarding/${userType}/2`}/>
                <PageSlideAnimator>
                    <section className="flex flex-col justify-between">
                        <OnboardHeading title={title} subTitle={description}/>
                        <section className="flex-1 relative -bottom-10">
                            {children}
                        </section>
                    </section>
                </PageSlideAnimator>
            </section>
        </SideSliderButtons>
    )
}

export function StepTwo({userType, children, title, description}) {
    return (
        <section className="overflow-hidden w-screen h-svh">
            <OnboardNav userType={userType} url={`/onboarding/${userType}/3`}/>
            <PageSlideAnimator>
                <section className="flex flex-col justify-between">
                    {/*<OnboardHeader heading={title} description={description}/>*/}
                    <OnboardHeading heading={title} subTitle={description}/>
                    <section className="flex-1 relative -bottom-10">
                        {children}
                    </section>
                </section>
            </PageSlideAnimator>
        </section>
    )
}

export function StepThree({userType, children, title, description}) {
    return (
        <section className="h-svh">
            {/*<OnboardNav userType={userType} url="/onboarding/" icon="lucide--chevron-left" last={true}/>*/}
            <PageSlideAnimator>
                <section className="flex flex-col justify-between mt-10">
                    <OnboardHeader heading={title} description={description}/>
                    <section className="flex-1">
                        {children}
                    </section>

                    <section className="my-10 flex flex-col gap-8 justify-center items-center">
                        <IconButton href="/questions/" icon="iconify lucide--arrow-right" text="Continue"
                                    disabled={false}/>
                    </section>
                </section>
            </PageSlideAnimator>
        </section>
    )
}
"use client"
import Link from "next/link"
import {removeSpaces} from "@/app/_lib/functions"
import {IconButton, IconContinuousButton} from "@/app/_components"
import {PageSlideAnimator} from "@/app/_components"
import {cn} from "@/app/_lib/utils";
import {SideSliderButtons} from "@/app/onboarding/_components/SideSliderButtons";
import {OnboardHeading} from "@/app/onboarding/_components/OnboardHeading";
import {QuestionNav} from "@/app/questions/components/menstrualcycletracker";

export function OnboardNav({url, icon = "lucide--chevron-left", last = false}) {
    return (
        <nav className="px-[20px] flex justify-between items-center my-5">
            <Link href={url} className=".bg-[#16898E1A] w-12 h-12 rounded-full flex justify-center items-center">
                <span className={`iconify ${icon} text-primaryText text-2xl`}></span>
            </Link>
        </nav>
    )
}

export function LongPersonaCard({
                                    header,
                                    desc,
                                    actions = undefined,
                                    bgColor = undefined,
                                    illustration = undefined,
                                    children
                                }) {
    return (
        <section tabIndex={0} onClick={() => {
            actions.enableButton(removeSpaces(header.toLowerCase()))
        }}
                 className={cn(`w-full max-w-[380px] h-[140px] rounded-xl p-4 flex gap-2 shadow-md space-between transition .delay-150 duration-300 ease-in-out`, actions && `focus:border-2 focus:border-primaryColor bg-gradient-to-br focus:from-[#0F9C84] focus:to-[#0F9C84] border-2`, !actions && "grayscale py-2 px-4 ")}>
            <div className="text-black w-[214px] relative">
                {
                    !actions &&
                    <div className={"absolute. top-0 border shadow-md rounded-lg px-2 mb-2 w-fit text-primaryText"}>
                        <p>Coming soon</p>
                    </div>
                }
                <h2 className={'text-[16px] font-medium'}>{header}</h2>
                <p className={'text-[14px] line-clamp-3'}>{desc}</p>
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
                        <section className="flex-1 relative -bottom-10 -z-10">
                            {children}
                        </section>
                    </section>
                </PageSlideAnimator>
                <div className={"flex items-center justify-center z-40 fixed bottom-10 w-screen"}>
                    <IconContinuousButton text="Continue" icon="iconify lucide--arrow-right"
                                          href={`/onboarding/${userType}/2`}
                    />
                </div>
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

export function FlashThree({children, title, description, question = 7}) {
    return (
        <section className="overflow-hidden w-screen h-svh">
            <QuestionNav
                url={question > 1 ? `/onboarding/trackmyperiod/${question - 1}` : '/onboarding/'}
                question={question}/>
            <PageSlideAnimator>
                <section className="flex flex-col justify-between">
                    <OnboardHeading title={title} subTitle={description}/>
                    <section className="flex-1 relative -bottom-10">
                        {children}
                    </section>
                </section>
            </PageSlideAnimator>
            <div className="fixed bottom-10 w-full flex justify-center">
                <IconContinuousButton href={"/dashboard"} text="Continue" icon="iconify lucide--arrow-right"/>
            </div>
        </section>
    )
}

export function FlashTwo({children, title, description, question, userType}) {
    return (
        <section className="overflow-hidden w-screen h-screen bg-onboarding-bg">
            <QuestionNav
                url={question > 1 ? `/onboarding/trackmyperiod/${question - 1}` : '/onboarding/'}
                question={question}/>
            <PageSlideAnimator>
                <section className="flex flex-col items-center justify-between">
                    <section className="flex-1 flex justify-center relative -bottom-40">
                        {children}
                    </section>
                    <section
                        className="flex-1 relative -bottom-40 text-black flex flex-col items-center justify-center">
                        <h2 className="font-medium text-[22px]">{title}</h2>
                        <p className={'text-[#8A8A8A] w-[80%] text-center'}>{description}</p>
                    </section>
                </section>
            </PageSlideAnimator>
            <div className={"fixed bottom-10 w-screen flex items-center justify-center z-40"}>
                <IconContinuousButton text="Continue" icon="iconify lucide--arrow-right"
                                      href={`/onboarding/${userType}/5`}
                />
            </div>
        </section>

    );
}


export function StepThree({userType, children, title, description}) {
    return (
        <section className="h-svh">
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
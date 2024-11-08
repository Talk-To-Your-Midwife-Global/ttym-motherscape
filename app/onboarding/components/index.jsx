import Link from "next/link"
import { removeSpaces } from "@/app/lib/functions"
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
            <h2 className="text-3xl w-full font-semibold text-tertiaryColor lg:text-4xl .leading-normal">{heading}</h2>
            <p className="text-tertiaryColor text-sm font-medium">{description}</p>
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



export function StepOne({userType, children}) {
    return (
        <section className="overflow-hidden w-screen h-svh">
            <OnboardNav url={`/onboarding/${userType}/2`} />
            <section className="flex flex-col justify-between">
                <OnboardHeader heading="Track Your Cycle with Confidence!" description="Stay on top of your period, symptoms, and mood with personalized insights tailored to your unique cycle." />
                <section className="flex-1 relative -bottom-10">
                    {children}
                </section>
            </section>
        </section>
    )
}

export function StepTwo({userType, children}) {
    return (
        <section className="overflow-hidden w-screen h-svh">
            <OnboardNav url={`/onboarding/${userType}/3`} />
            <section className="flex flex-col justify-between">
                <OnboardHeader heading="A Community to Rely on" description="A community forum to share your journey or listen to success stories" />
                <section className="flex-1 relative -bottom-10">
                    {children}
                </section>
            </section>
        </section>
    )
}

export function StepThree({children}) {
    return (
        <section className="h-svh">
            <OnboardNav url="/onboarding/" icon="lucide--chevron-left" last={true} />
            <section className="flex flex-col justify-between">
                <OnboardHeader heading="Want to talk to a midwife or a doctor" description="Get in touch with our midwives and doctors to help better your monthly flow" />
                <section className="flex-1">
                    {children}
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
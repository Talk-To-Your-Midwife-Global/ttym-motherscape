"use client"
import Image from "next/image"
import {storeUserType} from "../_actions"
import {LongPersonaCard} from "./_components"
import pregnantImageNoBg from "../../public/images/pregnancy-profile-img-no-bg.png"
import trackerImageNoBg from "../../public/images/tracker-profile-image.png"
import {IconContinuousButton} from "../_components"
import {useState} from "react"
import {OnboardHeading} from "@/app/onboarding/_components/OnboardHeading";
import {useTransition} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [enable, setEnable] = useState(true)
    const [routeName, setRouteName] = useState('');

    const handleButtonEnabler = (userType) => {
        setEnable(true);
        enableUserType(userType)
        setEnable(false)
    }

    const enableUserType = (userType) => {
        setRouteName(userType)
        localStorage.setItem('userType', userType)
        storeUserType(userType);
    }

    const handleSubmit = () => {
        startTransition(async () => {
                setEnable(false)
            }
        )
    }

    const cardActions = {
        onClick: storeUserType,
        enableButton: handleButtonEnabler
    }

    return (
        <section className="flex flex-col .h-screen .bg-onboarding-bg .bg-cover .bg-center">
            <OnboardHeading title={"Which journey are you on right now?"}
                            subTitle={"Select one of the options below to tailor your experience"}/>
            <section className="px-5 grid grid-cols-1 gap-5">
                <LongPersonaCard header={'Track my pregnancy'}
                                 desc={'Monitor your pregnancy week by week with personalized tips and insights.'}
                                 bgColor={'from-[#F4AE94] to-[#EB6737]'}
                    // actions={cardActions}
                >
                    <Image src={pregnantImageNoBg} width={157} height={100} alt="pregnant woman"/>
                </LongPersonaCard>

                <LongPersonaCard header={'Track my period'}
                                 desc={'Keep a detailed record of your menstrual cycle and symptoms.'}
                                 bgColor={'from-[#D9AEFF] to-[#BC6EFF]'}
                                 actions={cardActions}>
                    <Image src={trackerImageNoBg} width={157} height={100} alt="pregnant woman"/>
                </LongPersonaCard>
            </section>
            <section className="fixed  bottom-10 w-full flex justify-center">
                <IconContinuousButton text="Continue" icon="iconify lucide--arrow-right"
                                      href={`/onboarding/${routeName}/1`}
                                      onClick={handleSubmit}
                                      disabled={enable}/>
            </section>
        </section>
    )
}
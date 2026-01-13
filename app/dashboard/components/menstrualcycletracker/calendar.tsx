"use client"
import Image from "next/image"
import {useState} from "react";
import {CircularProgressBar, InsightParent} from "@/app/dashboard/components";
import menstrualPhase from "@/public/images/menstrual-phase.svg"
import follicularPhase from "@/public/images/follicular-phase.svg"
import ovulationPhase from "@/public/images/ovulation-phase.svg"
import lutealPhase from "@/public/images/luteal-phase.svg"
import ovulationBlue from "@/public/images/ovulation-phase-blue.svg"
import pregnancyPink from "@/public/images/pregnancy-pink.svg"
import {montserrat} from "@/app/_fonts";
import Link from "next/link";
import {necessaryDataForMenstrualUI, relatableDay} from "@/app/_lib/functions";
import {IconButton, PageFadeAnimator} from "@/app/_components";
import {useCycleInfo} from "@/app/dashboard/lib/dataFetching";
import {useSWRConfig} from "swr/_internal";
import {Log} from "@/app/_lib/utils";
import {CombinedCalendar} from "@/app/dashboard/components/ui/CombinedCalendar";
import {TapWrapper} from "@/app/_components/TapWrapper";
import {RestartCalendar} from "@/app/dashboard/components/ui/RestartCalendar";
import {InstallApp} from "@/app/_components/InstallApp";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";

export function CalendarMain({accessToken}) {
    const phaseImages = {
        "menstrual": {
            img: menstrualPhase,
            msg: "You are currently in your Menstrual Phase"
        },
        "follicular": {
            img: follicularPhase,
            msg: "You are currently in your Follicular Phase"
        },
        "ovulation": {
            img: ovulationPhase,
            msg: "You are currently in your Ovulation Phase"
        },
        "fertile": {
            img: ovulationPhase,
            msg: "You are currently in your fertile Phase"
        },
        "luteal": {
            img: lutealPhase,
            msg: "You are currently in your Luteal Phase"
        },
        "upcoming": {
            img: lutealPhase,
            msg: "You are currently in your Luteal Phase"
        },
        "missed": {
            img: lutealPhase,
            msg: "You are currently in your Luteal Phase"
        }

    }

    const {data, error, isLoading} = useCycleInfo(accessToken);
    const generalCycleInfo = necessaryDataForMenstrualUI(data || []);
    Log("calendar.jsx", {data})
    Log("calendar.jsx; ", {generalCycleInfo})

    const [hideDailyTip, setHideDailyTip] = useState(true);
    const {mutate} = useSWRConfig()

    const handleHideDailyTip = () => {
        setHideDailyTip(true);
    }


    if (isLoading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if (error) {
        // todo: throw an error instead
        return (
            <div>
                error
                {error.message}
            </div>
        )
    }
    return (
        <section>
            <CombinedCalendar accessToken={accessToken}/>
            <section className={`my-10`}>
                <CircularProgressBar percentage={generalCycleInfo?.percentageComplete} bg={`#F5F5F5`}
                                     foreBg={'#015364'}>
                    <h2 className={`text-3xl font-bold text-primaryText text-center relative top-5`}>Day {generalCycleInfo?.daysDone + 1}</h2>
                    <Image src={phaseImages[generalCycleInfo.stage]?.img} alt={"phase image"}
                           className={`relative top-5`}/>
                    <p className={`w-[200px] text-center text-subText text-sm relative top-5`}> {phaseImages[generalCycleInfo?.stage]?.msg} </p>

                </CircularProgressBar>

                <div className={"flex items-center justify-center"}>
                    <TapWrapper>
                        <IconButton customStyle={'w-fit px-4'} text={"I'm Feeling..."} href={"/dashboard/logs"}/>
                    </TapWrapper>
                </div>
            </section>


            <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 my-4`}>
                <article
                    className={`my-10 h-[85px] w-[188px] carousel-items flex-shrink-0 w-42 rounded-2xl shadow-md border-2 border-[#07226B] p-4 flex .flex-col space-between`}>
                    <div className={`flex-1`}>
                        <Image src={ovulationBlue} alt={'blue image depicting ovulation'}/>
                    </div>
                    <section className={`text-primaryText`}>
                        <h3 className={`${montserrat.className} text-[#0E0E0EB0] text-[12px]`}>Next Ovulation</h3>
                        <p className={`text-2xl font-semibold`}>{relatableDay(generalCycleInfo?.daysToOvulation)}</p>
                    </section>
                </article>

                <article
                    className={`my-10 h-[85px] w-[188px] carousel-items flex-shrink-0 w-42 rounded-2xl shadow-md border-2 border-[#AF52DE] p-4 flex .flex-col space-between`}>
                    <div className={`flex-1`}>
                        <Image src={pregnancyPink} alt={'blue image depicting ovulation'}/>
                    </div>
                    <section className={`text-primaryText`}>
                        <h3 className={`${montserrat.className} text-[#0E0E0EB0] text-[12px]`}>Pregnancy</h3>
                        <p className={`text-2xl font-semibold`}>{generalCycleInfo?.pregnancyProb} </p>
                    </section>
                </article>
            </section>
            <section>
                <ContainerWrapper>
                    <InstallApp/>
                </ContainerWrapper>
            </section>

            <InsightParent head={"Daily Insights"} desc={"Personalized health tips based on logged data"}
                           accessToken={accessToken}/>
            <RestartCalendar accessToken={accessToken}/>
        </section>
    )
}
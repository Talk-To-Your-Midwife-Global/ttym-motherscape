"use client"
import Image from "next/image"
import {useState} from "react";
import {Calendar, CircularProgressBar, InsightParent, ShortCalendar} from "@/app/dashboard/components";
import menstrualPhase from "@/public/images/menstrual-phase.svg"
import follicularPhase from "@/public/images/follicular-phase.svg"
import ovulationPhase from "@/public/images/ovulation-phase.svg"
import lutealPhase from "@/public/images/luteal-phase.svg"
import ovulationBlue from "@/public/images/ovulation-phase-blue.svg"
import pregnancyPink from "@/public/images/pregnancy-pink.svg"
import {montserrat} from "@/app/_fonts";
import Link from "next/link";
import {menstrualCycleDateGenerator, necessaryDataForMenstrualUI, relatableDay} from "@/app/_lib/functions";
import {PageFadeAnimator} from "@/app/_components";
import {useCycleInfo} from "@/app/dashboard/lib/dataFetching";

export function CalendarMain({accessToken}) {
    const phaseImages = {
        "Menstrual": {
            img: menstrualPhase,
            msg: "You are currently in your Menstrual Phase"
        },
        "Follicular": {
            img: follicularPhase,
            msg: "You are currently in your Follicular Phase"
        },
        "Ovulation": {
            img: ovulationPhase,
            msg: "You are currently in your Ovulation Phase"
        },
        "Luteal": {
            img: lutealPhase,
            msg: "You are currently in your Luteal Phase"
        },

    }

    const {data, error, isLoading} = useCycleInfo(accessToken);
    console.log(data)
    const generalCycleInfo = necessaryDataForMenstrualUI(data || []);
    const specialDates = menstrualCycleDateGenerator(data?.period_start, data?.period_length, "general", data?.cycle_length);
    console.log(generalCycleInfo)

    const [viewLargeCalendar, setViewLargeCalendar] = useState(false);
    const [hideDailyTip, setHideDailyTip] = useState(false);

    const handleCalendarViewToggle = () => {
        setViewLargeCalendar(prevState => !prevState);
    }

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
        return (
            <div>
                error
                {error.message}
            </div>
        )
    }
    return (
        <section>
            {
                viewLargeCalendar ?
                    <section>
                        <Calendar action={{
                            actionText: "Minimize Calendar",
                            action: handleCalendarViewToggle
                        }}
                                  accessToken={accessToken}
                                  specialDates={specialDates}
                                  withFlower={true}/>
                        <div className={'text-[#72777A] text-[10px] px-5 flex gap-3'}>
                            <span className={`flex gap-2 w-fit `}>
                                <div className={'w-4 h-4 bg-[#F8CEDE] rounded-full'}> </div> <span className="w-fit">Recorded Flows</span>
                            </span>
                            <span className={`flex gap-2`}>
                                <div
                                    className={'w-4 h-4 border border-dashed border-[#E82A73] rounded-full'}> </div> <span>Predicted Period</span>
                            </span>
                            <span className={`flex gap-2`}>
                                <div className={'w-4 h-4 bg-[#DEE4F5] rounded-full'}> </div> <span>Fertile Window</span>
                            </span>
                        </div>
                    </section>
                    : <ShortCalendar action={{actionText: "View Calendar", action: handleCalendarViewToggle}}
                                     specialDates={specialDates} accessToken={accessToken} withFlower={true}/>
            }
            <section className={`my-10`}>
                <CircularProgressBar percentage={generalCycleInfo?.percentageComplete} bg={`#F5F5F5`}
                                     foreBg={'#015364'}>
                    <h2 className={`text-3xl font-bold text-primaryText text-center relative top-5`}>Day {generalCycleInfo?.daysDone}</h2>
                    <Image src={phaseImages[generalCycleInfo?.stage]?.img} alt={"phase image"}
                           className={`relative top-5`}/>
                    <p className={`w-[200px] text-center text-subText text-sm relative top-5`}> {phaseImages[generalCycleInfo?.stage]?.msg} </p>
                </CircularProgressBar>
            </section>
            <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 my-4`}>
                <article
                    className={`carousel-items flex-shrink-0 w-42 my-10 h-[160px] rounded-2xl shadow-md border p-4 mx-2 flex flex-col space-between`}>
                    <header className={`flex-1`}>
                        <h2 className={'font-medium text-primaryText'}>Log Time</h2>
                        <p className={`text-[10px] text-subText`}>Log how you feel today</p>
                    </header>
                    <section
                        className={'bg-[#0F969C26] p-4 w-[50px] h-[50px] rounded-full flex items-center justify-center'}>
                        <Link href={"/dashboard/logs"}>

                            <span className={'iconify lucide--plus text-lg text-tertiaryColor'}></span>
                        </Link>
                    </section>
                </article>

                <article
                    className={`my-10 h-[160px] carousel-items flex-shrink-0 w-42 rounded-2xl shadow-md border-2 border-[#07226B] p-4 flex flex-col space-between`}>
                    <div className={`flex-1`}>
                        <Image src={ovulationBlue} alt={'blue image depicting ovulation'}/>
                    </div>
                    <section className={`text-primaryText`}>
                        <h3 className={`${montserrat.className} text-[#0E0E0EB0] text-[12px]`}>Next Ovulation</h3>
                        <p className={`text-2xl font-semibold`}>{relatableDay(generalCycleInfo?.daysToOvulation)}</p>
                    </section>
                </article>

                <article
                    className={`my-10 h-[160px] carousel-items flex-shrink-0 w-42 rounded-2xl shadow-md border-2 border-[#AF52DE] p-4 flex flex-col space-between`}>
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

                {
                    !hideDailyTip && <section className={`flex justify-center items-center`}>
                        <PageFadeAnimator>
                            <article className={'bg-tertiaryColor text-white max-w-[400px] h-[140px] rounded-xl px-4 py-4'}>
                                <header className={`flex space-between items-center w-full mb-2`}>
                                    <h2 className={'flex-1 text-xl font-semibold'}>Daily Tip</h2>
                                    <span tabIndex={0} onClick={() => handleHideDailyTip()}
                                          className={'iconify lucide--x text-xl'}></span>
                                </header>
                                <p className={`font-light text-[13px]`}>
                                    Navigating your fertility path involves understanding when it&apos;s appropriate to seek
                                </p>
                                <div className={`flex justify-end mt-3`}>
                                    <Link href={"#"} className={'text-right text-sm'}>Learn more</Link>
                                </div>
                            </article>
                        </PageFadeAnimator>
                    </section>
                }
            </section>

            <InsightParent head={"Daily Insights"} desc={"Personalized health tips based on logged data"}
                           accessToken={accessToken}/>
        </section>
    )
}
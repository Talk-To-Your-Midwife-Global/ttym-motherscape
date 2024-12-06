"use client"
import Image from "next/image"
import {useState} from "react";
import {
    Calendar,
    CircularProgressBar,
    InsightParent,
    PregnancyProgressBar,
    ShortCalendar
} from "@/app/dashboard/components";
import menstrualPhase from "@/public/images/menstrual-phase.svg"
import follicularPhase from "@/public/images/follicular-phase.svg"
import ovulationPhase from "@/public/images/ovulation-phase.svg"
import lutealPhase from "@/public/images/luteal-phase.svg"
import ovulationBlue from "@/public/images/ovulation-phase-blue.svg"
import pregnancyPink from "@/public/images/pregnancy-pink.svg"
import bro from "@/public/images/pregnant/bro.svg"
import {montserrat} from "@/app/fonts";
import Link from "next/link";
import {PageFadeAnimator} from "@/app/components";
import {generateNumbers} from "@/app/dashboard/lib/functions";
import pregnantExercise from "@/public/images/pregnant/exercise.svg";
import pregnantWoman from "@/public/images/pregnant/pregnantwoman.svg";
import {usePregnancyInfo} from "@/app/dashboard/lib/dataFetching";

export function PregnantCalendarMain({accessToken}) {
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

    const {pregnancyData, pregnancyError, pregnancyLoading} = usePregnancyInfo(accessToken);
    console.log(pregnancyData)
    // const generalCycleInfo = necessaryDataForMenstrualUI(data || []);
    // const specialDates = menstrualCycleDateGenerator(data?.period_start, data?.period_length, "general", data?.cycle_length);
    // console.log(generalCycleInfo)

    // const [viewLargeCalendar, setViewLargeCalendar] = useState(false);
    const [hideDailyTip, setHideDailyTip] = useState(false);

    // const handleCalendarViewToggle = () => {
    //     setViewLargeCalendar(prevState => !prevState);
    // }

    const handleHideDailyTip = () => {
        setHideDailyTip(true);
    }

    if (pregnancyLoading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if (pregnancyError) {
        return (
            <div>
                error
                {pregnancyError.message}
            </div>
        )
    }
    return (
        <section>
            {/*{*/}
            {/*    viewLargeCalendar ?*/}
            {/*        <section>*/}
            {/*            <Calendar action={{*/}
            {/*                actionText: "Minimize Calendar",*/}
            {/*                action: handleCalendarViewToggle*/}
            {/*            }}*/}
            {/*                      accessToken={accessToken}*/}
            {/*                      specialDates={specialDates}*/}
            {/*                      withFlower={true}/>*/}
            {/*            <div className={'text-[#72777A] text-[10px] px-5 flex gap-3'}>*/}
            {/*                <span className={`flex gap-2 w-fit `}>*/}
            {/*                    <div className={'w-4 h-4 bg-[#F8CEDE] rounded-full'}> </div> <span className="w-fit">Recorded Flows</span>*/}
            {/*                </span>*/}
            {/*                <span className={`flex gap-2`}>*/}
            {/*                    <div*/}
            {/*                        className={'w-4 h-4 border border-dashed border-[#E82A73] rounded-full'}> </div> <span>Predicted Period</span>*/}
            {/*                </span>*/}
            {/*                <span className={`flex gap-2`}>*/}
            {/*                    <div className={'w-4 h-4 bg-[#DEE4F5] rounded-full'}> </div> <span>Fertile Window</span>*/}
            {/*                </span>*/}
            {/*            </div>*/}
            {/*        </section>*/}
            {/*        : <ShortCalendar action={{actionText: "View Calendar", action: handleCalendarViewToggle}}*/}
            {/*                         specialDates={specialDates} accessToken={accessToken} withFlower={true}/>*/}
            {/*}*/}
            <section className={`my-10 flex flex-col items-center justify-center`}>
                <Link href="/dashboard/me">
                    <section
                        className={`w-[340px] h-[340px] rounded-full border-2 border-primaryColor shadow-[10px_14px_106px_4px_rgba(15,150,156,0.5)] flex items-center justify-center`}>
                        <Image src={bro} alt={'baby'}/>
                    </section>
                </Link>
                <p className="text-primaryText font-bold relative my-10">
                    Your baby is in a size of: 🍏
                </p>

                <section className="mb-10 w-full flex flex-col justify-center items-center">
                    <section className=" flex justify-center gap-[35px]">
                        {Array.from(generateNumbers(pregnancyData?.week)).map((item, index) => {
                            return (
                                <span key={index}
                                      className={`.text-lg text-primaryText ${index === 3 && "bg-primaryColor text-white p-3 rounded-full w-[60px] h-[60px] flex items-center justify-center relative bottom-2 text-2xl"}`}>{item}</span>
                            )
                        })}
                    </section>
                    <p className="font-semibold text-primaryText">Current Week</p>
                </section>

                <section className="max-w-[340px] w-full">
                    <PregnancyProgressBar
                        trimester="2nd trimester"
                        weeks={pregnancyData?.week}
                        daysRemaining={pregnancyData?.countdown}
                        progress={{
                            segment1: pregnancyData?.progressBarValues.segment1,
                            segment2: pregnancyData?.progressBarValues.segment2,
                            segment3: pregnancyData?.progressBarValues.segment3,
                            circlePosition: pregnancyData?.progressBarValues.circlePosition,
                        }}
                    />
                </section>
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
                    className={`my-10 bg-[#E4F6F7] h-[160px] carousel-items flex-shrink-0 w-[200px] rounded-2xl shadow-md flex flex-col space-between`}>
                    <div className={`flex-1`}>
                        <Image src={pregnantExercise} alt={'blue image depicting ovulation'}
                               className={'w-[170px] h-[90px]'}/>
                    </div>
                    <section className={`text-primaryText p-4 w-4/4`}>
                        <h3 className={`${montserrat.className} text-[#0E0E0EB0] text-md font-medium w-5/5`}>Safe
                            Exercise
                            During Pregnancy</h3>
                    </section>
                </article>

                <article
                    className={`my-10 bg-[#FFEEA9] h-[160px] carousel-items flex-shrink-0 w-[200px] rounded-2xl shadow-md flex flex-col space-between`}>
                    <div className={`flex-1`}>
                        <Image src={pregnantWoman} alt={'blue image depicting ovulation'}
                               className={'w-[170px] h-[90px]'}/>
                    </div>
                    <section className={`text-primaryText p-4 w-4/4`}>
                        <h3 className={`${montserrat.className} text-[#0E0E0EB0] text-md font-medium w-5/5`}>Safe
                            Exercise
                            During Pregnancy</h3>
                    </section>
                </article>
            </section>
            <section>

                {
                    !hideDailyTip && <section className={`flex justify-center items-center`}>
                        <PageFadeAnimator>
                            <article className={'bg-tertiaryColor text-white max-w-[350px] h-[140px] rounded-xl px-4 py-4'}>
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
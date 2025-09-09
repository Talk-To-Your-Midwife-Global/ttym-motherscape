"use client"
import {
    MenstrualCycleCardMain, FeelingsInsightsAndEvents,
    ShortCalendar, Calendar
} from "@/app/dashboard/components";
import Image from "next/image";
import pinkFlower from "@/public/images/flowers-1.svg"
import {useCycleInfo, useUserInfo} from "@/app/dashboard/lib/dataFetching";
import {MiniLoader} from "@/app/_components";
import {Log} from "@/app/_lib/utils";
import {useState} from "react";
import {useCalendarView} from "@/app/contexts/showCalendarContext";


export function MenstrualHome({accessToken}) {
    const {user, isLoading, error} = useUserInfo(accessToken);
    const {data, error: cycleError, isLoading: cycleLoading} = useCycleInfo(accessToken);
    const [viewLargeCalendar, setViewLargeCalendar] = useState(false);
    const {viewLarge, setViewLarge} = useCalendarView();

    Log({user});
    Log({user})

    if (isLoading) return (
        <MiniLoader/>
    )

    if (error) {
        Log(error)
        return (
            <div> errorL</div>
        )
    }

    const handleCalendarViewToggle = () => {
        setViewLargeCalendar(prevState => !prevState);
    }

    return (
        <section className={"my-2"}>
            <section className={"mt-1"}>

                {
                    viewLarge ?
                        <section>
                            <Calendar
                                accessToken={accessToken}
                                specialDates={data?.dates}
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
                        : <ShortCalendar
                            specialDates={data?.dates} accessToken={accessToken} withFlower={true}/>
                }
            </section>

            <section className={"px-5 my-5 text-primaryText "}>
                <header className={"flex justify-between items-center font-bold text-xl"}>
                    <h2>Today&apos;s Update</h2>
                    <Image src={pinkFlower} alt={"Another flower"}/>
                </header>
                <MenstrualCycleCardMain accessToken={accessToken}/>
            </section>

            <FeelingsInsightsAndEvents accessToken={accessToken}/>
        </section>
    )
}
"use client"
import {
    MenstrualCycleCardMain, DashboardHeader, FeelingsInsightsAndEvents,
    ShortCalendar, PregnancyCycleCardMain, CircularProgressBar
} from "@/app/dashboard/components/index";
import Image from "next/image";
import pinkFlower from "@/public/images/flowers-1.svg"
import {usePregnancyInfo, useUserInfo} from "@/app/dashboard/lib/dataFetching";
import {MiniLoader} from "@/app/components";
import Link from "next/link";

export function PregnancyHome({data, accessToken}) {
    const {user, isLoading, error} = useUserInfo(accessToken)
    const {pregnancyData, pregnancyLoading, pregnancyError} = usePregnancyInfo(accessToken)
    console.log(pregnancyData);
    if (isLoading || pregnancyLoading) return (
        <MiniLoader/>
    )

    if (error || pregnancyError) {
        console.log(error)
        return (
            <div> errorL {error}</div>
        )
    }
    return (
        <section className={"my-2"}>
            <DashboardHeader user={user?.user}/>
            <section className={"mt-1"}>
                <ShortCalendar
                    withFlower={false}
                    specialDates={data?.calendar}
                    accessToken={accessToken}
                    action={
                        {actionText: "See Details", link: "/dashboard/calendar"}
                    }
                />
            </section>

            <section className={"px-5 mt-10 mb-10 text-primaryText "}>
                <Link href="/dashboard/calendar">
                    <CircularProgressBar percentage={pregnancyData?.percentage}>
                        <p className="relative top-5">Week</p>
                        <b className="text-primaryColor font-bold text-[80px]">{pregnancyData?.week}</b>
                        <p className={`w-[200px] text-sm text-center relative bottom-5`}> {pregnancyData?.event}</p>
                    </CircularProgressBar>
                </Link>
                <header className={"flex justify-between items-center font-bold text-xl"}>
                    <h2>Today&apos;s Update</h2>
                </header>
                <PregnancyCycleCardMain data={pregnancyData} accessToken={accessToken}/>
            </section>

            <FeelingsInsightsAndEvents accessToken={accessToken}/>
        </section>
    )
}
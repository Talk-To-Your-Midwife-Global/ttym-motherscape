"use client"
import {
    MenstrualCycleCardMain, DashboardHeader, FeelingsInsightsAndEvents,
    ShortCalendar
} from "@/app/dashboard/components/index";
import Image from "next/image";
import pinkFlower from "@/public/images/flowers-1.svg"
import {useCycleInfo, useUserInfo} from "@/app/dashboard/lib/dataFetching";
import {MiniLoader} from "@/app/_components";

export function MenstrualHome({accessToken}) {
    const {user, isLoading, error} = useUserInfo(accessToken);
    const {data, error: cycleError, isLoading: cycleLoading} = useCycleInfo(accessToken);

    console.log({user});
    if (isLoading) return (
        <MiniLoader/>
        // <div>SOmthing</div>
    )

    if (error) {
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
                    specialDates={data?.dates}
                    accessToken={accessToken}
                    action={
                        {actionText: "See Details", link: "/dashboard/calendar"}
                    }
                />
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
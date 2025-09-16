"use client"
import {
    MenstrualCycleCardMain, FeelingsInsightsAndEvents,
} from "@/app/dashboard/components";
import Image from "next/image";
import pinkFlower from "@/public/images/flowers-1.svg"
import {useUserInfo} from "@/app/dashboard/lib/dataFetching";
import {MiniLoader} from "@/app/_components";
import {Log} from "@/app/_lib/utils";
import {CombinedCalendar} from "@/app/dashboard/components/ui/CombinedCalendar";
import {RestartCalendar} from "@/app/dashboard/components/ui/RestartCalendar";


export function MenstrualHome({accessToken}) {
    const {user, isLoading, error} = useUserInfo(accessToken);

    Log({user});
    Log({user})

    if (isLoading) return (
        <MiniLoader/>
    )

    if (error) {
        Log({error})
        return (
            <div> errorL</div>
        )
    }
    return (
        <section className={"my-2"}>
            <section className={"mt-1"}>
                <CombinedCalendar accessToken={accessToken}/>
            </section>

            <section className={"px-5 my-5 text-primaryText "}>
                <header className={"flex justify-between items-center font-bold text-xl"}>
                    <h2>Today&apos;s Update</h2>
                    <Image src={pinkFlower} alt={"Another flower"}/>
                </header>
                <MenstrualCycleCardMain accessToken={accessToken}/>
            </section>

            <FeelingsInsightsAndEvents accessToken={accessToken}/>
            <RestartCalendar accessToken={accessToken}/>
        </section>
    )
}
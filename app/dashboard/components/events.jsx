import Link from "next/link";
import useSWR from "swr";
import {fetcher} from "@/app/_lib/functions";
import {montserrat} from "@/app/_fonts";
import Image from "next/image";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {SmallEmptyState} from "@/app/_components";
import React from "react";
import {useEventFetcher} from "@/app/_hooks/useContentFetcher";
import {eventsQuery} from "@/app/dashboard/hooks/graphContentFetchers";
import healthImage from "@/public/images/adobe-stock-health-image.webp";
import {ImageDisplay} from "@/app/dashboard/components/ui/ArticleCard";

export function Events({accessToken}) {
    const {data, isLoading, error} = useEventFetcher({query: eventsQuery, variables: null});

    if (error) {
        Log(error)
        return <div> Error; Could not get events </div>
    }

    if (isLoading) return <div>Loading events...</div>

    return (
        <section className={"px-5 my-10 h-[300px]"}>
            <header>
                <div className={"flex justify-between"}>
                    <h2 className={"text-primaryText font-bold text-xl"}>Upcoming Events</h2>
                </div>
                <p className={`${montserrat.className} text-subText`}>Live Health Talk events by your Global midwife</p>
            </header>
            <section className={"mt-4 flex items-center px-4 carousel overflow-x-auto scroll-smooth space-x-4 p-4"}>
                {data && data?.map(event => {
                        return (
                            <div key={event?.eventName}
                                 className="flex justify-between overflow-hidden gap-3 bg-white carousel-item rounded-2xl px-5 py-4 h-[250px]
                             flex-shrink-0 w-52">
                                <a target="_blank" rel={'noopener'} href={event?.onlineLink}
                                   className="w-[300px]">
                                    <ImageDisplay images={[event?.eventFlyer.url]} className={"w-[177px] h-[201px]"}
                                                  aspectRatio={"square"}/>
                                </a>
                            </div>
                        )
                    }
                )}

                {
                    data.length < 1 &&
                    <div>
                        <SmallEmptyState text={"No events at the moment"}/>
                    </div>
                }
            </section>
        </section>)
}
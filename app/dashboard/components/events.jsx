import Link from "next/link";
import useSWR from "swr";
import {fetcher} from "@/app/lib/functions";
import {montserrat} from "@/app/fonts";
import Image from "next/image";
import {PUBLICHOSTNAME} from "@/app/config/main";
import {SmallEmptyState} from "@/app/components";
import React from "react";

export function Events({accessToken}) {
    const {
        data, error, isLoading
    } = useSWR([`${PUBLICHOSTNAME}/events/`, accessToken], ([url, accessToken]) => fetcher(url, accessToken));

    if (error) {
        console.log(error)
        return <div> Error; Could not get events </div>
    }

    if (isLoading) return <div>Loading events...</div>

    return (
        <section className={"px-5 my-10 h-[300px]"}>
            <header>
                <div className={"flex justify-between"}>
                    <h2 className={"text-primaryText font-bold text-xl"}>Upcoming Events</h2>
                    {/*<Link href={"/"}>See More</Link> /!* TODO: use the right link*!/*/}
                </div>
                <p className={`${montserrat.className} text-subText`}>Live Health Talk events by your Global midwife</p>
            </header>
            <section className={"mt-4 flex items-center px-4 carousel  overflow-x-auto scroll-smooth space-x-4 p-4"}>
                {/* Make it a carousel TODO:Make it a carousel*/}
                {data && data?.map(event => {
                        return (
                            <div key={event.id}
                                 className="flex justify-between overflow-hidden gap-3 bg-white carousel-item rounded-2xl px-5 py-4 h-[250px]
                             flex-shrink-0 w-52">
                                <Image src={`${PUBLICHOSTNAME}${event.thumbnail}`} width={200} height={200} alt={`event`}/>
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
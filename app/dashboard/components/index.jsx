"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
    parseISO,
    formatDistance,
    differenceInDays
} from "date-fns";
import {montserrat} from "@/app/fonts";
import Link from "next/link";
import bloating from "@/public/images/bloating.png"
import category from "../../../public/icons/category.svg"
import dullBell from "../../../public/icons/notification.svg"
import searchIcon from "../../../public/icons/search-icon.svg"
import activeBell from "../../../public/icons/notification-active.svg"
import calendarIcon from "@/public/icons/calendar-three.svg"
import {relatableDay, relatableNumber} from "@/app/lib/functions";
import {bookmarkPost, unbookmarkPost} from "@/app/dashboard/actions/action";
import drip from "@/public/icons/drip.svg";
import clock from "@/public/icons/clock.svg";
import cycle from "@/public/icons/cycle.svg";
import pregnancyIcon from "@/public/icons/pregnancy.svg";
import {ActionLink} from "@/app/components";


export function DashboardNav() {
    const [hasNotifications, setHasNotifications] = useState(false)
    const [toggleSearch, setToggleSearch] = useState(false)

    return (
        <nav className={"flex items-center gap-3 mt-5"}>
            <div className={"bg-[#0F969C26] rounded-full w-fit h-fit p-4"}>
                <Image src={category} alt={"some grid icon thingy"}/>
            </div>
            <div className={`flex-1 w-1/4 `}>
                <input className={`h-10 rounded-md outline-none border px-2 ${toggleSearch ? 'block': 'hidden'} `}
                       type={"search"}/>
            </div>
            <div className={"bg-[#0F969C26] rounded-full w-fit h-fit p-4"} onClick={() => setToggleSearch(!toggleSearch)} >
                <Image src={searchIcon} alt={"Search bar icon"}/>
            </div>
            {hasNotifications ?
                <Image src={activeBell} alt={"active bell icon"}/> :
                <Image src={dullBell} alt={"bell icon with no notification"}/>
            }
        </nav>
)}

export function NavItem({children, text="default", style="", withText=true, active=false}) {
    return (
        <section className={`${montserrat.className} ${active ? 'text-primaryColor' : 'text-[#0000004D]'} ${style} w-[35px]`}>
            <Link className={"flex flex-col justify-end gap-2 items-center"} href={"/dashboard/" + text}>
                <div className={"pt-3"}>
                    {children}
                </div>

                {withText && <p className={"capitalize text-sm font-medium"}>
                    {text}
                </p>}

            </Link>
        </section>
    )
}

export function Card({head, status, children}) {
    return (
        <article className={"bg-white rounded-md w-full h-16 drop-shadow-sm border my-5 flex items-center"}>
            <div className={"flex items-center px-2"}>
                {children}
            </div>

            <div className={"flex-1 "}>
                <p> {head} </p>
                <p className={`text-[#72777A] text-sm`}>{status}</p>
            </div>
        </article>
    )
}

export const CircularProgressBar = ({children, percentage, bg = "currentColor", foreBg = "currentColor" }) => {
    const [percent, setPercent] = useState(0)
    const radius = 150;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    useEffect(() => {
        const interval = setInterval(() => {
            setPercent((prev) => {
                if (prev >= percentage) {
                    clearInterval(interval);
                    return percentage
                } else {
                    return prev + 1;
                }
            });
        }, 100)
    }, [percent])

    return (
        <div className="flex gap-3 items-center justify-center relative">
            <svg width="550" height="340" className="-rotate-90">
                <circle
                    className="text-gray-300"
                    stroke={bg}
                    strokeWidth="25"
                    fill="transparent"
                    r={radius}
                    cx="200"
                    cy="170"
                />
                <circle
                    className="text-blue-500"
                    stroke={foreBg}
                    strokeWidth="25"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx="200"
                    cy="170"
                    style={{ transition: 'stroke-dashoffset 0.1s ease' }}
                />
            </svg>
            <div className={'absolute flex flex-col items-center justify-center gap-5'}>
                {children}
            </div>
        </div>
    );
};

export function CycleCardMain({data}) {
        return (
            <section className={"mt-4"}>
                {
                    data?.stage === "Menstrual" ?
                        <>
                            <Card head={`You are currently in: ${data?.stage} Phase`}
                                  status={` Period started  days ago`}>
                                <Image src={drip} alt={"drip "}/>
                            </Card>
                            <Card head={`Period Length: ${data?.periodLength} days`}
                                  status={data?.periodLength > 5 ? 'Abnormal' : 'Normal'}>
                                <Image src={clock} alt={"drip "}/>
                            </Card>
                        </> :
                        <>
                            {/*<Card head={`Period begins: ${relatableDay(differenceInDays(data?.nextPeriodDate, new Date()))} `}*/}
                            {/*      status={` ${differenceInDays(data?.nextPeriodDate, new Date())} days to go`}>*/}
                            {/*    <Image src={drip} alt={"drip "}/>*/}
                            {/*</Card>*/}
                            <Card head={`Period begins: ${relatableDay(data?.daysToPeriod)} `}
                                  status={`${data?.daysToPeriod} days to go`}>
                                <Image src={drip} alt={"drip "}/>
                            </Card>
                            {/*<Card head={`You are currently in: ${data?.stage} Phase`}*/}
                            {/*       status={`Day ${differenceInDays(new Date(), data?.period_start)} of ${data?.cycle_length}`}>*/}
                            {/*    <Image src={clock} alt={"drip "}/>*/}
                            {/*</Card>*/}
                            <Card head={`You are currently in: ${data?.stage} Phase`}
                                  status={`Day ${data?.daysDone} of ${data?.cycleLength}`}>
                                <Image src={clock} alt={"drip "}/>
                            </Card>
                        </>

                }
                <Card head={`Cycle Length: ${data?.cycleLength} days`}
                      status={data?.cycleLength >= 26 && data?.cycleLength <= 31 ? 'Normal' : 'Abnormal'}>
                    <Image src={cycle} alt={"drip"}/>
                </Card>
                <Card head={`Pregnancy`} status={data?.stage === "Ovulation" ? "High" : 'Low'}>
                    <Image src={pregnancyIcon} alt={"drip "}/>
                </Card>
            </section>
        )


}

export function InsightCard({img, tag, heading, reads,}) {
    const [bookmarked, setBookmarked] = useState(false)

    const handlePostBookmarking = async (id) => {
        setBookmarked(prevState => !prevState)

        if (bookmarked) {
            const marked = await unbookmarkPost(id)
            setBookmarked(marked.marked)
        } else {
            const marked = await bookmarkPost(id)
            setBookmarked(marked.marked)
        }

    }
    return (
        <article className={`bg-white rounded-2xl px-5 py-4 h-[250px] drop-shadow-custom-green`}>
            <div className={`border-2 border-black rounded-full w-20 h-20 flex items-center justify-center`}>
                <Image src={bloating} alt={"image of a bloating stomach"}/>
            </div>
            <header>
                <h3 className={`${montserrat.className} text-subText text-sm uppercase my-3 font-medium`}>bloating</h3>
                <h2 className={`text-primaryText font-semibold w-full`}>What can help me stop bloating</h2>
            </header>
            <section className={`my-4 flex gap-4 items-center`}>
                <div onClick={() => {
                   handlePostBookmarking(1) // TODO: Fix this

                }} className={` ${bookmarked ? 'text-primaryColor': 'text-transparent'}`}>
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M10.7627 3.48C10.7627 1.70968 9.55237 1 7.80979 1H3.71753C2.0285 1 0.762695 1.66129 0.762695 3.36194V12.8374C0.762695 13.3045 1.26528 13.5987 1.67237 13.3703L5.77947 11.0665L9.85108 13.3665C10.2588 13.5961 10.7627 13.3019 10.7627 12.8342V3.48Z"
                              stroke="#0F969C" strokeWidth="0.965323" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.38281 5.32942H8.09249" stroke="#0F969C" strokeWidth="0.965323"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <span className={"text-sm"}> {relatableNumber(2000)} read</span>
            </section>
        </article>
    )
}

export function InsightParent({head, desc, data}) {
    return (
        <section className={"px-5 my-10 "}>
            <header>
                <div className={"flex justify-between"}>
                    <h2 className={"text-primaryText font-bold text-xl"}>{head} </h2> <Link href={"/"}>See
                    More</Link> {/* TODO: use the right link*/}
                </div>
                <p className={`${montserrat.className} text-subText`}>{desc}</p>
            </header>
            <section className={'grid grid-cols-2 gap-4 py-5'}>
                {/* TODO: Empty state ui and loop instead */}
                <InsightCard/>
                <InsightCard/>
            </section>
        </section>
    )
}

function CalendarTemplate({startWeek, endWeek, currentMonth, specialDates = [], action = {}}) {
    // const styleDates = specialDates?.map(day => ({...day, date: parseISO(day.date)}))
    console.log(specialDates)
    const days = []
    let day = startWeek;
    while (day <= endWeek) {
        days.push(day)
        day = addDays(day, 1)
    }
    return (
        <section className={`p-4 max-w-md .mx-auto text-primaryText`}>
            <div className={`flex my-5`}>
                <div className={`flex-1 flex items-center gap-2`}>
                    <Image src={calendarIcon} alt={`Calendar icon`}/>
                    <h2> {format(currentMonth, "MMMM yyyy")} </h2>
                </div>
                <div>
                    {/*<Link href={`/dashboard/calendar`} className={`text-primaryColor`}> See Details</Link>*/}
                    <ActionLink text={action?.actionText} href={action?.link} onClick={action?.action}  />
                </div>
            </div>
            <div className={`grid grid-cols-7 gap-2`}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayName, index) => (
                    <div key={index} className={`text-center text-[#6C7072] text-sm`}>
                        {dayName}
                    </div>
                ))}
                {
                    days.map((day, index) => {
                        const isCurrentMonth = isSameMonth(day, currentMonth)
                        const customStyle = specialDates.find((styleDate) => isSameDay(styleDate.date, day))?.style

                        return (
                            <div key={index} className={`p-2 text-center rounded-full
                                ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                                ${customStyle && customStyle}
                            `}>
                                {format(day, 'd')}
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export function ShortCalendar({specialDates, action}) {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const startWeek = startOfWeek(new Date())
    const endWeek = endOfWeek(new Date())

    return (
        <div>
            <CalendarTemplate startWeek={startWeek} endWeek={endWeek} currentMonth={currentMonth} specialDates={specialDates} action={action}/>
        </div>
    )
}

export function Calendar({specialDates, action}) {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const startMonth = startOfMonth(currentMonth)
    const endMonth = endOfMonth(currentMonth)
    const startWeek = startOfWeek(startMonth)
    const endWeek = endOfWeek(endMonth)

    return (
        <div>
            <CalendarTemplate startWeek={startWeek} endWeek={endWeek} currentMonth={currentMonth} specialDates={specialDates} action={action}/>
        </div>
    )
}
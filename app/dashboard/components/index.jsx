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
} from "date-fns";
import {montserrat} from "@/app/fonts";
import Link from "next/link";
import bloating from "@/public/images/bloating.png"
import category from "@/public/icons/category.svg"
import dullBell from "@/public/icons/notification.svg"
import searchIcon from "@/public/icons/search-icon.svg"
import activeBell from "@/public/icons/notification-active.svg"
import calendarIcon from "@/public/icons/calendar-three.svg"
import nameFlower from "@/public/images/name-flower.svg"
import {
    menstrualCycleDateGenerator,
    necessaryDataForMenstrualUI,
    relatableDay,
    relatableNumber
} from "@/app/lib/functions";
import {bookmarkPost, unbookmarkPost} from "@/app/dashboard/actions/action";
import drip from "@/public/icons/drip.svg";
import clock from "@/public/icons/clock.svg";
import cycle from "@/public/icons/cycle.svg";
import pregnancyIcon from "@/public/icons/pregnancy.svg";
import sarah from "@/public/images/sarah.png"
import {ActionLink} from "@/app/components";
import {useCycleInfo} from "@/app/dashboard/lib/functions";


export function DashboardNav({text=""}) {
    const [hasNotifications, setHasNotifications] = useState(false)
    const [toggleSearch, setToggleSearch] = useState(false)

    return (
        <nav className={"flex items-center gap-3 mt-5"}>
            <div className={"bg-[#0F969C26] rounded-full w-fit h-fit p-4"}>
                <Image src={category} alt={"some grid icon thingy"}/>
            </div>
            {
                text.length === 0 ?
                <section className={`flex-1 w-2/4 flex justify-end`}>
                    <div className={`flex-1 w-1/4`}>
                        <input className={`h-10 rounded-md outline-none border px-2 ${toggleSearch ? 'block': 'hidden'} `}
                               type={"search"}/>
                    </div>
                    <div className={"bg-[#0F969C26] rounded-full w-fit h-fit p-4"} onClick={() => setToggleSearch(!toggleSearch)} >
                        <Image src={searchIcon} alt={"Search bar icon"}/>
                    </div>
                </section> :  <div className={`flex-1 text-center font-semibold text-xl text-[#000]`}> {text} </div>
            }
            <div className={`bg-[#0F969C26] rounded-full w-[50px] h-[50px] p-4 flex items-center justify-center`}>
                {hasNotifications ?
                    <Image src={activeBell} alt={"active bell icon"}/> :
                    <Image src={dullBell} alt={"bell icon with no notification"}/>
                }
            </div>
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

export function CycleCardMain({accessToken}) {
    const {data, error, isLoading} = useCycleInfo(accessToken);

    const generalCycleInfo = necessaryDataForMenstrualUI(data || []);

    if (isLoading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if(error) {
        return (
            <div>
                error
                {error.message}
            </div>
        )
    }
        return (
            <section className={"mt-4"}>
                {
                    generalCycleInfo?.stage === "Menstrual" ?
                        <>
                            <Card head={`You are currently in: ${generalCycleInfo?.stage} Phase`}
                                  status={` Period started  days ago`}>
                                <Image src={drip} alt={"drip "}/>
                            </Card>
                            <Card head={`Period Length: ${generalCycleInfo?.periodLength} days`}
                                  status={generalCycleInfo?.periodLength > 5 ? 'Abnormal' : 'Normal'}>
                                <Image src={clock} alt={"drip "}/>
                            </Card>
                        </> :
                        <>
                            <Card head={`Period begins: ${relatableDay(generalCycleInfo?.daysToPeriod)} `}
                                  status={`${generalCycleInfo?.daysToPeriod} days to go`}>
                                <Image src={drip} alt={"drip "}/>
                            </Card>
                            <Card head={`You are currently in: ${generalCycleInfo?.stage} Phase`}
                                  status={`Day ${generalCycleInfo?.daysDone} of ${generalCycleInfo?.cycleLength}`}>
                                <Image src={clock} alt={"drip "}/>
                            </Card>
                        </>

                }
                <Card head={`Cycle Length: ${generalCycleInfo?.cycleLength} days`}
                      status={generalCycleInfo?.cycleLength >= 26 && generalCycleInfo?.cycleLength <= 31 ? 'Normal' : 'Abnormal'}>
                    <Image src={cycle} alt={"drip"}/>
                </Card>
                <Card head={`Pregnancy`} status={generalCycleInfo?.stage === "Ovulation" ? "High" : 'Low'}>
                    <Image src={pregnancyIcon} alt={"drip "}/>
                </Card>
            </section>
        )
}

export function InsightCard({insight, accessToken}) {
    const [bookmarked, setBookmarked] = useState(false)

    const handlePostBookmarking = async (id) => {
        setBookmarked(prevState => !prevState)
        if (bookmarked) {
            const marked = await unbookmarkPost(id, accessToken)
            setBookmarked(marked.marked)
        } else {
            const marked = await bookmarkPost(id, accessToken)
            setBookmarked(marked.marked)
        }

    }
    return (
        <article className={`bg-white carousel-item rounded-2xl px-5 py-4 h-[250px] flex-shrink-0 w-48 drop-shadow-custom-green`}>
            <div className={`border-2 border-black rounded-full w-20 h-20 flex items-center justify-center`}>
                <Image src={`http://${process.env.NEXT_PUBLIC_HOSTNAME}:8000${insight?.image}`} width={200} height={200} alt={"image of a bloating stomach"}/>
            </div>
            <header>
                <h3 className={`${montserrat.className} text-subText text-sm uppercase my-3 font-medium`}>{insight?.tags[0].name}</h3>
                <h2 className={`text-primaryText font-semibold w-full`}> {insight?.title} </h2>
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
                <span className={"text-sm"}>{relatableNumber(Number(insight?.reads))} reads</span>
            </section>
        </article>
    )
}

export function ChatCard() {
    return (
        <section className={`w-full grid gap-2 grid-cols-3`}>
            <Image src={sarah} alt={"user profile image"} />
            <div className={`flex`}>

                {/* number of unread messages in the chat */}
                <div>
                    <span className={`bg-red-600 text-white text-center p-2 w-3 h-3 rounded-full`}>3</span>
                </div>
            </div>
            <div></div>
        </section>
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
            <section className={'`carousel flex overflow-x-auto scroll-smooth space-x-4 p-4'}>
                {/* TODO: Empty state ui and loop instead */}
                <InsightCard/>
                <InsightCard/>
            </section>
        </section>
    )
}

function CalendarTemplate({startWeek, endWeek, currentMonth, specialDates = [], action = {}}, withFlower = true) {
    const days = []
    let day = startWeek;
    while (day <= endWeek) {
        days.push(day)
        day = addDays(day, 1)
    }
    return (
        <section className={`p-4 max-w-md text-primaryText`}>
            <div className={`flex mb-5`}>
                <div className={`flex-1 flex items-center gap-2`}>
                    <Image src={calendarIcon} alt={`Calendar icon`}/>
                    <h2> {format(currentMonth, "MMMM yyyy")} </h2>
                    {withFlower && <Image src={nameFlower} alt={'pink flower'} />}
                </div>
                <div>
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

export function ShortCalendar({action, withFlower, accessToken}) {
    // const [dates, setDates] = useState([])
    const {data, error, isLoading} = useCycleInfo(accessToken);
    // console.log('short calendar')
    // console.log(data)
    const specialDates =  menstrualCycleDateGenerator(data?.period_start, data?.period_length, "general", data?.cycle_length);
    // console.log(otherData)

    const [currentMonth, setCurrentMonth] = useState(new Date())
    const startWeek = startOfWeek(new Date())
    const endWeek = endOfWeek(new Date())

    if (isLoading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if(error) {
        return (
            <div>
                error
                {error.message}
            </div>
        )
    }
    return (
        <div>
            <CalendarTemplate startWeek={startWeek} endWeek={endWeek} currentMonth={currentMonth} specialDates={specialDates} action={action} withFlower={withFlower} />
        </div>
    )
}

export function Calendar({action, withFlower, accessToken}) {
    const {data, error, isLoading} = useCycleInfo(accessToken);
    // console.log('short calendar')
    // console.log(data)
    const specialDates = menstrualCycleDateGenerator(data?.period_start, data?.period_length, "general", data?.cycle_length);
    // console.log(otherData)

    const [currentMonth, setCurrentMonth] = useState(new Date())
    const startMonth = startOfMonth(currentMonth)
    const endMonth = endOfMonth(currentMonth)
    const startWeek = startOfWeek(startMonth)
    const endWeek = endOfWeek(endMonth)

    if (isLoading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if(error) {
        return (
            <div>
                error
                {error.message}
            </div>
        )
    }

    return (
        <div>
            <CalendarTemplate startWeek={startWeek} endWeek={endWeek} currentMonth={currentMonth} specialDates={specialDates} action={action} withFlower={withFlower}/>
        </div>
    )
}


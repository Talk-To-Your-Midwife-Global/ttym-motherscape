"use client"
import Image from "next/image";
import {useState} from "react";
import {format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO} from "date-fns";
import {montserrat} from "@/app/fonts";
import Link from "next/link";
import bloating from "@/public/images/bloating.png"
import category from "../../../public/icons/category.svg"
import dullBell from "../../../public/icons/notification.svg"
import searchIcon from "../../../public/icons/search-icon.svg"
import activeBell from "../../../public/icons/notification-active.svg"
import calendarIcon from "@/public/icons/calendar-three.svg"
import {relatableNumber} from "@/app/lib/functions";
import {bookmarkPost, unbookmarkPost} from "@/app/dashboard/actions/action";


export function DashboardNav() {
    const [hasNotifications, setHasNotifications] = useState(false)
    const [toggleSearch, setToggleSearch] = useState(false)

    return (
        <nav className={"flex items-center gap-3 my-5"}>
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
        <aricle className={"bg-white rounded-md w-full h-16 shadow-md border my-5 flex items-center"}>
            <div className={"flex items-center px-2"}>
                {children}
            </div>

            <div className={"flex-1 "}>
                <p> You are currently in: Menstrual Phase </p>
                <p className={`text-[#72777A] text-sm`}>Period started 2 days ago</p>
            </div>
        </aricle>
    )
}

export function InsightCard({img, tag, heading, reads, }) {
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
                <Image src={bloating} alt={"image of a bloating stomach"} />
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

function CalendarTemplate({startWeek, endWeek, currentMonth, specialDates=[], isShort=true}) {
    const styleDates = specialDates?.map(day => ({...day, date: parseISO(day.date)}))

    const days = []
    let day = startWeek;
    while (day <= endWeek) {
        days.push(day)
        day = addDays(day, 1)
    }
    return (
        <section className={`p-4 max-w-md .mx-auto text-primaryText`}>
            <div className={`flex my-5`}>
                <div className={`flex-1 flex gap-2`}>
                    <Image src={calendarIcon} alt={`Calendar icon`} />
                    <h2> {format(currentMonth, "MMMM yyyy")} </h2>
                </div>
                <div>
                    <Link href={`/dashboard/calendar`} className={`text-primaryColor`}> See Details</Link>
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
                        const customStyle = styleDates.find((styleDate) => isSameDay(styleDate.date, day))?.style

                        return (
                            <div key={index} className={`p-2 text-center rounded-full
                                ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                                ${customStyle ? customStyle : 'bg-gray-100'}
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

export function ShortCalendar({specialDates}) {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const startWeek = startOfWeek(new Date())
    const endWeek = endOfWeek(new Date())
    const specialDatess = [
        { date: '2024-11-14', style: 'bg-pink rounded-2xl text-green-900' },
        { date: '2024-11-15', style: 'bg-pink text-yellow-900' },
        { date: '2024-11-16', style: 'bg-pink text-red-900' },
    ]
    return (
        <div>
            <CalendarTemplate startWeek={startWeek} endWeek={endWeek} currentMonth={currentMonth} specialDates={specialDatess}/>
        </div>
    )
}

export function Calendar({specialDates}) {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const specialDatess = [
        { date: '2024-11-20', style: 'bg-green-300 text-green-900' },
        { date: '2024-11-25', style: 'bg-yellow-300 text-yellow-900' },
        { date: '2024-11-30', style: 'bg-red-300 text-red-900' },
    ]

    const startMonth = startOfMonth(currentMonth)
    const endMonth = endOfMonth(currentMonth)
    const startWeek = startOfWeek(startMonth)
    const endWeek = endOfWeek(endMonth)

    return (
        <div>
            <CalendarTemplate startWeek={startWeek} endWeek={endWeek} currentMonth={currentMonth} specialDates={specialDatess}/>
        </div>
    )
}
"use client"
import category from "../../../public/icons/category.svg"
import dullBell from "../../../public/icons/notification.svg"
import searchIcon from "../../../public/icons/search-icon.svg"
import activeBell from "../../../public/icons/notification-active.svg"
import Image from "next/image";
import {useState} from "react";
import {montserrat} from "@/app/fonts";
import Link from "next/link";


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
        <section className={"bg-white rounded-md w-full h-16 shadow-sm border flex"}>
            <div className={"flex items-center px-2"}>
                {children}
            </div>

            <div className={"flex-1"}>
                <p></p>
            </div>

        </section>
    )
}
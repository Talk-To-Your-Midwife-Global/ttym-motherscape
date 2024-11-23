"use client"
import * as React from "react";
import {motion} from "framer-motion";
import Image from "next/image"
import {MenuItem} from "@/app/dashboard/components/menuItem";
import profileIcon from "@/public/icons/profile.svg"
import notificationBellIcon from "@/public/icons/dashnotification.svg"
import padLockIcon from "@/public/icons/dashlock.svg"
import docIcon from "@/public/icons/green-log.svg"
import inviteUserIcon from "@/public/icons/add-user.svg"
import infoIcon from "@/public/icons/info-port.svg"
import sarah from "@/public/images/sarah.png"
import logout from "@/public/icons/logout.svg"
import {useUserInfo} from "@/app/dashboard/lib/functions";
import {montserrat} from "@/app/fonts";

const variants = {
    open: {
        display: "flex",
        transition: {staggerChildren: 0.07, delayChildren: 0.2}
    },
    closed: {
        display: "none",
        transition: {staggerChildren: 0.05, staggerDirection: -1}
    }
};

export function Navigation({accessToken}) {
    console.log(accessToken)
    const {user, isLoading, error} = useUserInfo(accessToken);
    console.log(user)
    if (isLoading) {
        return <p>Loading</p>
    }

    return (
        <motion.ul className={'ul'} variants={variants}>
            <MenuItem>
                <section className={`flex gap-3 relative bottom-10`}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Image src={sarah} alt={"your profile image"} width={80} height={30}/>
                    <div>
                        <h2 className={`text-primaryColor text-xl font-medium w-[160px]`}>{user?.user.full_name}</h2>
                        <p className={`text-subText text-sm ${montserrat.className}`}>{user?.user.email}</p>
                    </div>
                </section>
            </MenuItem>
            {itemIds.map(i => (
                <MenuItem i={i} key={i.id}/>
            ))}

            <MenuItem>
                <section
                    className={`flex items-center gap-2 relative -bottom-10 text-primaryText bg-white shadow-md w-full p-2 rounded-md`}>
                    <Image src={logout} alt={"logout icon"}/>
                    <div className={`w-[200px]`}>
                        <p className={`font-medium text-sm`}>Logout</p>
                    </div>
                    <div>
                        <span className={`iconify lucide--chevron-right 2xl text-primaryColor`}></span>
                    </div>
                </section>
            </MenuItem>
        </motion.ul>)
}

const itemIds = [
    {id: 0, icon: profileIcon, text: "Personal Information", subText: "Your account information", link: "/dashboard"},
    {
        id: 1,
        icon: notificationBellIcon,
        text: "Notifications & Chat",
        subText: "Chat and notifications settings",
        link: "/dashboard"
    },
    {
        id: 2,
        icon: padLockIcon,
        text: "Privacy & Permissions",
        subText: "Contact, My Album and Block Contact",
        link: "/dashboard"
    },
    {id: 3, icon: docIcon, text: "About", subText: "version 1.0.0", link: "/dashboard"},
    {id: 4, icon: inviteUserIcon, text: "Invite a Friend", subText: "invite a friend to this app", link: "/dashboard"},
    {id: 5, icon: infoIcon, text: "Help", subText: "Get your FAQs answers here", link: "/dashboard"},

];

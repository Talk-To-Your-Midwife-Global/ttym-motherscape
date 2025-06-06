"use client"
import * as React from "react";
import {motion} from "framer-motion";
import Image from "next/image"
import {logout} from "@/app/_actions/auth";
import {MenuItem} from "@/app/dashboard/components/menuItem";
import profileIcon from "@/public/icons/profile.svg"
import notificationBellIcon from "@/public/icons/dashnotification.svg"
import padLockIcon from "@/public/icons/dashlock.svg"
import docIcon from "@/public/icons/green-log.svg"
import inviteUserIcon from "@/public/icons/add-user.svg"
import infoIcon from "@/public/icons/info-port.svg"
import logoutIcon from "@/public/icons/logout.svg"
import {useUserInfo} from "@/app/dashboard/lib/dataFetching";
import {montserrat} from "@/app/_fonts";
import {ProfileImage} from "@/app/_components/ProfileImage";


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

const itemIds = [
    {
        id: 0,
        icon: profileIcon,
        text: "Personal Information",
        subText: "Your account information",
        link: "/profile"
    },
    {
        id: 1,
        icon: notificationBellIcon,
        text: "Notifications & Chat",
        subText: "Chat and notifications settings",
        link: "/notification-settings"
    },
    {
        id: 2,
        icon: padLockIcon,
        text: "Privacy & Permissions",
        subText: "Contact, My Album and Block Contact",
        link: "/data-and-privacy"
    },
    {id: 3, icon: docIcon, text: "About", subText: "version 1.0.0", link: "/about"},
    {id: 4, icon: inviteUserIcon, text: "Invite a Friend", subText: "invite a friend to this app", link: "/dashboard"},
    {id: 5, icon: infoIcon, text: "Help", subText: "Get your FAQs answers here", link: "/dashboard"},
];


export function Navigation({accessToken}) {
    console.log(accessToken)
    const {user, isLoading, error} = useUserInfo(accessToken);
    console.log({user})

    if (isLoading) {
        return <p>Loading</p>
    }

    if (error) {
        console.log(error)
        return <p> Error {error.message} </p>
    }

    return (
        <motion.ul className={'ul bg-white z-20'} variants={variants}>
            <MenuItem>
                <section className={`flex gap-3 relative bottom-10`}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <ProfileImage userProfileInfo={user}/>
                    <div>
                        <h2 className={`text-primaryColor text-xl font-medium w-[160px]`}>{user?.user.full_name}</h2>
                        <p className={`text-subText text-sm ${montserrat.className}`}>{user?.user.email}</p>
                    </div>
                </section>
            </MenuItem>
            {itemIds.map(i => (
                <MenuItem i={i} key={i.id} link={i.link}/>
            ))}

            <MenuItem link={'/logout'}>
                <section
                    className={`flex items-center gap-2 relative -bottom-10 text-primaryText bg-white shadow-md w-full p-2 rounded-md`}>
                    <Image src={logoutIcon} alt={"logout icon"}/>
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


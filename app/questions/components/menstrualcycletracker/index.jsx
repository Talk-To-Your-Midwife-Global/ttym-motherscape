"use client"
import {useEffect, useState} from "react"
import {useTransition} from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import {inter} from "@/app/_fonts";
import Link from "next/link"
import {PageSlideAnimator} from "@/app/_components";
import {IconButton} from "@/app/_components";
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import {SlidePickerWheel} from "@/app/onboarding/_components/SlidePickerWheel";
import {OnboardHeading} from "@/app/onboarding/_components/OnboardHeading";


function ProgressIndicator({target = 0, total = 7}) {
    console.log({target, total});
    const progress = (target / total) * 100;
    return (
        <div className="flex space-x-2 px-[20px]">
            {/*// TODO: Remove this*/}
            {/*{Array.from({length: total}).map((_, index) => (*/}
            {/*    <div*/}
            {/*        key={index}*/}
            {/*        className={`flex-1 rounded-full h-2 ${target > 0 && index < target ? 'bg-primaryColor' : 'bg-[#E4E4E4]'}`}*/}
            {/*    />*/}
            {/*))}*/}
            <div className="h-2 rounded-md w-[300px] bg-[#D9D9D9] .dark:bg-neutral-600">
                <div className="h-2 rounded-md bg-[#E82A73] max-w-[300px]" style={{width: `${progress}%`}}></div>
            </div>
        </div>
    );
}

export function QuestionNav({url, question, icon = "lucide--chevron-left",}) {
    return (
        <nav className="px-[10px] flex justify-between items-center my-5 text-mainText">
            <motion.div
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                className={`div`}
            >
                <Link href={url} className=".bg-[#16898E1A] w-12 h-12 rounded-full flex justify-center items-center">
                    <span className={`iconify ${icon} text-2xl`}></span>
                </Link>
            </motion.div>
            <ProgressIndicator target={question} total={8}/>
            {/*TODO: Delete this*/}
            {/*{!last ? <Link href='/onboarding/' className="text-mainText font-medium"><span*/}
            {/*    className="iconify lucide--x text-2xl relative top-1"></span></Link> : ''}*/}

        </nav>
    )
}

function QuestionHead({text, desc = ""}) {
    return (
        <header
            className="text-black text-center flex flex-col items-center justify-center  my-0 px-[20px] ">
            <h2 className="text-2xl font-medium"> {text} </h2>
            <p className={'text-[16px]'}>{desc}</p>
        </header>
    )
}

// TODO: Potentailly remove this; confrim with Bayaan first
function NotificationPreferences({handleAnswers, submit, state}) {
    const [disableBtn, setDisableButton] = useState(true)

    const handleChange = (event) => {
        const {name, value} = event.target
        if (name === 'notificationPreference') {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
        handleAnswers({...state, [name]: value})
    }
    return (
        <section className={`${inter.className} h-svh overflow-hidden`}>
            <QuestionHead text="Notification Preferences"/>
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-5">
                    <label htmlFor="cycle-info" className="font-medium">Would you like reminders before your period
                        starts? If yes, how many days before?</label>

                    <div className="grid">
                        <svg
                            className="pointer-events-none z-10 right-1 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden"
                            viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                  clipRule="evenodd"></path>
                        </svg>
                        <select defaultValue=""
                                className="w-full h-11 appearance-none forced-colors:appearance-auto row-start-1 col-start-1 rounded-lg bg-slate-50 hover:border-primaryColor hover:bg-white border-2 text-[#808080] px-2 outline-none"
                                name="notificationPreference" onChange={handleChange}>
                            <option value="" hidden disabled>eg. 1 day</option>
                            <option value="1">1 day</option>
                            <option value="2">2 days</option>
                            <option value="3">3 days</option>
                            <option value="5">5 days</option>
                        </select>
                    </div>
                </div>
            </form>
            <div className="relative -bottom-[35%] w-full flex justify-center">
                <IconButton onClick={submit} text="Continue" icon="iconify lucide--arrow-right" disabled={disableBtn}
                />
            </div>
        </section>
    )
}
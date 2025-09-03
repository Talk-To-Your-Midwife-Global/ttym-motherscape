"use client"
import {motion} from "framer-motion";
import Link from "next/link"
import "react-day-picker/style.css";
import {Log} from "@/app/_lib/utils";

function ProgressIndicator({target = 0, total = 7}) {
    Log(target, total)
    const progress = (target / total) * 100;
    return (
        <div className="flex space-x-2 px-[20px]">
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
            <ProgressIndicator target={question} total={7}/>

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


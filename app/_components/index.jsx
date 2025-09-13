"use client"
import {useState} from 'react'
import Image from "next/image";
import Link from "next/link";
import EmptyPageClip from "@/public/images/empty-articles.svg";
import {motion, AnimatePresence} from "framer-motion"
import {useFormStatus} from "react-dom";
import {cn, Log} from "@/app/_lib/utils";
import {Spinner} from "@/app/_components/Spinner";

const pageTransitionVariants = {
    hidden: {opacity: 0, x: 100},
    enter: {opacity: 1, x: 0},
    exit: {opacity: 0, x: -100},
};

const fadeVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
    exit: {opacity: 0},
};

export function PageFadeAnimator({children}) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={children?.key}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariants}
                transition={{duration: 0.5}}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export function PageSlideAnimator({children}) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={children?.key}
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={pageTransitionVariants}
                transition={{type: 'tween', ease: 'easeInOut', duration: 0.5}}
                className="page-container"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export function Loader() {
    return (
        <section
            className="bg-foreground text-background flex flex-col h-svh w-screen items-center .justify-center p-[20px] relative">
            <div className="flex-1 flex justify-center">
                <Image src="/icons/Obaa-logo-Horizontal.svg" alt="logo" width={200} height={200}/>
            </div>
        </section>
    );
}

export function Button({
                           text = "Button",
                           variant = "primary",
                           type = "link",
                           href = "/",
                           disabled = false,
                           isPendingText = "processing..."
                       }) {
    const {pending} = useFormStatus();
    return (
        <button disabled={disabled || pending}
                className={cn(`${variant === "primary" && disabled ? "bg-[#A8CCD0] text-white" : "bg-primaryColor text-white .border .border-secondary"} w-[273px] h-[48px] rounded-[40px] flex items-center justify-center gap-2`, variant === 'secondary' && 'bg-white border border-primaryColor text-primaryColor font-semibold')}>
            {!pending ? text : isPendingText}
        </button>
    )
}

export function MiniLoader() {
    return (
        <section className={`w-full text-primaryText rounded-xl p-4 flex flex-col items-center justify-center`}>
            <Image src="/icons/logo-colored.svg" alt="logo" width={120} height={100}/>
            <p>Loading...</p>
        </section>
    )
}

export function IconButton({
                               text = "Button",
                               icon = "",
                               variant = "primary",
                               type = "link",
                               href = " ",
                               disabled = false,
                               onClick = undefined,
                               loadingText = 'loading',
                               customStyles = "",
                               isPending = false
                           }) {
    const [pending, setPending] = useState(false);
    const handleClick = () => {
        setPending(true)
        if (onClick) {
            onClick();
            setPending(false);
        }
        // reset pending control to the isPending attribute
        if (pending || isPending) {
            setPending(false);
        }

        Log("index.jsx IconButton", {pending})
    }
    if (type === "link") {
        return (
            <Link href={href ? href : undefined}>
                <button tabIndex={0} type={type === 'submit' ? 'submit' : "button"} onClick={() => handleClick()}
                        disabled={disabled}
                        className={cn('mb-2', `${variant === "primary" && disabled ? "bg-[#A8CCD0] text-white" : "bg-primaryColor text-white border border-primaryColor "} transition-all duration-500 ease-in-out  w-[273px] h-[48px] rounded-[40px] flex items-center justify-center gap-2 ${pending || isPending && 'w-[fit] h-fit py-4 px-4'}`, variant === 'secondary' && 'bg-white border border-primaryColor text-primaryColor font-semibold', customStyles)}>
                    {pending || isPending ? <> <Spinner/> <p>{loadingText}</p></> :
                        <>
                            {text}
                            <span className={icon}></span>
                        </>
                    }
                </button>
            </Link>
        )
    } else {
        return (
            <button tabIndex={0} type={type === 'submit' ? 'submit' : "button"} onClick={() => handleClick()}
                    disabled={disabled}
                    className={cn('mb-2', `${variant === "primary" && disabled ? "bg-[#A8CCD0] text-white" : "bg-primaryColor text-white border border-primaryColor "} transition-all duration-500 ease-in-out  w-[273px] h-[48px] rounded-[40px] flex items-center justify-center gap-2 ${pending || isPending && 'w-[fit] h-fit py-4 px-4'}`, variant === 'secondary' && 'bg-white border border-primaryColor text-primaryColor font-semibold', customStyles)}>
                {isPending ? <> <Spinner/> <p>{loadingText}</p></> :
                    <>
                        {text}
                        <span className={icon}></span>
                    </>
                }
            </button>
        )
    }
}


export function ActionLink({
                               text = "Button",
                               icon = "",
                               variant = "primary",
                               type = "link",
                               href = " ",
                               disabled = false,
                               onClick = undefined
                           }) {
    return (
        <Link href={href ? href : undefined}>
            {onClick && <button onClick={onClick ? () => onClick() : undefined} disabled={disabled}
                                className={`${variant === "primary" && disabled ? "bg-[#A8CCD0] text-white" : " text-primaryColor "} .w-[273px] h-[48px] flex items-center justify-center gap-2`}>
                {text} <span className={icon}></span>
            </button>}
        </Link>
    )
}

export function SmallEmptyState({text}) {
    return (
        <section className={'flex flex-col gap-2 justify-center items-center w-[350px] h-full'}>
            <div>
                <Image src={EmptyPageClip} alt={"Empty coach cards"} className={`relative right-5`}/>
            </div>
            <p className={`text-primaryText font-medium `}>{text}</p>
        </section>
    )
}
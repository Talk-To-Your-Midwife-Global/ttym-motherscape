"use client"
import Image from "next/image";
import {useRouter} from "next/navigation";
import logo from "@/public/icons/wordmark-colored.svg"
import {useEffect, useState} from "react";
import {montserrat} from "@/app/fonts";

export default function Page() {
    const router = useRouter();
    const [message, setMessage] = useState(0);
    const [allMessagesDisplayed, setAllMessagesDisplayed] = useState(false);
    const messages = ["Loading", "Analyzing data", "Setting up your dashboard", "Adding finishing touches"]

    useEffect(() => {
        if (message < messages.length) {
            const timer = setTimeout(() => {
                setMessage(prevState => prevState + 1);
            }, 1000)

            return () => {
                clearTimeout(timer)
            }
        } else {
            setAllMessagesDisplayed(true)
        }
    }, [message]);

    useEffect(() => {
        if (allMessagesDisplayed) {
            router.push('dashboard/me')
        }
    }, [allMessagesDisplayed])

    return (
        <section className={".my-3 bg-primaryColor w-screen h-svh flex flex-col items-center justify-center"}>
            <Image src={logo} alt="Logo"/>
            <p className={`text-white my-3 ${montserrat.className} text-sm`}>{messages[message]}...</p>
        </section>
    )
}
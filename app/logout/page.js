"use client"
import {useEffect} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {logout} from "@/app/actions/auth";
import Logo from "@/public/icons/logo-svg.svg"
import {montserrat} from "@/app/fonts";

export default function Page() {
    const router = useRouter()
    useEffect(() => {
        async function LogOut() {
            const response = await logout()
            console.log(response)
        }

        LogOut()
        router.push("/")
    }, [])

    return (
        <section className={`flex items-center justify-center w-full h-svh`}>
            <div className={`flex flex-col gap-3 justify-center items-center`}>
                <Image src={Logo} width={200} height={200} aspectRatio="cover"/>
                <p className={`text-primaryText ${montserrat.className} text-sm`}>Successfully logged out</p>
            </div>
        </section>
    )
}
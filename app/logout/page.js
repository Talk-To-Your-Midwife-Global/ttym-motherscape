"use client"
import {useEffect} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {logout} from "@/app/_actions/auth";
import Logo from "@/public/icons/ObaaLogo-HorizontalC.png"
import {montserrat} from "@/app/_fonts";
import {Log} from "@/app/_lib/utils";
import posthog from "posthog-js";

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        async function LogOut() {
            const response = await logout()
            Log("Logout Page.jsx", {response});
            if (response?.success) {
                localStorage.removeItem("chatDisplay");
                localStorage.removeItem('answers');
                localStorage.clear();
                router.push("/")
            } else {
                posthog.captureException(`logout/page.js ${response?.error}`)
                router.push("/")
            }
        }

        LogOut()
    }, [])

    return (
        <section className={`flex items-center justify-center w-full h-svh`}>
            <div className={`flex flex-col gap-3 justify-center items-center`}>
                <Image src={Logo} width={200} height={200} alt={"TTYM logo"} priority={true}/>
                <p className={`text-primaryText ${montserrat.className} text-sm`}>Logging out...</p>
            </div>
        </section>
    )
}
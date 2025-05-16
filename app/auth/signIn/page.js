"use client"
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useActionState, useState, useEffect} from 'react'

import {signin} from "@/app/actions/auth";
import {SignInForm} from "@/app/auth/components/SignInForm";
import pregnantLogo from "../../../public/images/ttym-rounded-logo.svg"

export default function Page() {
    const [state, action] = useActionState(signin, undefined)
    const [userRoute, setUserRoute] = useState('');
    const [error, setError] = useState([]);
    const [domain, setDomain] = useState("");
    const router = useRouter()

    const getUserRouteFromLocalStorage = () => {
        return localStorage.getItem('userType')
    }

    useEffect(() => {
        setUserRoute(getUserRouteFromLocalStorage())
        if (window) {
            setDomain(window.location.hostname);
        }
        if (state?.success) {
            router.push(`${domain}` + state?.route)
        } else if (state?.success === false) {
            // console.log('Error routing stage', state?.error)
            setError([...state?.error])
        }
    }, [state?.success])

    return (
        <section>
            <header>
                <nav className="my-5">
                    {/*TODO:change this route*/}
                    <Link href={`/onboarding/${userRoute}/3`} className="w-12 h-12 rounded-full flex justify-center
                    items-center">
                        <span className="iconify material-symbols-light--chevron-left-rounded font-medium text-3xl
                        text-[#000]"></span>
                    </Link>
                </nav>

                <section className="flex flex-col gap-4 items-center mb-10">
                    <Image src={pregnantLogo} alt="pregnant woman"/>
                    <h2 className="text-mainText text-xl font-semibold">Welcome back</h2>
                    <p className="text-subText font-medium">Sign in to be able to access your page</p>
                </section>
                {error.length > 0 ?
                    <div className=" flex items-center gap-1 px-6">
                        <span className={`iconify lucide--info text-red-500`}></span>
                        {error?.map((err, index) => <p key={index} className={`text-red-500`}>{err}</p>)}
                    </div>
                    : ""}
            </header>
            <SignInForm action={action} state={state}/>
        </section>
    )
}
"use client"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {useActionState, useState, useEffect} from 'react'

import { signin } from "@/app/actions/auth";
import { SignInForm } from "../components";
import pregnantLogo from "../../../public/images/ttym-rounded-logo.svg"

export default function Page() {
    const [state, action] = useActionState(signin, undefined)
    const [userRoute, setUserRoute] = useState('');
    const router = useRouter()
    if (state?.success) {
        router.push('/questions')
    }

    const getUserRouteFromLocalStorage = () => {
        JSON.parse(localStorage.getItem('userType'))
    }

    useEffect(() => {
        setUserRoute(getUserRouteFromLocalStorage())
    }, [])

    return (
        <section>
            <header>
                <nav className="my-5">
                    <Link href={`/onboarding/${userRoute}/3`} className="w-12 h-12 rounded-full flex justify-center items-center">
                        <span className="iconify material-symbols-light--chevron-left-rounded font-medium text-3xl text-[#000]"></span>
                    </Link>
                </nav>

                <section className="flex flex-col gap-4 items-center mb-10">
                    <Image src={pregnantLogo} alt="pregnant woman" />
                    <h2 className="text-mainText text-xl font-semibold">Welcome back</h2>
                    <p className="text-subText font-medium">Sign in to be able to access your page</p>
                </section>
                <div className=" flex justify-center">
                    {state?.success == false ? <p className="text-red-600 flex items-center gap-2"> <span className="iconify lucide--info"></span>Incorrect email or password</p>: ''}
                </div>
            </header>
            <SignInForm action={action} state={state} />
        </section>
    )
}
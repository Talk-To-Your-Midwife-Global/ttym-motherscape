"use client"
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useActionState, useState, useEffect} from 'react'
import {signin} from "@/app/_actions/auth";
import {SignInForm} from "@/app/auth/_components/SignInForm";
import appLogo from "../../../public/icons/Obaa-logo-Horizontal.svg"
import posthog from "posthog-js";

export default function Page() {
    const [state, action] = useActionState(signin, undefined)
    const [userRoute, setUserRoute] = useState('');
    const [error, setError] = useState([]);
    const router = useRouter()

    const getUserRouteFromLocalStorage = () => {
        return localStorage.getItem('userType')
    }

    useEffect(() => {
        setUserRoute(getUserRouteFromLocalStorage())
        if (state?.success) {
            posthog.identify(state?.userDetails.uuid, state?.userDetails);
            router.push(state.route);
        } else if (state?.success === false) {
            setError([...state?.error])
        }
    }, [state?.success])

    return (
        <section>
            <header>
                <section className="flex flex-col gap-4 items-center my-10">
                    <div
                        className="bg-primaryColor rounded-full w-[100px] h-[100px] flex items-center justify-center p-2">
                        <Image src={appLogo} alt="obaa+logo"/>
                    </div>
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
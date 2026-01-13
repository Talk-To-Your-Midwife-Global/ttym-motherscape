"use client"
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useActionState, useState, useEffect} from 'react'
import {signin} from "@/app/_actions/auth";
import {SignInForm} from "@/app/auth/_components/SignInForm";
import appLogo from "../../../public/icons/Obaa-logo-Horizontal.svg"
import posthog from "posthog-js";
import {Log} from "@/app/_lib/utils";
import {toast} from "sonner";

export default function Page() {
    const [state, action, isPending] = useActionState(signin, undefined)
    const [userRoute, setUserRoute] = useState('');
    const [error, setError] = useState([]);
    const router = useRouter()
    Log("sigin/page.js; on ", {isPending})

    const getUserRouteFromLocalStorage = () => {
        return localStorage.getItem('userType')
    }

    const handleErrorReset = () => {
        setError([]);
    }

    useEffect(() => {
        setUserRoute(getUserRouteFromLocalStorage())
        if (state?.success) {
            posthog.identify(state?.userDetails?.uuid, state?.userDetails);
            toast.success("Successfully logged in")
            router.push(state.route);
        } else if (state?.success === false) {
            Log("signin/page.js useEffect; on ", {state})
            if (state?.shouldVerifyEmail) {
                toast.warning("Email not verified");
                router.push(state.route);
            } else {
                setError([...state?.error])
            }
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
                        {/*<span className={`iconify lucide--info text-red-500`}></span>*/}
                        {/*{error?.map((err, index) => <p key={index} className={`text-red-500`}>{err}</p>)}*/}
                        {error?.map((err, index) => {
                            toast.error(err)
                        })}
                    </div>
                    : ""}
            </header>
            <SignInForm action={action} state={state} resetError={handleErrorReset} isPending={isPending}/>
        </section>
    )
}
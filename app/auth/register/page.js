"use client"
import Link from "next/link";

import {useActionState, useState, useEffect} from 'react'
import {useRouter} from "next/navigation";
import {signup} from "@/app/_actions/auth";

import {SignUpForm} from "@/app/auth/_components/SignUpForm";

export default function Page() {
    const [state, action, isPending] = useActionState(signup, {
        success: undefined,
        fieldErrors: undefined,
        serverError: false
    });
    const [userRoute, setUserRoute] = useState('');
    const [error, setError] = useState(undefined);
    const router = useRouter();

    const getUserRouteFromLocalStorage = () => {
        return localStorage.getItem('userType')
    }

    useEffect(() => {
            console.log(state);
            setUserRoute(getUserRouteFromLocalStorage())
            if (state?.success) {
                console.log('Success routing stage', state?.route)
                router.push(state?.route)
            } else if (state?.success === false) {
                console.log('Error routing stage', state?.serverError)
                setError(state?.serverError)
            }

            console.log(error);
        }, []
    )
    return (
        <section>
            <header className="flex">
                <nav className="my-5">
                    <Link href={`/onboarding/${userRoute}/3`}
                          className="w-12 h-12 rounded-full flex justify-center items-center">
                        <span
                            className="iconify material-symbols-light--chevron-left-rounded font-medium text-3xl text-[#000]"></span>
                    </Link>
                </nav>

                <section className="flex flex-col gap-4 items-center mt-8 mb-10">
                    <h2 className="text-mainText text-xl font-semibold">Create an Account</h2>
                    <p className="text-subText font-medium">Sign up to be able to access your page</p>
                    {error?.length > 0 ? error.map((err, index) => <p key={index}
                                                                      className={`text-red-500`}>{err}</p>) : ""}
                </section>
            </header>
            <section className="flex  mx-[30px]">
                {
                    state?.success &&
                    <div className="">
                        Wohooo you are in!
                    </div>
                }

                {
                    state.serverError &&
                    <div className="text-red-400 .border-2 flex items-center gap-2 my-2">
                        <span className="iconify lucide--info"></span>
                        <p className="capitalize text-sm">{state?.serverError}</p>
                    </div>
                }
            </section>
            <SignUpForm state={state} action={action} pending={isPending}/>
        </section>
    )
}
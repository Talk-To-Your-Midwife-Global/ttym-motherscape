"use client"

import {useActionState, useState, useEffect} from 'react'
import {useRouter} from "next/navigation";
import {signup} from "@/app/_actions/auth";

import {SignUpForm} from "@/app/auth/_components/SignUpForm";
import {Log} from "@/app/_lib/utils";

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
            setUserRoute(getUserRouteFromLocalStorage())
        }, []
    )

    useEffect(() => {
        if (state?.success) {
            Log('Success routing stage', state?.route)
            router.replace(state.route);
        } else {
            Log('Error routing stage', state?.serverError)
            setError(state?.serverError)
        }
        Log({error});
    }, [state])
    return (
        <section>
            <header className="flex items-center justify-center">
                <section className="flex flex-col gap-4 items-center mt-8 mb-10">
                    <h2 className="text-mainText text-xl font-semibold">Create an Account</h2>
                    <p className="text-subText font-medium">Sign up to be able to access your page</p>
                    {/*{error?.length > 0 ? error.map((err, index) => <p key={index}*/}
                    {/*                                                  className={`text-red-500`}>{err}</p>) : ""}*/}
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
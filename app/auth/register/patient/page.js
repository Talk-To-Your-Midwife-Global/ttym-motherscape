"use client"
import Link from "next/link";

import {useActionState} from 'react'
import {useRouter} from "next/navigation";
import {signup} from "@/app/_actions/auth";
import {SignUpForm} from "@/app/auth/_components/SignUpForm";
import {Log} from "@/app/_lib/utils";

export default function Page() {
    const [state, action] = useActionState(signup, {serverError: undefined, fieldErrors: undefined, success: undefined})
    const router = useRouter()
    Log(state)
    if (state?.success) {
        router.push('/onboarding')
    }
    return (
        <section>
            <header className="flex">
                <nav className="my-5">
                    <Link href="/onboarding/4" className="w-12 h-12 rounded-full flex justify-center items-center">
                        <span
                            className="iconify material-symbols-light--chevron-left-rounded font-medium text-3xl text-[#000]"></span>
                    </Link>
                </nav>

                <section className="flex flex-col gap-4 items-center mt-8 mb-10">
                    <h2 className="text-mainText text-xl font-semibold">Create an Account</h2>
                    <p className="text-subText font-medium">Sign up to be able to access your page</p>
                </section>
            </header>
            <SignUpForm state={state} action={action}/>
        </section>
    )
}
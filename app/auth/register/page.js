"use client"
import {useActionState, useState, useEffect} from 'react'
import {useRouter} from "next/navigation";
import {signup} from "@/app/_actions/auth";
import {SignUpForm} from "@/app/auth/_components/SignUpForm";
import {Log} from "@/app/_lib/utils";
import {toast} from "sonner";
import posthog from "posthog-js";

export default function Page() {
    const [state, action, isPending] = useActionState(signup, {
        success: undefined,
        fieldErrors: undefined,
        serverError: false
    });
    const [userRoute, setUserRoute] = useState('');
    const [error, setError] = useState(undefined);
    const [fieldErrors, setFieldErrors] = useState({});
    const router = useRouter();

    const getUserRouteFromLocalStorage = () => {
        return localStorage.getItem('userType')
    }

    const handleErrorReset = () => {
        setError([]);
        setFieldErrors({});

    }

    useEffect(() => {
            setUserRoute(getUserRouteFromLocalStorage())
        }, []
    )

    useEffect(() => {
        if (state?.success) {
            Log('Success routing stage', state?.route)
            toast.success("Successfully created account")
            router.replace(state.route);
        } else {
            Log('Error routing stage', state?.serverError, state.fieldErrors)
            posthog.captureException(`register/page.js: useEffect: signup error ${state}`);
            setError(state?.serverError)
            setFieldErrors(state?.fieldErrors)

            Log({error});
            if (state?.serverError) {
                toast.error('An error occurred while creating account')
                error.map(err => {
                    console.log("erro", {err});
                    const timer = setTimeout(() => toast.warning(err), 1000);
                })
                handleErrorReset()
            }
        }
    }, [state])
    return (
        <section>
            <header className="flex items-center justify-center">
                <section className="flex flex-col gap-4 items-center mt-8 mb-10">
                    <h2 className="text-mainText text-xl font-semibold">Create an Account</h2>
                    <p className="text-subText font-medium">Sign up to be able to access your page</p>
                </section>
            </header>
            <SignUpForm state={state} fieldErrors={fieldErrors} resetError={handleErrorReset} action={action}
                        isPending={isPending}/>
        </section>
    )
}
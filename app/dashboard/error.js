'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import {logout} from "@/app/actions/auth";
import Link from "next/link";

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    // TODO: Edit this page
    return (
        <div className={`flex justify-center items-center w-full my-[50px]`}>
            <section>
                <h2 className={`text-primaryText text-2xl font-medium`}>Session has expired!</h2>
                <Link href={"/auth/signIn"}>
                    Login here...
                </Link>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </button>
                <br />
                <button onClick={() => logout()}>
                    Logout
                </button>
            </section>
        </div>
    )
}
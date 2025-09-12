'use client'

import {useEffect} from 'react'
import {logout} from "@/app/_actions/auth";
import Link from "next/link";
import {Log} from "@/app/_lib/utils";
import {IconButton} from "@/app/_components";
import posthog from "posthog-js";

export default function Error({error, reset}) {
    useEffect(() => {
        // Log the error to an error reporting service
        Log("error.js", {error})
        posthog.captureException({error});
    }, [error])
    return (
        <div className={`flex justify-center items-center w-full h-screen`}>
            <section className={"flex flex-col gap-3 items-center justify-center"}>
                <h2 className={`text-primaryText text-2xl font-medium`}>An error occurred!</h2>

                <p className={'text-center text-primaryText w-3/4'}>Refreshing logs you out so you can sign in and
                    reports the
                    issue to us.
                    This gives us chance to make
                    sure it never happens again </p>
                <IconButton text={"Refresh App"} href={"/logout"}/>

                {/*<button*/}
                {/*    onClick={*/}
                {/*        // Attempt to recover by trying to re-render the segment*/}
                {/*        () => reset()*/}
                {/*    }*/}
                {/*>*/}
                {/*    Try again*/}
                {/*</button>*/}
                <br/>
                {/*<button onClick={() => logout()}>*/}
                {/*    Login*/}
                {/*</button>*/}
            </section>
        </div>
    )
}
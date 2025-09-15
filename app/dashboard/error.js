'use client'
import {useEffect} from 'react'
import posthog from "posthog-js";
import {Log} from "@/app/_lib/utils";
import {IconButton} from "@/app/_components";
import {OnboardHeading} from "@/app/onboarding/_components/OnboardHeading";
import Image from "next/image";
import ErrorImage from "@/public/images/computererr.svg";
import {useRouter} from "next/navigation";

export default function Error({error, reset}) {
    const router = useRouter();
    useEffect(() => {
        Log("error.js", {error})
        posthog.captureException(error);
    }, [error])
    return (
        <div className={`flex justify-between .items-center w-full h-screen`}>
            <section className={"flex flex-col gap-3 items-center justify-between mt-10"}>
                <div className={"flex flex-col gap-20 items-center"}>
                    <OnboardHeading title={"Oops! Something went wrong"}
                                    subTitle={"However we are committed to improving your experience."}/>
                    <Image src={ErrorImage}
                           alt={"Computer with an exclamation at the side"}/>
                </div>
                <div className={"flex flex-col items-center justify-center fixed bottom-10"}>
                    <IconButton onClick={() => router.push('/logout')} text={"Report Issue"} href={"/logout"}
                                type={"link"}/>
                    <p className={"text-center text-[#3A3A3A99]"}>Report it once, we’ll handle the rest and make your
                        experience better.</p>
                </div>
                <br/>
            </section>
        </div>
    )
}
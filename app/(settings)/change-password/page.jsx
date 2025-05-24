"use client"
import {useActionState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {FormInput} from "@/app/_components/FormInput";
import {initiatePasswordChange} from "@/app/_actions/auth";
import {cn} from "@/app/_lib/utils";
import {SuccessIcon} from "@/app/(settings)/_components/icons/successIcon";
import Link from "next/link";


export default function Page() {
    const [formState, action, isPending] = useActionState(initiatePasswordChange, {
        fieldErrors: undefined,
        success: undefined,
        serverError: undefined
    });
    return (
        <section>
            <section className={cn("absolute z-5", formState.success && "hidden")}>
                <SettingsNav pageLabel="Change Password"/>
                <ContainerWrapper>
                    <section className="text-black flex flex-col h-lvh .border-2">
                        <form action={action} className="flex flex-col .justify-between h-3/4 .border-2 ">
                            <div className="flex-1">
                                <h3 className="font-semibold text-[#1E1E1E]">Enter the email associated with your
                                    account and we’ll
                                    send an
                                    email
                                    with instructions to reset
                                    your password.</h3>
                                <FormInput label="email" placeholderText="trudyakortia@gmail.com" disabled={false}
                                           fieldErrors={formState?.fieldErrors}/>
                            </div>

                            <div className="flex">
                                <button type={"submit"}
                                        className="bg-primaryColor text-white w-full rounded-full p-3">Send {isPending && 'processing...'}</button>
                            </div>
                        </form>

                    </section>
                </ContainerWrapper>
            </section>

            <section
                className={cn(`absolute h-screen w-screen border-2 hidden items-center`, formState.success && 'z-10 flex')}>
                <ContainerWrapper>
                    <section className="flex flex-col items-center justify-center">
                        <div className="text-center text-sm text-[#000000] flex flex-col items-center justify-center">
                            <SuccessIcon/>
                            <h2 className="font-bold text-xl my-4">Check your Mail</h2>
                            <p className=" text-[#0E0E0EB0] w-3/4">We have sent a password reset instructions to
                                your
                                email</p>
                        </div>
                        <div className="flex flex-col items-center .justify-center">
                            <button className="underline text-sm">Didn&apos;t receive reset email? Tap to resend link
                            </button>
                            <Link href="/" className="text-sm text-white bg-primaryColor rounded-lg my-5 px-4 py-2 ">Go
                                home</Link>
                        </div>
                    </section>
                </ContainerWrapper>
            </section>
        </section>
    )
}
"use client"
import {useActionState, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {AuthNav} from "@/app/auth/_components";
import {forgotPassword} from "@/app/_actions/auth";
import {montserrat} from "@/app/_fonts";
import {Button, PageFadeAnimator} from "@/app/_components";
import messageIcon from "../../../public/icons/message.svg"
import modalImage from "../../../public/images/undraw_secure_login.png"

export default function Page() {
    const [state, action] = useActionState(forgotPassword, undefined)

    return (
        <section>
            <AuthNav backUrl="/auth/signIn"/>
            <header className="text-primaryText px-[20px] mb-5">
                <h2 className="font-semibold text-2xl ">Forgot Password</h2>
                <p className={`${montserrat.className} text-subText text-base`}>Enter Email to request a password
                    reset</p>
            </header>
            <form className={"px-5"} action={action}>
                <div>
                    <label htmlFor="email" className="font-medium text-mainText">Email</label>
                    <div
                        className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                        <Image src={messageIcon} alt={"message icon"}/>
                        <input type="text" name="email" id="email" placeholder="linda@framcreative.com"
                               className="flex-1 outline-none bg-transparent text-mainText"/>
                    </div>
                    {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
                </div>

                <section className={"mt-12 mb-10 w-full flex justify-center text-center"}>
                    <Button text={"Reset Password"}/>
                </section>
                <section className={"text-primaryText text-center"}>
                    <p>Need help? Visit our <Link href={"#"} className={"text-primaryColor"}>help center</Link>
                    </p> {/* TODO: Add link to help center */}
                </section>
            </form>

            {/*    Modal goes here   */}
            <PageFadeAnimator>
                <section className={`backdrop-blur-md w-screen h-svh fixed flex justify-center items-center top-0 rounded-md  
            ${state?.success ? 'block' : 'hidden'}`}>
                    <section className={"text-primaryText bg-white px-4 py-8 rounded-md relative"}>
                        <Link href={"/auth/signIn"}>
                            <span className={"iconify lucide--x-circle absolute right-1 top-1"}></span>
                        </Link>
                        <Image src={modalImage} alt={"Image for modal goes here"}/>
                        <article className={"text-center"}>
                            <h3 className={"font-bold text-2xl "}>Reset Password</h3>
                            <p className={"text-sm"}>Reset code has been sent to your email</p>
                        </article>
                    </section>
                </section>
            </PageFadeAnimator>
        </section>
    )
}
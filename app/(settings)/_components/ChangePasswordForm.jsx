"use client"

import {useActionState, useState} from "react";
import {changePassword} from "@/app/_actions/auth";
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {PageFadeAnimator} from "@/app/_components";
import Link from "next/link";
import Image from "next/image";
import modalImage from "@/public/images/undraw_secure_login.png";
import {cn} from "@/app/_lib/utils";

export function ChangePasswordForm({specialKey}) {
    const [pass, setPass] = useState('')
    const [passCorrect, setPassCorrect] = useState(false)
    const [passErr, setPassErr] = useState('');
    // const [enableButton, setEnableButton] = useState(false)
    const [state, action, isPending] = useActionState(changePassword, {
        success: undefined,
        fieldErrors: undefined,
        serverError: undefined,
    });

    const handlePassChange = (event) => {
        const {value} = event.target
        setPass(value)
    }

    const handlePassCorrect = (event) => {
        const {value} = event.target
        if (value === pass) {
            setPassCorrect(true);
            setPassErr('');
        } else {
            setPassCorrect(false)
            setPassErr("Passwords do not match")
        }
    }
    return (
        <section>
            <SettingsNav pageLabel="Create New Password"/>
            <ContainerWrapper>
                <div className="text-[#1E1E1E] my-4">
                    <p>
                        Your new password must be different from your previous password
                    </p>
                </div>
            </ContainerWrapper>

            <form action={passCorrect ? action : "#"} className="flex flex-col gap-5">
                <div className="container mx-auto px-4 md:px-6 .py-6">
                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="font-medium text-mainText">New Password</label>
                        </div>
                        <div
                            className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[10px]">
                            <span className="iconify lucide--lock-keyhole font-medium text-[#999999]"></span>
                            <input onChange={(e) => handlePassChange(e)} type={"password"}
                                   name="password" id="password" placeholder="••••••••••••••••"
                                   className="flex-1 outline-none bg-transparent text-mainText"/>
                        </div>
                        {state?.fieldErrors?.password && (
                            <div className="text-red-500 text-sm">
                                <p className="font-medium">Password must:</p>
                                <ul>
                                    {state.fieldErrors.password.map((error) => (
                                        <li key={error}>- {error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-6 .py-6">
                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="confirm-password" className="font-medium text-mainText">Confirm New
                                Password</label>
                        </div>
                        <div
                            className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[10px]">
                            <span className="iconify lucide--lock-keyhole font-medium text-[#999999]"></span>
                            <input type={"password"} name="confirm-password" id="confirm-password"
                                   placeholder="••••••••••••••••"
                                   className="flex-1 outline-none bg-transparent text-mainText"
                                   onChange={(e) => handlePassCorrect(e)}/>
                        </div>
                        {passErr && <p className="text-red-500 text-sm"> {passErr} </p>}
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-6 .py-6">
                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="key" className="font-medium text-mainText">Key</label>
                        </div>
                        <div
                            className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[10px]">
                            <span className="iconify lucide--lock-keyhole font-medium text-[#999999]"></span>
                            <input type={"text"} value={specialKey} name="key"
                                   readOnly={true}
                                   className="flex-1 outline-none bg-transparent text-mainText"
                            />
                        </div>
                    </div>
                </div>


                <div className="fixed bottom-5 w-full .mx-[auto] flex flex-col">
                    <button disabled={!passCorrect} type={"submit"}
                            className="bg-primaryColor text-white w-full rounded-full p-3"> {isPending ? 'Changing password...' : "Change my password"}</button>
                </div>
            </form>

            {/*    Modal goes here   */}
            <PageFadeAnimator>
                <section
                    className={cn(`backdrop-blur-lg absolute top-0 h-screen w-screen border-2 hidden`, state.success && 'z-10 flex items-center justify-center')}>
                    <section
                        className={"text-primaryText bg-white px-4 py-8 rounded-md relative"}>
                        <Link href={"/auth/signIn"}>
                            <span className={"iconify lucide--x-circle absolute right-1 top-1"}></span>
                        </Link>
                        <Image src={modalImage} alt={"Image for modal goes here"}/>
                        <article className={"text-center"}>
                            <h3 className={"font-bold text-2xl "}>Password Updated</h3>
                            <p className={"text-sm"}><Link href='/auth/signIn' className="text-primaryColor">Sign in
                                again</Link> to activate your
                                password</p>
                        </article>
                    </section>
                </section>
            </PageFadeAnimator>

        </section>
    )
}
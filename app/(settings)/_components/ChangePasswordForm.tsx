"use client"

import {useEffect, useState, useTransition, useRef} from "react";
import {changePassword} from "@/app/_actions/auth";
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {IconButton, PageFadeAnimator} from "@/app/_components";
import Link from "next/link";
import Image from "next/image";
import modalImage from "@/public/images/undraw_secure_login.png";
import {cn, Log} from "@/app/_lib/utils";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export function ChangePasswordForm({specialKey}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [pass, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [passErr, setPassErr] = useState('');
    const [disableBtn, setDisableBtn] = useState(true);
    const [hidePassword, setHidePassword] = useState(true);
    const [errors, setErrors] = useState([])
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null);

    const resetError = () => {
        setPassErr('');
        setErrors([]);
    }
    const handlePasswordChange = () => {
        startTransition(async () => {
            if (!(pass === passConfirm)) {
                toast.error('Passwords do not match')
                return;
            }
            const passwordChangeResponse = await changePassword({password: pass, key: specialKey});
            if (passwordChangeResponse.success) {
                toast.success('Password change successful!');
                router.push('/')
                return;
            }

            if (passwordChangeResponse.fieldErrors) {
                setErrors(passwordChangeResponse.fieldErrors);
                toast.warning("Password is not strong");
                return;
            }
            if (passwordChangeResponse.serverError) {
                toast.error('An unexpected error occurred on our end. Try again in 5 mins');
            }
        })
    }

    const handlePasswordView = (event) => {
        event.preventDefault();
        setHidePassword(hidePassword => !hidePassword)
    }

    const handlePassChange = (event) => {
        const {value} = event.target
        setPass(value)
    }

    const handlePassConfirmChange = (event) => {
        const {value} = event.target
        setPassConfirm(value);
        setDisableBtn(false)
    }

    // Accessibility and ease
    //enter key submit controller
    const submitAction = (e) => {
        Log('forgotPassword submit form', e.code)
        if (e.code === "ENTER" && !disableBtn) {
            handlePasswordChange()
        }
    }

    useEffect(() => {
        if (window) {
            window.addEventListener('keydown', (e) => submitAction(e))
        }

        () => {
            window.removeEventListener('keydown', (e) => submitAction(e));
        }
    }, []);

    useEffect(() => {
        // autocomplete event handler for Android
        let passwordStyle = window.getComputedStyle(passwordRef.current);

        // autofill seems to detect only the email (first input) and so
        if (passwordStyle && (passwordStyle.backgroundColor !== "rgba(0, 0, 0, 0)")) {
            Log("autofilled email", {style: passwordStyle.backgroundColor})
            setDisableBtn(false);
            resetError();
        }
    }, [pass, passConfirm])

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

            <form className="flex flex-col gap-5">
                <div className="container mx-auto px-4 md:px-6 .py-6">
                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="font-medium text-mainText">New Password</label>

                            <span onClick={(e) => handlePasswordView(e)}
                                  className="text-mainText flex items-center gap-1">
                                <span className="iconify lucide--eye"></span>
                                <span className="text-sm">show</span>
                            </span>
                        </div>
                        <div
                            className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[10px]">
                            <span className="iconify lucide--lock-keyhole font-medium text-[#999999]"></span>
                            <input ref={passwordRef} onChange={(e) => handlePassChange(e)}
                                   type={hidePassword ? "password" : "text"}
                                   name="password" id="password" placeholder="••••••••••••••••"
                                   className="flex-1 outline-none bg-transparent text-mainText"/>
                        </div>
                        {errors.password && (
                            <div className="text-amber-500 text-sm">
                                <p className="font-medium">Password must:</p>
                                <ul>
                                    {errors.password.map((error) => (
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
                            <input ref={confirmPasswordRef} type={"password"} name="confirm-password"
                                   id="confirm-password"
                                   placeholder="••••••••••••••••"
                                   value={passConfirm}
                                   type={hidePassword ? "password" : "text"}
                                   className="flex-1 outline-none bg-transparent text-mainText"
                                   onChange={(e) => handlePassConfirmChange(e)}/>
                        </div>
                        {passErr && <p className="text-red-500 text-sm"> {passErr} </p>}
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-6 .py-6 invisible">
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
                    <section className={"mt-12 mb-10 w-full flex justify-center text-center"}>
                        <IconButton isPending={isPending} text="Change password" onClick={handlePasswordChange}
                                    icon="iconify lucide--arrow-right"
                                    disabled={disableBtn}/>
                    </section>
                </div>
            </form>

            {/*    Modal goes here   */}
            {/*<PageFadeAnimator>*/}
            {/*    <section*/}
            {/*        className={cn(`backdrop-blur-lg absolute top-0 h-screen w-screen border-2 hidden`, state.success && 'z-10 flex items-center justify-center')}>*/}
            {/*        <section*/}
            {/*            className={"text-primaryText bg-white px-4 py-8 rounded-md relative"}>*/}
            {/*            <Link href={"/auth/signIn"}>*/}
            {/*                <span className={"iconify lucide--x-circle absolute right-1 top-1"}></span>*/}
            {/*            </Link>*/}
            {/*            <Image src={modalImage} alt={"Image for modal goes here"}/>*/}
            {/*            <article className={"text-center"}>*/}
            {/*                <h3 className={"font-bold text-2xl "}>Password Updated</h3>*/}
            {/*                <p className={"text-sm"}><Link href='/auth/signIn' className="text-primaryColor">Sign in*/}
            {/*                    again</Link> to activate your*/}
            {/*                    password</p>*/}
            {/*            </article>*/}
            {/*        </section>*/}
            {/*    </section>*/}
            {/*</PageFadeAnimator>*/}

        </section>
    )
}
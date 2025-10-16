"use client"
import {useEffect, useRef, useState, useTransition} from "react";
import Image from "next/image";
import Link from "next/link";
import {AuthNav} from "@/app/auth/_components";
import {initiatePasswordChange} from "@/app/_actions/auth";
import {montserrat} from "@/app/_fonts";
import {IconButton, PageFadeAnimator} from "@/app/_components";
import messageIcon from "../../../public/icons/message.svg"
import modalImage from "../../../public/images/undraw_secure_login.png"
import {ForgotPasswordFormSchema, SignInFormSchema} from "@/app/auth/lib/definitions";
import {Log} from "@/app/_lib/utils";
import {toast} from "sonner";

export default function Page() {
    const [isPending, startTransition] = useTransition();
    const emailRef = useRef(null);
    const formRef = useRef(null);
    const [email, setEmail] = useState('');
    const [state, setState] = useState({});
    const [disableBtn, setDisableBtn] = useState(true);
    const [error, setError] = useState("");

    const handlePasswordRequestSubmit = () => {
        startTransition(async () => {
            const initiateChange = await initiatePasswordChange({email});

            Log({initiateChange})
            if (initiateChange.success) {
                toast.success('Reset email sent successfully!')
            }

            if (initiateChange.serverError) {
                toast.error('An unexpected error occurred on our end. Try again later!')
            }
            setState(initiateChange)
        })
    }

    const resetError = () => {
        setError([]);
    }

    const handleInputChange = (e) => {
        const {value} = e.target;

        const isValidCredentials = ForgotPasswordFormSchema.safeParse({email});

        if (isValidCredentials.success) {
            setDisableBtn(false);
            setError("")
        } else {
            setError("Type in a valid email!")
            setDisableBtn(true)
        }
        setEmail(value)
    }

    //enter key submit controller
    const submitAction = (e) => {
        Log('forgotPassword submit form', e.code)
        if (e.code === "ENTER" && !disableBtn) {
            handlePasswordRequestSubmit()
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
        let emailStyle = window.getComputedStyle(emailRef.current);

        // autofill seems to detect only the email (first input) and so
        if (emailStyle && (emailStyle.backgroundColor !== "rgba(0, 0, 0, 0)")) {
            Log("autofilled email", {style: emailStyle.backgroundColor})
            setDisableBtn(false);
            resetError();
        }
    }, [email])

    return (
        <section>
            <AuthNav backUrl="/auth/signIn"/>
            <header className="text-primaryText px-[20px] mb-5">
                <h2 className="font-semibold text-2xl ">Forgot Password</h2>
                <p className={`${montserrat.className} text-subText text-base`}>Enter Email to request a password
                    reset</p>
            </header>
            <form className={"px-5"} ref={formRef}>
                <div>
                    <label htmlFor="email" className="font-medium text-mainText">Email</label>
                    <div
                        className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                        <Image src={messageIcon} alt={"message icon"}/>
                        <input type="text" ref={emailRef} name="email" id="email" value={email}
                               onChange={handleInputChange}
                               placeholder="linda@framcreative.com"
                               autoFocus
                               required
                               className="flex-1 outline-none bg-transparent text-mainText"/>
                    </div>
                    {error && <p className="text-red-500 text-sm px-2 py-2">{error}</p>}
                </div>

                <section className={"mt-12 mb-10 w-full flex justify-center text-center"}>
                    <IconButton isPending={isPending} text="Send reset email" onClick={handlePasswordRequestSubmit}
                                icon="iconify lucide--arrow-right"
                                disabled={disableBtn}/>
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
                            <p className={"text-sm"}>Reset instructions have been sent to your email</p>
                        </article>
                    </section>
                </section>
            </PageFadeAnimator>
        </section>
    )
}
"use client"
import {useState} from "react";
import Link from "next/link";
import {IconButton} from "@/app/_components";
// import Image from "next/image";
// import facebook from "@/public/images/facebook.svg";
// import google from "@/public/images/google.svg";
// import apple from "@/public/images/apple.svg";
import {HelpCenterLinks} from "@/app/auth/_components/index";

export function SignInForm({state, action}) {
    const [hidePassword, setHidePassword] = useState(true)

    const handlePasswordView = (event) => {
        event.preventDefault();
        setHidePassword(hidePassword => !hidePassword)
    }

    return (
        <form action={action} className="px-[30px] flex flex-col gap-5">
            <div>
                <label htmlFor="email" className="font-medium text-mainText">Email</label>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-full pl-[15px] pr-[5px]">
                    <span className="iconify lucide--mail font-medium"></span>
                    <input autoFocus type="email" name="email" id="email" placeholder="linda@framcreative.com"
                           className="flex-1 outline-none bg-transparent text-mainText"/>
                </div>
                {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
            </div>

            <div>
                <div className="flex justify-between items-center">
                    <label htmlFor="password" className="font-medium text-mainText">Password</label>
                    <button onClick={(e) => handlePasswordView(e)} className="text-mainText flex items-center gap-1">
                        <span className="iconify lucide--eye"></span>
                        <span className="text-sm">show</span>
                    </button>
                </div>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-full pl-[15px] pr-[5px]">
                    <span className="iconify lucide--lock-keyhole font-medium"></span>
                    <input type={hidePassword ? "password" : "text"} name="password" id="password"
                           placeholder="••••••••••••••••" className="flex-1 outline-none bg-transparent text-mainText"/>
                </div>
                {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
                <div className="flex justify-end gap-4 space-between">
                    <p className="text-red-600 text-sm text-right">
                        <Link href="/auth/forgotPassword" className="font-medium">
                            Forgot Password?
                        </Link>
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-10">
                <IconButton loadingText={"Signing in"} text="Sign In" type="submit"/>
            </div>
            {/*<div className="relative flex flex-col items-center justify-center">*/}
            {/*    <div className="h-[1px] w-full bg-[#9C979759] top-[10px] absolute "></div>*/}
            {/*    <p className="text-center bg-background z-10 px-5 font-medium">Or Sign in with</p>*/}
            {/*</div>*/}
            {/*<section className="w-3/4 flex justify-between items-center place-self-center">*/}
            {/*    <Image src={facebook} alt="facebook logo"/>*/}
            {/*    <Image src={google} alt="google logo"/>*/}
            {/*    <Image src={apple} alt="apple logo"/>*/}
            {/*</section>*/}
            <HelpCenterLinks signIn={false}/>
        </form>
    )
}
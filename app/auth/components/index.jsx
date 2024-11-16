"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/app/components"
import facebook from "../../../public/images/facebook.svg"
import google from "../../../public/images/google.svg"
import apple from "../../../public/images/apple.svg"

export function HelpCenterLinks({signIn=true}) {
    return (
        <section className="text-primaryText text-center text-sm font-medium">
            <p className="mb-5">{signIn ? "Already have an account?" : "Don't have an account?"}
                <Link className="text-primaryColor" href={`/auth/${signIn ? 'signIn' : 'register'}`}>{signIn ? ' Sign In' : ' Sign Up'}</Link>
            </p>
            <p>Need help? Visit our
                <Link className="text-primaryColor" href="#"> help center</Link></p> {/** TODO:Create help center page */}
        </section>
    )
}

export function AuthNav({backUrl}) {
    return (
        <nav className="my-5">
            <Link href={backUrl} className="w-12 h-12 rounded-full flex justify-center
                    items-center">
                <span className="iconify material-symbols-light--chevron-left-rounded font-medium text-3xl text-[#000]"></span>
            </Link>
        </nav>
    )
}

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
                <div className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-full pl-[15px] pr-[5px]">
                    <span className="iconify lucide--mail font-medium"></span>
                    <input type="email" name="email" id="email" placeholder="linda@framcreative.com"  className="flex-1 outline-none bg-transparent text-mainText"/>
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
                <div className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-full pl-[15px] pr-[5px]">
                    <span className="iconify lucide--lock-keyhole font-medium"></span>
                    <input type={hidePassword ? "password" : "text"} name="password" id="password" placeholder="••••••••••••••••"  className="flex-1 outline-none bg-transparent text-mainText"/>
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

            <div className="flex flex-col justify-center items-center my-10">
                <Button text="Sign In" />
            </div>
            <div className="relative flex flex-col items-center justify-center">
                <div className="h-[1px] w-full bg-[#9C979759] top-[10px] absolute "></div>
                <p className="text-center bg-background z-10 px-5 font-medium">Or Sign in with</p>
            </div>
            <section className="w-3/4 flex justify-between items-center place-self-center">
                <Image src={facebook} alt="facebook logo" />
                <Image src={google} alt="google logo" />
                <Image src={apple} alt="apple logo" />
            </section>
            <HelpCenterLinks signIn={false} />
        </form>
    )
}

export function SignUpForm({state, action}) {
    const [hidePassword, setHidePassword] = useState(true)
    const [pass, setPass] = useState('')
    const [passCorrect, setPassCorrect] = useState(false)
    const [passErr, setPassErr] = useState('');
    const [agreement, setAgreement] = useState(false)
    const [enableButton, setEnableButton] = useState(false)

    const handlePasswordView = (event) => {
        event.preventDefault();
        setHidePassword(hidePassword => !hidePassword)
    }

    const handlePassChange = (event) => {
        const {value} = event.target
        setPass(value)
    }

    const handlePassCorrect = (event) => {
        const {value} = event.target
        if (value == pass) {
            setPassCorrect(true)
            setPassErr('')

            if (agreement) {
                setEnableButton(true)
            }
        } else {
            setPassCorrect(false)
            setPassErr("Passwords do not match")
            setEnableButton(false)
        }
    }

    const handleAgreementChange = (event) => {
        const {name, value} = event.target;

        console.log(name, value)
        if (value) {
            setAgreement(true)
            setEnableButton(true)
        }else {
            setAgreement(false)
            setEnableButton(false)
        }
    }

    return (
        <form action={passCorrect ? action: "#"} className="px-[30px] flex flex-col gap-5">
            <div>
                <label htmlFor="name" className="font-medium text-mainText">Name</label>
                <div className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                    <span className="iconify lucide--map-pin font-medium text-[#999999]"></span>
                    <input type="text" name="name" id="name" placeholder="Full Name"  className="flex-1 outline-none bg-transparent text-mainText"/>
                </div>
                {state?.errors?.address && <p className="text-red-500 text-sm">{state.errors.address}</p>}
            </div>

            <div>
                <label htmlFor="email" className="font-medium text-mainText">Email</label>
                <div className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                    <span className="iconify lucide--mail font-medium text-[#999999]"></span>
                    <input type="email" name="email" id="email" placeholder="linda@framcreative.com"  className="flex-1 outline-none bg-transparent text-mainText" value={state?.email && state.email}/>
                </div>
                {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
            </div>

           
            <div>
                <label htmlFor="phone" defaultValue="" className="font-medium text-mainText">Phone number</label>
                <div className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                    {/* <span className="iconify lucide--mail font-medium text-[#999999]"></span> */}
                    <select className="text-sm outline-none">
                        <option value="GHA">GHA</option>
                        <option value="NGN">NGN</option>
                    </select>
                    <input type="text" name="phone" id="phone" placeholder="eg. +1 (555) 000-0000"  className="flex-1 outline-none bg-transparent text-mainText" value={state?.email && state.email}/>
                </div>
                {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
            </div>

            <div>
                <div className="flex justify-between items-center">
                    <label htmlFor="password" className="font-medium text-mainText">Password</label>
                </div>
                <div className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[10px]">
                    <span className="iconify lucide--lock-keyhole font-medium text-[#999999]"></span>
                    <input onChange={(e) => handlePassChange(e)} type={hidePassword ? "password" : "text"} name="password" id="password" placeholder="••••••••••••••••" className="flex-1 outline-none bg-transparent text-mainText"/>
                    <button onClick={(e) => handlePasswordView(e)} className="text-mainText flex items-center gap-1">
                        <span className="iconify lucide--eye"></span>
                    </button>
                </div>
                {state?.errors?.password && (
                    <div className="text-red-500 text-sm">
                        <p className="font-medium">Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                    )}
            </div>

            <div>
                <div className="flex justify-between items-center">
                    <label htmlFor="confirm-password" className="font-medium text-mainText">Confirm Password</label>
                </div>
                <div className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[10px]">
                    <span className="iconify lucide--lock-keyhole font-medium text-[#999999]"></span>
                    <input type={hidePassword ? "password" : "text"} name="confirm-password" id="confirm-password" placeholder="••••••••••••••••" className="flex-1 outline-none bg-transparent text-mainText" onChange={(e) => handlePassCorrect(e)}/>
                    <button onClick={(e) => handlePasswordView(e)} className="text-mainText flex items-center gap-1">
                        <span className="iconify lucide--eye"></span>
                    </button>
                </div>
                {passErr && <p className="text-red-500 text-sm"> {passErr} </p>}
            </div>

            <section className="flex gap-4 ">
                <div className="grid items-center justify-center">
                    <input type="checkbox" name="agreement" checked={agreement} onChange={(e)=> handleAgreementChange(e)} id="checkbox_2" className="peer row-start-1 col-start-1 appearance-none w-4 h-4 border ring-transparent border-slate-300 rounded dark:border-slate-600 checked:bg-primaryColor checked:border-primaryColor dark:checked:border-primaryColor forced-colors:appearance-auto" />
                    <svg viewBox="0 0 14 14" fill="none" className="invisible peer-checked:visible row-start-1 col-start-1 stroke-white dark:text-violet-300 forced-colors:hidden">
                        <path d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </div>
             
                <p className="text-[10px] text-subText font-medium">By checking the box to create a TTYM Global account, you agree to the Terms and Conditions and Privacy Policy</p>
            </section>

            <div className="flex flex-col justify-center items-center">
                <Button disabled={!enableButton} text="Create Account" />
            </div>
            <div className="relative flex flex-col items-center justify-center">
                <div className="h-[1px] w-full bg-[#9C979759] top-[10px] absolute "></div>
                <p className="text-center bg-background z-10 px-5 font-medium">Or Sign up with</p>
            </div>
            <section className="w-3/4 flex justify-between items-center place-self-center">
                <Image src={facebook} alt="facebook logo" />
                <Image src={google} alt="google logo" />
                <Image src={apple} alt="apple logo" />
            </section>
           <HelpCenterLinks />
        </form>
    )
}
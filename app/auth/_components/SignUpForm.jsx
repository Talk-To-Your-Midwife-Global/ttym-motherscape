"use client"
import {useState} from "react";
import {Button} from "@/app/_components";
import Image from "next/image";
import facebook from "@/public/images/facebook.svg";
import google from "@/public/images/google.svg";
import apple from "@/public/images/apple.svg";
import {HelpCenterLinks} from "@/app/auth/_components/index";

export function SignUpForm({state, action, isPending}) {
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
        if (value === pass) {
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
        } else {
            setAgreement(false)
            setEnableButton(false)
        }
    }

    return (
        <form action={passCorrect ? action : "#"} className="px-[30px] flex flex-col gap-5">
            <div>
                <label htmlFor="name" className="font-medium text-mainText">Name</label>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                    <span className="iconify mdi--person-outline font-medium text-[#999999]"></span>
                    <input type="text" name="name" id="name" placeholder="Full Name"
                           className="flex-1 outline-none bg-transparent text-mainText"/>
                </div>
                {state?.fieldErrors?.name && <p className="text-red-500 text-sm">{state?.fieldErrors?.name}</p>}
            </div>

            <div>
                <label htmlFor="email" className="font-medium text-mainText">Email</label>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                    <span className="iconify lucide--mail font-medium text-[#999999]"></span>
                    <input type="email" name="email" id="email" placeholder="linda@framcreative.com"
                           className="flex-1 outline-none bg-transparent text-mainText"
                           value={state?.email && state.email}/>
                </div>
                {state?.fieldErrors?.email && <p className="text-red-500 text-sm">{state.fieldErrors?.email}</p>}
            </div>


            <div>
                <label htmlFor="phone" defaultValue="" className="font-medium text-mainText">Phone number</label>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                    {/* <span className="iconify lucide--mail font-medium text-[#999999]"></span> */}
                    {/*<select className="text-sm outline-none">*/}
                    {/*    <option value="GHA">GHA</option>*/}
                    {/*    <option value="NGN">NGN</option>*/}
                    {/*</select>*/}
                    <input type="text" name="phone" id="phone" placeholder="eg. +233 28 498 238"
                           className="flex-1 outline-none bg-transparent text-mainText"
                           value={state?.phone && state.phone}/>
                </div>
                {state?.fieldErrors?.phone && <p className="text-red-500 text-sm">{state.fieldErrors.phone}</p>}
            </div>

            <div>
                <label htmlFor="dob" className="font-medium text-mainText">Date of Birth</label>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                    {/*<span className="iconify lucide--mail font-medium text-[#999999]"></span>*/}
                    <input type="date" name="dob" id="dob" placeholder="linda@framcreative.com"
                           className="flex-1 outline-none bg-transparent text-mainText"
                           value={state?.dob && state.dob}/>
                </div>
                {state?.fieldErrors?.dob && <p className="text-red-500 text-sm">{state.fieldErrors.dob}</p>}
            </div>

            <div>
                <div className="flex justify-between items-center">
                    <label htmlFor="password" className="font-medium text-mainText">Password</label>
                </div>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[10px]">
                    <span className="iconify lucide--lock-keyhole font-medium text-[#999999]"></span>
                    <input onChange={(e) => handlePassChange(e)} type={hidePassword ? "password" : "text"}
                           name="password" id="password" placeholder="••••••••••••••••"
                           className="flex-1 outline-none bg-transparent text-mainText"/>
                    <button onClick={(e) => handlePasswordView(e)} className="text-mainText flex items-center gap-1">
                        <span className="iconify lucide--eye"></span>
                    </button>
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

            <div>
                <div className="flex justify-between items-center">
                    <label htmlFor="confirm-password" className="font-medium text-mainText">Confirm Password</label>
                </div>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[10px]">
                    <span className="iconify lucide--lock-keyhole font-medium text-[#999999]"></span>
                    <input type={hidePassword ? "password" : "text"} name="confirm-password" id="confirm-password"
                           placeholder="••••••••••••••••" className="flex-1 outline-none bg-transparent text-mainText"
                           onChange={(e) => handlePassCorrect(e)}/>
                    <button onClick={(e) => handlePasswordView(e)} className="text-mainText flex items-center gap-1">
                        <span className="iconify lucide--eye"></span>
                    </button>
                </div>
                {passErr && <p className="text-red-500 text-sm"> {passErr} </p>}
            </div>

            <section className="flex gap-4 ">
                <div className="grid items-center justify-center">
                    <input type="checkbox" name="agreement" checked={agreement}
                           onChange={(e) => handleAgreementChange(e)} id="checkbox_2"
                           className="peer row-start-1 col-start-1 appearance-none w-4 h-4 border ring-transparent border-slate-300 rounded dark:border-slate-600 checked:bg-primaryColor checked:border-primaryColor dark:checked:border-primaryColor forced-colors:appearance-auto"/>
                    <svg viewBox="0 0 14 14" fill="none"
                         className="invisible peer-checked:visible row-start-1 col-start-1 stroke-white dark:text-violet-300 forced-colors:hidden">
                        <path d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </div>

                <p className="text-[10px] text-subText font-medium">By checking the box to create a TTYM Global account,
                    you agree to the Terms and Conditions and Privacy Policy</p>
            </section>

            <div className="flex flex-col justify-center items-center">
                <Button disabled={!enableButton} text="Create Account" isPending={isPending}/>
            </div>
            <div className="relative flex flex-col items-center justify-center">
                <div className="h-[1px] w-full bg-[#9C979759] top-[10px] absolute "></div>
                <p className="text-center bg-background z-10 px-5 font-medium">Or Sign up with</p>
            </div>
            <section className="w-3/4 flex justify-between items-center place-self-center">
                <Image src={facebook} alt="facebook logo"/>
                <Image src={google} alt="google logo"/>
                <Image src={apple} alt="apple logo"/>
            </section>
            <HelpCenterLinks/>
        </form>
    )
}
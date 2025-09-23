"use client"
import {useState} from "react";
import {Button, IconButton} from "@/app/_components";
// import Image from "next/image";
// import facebook from "@/public/images/facebook.svg";
// import google from "@/public/images/google.svg";
// import apple from "@/public/images/apple.svg";
import {HelpCenterLinks} from "@/app/auth/_components/index";
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {Log} from "@/app/_lib/utils";

export function SignUpForm({state, action, isPending, resetError, fieldErrors}) {
    const [hidePassword, setHidePassword] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const [pass, setPass] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passCorrect, setPassCorrect] = useState(false)
    const [passErr, setPassErr] = useState('');
    const [agreement, setAgreement] = useState(false)
    const [enableButton, setEnableButton] = useState(false)

    // state for components using special libraries
    const [birthdate, setBirthdate] = useState(new Date(new Date().getFullYear() - 13, 0, 1))
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePasswordView = (event) => {
        event.preventDefault();
        setHidePassword(hidePassword => !hidePassword)
    }

    const handlePassChange = (event) => {
        resetError();
        const {value} = event.target
        setPass(value)
    }

    const handlePassCorrect = (event) => {
        resetError()
        const {value} = event.target
        setPasswordConfirm(value);
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

    const handleToggleCalendar = () => {
        setShowCalendar(!showCalendar);
    }

    const handleBirthdateChange = (date) => {
        resetError()
        // Because passing it directly is causing issues
        const formattedDate = date.toISOString().split('T')[0];
        if (date) {
            setShowCalendar(false)
            setBirthdate(date); // the raw date was passed because the formatted date causes an error
        }
    }

    const handleAgreementChange = (event) => {
        resetError()
        const {name, value} = event.target;

        Log(name, value)
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
                <label htmlFor="firstName" className="font-medium text-mainText">First Name</label>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                    <span className="iconify mdi--person-outline font-medium text-[#999999]"></span>
                    <input value={firstName} onChange={(e) => {
                        setFirstName(e.target.value)
                        resetError()
                    }} type="text" name="firstName"
                           id="firstName" placeholder="First Name eg. Keisha"
                           className="flex-1 outline-none bg-transparent text-mainText"/>
                </div>
                {fieldErrors?.first_name &&
                    <p className="text-red-500 text-sm">{state?.fieldErrors?.first_name}</p>}
            </div>

            <div>
                <label htmlFor="lastName" className="font-medium text-mainText">Last Name</label>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                    <span className="iconify mdi--person-outline font-medium text-[#999999]"></span>
                    <input value={lastName} onChange={(e) => {
                        resetError()
                        setLastName(e.target.value)
                    }} type="text" name="lastName"
                           id="lastName" placeholder="Last Name"
                           className="flex-1 outline-none bg-transparent text-mainText"/>
                </div>
                {fieldErrors?.last_name &&
                    <p className="text-red-500 text-sm">{state?.fieldErrors?.last_name}</p>}
            </div>

            <div>
                <label htmlFor="email" className="font-medium text-mainText">Email</label>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                    <span className="iconify lucide--mail font-medium text-[#999999]"></span>
                    <input value={email} onChange={(e) => {
                        resetError();
                        setEmail(e.target.value)
                    }} type="email" name="email" id="email"
                           placeholder="linda@framcreative.com"
                           className="flex-1 outline-none bg-transparent text-mainText"
                    />
                </div>
                {fieldErrors?.email && <p className="text-red-500 text-sm">{state.fieldErrors?.email}</p>}
            </div>


            <div>
                <label htmlFor="phone" defaultValue="" className="font-medium text-mainText">Phone number</label>
                {/*This input is hidden but its value is what is sent to the backend*/}
                <input type="text" name="phone" id="phone"
                       placeholder="eg. +233 28 498 23844"
                       className="flex-1 hidden outline-none bg-transparent text-mainText"
                       value={phoneNumber} readOnly={true}/>

                {/*For the looks and formatting features*/}
                <PhoneInput
                    defaultCountry='GH'
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    placeholder={"eg. +233 28 498 23844 "}
                    name="phones" // all unknown props will be passed to the input elem itself
                    className='custom-outline placeholder:text-[#999999] text-black bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]'
                />
                {fieldErrors?.phone_number && <p className="text-red-500 text-sm">{fieldErrors.phone_number}</p>}
            </div>

            <div>
                <label htmlFor="dob" className="font-medium text-mainText">Date of Birth</label>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                    <input type="text" name="dob" id="dob" placeholder="yyyy-mm-dd"
                           className="flex-1 outline-none bg-transparent text-mainText"
                           onClick={handleToggleCalendar}
                           onFocus={handleToggleCalendar}
                           readOnly={true}
                           value={state?.dob && state.dob || birthdate.toISOString().split('T')[0]}/>
                </div>
                {showCalendar &&
                    <div>
                        <DayPicker
                            animate
                            captionLayout="dropdown"
                            mode="single"
                            startMonth={new Date(new Date().getFullYear() - 50, 0)}
                            endMonth={new Date(new Date().getFullYear() - 13, new Date().getMonth())}
                            selected={birthdate}
                            onSelect={handleBirthdateChange}
                            timeZone="UTC"

                        />
                    </div>
                }
                {fieldErrors?.dob && <p className="text-red-500 text-sm">{state.fieldErrors.dob}</p>}
            </div>

            <div>
                <div className="flex justify-between items-center">
                    <label htmlFor="password" className="font-medium text-mainText">Password</label>
                </div>
                <div
                    className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[10px]">
                    <span className="iconify lucide--lock-keyhole font-medium text-[#999999]"></span>
                    <input value={pass} onChange={(e) => handlePassChange(e)} type={hidePassword ? "password" : "text"}
                           name="password" id="password" placeholder="••••••••••••••••"
                           className="flex-1 outline-none bg-transparent text-mainText"/>
                    <button onClick={(e) => handlePasswordView(e)} className="text-mainText flex items-center gap-1">
                        <span className="iconify lucide--eye"></span>
                    </button>
                </div>
                {fieldErrors?.password && (
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
                    <input value={passwordConfirm} type={hidePassword ? "password" : "text"} name="confirm-password"
                           id="confirm-password"
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
                <IconButton isPending={isPending} disabled={!enableButton} loadingText={"Creating account"}
                            text="Create Account"
                            type="submit"/>
            </div>
            {/*<div className="relative flex flex-col items-center justify-center">*/}
            {/*    <div className="h-[1px] w-full bg-[#9C979759] top-[10px] absolute "></div>*/}
            {/*    <p className="text-center bg-background z-10 px-5 font-medium">Or Sign up with</p>*/}
            {/*</div>*/}
            {/*<section className="w-3/4 flex justify-between items-center place-self-center">*/}
            {/*    <Image src={facebook} alt="facebook logo"/>*/}
            {/*    <Image src={google} alt="google logo"/>*/}
            {/*    <Image src={apple} alt="apple logo"/>*/}
            {/*</section>*/}
            <HelpCenterLinks/>
        </form>
    )
}
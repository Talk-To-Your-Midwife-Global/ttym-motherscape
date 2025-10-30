"use client"
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {useUserProfileInfo} from "@/app/_lib/fetchers";
import {useEffect, useRef, useState, useTransition} from "react";
import {Log} from "@/app/_lib/utils";
import {useActionState} from "react";
import {updateUserEmail, updateUserProfile} from "@/app/_actions/userProfileAndSettings";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {IconButton} from "@/app/_components";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import {toast} from "sonner";
import {Spinner} from "@/app/_components/Spinner";
import posthog from "posthog-js";

export function EditProfileForm({accessToken}) {
    const {userProfileInfo, isLoading, error} = useUserProfileInfo(accessToken);
    const firstName = userProfileInfo?.user?.display_name || 'Panther';
    let src = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${firstName}&size=24&backgroundColor=d1d4f9`;
    const [userInfo, setUserInfo] = useState({});
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [state, action, isPendingState] = useActionState(updateUserProfile, undefined);
    const formRef = useRef(null);
    const emailRef = useRef(null);
    const fullNameRef = useRef(null);
    const phoneRef = useRef(null);
    const [disableBtn, setDisableBtn] = useState(false);

    const [isPending, startTransition] = useTransition();
    const resetError = () => {
        //     do something
    }


    const submitAction = (e) => {
        Log('SigninForm', e.code)
        if (e.code === "ENTER" && !disableBtn) {
            formRef.submit();
        }
    }

    const handleEmailChange = (e) => {
        e.preventDefault()
        Log("EmailRef", emailRef);
        startTransition(async () => {
            const initiateChangeEmail = await updateUserEmail(email);
            Log({initiateChangeEmail})
            if (initiateChangeEmail?.success) {
                toast.success('Profile updated successfully!')
            } else {
                posthog.captureException(`editProfileForm.jsx: handleEmailChange() Error ${JSON.stringify(initiateChangeEmail)}`);
                toast.error(initiateChangeEmail.message ? initiateChangeEmail.message : "An error occurred while changing email");
            }
        })
    }

    useEffect(() => {
        if (userProfileInfo) {
            const user = userProfileInfo.user;
            setFullName(user.display_name);
            setEmail(user.email);
            setPhone(user.phone_number);
        }
        Log(`editProfileForm`, {userProfileInfo});
    }, [userProfileInfo]);

    useEffect(() => {
        if (window) {
            window.addEventListener('keydown', submitAction);
        }

        return () => {
            window.removeEventListener('keydown', submitAction);
        }
    }, []);

    useEffect(() => {
        if (state?.success) {
            toast.success('Profile updated successfully!')
        }

    }, [state])

    return (
        <section className={"w-full overflow-hidden"}>
            <SettingsNav pageLabel="Edit profile"/>
            <section className={'flex gap-3 bg-white items-center justify-center relative'}>
                <div
                    className={"relative rounded-full w-[120px] h-[120px] flex items-center justify-center border-2 border-primaryColor"}>
                    <div tabIndex={0} onClick={() => onClick(true)}
                         className="bg-[#92857E] rounded-full w-[105px] h-[105px] flex items-center relative">
                        <img
                            src={src}
                            alt={"avatar"}
                            className="rounded-full w-[105px] h-[105px]"/>
                    </div>
                </div>
            </section>
            <ContainerWrapper>
                <section>
                    <form ref={formRef} action={action} className={"flex flex-col gap-5"}>
                        <div>
                            <label htmlFor="fullName" className="font-medium text-mainText">Full Name</label>
                            <div
                                className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                                <span className="iconify mdi--person-outline font-medium text-[#999999]"></span>
                                <input value={fullName} ref={fullNameRef} onChange={(e) => {
                                    setFullName(e.target.value);
                                    resetError();
                                }} type="text" name="fullName"
                                       id="fullName" placeholder="Full Name"
                                       className="flex-1 outline-none bg-transparent text-mainText"/>
                            </div>
                            {state?.fieldErrors?.full_name &&
                                <p className="text-red-500 text-sm">{state?.fieldErrors?.full_name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="font-medium text-mainText">Email</label>
                            <div
                                className="bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]">
                                <span className="iconify lucide--mail font-medium text-[#999999]"></span>
                                <input value={email} ref={emailRef} onChange={(e) => {
                                    setEmail(e.target.value);
                                    resetError()
                                }} type="email" name="email" id="email"
                                       placeholder="linda@framcreative.com"
                                       className="flex-1 outline-none bg-transparent text-mainText"
                                />
                                <button onClick={handleEmailChange}
                                        className={"text-black text-xs border border-[#CCCCCC] p-2 rounded-xl flex items-center"}> {isPending ?
                                    <><Spinner/> Changing</> : "Change"}
                                </button>
                            </div>
                            {state?.fieldErrors?.email &&
                                <p className="text-red-500 text-sm">{state.fieldErrors?.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" defaultValue="" className="font-medium text-mainText">Phone
                                number</label>
                            {/*This input is hidden but its value is what is sent to the backend*/}
                            <input type="text" ref={phoneRef} name="phone" id="phone"
                                   placeholder="eg. +233 28 498 23844"
                                   className="flex-1 hidden outline-none bg-transparent text-mainText"
                                   value={phone} readOnly={true}/>

                            {/*For the looks and formatting features*/}
                            <PhoneInput
                                defaultCountry='GH'
                                value={phone}
                                onChange={setPhone}
                                placeholder={"eg. +233 28 498 23844 "}
                                name="phones" // all unknown props will be passed to the input elem itself
                                className='custom-outline placeholder:text-[#999999] text-black bg-white border-2 w-full h-[42px] flex gap-2 items-center rounded-xl pl-[15px] pr-[5px]'
                            />
                            {state?.fieldErrors?.phone_number &&
                                <p className="text-red-500 text-sm">{state?.fieldErrors.phone_number}</p>}
                        </div>


                        <div className="flex flex-col justify-center items-center mt-10">
                            <IconButton isPending={isPendingState} loadingText={"Saving"}
                                        text="Save"
                                        type="submit"/>
                        </div>
                    </form>
                </section>
            </ContainerWrapper>
        </section>
    )
}
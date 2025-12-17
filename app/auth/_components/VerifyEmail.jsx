"use client"
import {useState, useTransition} from "react";
import {AuthNav} from "@/app/auth/_components/index";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {IconButton, IconContinuousButton} from "@/app/_components";
import {requestEmailVerification} from "@/app/_actions/auth";
import {Log} from "@/app/_lib/utils";

export function VerifyEmailPage({user_email}) {
    const [isPending, startTransition] = useTransition();
    const [sentStatus, setSentStatus] = useState(undefined);
    Log(user_email)

    const handleEmailResend = async () => {
        Log('handleEmailREsend working')
        startTransition(async () => {
            const req = await requestEmailVerification(user_email);
            if (req.success) {
                setSentStatus(true);
            }
        })

    }

    return (
        <>
            <AuthNav backUrl={'/auth/signIn'}/>
            <ContainerWrapper>
                <div className="text-black flex flex-col gap-3 items-center justify-center">
                    <span className="iconify ic--twotone-email text-[#667085] text-5xl"></span>
                    <h2 className="font-medium text-xl">Verify your email</h2>
                    <p className="text-subText text-center">We’ve sent an email to <span
                        className="font-bold">{user_email}</span>. Check and verify
                        your email
                        using
                        the link in the
                        message.</p>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center mt-5">
                    <IconContinuousButton text='Continue to Sign in' href="/auth/signIn"/>
                    {
                        !sentStatus &&
                        <IconButton text='Resend Link' isPending={isPending} onClick={handleEmailResend}
                                    variant={'secondary'}>Resend
                            Link</IconButton>
                    }
                    {
                        sentStatus &&
                        <div>
                            <p className='text-primaryColor text-sm'>
                                Verification email resent!
                            </p>
                        </div>
                    }
                </div>

            </ContainerWrapper>
        </>
    )
}
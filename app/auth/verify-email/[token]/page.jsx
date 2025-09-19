import {AuthNav} from "@/app/auth/_components";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {IconContinuousButton} from "@/app/_components";
import {HOSTNAME_URI} from "@/app/_config/main";
import {getLocalCookies} from "@/app/_lib/getCookies";

async function verifyEmail(token) {
    console.log('verify email verification')
    const res = await fetch(`${HOSTNAME_URI}/auth/verify-email?token=${token}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!res.ok) {
        console.log(res)
        return false;
    }

    const response = await res.json();
    console.log(response);
    return true;
}

export default async function Page({params}) {
    const {token} = await params;
    const {user_email} = await getLocalCookies(['user_email'])
    console.log({token, user_email});

    const successfulVerification = await verifyEmail(token);


    if (successfulVerification) {
        return (
            <>
                <AuthNav backUrl={'/auth/signIn'}/>
                <ContainerWrapper>
                    <div className="text-black flex flex-col gap-3 items-center justify-center">
                        <span className="iconify ic--twotone-email text-[#667085] text-5xl"></span>
                        <h2 className="font-medium text-xl">Account Verified</h2>
                        <p className="text-subText text-center">Congratulations, your email account {user_email}
                            has
                            been verified</p>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-center mt-5">
                        <IconContinuousButton text='Continue to sign in' href="/auth/signIn"/>
                    </div>
                </ContainerWrapper>
            </>
        )
    } else {
        return (
            <>
                <AuthNav backUrl={'/auth/signIn'}/>
                <ContainerWrapper>
                    <div className="text-black flex flex-col gap-3 items-center justify-center">
                        <span className="iconify ic--twotone-email text-[#667085] text-5xl"></span>
                        <h2 className="font-medium text-xl">Link has expired</h2>
                        <p className="text-subText text-center">Looks like the email verification link sent to
                            test@example.com has expired. No worries we can send the link again</p>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-center mt-5">
                        <IconContinuousButton text='Resend Verification Link' href={"/auth/verify-email"}>Resend
                            Link</IconContinuousButton>
                    </div>
                </ContainerWrapper>
            </>
        )
    }
}
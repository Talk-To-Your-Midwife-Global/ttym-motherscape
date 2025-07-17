import {getLocalCookies} from "@/app/_lib/getCookies";
import {VerifyEmailPage} from "@/app/auth/_components/VerifyEmail";

export default async function Page() {
    const {user_email} = await getLocalCookies(['user_email']);

    console.log({user_email});

    return (
        <>
            <VerifyEmailPage user_email={user_email}/>
        </>
    )
}
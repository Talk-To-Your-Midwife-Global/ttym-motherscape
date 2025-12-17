import {getLocalCookies} from "@/app/_lib/getCookies";
import {VerifyEmailPage} from "@/app/auth/_components/VerifyEmail";
import {Log} from "@/app/_lib/utils";

export default async function Page() {
    const {user_email} = await getLocalCookies(['user_email']);

    Log({user_email});

    return (
        <>
            <VerifyEmailPage user_email={user_email}/>
        </>
    )
}
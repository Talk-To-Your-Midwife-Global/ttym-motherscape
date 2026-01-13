import {getLocalCookies} from "@/app/_lib/getCookies";
import ProfilePage from "@/app/(settings)/_components/ProfilePage";

export default async function Page() {
    const {access_token} = await getLocalCookies(['access_token', 'ttym-user-type']);
    if (access_token) {
        return (
            <>
                <ProfilePage accessToken={access_token}/>
            </>
        )
    }
}
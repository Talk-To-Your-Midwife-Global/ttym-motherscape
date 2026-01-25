import {getLocalCookies} from "@/app/_lib/getCookies";
import ProfilePage from "@/app/(settings)/_components/ProfilePage";
import {decrypt} from "@/app/_actions/auth";
import {Log} from "@/app/_lib/utils";

export default async function Page() {
    const {access_token: encryptedAccessToken} = await getLocalCookies(['access_token', 'ttym-user-type']);
    let access_token = null;
    if (encryptedAccessToken) {
        try {
            access_token = await decrypt(encryptedAccessToken);
        } catch (e) {
            Log("profile/page.jsx; Page failed to decrypt access token", e);
        }
    }
    if (access_token) {
        return (
            <>
                <ProfilePage accessToken={access_token}/>
            </>
        )
    }
}
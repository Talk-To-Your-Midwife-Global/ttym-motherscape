import {EditProfileForm} from "@/app/(settings)/_components/editProfileForm";
import {getLocalCookies} from "@/app/_lib/getCookies";
import {decrypt} from "@/app/_actions/auth";
import {Log} from "@/app/_lib/utils";

export default async function Page() {
    const {access_token: encryptedAccessToken} = await getLocalCookies(['access_token'])
    let access_token = null;
    if (encryptedAccessToken) {
        try {
            access_token = await decrypt(encryptedAccessToken);
        } catch (e) {
            Log("edit-profile/page.jsx; Page failed to decrypt access token", e);
        }
    }

    return (
        <EditProfileForm accessToken={access_token}/>
    )
}
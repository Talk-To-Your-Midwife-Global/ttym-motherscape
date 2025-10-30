import {EditProfileForm} from "@/app/(settings)/_components/editProfileForm";
import {getLocalCookies} from "@/app/_lib/getCookies";

export default async function Page() {
    const {access_token} = await getLocalCookies(['access_token'])

    return (
        <EditProfileForm accessToken={access_token}/>
    )
}
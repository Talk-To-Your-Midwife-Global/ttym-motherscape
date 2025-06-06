"use client"
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {ProfileForm} from "@/app/(settings)/_components/ProfileForm";
import {useUserProfileInfo} from "@/app/_lib/fetchers";
import {ProfileImage} from "@/app/_components/ProfileImage";


export default function ProfilePage({accessToken}) {
    const {userProfileInfo, isLoading, error} = useUserProfileInfo(accessToken);
    // todo:check for loading and for errors

    console.log(userProfileInfo);


    return (
        <section>
            <SettingsNav pageLabel="Personal Profile"/>
            <div>
                <ProfileImage userProfileInfo={userProfileInfo}/>
                <ProfileForm profile={userProfileInfo?.user}/>
            </div>
        </section>
    )
}
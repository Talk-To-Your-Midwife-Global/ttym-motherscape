"use client"
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {ProfileForm} from "@/app/(settings)/_components/ProfileForm";
import {useUserProfileInfo} from "@/app/_lib/fetchers";

export default function ProfilePage({accessToken}) {
    const {userProfileInfo, isLoading, error} = useUserProfileInfo(accessToken);
    // todo:check for loading and for errors

    console.log(userProfileInfo);


    return (
        <section>
            <SettingsNav pageLabel="Personal Profile"/>
            <div>
                <div className=" rounded-full flex items-center justify-center">
                    {
                        userProfileInfo?.user?.profile_pic ? <img
                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${userProfileInfo?.user?.full_name}`}
                                alt={"avatar"}
                                className="rounded-full w-[100px] h-[100px]"/> :

                            <img
                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${userProfileInfo?.user?.full_name}`}
                                alt={"avatar"}
                                className="rounded-full w-[100px] h-[100px]"/>
                    }
                </div>
                <ProfileForm profile={userProfileInfo?.user}/>
            </div>
        </section>
    )
}
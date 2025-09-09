import Image from "next/image"
import sarah from "@/public/images/sarah.png"
import {Log} from "@/app/_lib/utils";

export function ProfileImage({userProfileInfo, onClick}) {
    const firstName = userProfileInfo?.user?.username || 'Panther';
    let src = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${firstName}&size=24&backgroundColor=d1d4f9`;

    Log("Profile Image", {userProfileInfo, firstName, src});

    return (
        <section className={'flex gap-3 bg-white items-center'}>
            <div tabIndex={0} onClick={() => onClick(true)}
                 className="bg-[#92857E] rounded-full w-[45px] h-[45px] flex items-center">
                <img
                    src={src}
                    alt={"avatar"}
                    className="rounded-full w-[35px] h-[35px]"/>
            </div>
            <h2 className={"text-[20px] font-medium text-[#3A3A3A]"}>{firstName}</h2>
        </section>
    )
}

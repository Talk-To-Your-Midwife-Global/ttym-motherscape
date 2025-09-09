import Image from "next/image"
import sarah from "@/public/images/sarah.png"

export function ProfileImage(props) {
    return <div className=".rounded-full .flex justify-start .items-center .justify-center">
        {
            props.userProfileInfo?.user?.profile_pic ?
                <Image src={sarah} alt={"your profile image"} width={80} height={30}/>
                :
                <img
                    // src={`https://api.dicebear.com/9.x/initials/svg?seed=${props.userProfileInfo?.user?.full_name}`}
                    src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${props.userProfileInfo?.user?.first_name}`}
                    alt={"avatar"}
                    className="rounded-full w-[100px] h-[100px]"/>
        }
    </div>;
}

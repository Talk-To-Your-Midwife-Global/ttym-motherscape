import Image from "next/image"
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {ProfileForm} from "@/app/(settings)/_components/ProfileForm";

export default function Page() {
    // get user information here

    return (
        <section>
            <SettingsNav pageLabel="Personal Profile"/>
            <div>
                <div className=" rounded-full flex items-center justify-center">
                    <img src="https://api.dicebear.com/9.x/initials/svg?seed=Felix"
                         alt={"avatar"}
                         className="rounded-full w-[100px] h-[100px]"/>
                </div>
                <ProfileForm/>

            </div>
        </section>
    )
}
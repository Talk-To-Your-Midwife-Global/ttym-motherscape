import Image from "next/image"
import Link from "next/link";
import character from "../../public/images/character-1.svg"
import {IconButton} from "../_components"

export default function Page() {
    return (
        <section>
            <div className="flex justify-end p-3">
                <Link href="/onboarding">
                    <span className="iconify material-symbols-light--close-rounded font-medium text-3xl"></span>
                </Link>
            </div>
            <Image className="relative left-2 " src={character} alt="midwife with a tab in hand"/>
            <div className="px-[20px]">
                <h2 className="text-mainText font-medium text-xl">Hi there! Eager to get started?</h2>
                <p className="text-subText">Let&apos;s set up your profile to help us get a better prediction.</p>
            </div>
            <div className="relative -bottom-10 w-full flex items-center justify-center">
                <IconButton onClick={undefined} href="/questions/1" text="Get Started"
                            icon="iconify lucide--arrow-right"/>
            </div>
        </section>
    )
}
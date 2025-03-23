import Link from "next/link";
import Image from "next/image";

import SignInForm from "../components/SignInForm";
import pregnantLogo from "../../../../public/images/ttym-rounded-logo.svg"

export default function Page() {
    return (
        <section>
            <header>
                <nav className="my-5">
                    <Link href="/onboarding/4" className="w-12 h-12 rounded-full flex justify-center items-center">
                        <span
                            className="iconify material-symbols-light--chevron-left-rounded font-medium text-3xl text-[#000]"></span>
                    </Link>
                </nav>

                <section className="flex flex-col gap-4 items-center mb-10">
                    <Image src={pregnantLogo} alt="pregnant woman"/>
                    <h2 className="text-mainText text-xl font-semibold">Welcome back</h2>
                    <p className="text-subText font-medium">Sign in to be able to access your page</p>
                </section>
            </header>
            <SignInForm/>
        </section>
    )
}
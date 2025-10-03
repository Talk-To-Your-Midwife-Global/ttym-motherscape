// "use client"
import {IOSInstallPrompt} from "@/app/_components/IOSInstallPrompt";
import {InstallPrompt} from "@/app/_components/InstallPrompt";

export default function VerifyLayout({children}) {
    return (
        <>
            {children}
            <InstallPrompt/>
            <IOSInstallPrompt/>
        </>
    )
}
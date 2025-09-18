"use client"
import {Drawer} from "vaul";
import Image from "next/image";
import ObaaLogo from "@/public/images/obaa-circular-logo.png";
import {useEffect, useState} from "react";
import {Log} from "@/app/_lib/utils";

export function IOSInstallPrompt() {
    const [showInstallMsg, setShowInstallMsg] = useState(false);
    useEffect(() => {
        const isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            Log("IOSInstallPrompt", {userAgent})
            return /iphone|ipad|ipod/.test(userAgent);
        }
        // Detects if device is in standalone mode
        const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

        const iOSDevice = isIos() && !isInStandaloneMode();
        Log("IOSInstallPrompt", {isIOS: isIos(), isInStandalone: isInStandaloneMode(), iOSDevice});

        // Checks if should display install popup notification:
        if (isIos() && !isInStandaloneMode()) {
            setShowInstallMsg(true);
        }
    }, [])
    return (
        <Drawer.Root open={showInstallMsg} onOpenChange={setShowInstallMsg}>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40"/>
                <Drawer.Content
                    className="bg-white flex flex-col rounded-t-[10px] mt-24 h-[350px] fixed bottom-0 left-0 right-0 outline-none">
                    <div
                        className="mx-auto w-12 h-1.5 mt-5 flex-shrink-0 rounded-full bg-gray-300 mb-8"/>
                    <section className="flex flex-col items-center justify-center">
                        <Drawer.Title>
                            <div
                                className={"bg-[#0F969C] rounded-xl w-[75px] h-[75px] flex items-center justify-center"}>
                                <Image src={ObaaLogo} alt="Obaa plus app logo" width={60} height={60}/>
                            </div>
                        </Drawer.Title>
                        <p className="my-2 text-[#444444] text-center w-5/6">Stay connected to your cycle and
                            pregnancy
                            updates
                            anytime, right
                            from
                            your
                            home screen</p>
                        <div className={'flex gap-5 my-3'}>
                        </div>
                        <span className={"text-primaryText"}>Tap <span
                            className={"iconify octicon--share-24"}></span>  and <b>Add to homescreen</b> to <b>install</b></span>
                    </section>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
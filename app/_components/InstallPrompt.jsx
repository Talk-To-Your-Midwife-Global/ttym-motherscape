"use client"
import {useEffect, useState} from "react";
import Image from "next/image";
import {Drawer} from "vaul";
import ObaaLogo from "@/public/images/obaa-circular-logo.png";
import {generateFibonacci, Log} from "@/app/_lib/utils";

export function InstallPrompt() {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    const shouldShow = () => {
        const nums = JSON.parse(localStorage.getItem('sequence'));
        const counter = JSON.parse(localStorage.getItem('counter')) || 1;

        Log("shouldShow INstallPrompt", {counter, nums});
        localStorage.setItem('counter', JSON.stringify(counter + 1));
        return !!nums[counter];
    }

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setInstallPrompt(e)
            const shShow = shouldShow()
            Log('Before Install prompt fired!', {shouldShow: shShow})
            setIsInstallable(shShow); // change this to false; to prevent showing and make it a todos
        }
        // check if the user is opening from the PWA
        const openedFromPWA = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
        if (!openedFromPWA) {
            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            localStorage.setItem('sequence', JSON.stringify(generateFibonacci()));
        }

        return () => {
            console.log('Removing install prompt')
            if (!openedFromPWA) {
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            }
        }
    }, [])

    const handleInstallClick = () => {
        if (!installPrompt) return

        const result = installPrompt.prompt();
        const {outcome} = result.userChoice;

        if (outcome === "accepted") {
            setIsInstallable(false)
            setInstallPrompt(null)
        }
    }

    if (!isInstallable) {
        return null
    }

    return (
        <Drawer.Root open={isInstallable} onOpenChange={setIsInstallable}>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40"/>
                <Drawer.Content
                    className="bg-white flex flex-col rounded-t-[10px] mt-24 h-[350px] fixed bottom-0 left-0 right-0 outline-none">
                    <div aria-hidden className="mx-auto w-12 h-1.5 mt-5 flex-shrink-0 rounded-full bg-gray-300 mb-8"/>
                    <section className="flex flex-col items-center justify-center">
                        <Drawer.Title>
                            <div
                                className={"bg-[#0F969C] rounded-xl w-[75px] h-[75px] flex items-center justify-center"}>
                                <Image src={ObaaLogo} alt="Obaa plus app logo" width={60} height={60}/>
                            </div>
                        </Drawer.Title>
                        <p className="my-2 text-[#444444] text-center w-5/6">Stay connected to your cycle and pregnancy
                            updates
                            anytime, right
                            from
                            your
                            home screen</p>
                        <div className={'flex gap-5 my-3'}>
                            <button
                                onClick={handleInstallClick}
                                className="bg-[#0F969C]
                                         text-white px-6 py-4 rounded-full text-[18px] font-medium"
                            >
                                Install App
                            </button>
                        </div>
                        <span
                            className="font-medium text-[14px] text-[#E82A73] .text-white p-2 rounded-md flex items-center gap-1"> Your journey deserves it!</span>
                    </section>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
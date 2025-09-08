"use client"
import {useEffect, useState} from "react";
import Image from "next/image";
import {Drawer} from "vaul";
import ObaaLogo from "@/public/images/obaa-circular-logo.png";

export function InstallPrompt() {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setInstallPrompt(e)
            console.log('Before Install prompt fired!')
            setIsInstallable(true);
        }
        // check if the user is opening from the PWA
        const openedFromPWA = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
        if (!openedFromPWA) {
            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
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
            {/*        className="fixed z-50 bottom-4 ,right-4 bg-white rounded-t-xl p-4 rounded-lg shadow-lg w-screen flex items-center justify-center">*/}
            {/*        <section className="flex flex-col items-center justify-center">*/}
            {/*            <div className={"bg-[#0F969C] rounded-md w-[60px] h-[60px] flex items-center justify-center"}>*/}
            {/*                <Image src={ObaaLogo} alt="Obaa plus app logo" width={50} height={50}/>*/}
            {/*            </div>*/}
            {/*            <p className="mb-2 text-black">Stay connected to your cycle and pregnancy updates anytime, right*/}
            {/*                from*/}
            {/*                your*/}
            {/*                home screen</p>*/}
            {/*            <div className={'flex gap-5'}>*/}
            {/*                <button*/}
            {/*                    onClick={handleInstallClick}*/}
            {/*                    className="bg-[#0F969C]*/}
            {/*                         text-white px-4 py-2 rounded font-medium"*/}
            {/*                >*/}
            {/*                    Install App*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*            <span className="font-medium text-[18px] text-[#828282]">Your journey deserves it.</span>*/}
            {/*        </section>*/}
            {/*    </div>*/}
            {/*</section>*/}
            {/*<Drawer.Trigger*/}
            {/*    className="absolute right-0 z-40 bottom-10 flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">*/}
            {/*    Open Drawer*/}
            {/*</Drawer.Trigger>*/}
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40"/>
                <Drawer.Content
                    className="bg-white flex flex-col rounded-t-[10px] mt-24 h-[350px] fixed bottom-0 left-0 right-0 outline-none">
                    <div aria-hidden className="mx-auto w-12 h-1.5 mt-5 flex-shrink-0 rounded-full bg-gray-300 mb-8"/>
                    <section className="flex flex-col items-center justify-center">
                        <div className={"bg-[#0F969C] rounded-xl w-[75px] h-[75px] flex items-center justify-center"}>
                            <Image src={ObaaLogo} alt="Obaa plus app logo" width={60} height={60}/>
                        </div>
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
                        <span className="font-medium text-[18px] text-[#828282]">Your journey deserves it.</span>
                    </section>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
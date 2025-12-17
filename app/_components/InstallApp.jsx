"use client"
import {useState} from "react";
import Image from "next/image";
import ObaaLogo from "@/public/images/obaabrandmark.svg"
import {PageFadeAnimator} from "@/app/_components/index";
import {TapWrapper} from "@/app/_components/TapWrapper";
import {useEffect} from "react";
import {generateFibonacci, Log} from "@/app/_lib/utils";
import posthog from "posthog-js";


export function InstallApp() {
    const [isIOSDevice, setIsIOSDevice] = useState(false);
    const [installPrompt, setInstallPrompt] = useState(null);
    const [showInstructions, setShowInstructions] = useState(false);
    const [isInstallable, setIsInstallable] = useState(false);

    const handleInstallClick = () => {
        if (isIOSDevice) {
            setShowInstructions(true)
        }
        if (!installPrompt) return

        posthog.capture('Clicked install app');

        const result = installPrompt.prompt();
        const {outcome} = result.userChoice;

        if (outcome === "accepted") {
            setIsInstallable(false)
            setInstallPrompt(null)
        }
    }

    useEffect(() => {
        // iOS checker
        const isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            Log("IOSInstallPrompt", {userAgent})
            return /iphone|ipad|ipod/.test(userAgent);
        }

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setInstallPrompt(e)
            setIsInstallable(true);
        }

        // check if the user is opening from the PWA
        const openedFromPWA = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
        if (!openedFromPWA && !isIos()) {
            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        } else {
            posthog.capture("Opened from app with Android");
        }


        // Detects if device is in standalone mode
        const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

        const isAnIOSDevice = isIos() && !isInStandaloneMode();
        Log({isAnIOSDevice, isIOS: isIos(), isInStandalone: !isInStandaloneMode()});
        // Checks if should display install popup notification:
        if (isAnIOSDevice) {
            setIsInstallable(true);
            setIsIOSDevice(true);
        }

        return () => {
            Log('Removing install prompt')
            if (!openedFromPWA) {
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            }
        }
    }, [])

    if (!isInstallable) {
        return null
    }
    return (
        <PageFadeAnimator>
            {
                !showInstructions &&
                <section
                    className={"h-[108px] bg-radial-glow-bottom bg-[length:150%_100%] bg-no-repeat rounded-lg flex items-center px-5 .w-[300px]"}>
                    <section className={"flex gap-3 items-center"}>
                        <div>
                            <Image src={ObaaLogo} alt={"Obaa flower brand mark image (a lotus flower)"} height={83}
                                   width={83} priority={true}/>
                        </div>
                        <div>
                            <h3 className={"text-lg text-white"}>Install Obaa+</h3>
                            <p className={"text-[#CCDDE0] text-sm w-[95%] wrap"}>Never miss out on any new updates and
                                features</p>
                        </div>
                    </section>
                    <section className={'w-[125px]'}>
                        <TapWrapper customStyles={'flex items-center justify-center relative top-2'}>
                            <button onClick={handleInstallClick}
                                    className={"bg-[rgba(255,255,255,0.5)] text-white border-2 border-white rounded-full w-[100px] py-2 px-2 text-[13px] flex items-center justify-center"}>
                                Install Now
                            </button>
                        </TapWrapper>
                    </section>
                </section>
            }

            {showInstructions && <section
                className={"h-[108px] bg-radial-glow-bottom bg-[length:150%_100%] bg-no-repeat rounded-lg flex flex-col justify-center items-center px-5 text-white"}>
                <p className="my-2 text-white text-sm w-5/6">Two Easy Taps</p>
                <ol className={"list-decimal pl-2 text-sm font-bold"}>
                    <li>
                        Tap <span
                        className={"iconify octicon--share-24"}/> at the bottom of your screen
                    </li>

                    <li>Scroll and tap &apos;Add to homescreen&apos;</li>
                </ol>
            </section>}
        </PageFadeAnimator>
    )
}
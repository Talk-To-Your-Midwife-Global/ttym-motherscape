"use client"
import {useEffect, useState} from "react";

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
        <div className="fixed z-20 bottom-4 right-4 bg-blue-600 p-4 rounded-lg shadow-lg">
            <p className="mb-2 text-white">Install this app for a better experience!</p>
            <button
                onClick={handleInstallClick}
                className="bg-white
                 text-blue-600 px-4 py-2 rounded font-medium"
            >
                Install App
            </button>
        </div>
    )
}
"use client"

import {useEffect, useState} from "react";
import {Log} from "@/app/_lib/utils";

export function OfflineBanner() {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        if (window) {
            Log("isOnline", navigator.onLine);
            setIsOnline(navigator.onLine);
        }
    }, []);

    if (isOnline) {
        return null
    }
    return (
        <section className={"bg-gray-500 text-gray-200 p-2 flex gap-2 items-center fixed top-0 z-10 w-full"}>
            <span className={"iconify lucide--badge-alert text-2xl"}></span>
            You are currently offline
        </section>
    )
}
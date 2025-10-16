"use client"
import Link from "next/link";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import dullBell from "@/public/icons/notification.svg"
import activeBell from "@/public/icons/notification-active.svg"

export function SettingsNav({pageLabel}) {
    return (
        <ContainerWrapper>
            <div className="flex items-center .justify-between ">
                <div>
                    <Link href="/dashboard/me"
                          className="bg-[#16898E1A] w-12 h-12 rounded-full flex justify-center items-center">
                        <span className={`iconify lucide--chevron-left text-2xl`}></span>
                    </Link>
                </div>

                <div className="text-gray-700 mx-[auto]">
                    <p className="font-semibold text-xl">{pageLabel}</p>
                </div>
            </div>
        </ContainerWrapper>
    )
}
"use client"
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {TapWrapper} from "@/app/_components/TapWrapper";
import {useRouter} from "next/navigation";


export function SettingsNav({pageLabel}) {
    const router = useRouter();
    const handleBackRouting = () => {
        router.back();
    }
    return (
        <ContainerWrapper>
            <div className="grid grid-cols-3 items-center">
                <div>
                    <TapWrapper clickAction={handleBackRouting}>
                        <div
                            className="border-2 border-[#DADADA] w-12 h-12 rounded-full flex justify-center items-center text-[#1E1E1E]">
                            <span className={`iconify lucide--chevron-left text-2xl`}></span>
                        </div>
                    </TapWrapper>
                </div>

                <div className="col-span-2  text-gray-700 relative bottom-2">
                    <p className="font-semibold text-xl">{pageLabel}</p>
                </div>
            </div>
        </ContainerWrapper>
    )
}
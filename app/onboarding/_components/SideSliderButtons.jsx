"use client"
import {useRouter} from "next/navigation";

export function SideSliderButtons({children, userType, step = 0}) {
    const router = useRouter();
    const route = `/onboarding/${userType}`;
    const current = Number(step);
    const max = 3;

    const handleForwardClick = (e) => {
        e.preventDefault();
        if (current < max) {
            router.push(`${route}/${current + 1}`);
        }
    }

    const handleBackwardClick = (e) => {
        e.preventDefault();
        if (current >= 1) {
            router.push(`${route}/${current - 1}`);
        }
    }

    return (
        <>
            <div tabIndex={0} onClick={(e) => handleBackwardClick(e)}
                 className="fixed left-0 h-screen w-[100px] .border-2 .border-amber-200 z-20 flex items-center">
            </div>
            {children}
            <div tabIndex={0} onClick={(e) => handleForwardClick(e)}
                 className="fixed top-0 right-0 h-screen w-[100px] .border-2 .border-amber-200 z-20 flex items-center">
            </div>
        </>
    )
}
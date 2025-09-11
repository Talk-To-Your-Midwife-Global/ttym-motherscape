"use client"
import * as React from "react";
import {Navigation} from "@/app/dashboard/components/navigation";
import {Drawer} from "vaul";
import {ProfileImage} from "@/app/_components/ProfileImage";

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

export const SideNav = ({accessToken, open, handleOpen, userProfileInfo}) => {
    return (
        <Drawer.Root direction="left" open={open} onOpenChange={handleOpen} className={"w-[500px]"}>
            <Drawer.Trigger
                className="relative flex flex-shrink-0 items-center justify-center overflow-hidden bg-white text-sm font-medium transition-all hover:bg-[#FAFAFA] ">
                <ProfileImage userProfileInfo={userProfileInfo}/>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40"/>
                <Drawer.Content
                    className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[360px] flex border-3"
                    // The gap between the edge of the screen and the drawer is 8px in this case.
                    style={{'--initial-transform': 'calc(100% + 8px)'}}
                >
                    <Drawer.Title>
                        Something
                    </Drawer.Title>
                    <Navigation accessToken={accessToken}/>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>

    );
};

"use client"

import {TapWrapper} from "@/app/_components/TapWrapper";
import {NavItem} from "@/app/dashboard/components/index";
import {CalendarIcon, ChatIcon, CommunityIcon, HomeIcon, LogsIcon} from "@/app/dashboard/components/icons";

export function DashboardBottomNav({paramName}) {
    return (
        <nav
            className={"bg-white w-screen fixed bottom-0 pt-1 h-[80px] flex justify-evenly drop-shadow-custom-black"}>
            <TapWrapper>
                <NavItem text={"me"} active={paramName.route === "me"}><HomeIcon/></NavItem>
            </TapWrapper>
            <TapWrapper>
                <NavItem text={"logs"} active={paramName.route === "logs"}><LogsIcon/></NavItem>
            </TapWrapper>
            <TapWrapper>
                <NavItem text={"calendar"} withText={false}> <CalendarIcon/> </NavItem>
            </TapWrapper>
            <TapWrapper>
                <NavItem text={"chat"} active={paramName.route === "chat"}><ChatIcon/></NavItem>
            </TapWrapper>
            <TapWrapper>
                <NavItem text={"community"} active={paramName.route === "community"}><CommunityIcon/></NavItem>
            </TapWrapper>
        </nav>
    )
}
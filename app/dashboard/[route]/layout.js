import {DashboardNav, NavItem} from "@/app/dashboard/components";
import {PageFadeAnimator} from "@/app/_components";
import {SideNav} from "@/app/dashboard/components/sideNav";
import {cookies} from "next/headers";
import {CalendarIcon, ChatIcon, CommunityIcon, HomeIcon, LogsIcon} from "@/app/dashboard/components/icons";

export default async function DashboardLayout({children, params}) {
    const paramName = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    console.log(paramName);

    const shouldName = {
        "me": "",
        "logs": "Logs",
        "community": "Community",
        "chat": "Chats"
    }
    return (
        <section>
            <header className={"px-5"}><DashboardNav text={shouldName[paramName.route]}/></header>
            <SideNav accessToken={accessToken}/>
            <PageFadeAnimator>
                {children}
                <div className={`h-[100px]`}></div>
            </PageFadeAnimator>
            <nav
                className={"bg-white w-screen fixed bottom-0 pt-1 h-[80px] flex justify-evenly drop-shadow-custom-black"}>
                <NavItem text={"me"} active={paramName.route === "me"}><HomeIcon/></NavItem>
                <NavItem text={"logs"} active={paramName.route === "logs"}><LogsIcon/></NavItem>
                <NavItem text={"calendar"} withText={false}> <CalendarIcon/> </NavItem>
                <NavItem text={"chat"} active={paramName.route === "chat"}><ChatIcon/></NavItem>
                <NavItem text={"community"} active={paramName.route === "community"}><CommunityIcon/></NavItem>
            </nav>
        </section>
    )
}
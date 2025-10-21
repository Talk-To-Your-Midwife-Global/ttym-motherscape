import {DashboardNav} from "@/app/dashboard/components";
import {PageFadeAnimator} from "@/app/_components";
import {Log} from "@/app/_lib/utils";
import {getLocalCookies} from "@/app/_lib/getCookies";
import {DashboardBottomNav} from "@/app/dashboard/components/DashboardBottomNav";
import {OfflineBanner} from "@/app/_components/OfflineBanner";

export default async function DashboardRouteLayout({children, params}) {
    const paramName = await params;
    const {access_token} = await getLocalCookies(['access_token']);
    Log(paramName);

    const shouldName = {
        "me": "",
        "logs": "Logs",
        "community": "Community",
        "chat": "Chats"
    }

    return (
        <section>
            <OfflineBanner/>
            <header className={"pl-4"}>
                <DashboardNav text={shouldName[paramName.route]} accessToken={access_token}/>
            </header>
            <PageFadeAnimator>
                {children}
                <div className={`h-[100px]`}></div>
            </PageFadeAnimator>
            <DashboardBottomNav paramName={paramName}/>
        </section>
    )
}
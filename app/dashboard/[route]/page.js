import {Chat} from "@/app/dashboard/components/chat";
import {Community} from "@/app/dashboard/components/community";
import {Logs} from "@/app/dashboard/components/logs";
import {CalendarMain} from "@/app/dashboard/components/menstrualcycletracker/calendar";
import {MenstrualHome} from "@/app/dashboard/components/menstrualcycletracker/home.jsx";
import {PregnantCalendarMain} from "@/app/dashboard/components/pregnancytracker/calendar";
import {PregnancyHome} from "@/app/dashboard/components/pregnancytracker/home";
import {cookies} from "next/headers";
import {InstallPrompt} from "@/app/_components/InstallPrompt";


export default async function Page({params}) {
    const routeName = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    const userType = cookieStore.get('ttym-user-type')?.value;
    const socketUrl = process.env.NEXT_PUBLIC_WS_URL;
    const menstrualViews = {
        'me': <MenstrualHome accessToken={accessToken}/>,
        'calendar': <CalendarMain accessToken={accessToken}/>,
        'logs': <Logs accessToken={accessToken}/>,
        'community': <Community accessToken={accessToken}/>,
        'chat': <Chat accessToken={accessToken} socketURL={socketUrl}/>
    }

    const pregnancyViews = {
        'me': <PregnancyHome accessToken={accessToken}/>,
        'calendar': <PregnantCalendarMain accessToken={accessToken}/>,
        'logs': <Logs accessToken={accessToken}/>,
        'chat': <Chat accessToken={accessToken} socketUrl={socketUrl}/>,
        'community': <Community accessToken={accessToken}/>
    }
    if (userType === "trackmyperiod") {
        return (
            <section>
                <InstallPrompt/>
                {menstrualViews[routeName.route]}
            </section>
        )
    }

    if (userType === "trackmypregnancy") {
        return (
            <section>
                {pregnancyViews[routeName.route]}
            </section>
        )
    }
}
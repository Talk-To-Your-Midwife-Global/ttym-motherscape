import {cookies} from "next/headers";
import {CalendarMain} from "@/app/dashboard/components/menstrualcycletracker/calendar";
import {Logs} from "@/app/dashboard/components/logs";
import {Community} from "@/app/dashboard/components/community";
import {Chat} from "@/app/dashboard/components/chat";
import {MenstrualHome} from "@/app/dashboard/components/menstrualcycletracker/home.jsx";
import {PregnancyHome} from "@/app/dashboard/components/pregnancytracker/home";
import {PregnantCalendarMain} from "@/app/dashboard/components/pregnancytracker/calendar";


export default async function Page({params}) {
    const routeName = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    const userType = cookieStore.get('ttym-user-type')?.value;

    const menstrualViews = {
        'me': <MenstrualHome accessToken={accessToken}/>,
        'calendar': <CalendarMain accessToken={accessToken}/>,
        'logs': <Logs accessToken={accessToken}/>,
        'community': <Community accessToken={accessToken}/>,
        'chat': <Chat accessToken={accessToken}/>
    }

    const pregnancyViews = {
        'me': <PregnancyHome accessToken={accessToken}/>,
        'calendar': <PregnantCalendarMain accessToken={accessToken}/>,
        'logs': <Logs accessToken={accessToken}/>,
        'chat': <Chat accessToken={accessToken}/>,
        'community': <Community accessToken={accessToken}/>
    }
    if (userType === "trackmyperiod") {
        return (
            <section>
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
import {cookies} from "next/headers";
import {Home} from "@/app/dashboard/components/home";
import {CalendarMain} from "@/app/dashboard/components/calendar";
import {Logs} from "@/app/dashboard/components/logs";
import {Community} from "@/app/dashboard/components/community";
import {Chat} from "@/app/dashboard/components/chat";


export default async function Page({params}) {
    const routeName = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    const views = {
        'me': <Home accessToken={accessToken} />,
        'calendar': <CalendarMain accessToken={accessToken} />,
        'logs': <Logs />,
        'community': <Community />,
        'chat': <Chat />
    }
    return (
        <section>
            {views[routeName.route]}
        </section>
    )
}
import {cookies} from "next/headers";
import {Home} from "@/app/dashboard/components/home";
import {HOSTNAME} from "@/app/config/main";
import {CalendarMain} from "@/app/dashboard/components/calendar";

async function getUser() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    console.log('access', accessToken)
    const response = await fetch(`http://${HOSTNAME}:8000/user/patient/details/`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    })
    return response.text() // Because of the error; it should be .json()
}

export default async function Page({params}) {
    const routeName = await params;
    const userData = getUser();

    const [user] = await Promise.all([userData])
    console.log(user)

    const views = {
        'me': <Home />,
        'calendar': <CalendarMain />,
    }
    return (
        <section>
            {views[routeName.route]}
        </section>
    )
}
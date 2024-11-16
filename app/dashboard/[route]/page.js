import {cookies} from "next/headers";
import {Home} from "@/app/dashboard/components/home";
import {HOSTNAME} from "@/app/config/main";
import {CalendarMain} from "@/app/dashboard/components/calendar";
import {menstrualCycleDateGenerator, necessaryDataForMenstrualUI} from "@/app/lib/functions";

async function getUser() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    const refreshToken = cookieStore.get('refresh_token')?.value;
    try {
        const response = await fetch(`http://${HOSTNAME}:8000/auth/token/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        })
        if (response.ok) {
            return response.json();
        } else {
            try {
                const ref =  await fetch(`http://${HOSTNAME}:8000/auth/token/refresh`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${refreshToken}`
                    },
                })
                const resp = ref.json()
                cookieStore.set('access_token', resp.tokens.access)
                cookieStore.set('refresh_token', resp.tokens.refresh)
            } catch(err) {
                console.error(err)
            }
        }
    } catch (error) {
        console.error(error)
    }
}

async function getUserCycleInfo() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    try {

    const response = await fetch(`http://${HOSTNAME}:8000/user/patient/details/`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    })
    let res = await response.json();
    console.log(res)
    // Add menstrual dates to response
    // res.calendar = menstrualCycleDateGenerator(res.period_start, res.period_length, "general", res.cycle_length)
    res = necessaryDataForMenstrualUI(res)
    return res
    } catch(error) {
        console.error(error)
    }
}

export default async function Page({params}) {
    const routeName = await params;
    const userCycleData = getUserCycleInfo();
    const userData = getUser();

    const [user, userMenstrualCycle] = await Promise.all([userData, userCycleData])
    console.log(userMenstrualCycle)
    console.log(user)

    const views = {
        'me': <Home user={user.user} data={userMenstrualCycle} />,
        'calendar': <CalendarMain data={userMenstrualCycle} />,
    }
    return (
        <section>
            {views[routeName.route]}
        </section>
    )
}
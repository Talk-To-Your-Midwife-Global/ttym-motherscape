import {Home} from "@/app/dashboard/components/home";


export default async function Page({params}) {
    const routeName = await params;

    const views = {
        'me': <Home />
    }
    return (
        <section>
            {views[routeName.route]}
        </section>
    )
}
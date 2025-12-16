import {ChangePasswordForm} from "@/app/(settings)/_components/ChangePasswordForm";
import {Log} from "@/app/_lib/utils";

export default async function Page({params}) {
    const route = await params;
    Log({route: route?.key})
    return (
        <section>
            <ChangePasswordForm specialKey={route?.key}/>
        </section>
    )
}
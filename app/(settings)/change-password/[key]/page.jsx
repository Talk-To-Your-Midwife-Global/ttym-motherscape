import {ChangePasswordForm} from "@/app/(settings)/_components/ChangePasswordForm";

export default async function Page({params}) {
    const route = await params;
    console.log({route: route?.key})
    return (
        <section>
            <ChangePasswordForm specialKey={route?.key}/>
        </section>
    )
}
import {cookies} from "next/headers";
import {ChatPage} from "@/app/chatroom/components";
import {Log} from "@/app/_lib/utils";

export default async function Page({params}) {
    const route = await params;
    const chatId = route.user;

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    Log(accessToken)

    return (
        <section>
            <ChatPage chatId={chatId} accessToken={accessToken}/>
        </section>
    )
}
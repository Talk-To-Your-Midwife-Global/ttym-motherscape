import {cookies} from "next/headers";
import {ChatPage} from "@/app/chatroom/components";

export default async function Page({params}) {
    const route = await params;
    const chatId = route.user;

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    console.log(accessToken)

    return (
        <section>
            <ChatPage chatId={chatId} accessToken={accessToken}/>
        </section>
    )
}
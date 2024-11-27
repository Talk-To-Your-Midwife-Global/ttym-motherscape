import {ChatPage} from "@/app/chatroom/components";

export default async function Page({params}) {
    const route = await params;
    const user = route.user;
    

    return (
        <section>
            <ChatPage/>
        </section>
    )
}
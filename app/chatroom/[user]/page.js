import {ChatContainer, ChatHeader} from "@/app/chatroom/components";

export default async function Page({params}) {
    const route = await params;
    const user = route.user;

    return (
        <section>
            <ChatHeader/>
            <ChatContainer/>
            {/*<div className={`w-full flex gap-3 mb-5`}>Chat page</div>*/}
        </section>
    )
}
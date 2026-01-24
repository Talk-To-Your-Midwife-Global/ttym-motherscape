import {cookies} from "next/headers";
import {ChatPage} from "@/app/chatroom/components";
import {Log} from "@/app/_lib/utils";
import {decrypt} from "@/app/_actions/auth";

export default async function Page({params}) {
    const route = await params;
    const chatId = route.user;

    const cookieStore = await cookies();
    const encryptedAccessToken = cookieStore.get('access_token')?.value;
    let accessToken = null;
    if (encryptedAccessToken) {
        try {
            accessToken = await decrypt(encryptedAccessToken);
        } catch (e) {
            Log("chatroom/[user]/page.js; Page failed to decrypt access token", e);
        }
    }
    Log(accessToken)

    return (
        <section>
            <ChatPage chatId={chatId} accessToken={accessToken}/>
        </section>
    )
}
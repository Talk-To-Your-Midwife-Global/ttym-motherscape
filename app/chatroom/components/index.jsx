"use client"
import Image from "next/image";
import Link from "next/link";
import {montserrat} from "@/app/_fonts";
import {useEffect, useState, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {useWebSocket} from "@/app/_hooks/useWebSocket";
import {Log} from "@/app/_lib/utils";

export function ChatPage({chatId, accessToken}) {
    const [messages, setMessages] = useState([]);
    const [friend, setFriend] = useState({});
    const {
        isConnected,
        onEvent,
        sendMessage,
    } = useWebSocket(`wss://${process.env.NEXT_PUBLIC_WS_URL}/ws/`, accessToken)


    const handleNewMessage = (data) => {
        setMessages(prevMessages => [...prevMessages, data?.messages])
    }

    const handleViewMessages = (data) => {
        const friendData = data?.friend;
        setFriend(friendData);
        setMessages([...messages, data?.messages].flat().reverse())
    }

    useEffect(() => {
        onEvent('message.send', handleNewMessage);
        onEvent('message.list', handleViewMessages)
        sendMessage('message.list', {connection_id: chatId, page: 0})
    }, [isConnected])

    return (
        <>
            <ChatHeader info={friend}/>
            <ChatContainer messages={messages} forwardMessage={sendMessage} profileImg={friend.profile_pic}
                           chatId={chatId}/>
        </>
    )
}

export function ChatHeader({info}) {
    const userHasProfilePic = info.profile_pic;

    return (
        <header className={`w-full fixed top-0 bg-white flex gap-3 .my-5 px-5 py-4 border-b border-[#E4E4E4D4] z-10`}>
            <div className={`.w-full flex text-primaryText items-center justify-center text-2xl`}>
                <Link href={"/dashboard/chat"}>
                    <span className={`iconify lucide--chevron-left`}></span>
                </Link>
            </div>
            <section className={`flex items-center gap-3 relative .bottom-10`}>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                {userHasProfilePic ?
                    <Image src={`${PUBLICHOSTNAME}${info?.profile_pic || '/media/'}`}
                           alt={"user profile image"} width={55} height={55} priority={true}
                           className={`overflow-hidden rounded-full`}
                    /> :
                    <div
                        className={`w-[55px] h-[55px] rounded-full overflow-hidden flex items-center justify-center border-2 bg-[#E4E4E4D4]`}>
                        <span className={`iconify lucide--user text-2xl text-primaryText`}></span>
                    </div>
                }

                <div>
                    <h2 className={`text-primaryText text-md font-medium w-[160px]`}>{info?.full_name}</h2>
                    <div className={`flex gap-2 items-center`}>
                        <p className={`text-subText text-[10px] ${montserrat.className}`}>Active now</p>
                        <div className={`.absolute w-2 h-2 bg-[#0FE16D] z-2 bottom-0 right-2 rounded-full`}></div>
                    </div>
                </div>
            </section>
        </header>
    )
}


export const ChatContainer = ({forwardMessage, messages, chatId, profileImg}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const messagesEndRef = useRef(null);
    const handleChange = (e) => {
        setCurrentMessage(e.target.value);
        Log(messages)
    }

    const handleSendChat = () => {
        Log(currentMessage, chatId)

        forwardMessage('message.send', {
            connection_id: chatId,
            message: currentMessage
        })
        setCurrentMessage("")

    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return (
        <div className="chat-container">
            <ul className={`chat-ul`}>
                <AnimatePresence initial={false} mode="popLayout">
                    {messages.map((chat) => {
                        Log(chat);
                        return (
                            !chat?.is_mine ? (<motion.li
                                key={chat.id}
                                className={`chat-li`}
                                layout
                                initial={{opacity: 0, y: 50, scale: 0.3}}
                                animate={{opacity: 1, y: 0, scale: 1}}
                                exit={{opacity: 0, scale: 0.5, transition: {duration: 0.2}}}
                            >
                                {/*<MiniProfileImage profileImg={profileImg}/>*/}
                                <UserChatCard message={chat?.text}/>

                            </motion.li>) : (<motion.li
                                key={chat.id}
                                className={`response-li`}
                                layout
                                initial={{opacity: 0, y: 50, scale: 0.3}}
                                animate={{opacity: 1, y: 0, scale: 1}}
                                exit={{opacity: 0, scale: 0.5, transition: {duration: 0.2}}}
                            >
                                <ResponseChatCard message={chat?.text}/>
                            </motion.li>)

                        )
                    })}
                </AnimatePresence>
                <div ref={messagesEndRef}></div>
            </ul>
            <section
                className="chat-add w-full flex  bg-[#F3F6F6] items-center rounded-lg ">
                <div className={'bg-[#F3F6F6] py-2 rounded-xl text-sm flex-1 mx-5'}>
                    <input type={'text'} onChange={handleChange}
                           value={currentMessage}
                           className={`w-[300px] bg-transparent px-4 py-2 rounded-md outline-none text-[#383737] placeholder:text-[#797C7B80]`}
                           name={"message"}
                           placeholder={"Write your message"}/>
                </div>
                <button className={`text-lg w-1/4 flex items-center flex-start`}
                        onClick={() => handleSendChat()}>
                    <span className={`iconify lucide--send`}></span>
                </button>
            </section>
        </div>
    );
};

export function MiniProfileImage({profileImg}) {
    const userHasProfilePic = true;
    const profileImage = `${PUBLICHOSTNAME}${profileImg || '/media/'}`
    return (
        <section className={`mr-10`}>
            {userHasProfilePic ?
                <Image src={profileImage}
                       alt={"user profile image"} width={45} height={45} priority={true}
                       className={`overflow-hidden rounded-full absolute left-0`}
                /> :
                <div
                    className={`w-[55px] h-[55px] .absolute rounded-full overflow-hidden flex items-center justify-center border-2 bg-[#E4E4E4D4]`}>
                    <span className={`iconify lucide--user text-2xl text-primaryText`}></span>
                </div>
            }
        </section>
    )
}


export function UserChatCard({message}) {
    return (
        <div className={`pl-4 pr-3 py-5 flex items-center justify-center max-w-[300px] text-wrap`}>
            <p>{message}</p>
        </div>
    )
}

export function ResponseChatCard({message}) {
    return (
        <div className={`pl-4 pr-3 py-5 flex items-center justify-center max-w-[300px]`}>
            <p>{message}</p>
        </div>
    )
}

export function ChatActions() {
    return (
        <section>

        </section>
    )
}
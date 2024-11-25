"use client"
import Image from "next/image";
import Link from "next/link";
import sarah from "@/public/images/sarah.png";
import {montserrat} from "@/app/fonts";
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {addChat} from "@/app/chatroom/lib";
// import { CloseButton } from "./CloseButton";
// import { add, remove } from "./array-utils";

export function ChatHeader() {
    return (
        <header className={`w-full fixed top-0 bg-white flex gap-3 .my-5 px-5 py-4 border-b border-[#E4E4E4D4] z-10`}>
            <div className={`.w-full flex text-primaryText items-center justify-center text-2xl`}>
                <Link href={"/dashboard/chat"}>
                    <span className={`iconify lucide--chevron-left`}></span>
                </Link>
            </div>
            <section className={`flex items-center gap-3 relative .bottom-10`}>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Image src={sarah} alt={"your profile image"} width={50} height={30}/>
                <div>
                    <h2 className={`text-primaryText text-md font-medium w-[160px]`}> Global Midwife </h2>
                    <div className={`flex gap-2 items-center`}>
                        <p className={`text-subText text-[10px] ${montserrat.className}`}>Active now</p>
                        <div className={`.absolute w-2 h-2 bg-[#0FE16D] z-2 bottom-0 right-2 rounded-full`}></div>
                    </div>
                </div>
            </section>
        </header>
    )
}


export const ChatContainer = () => {
    const [chats, setChats] = useState([{}]);
    const [currentMessage, setCurrentMessage] = useState("");

    const handleChange = (e) => {
        setCurrentMessage(e.target.value);
    }

    const handleSendChat = () => {
        setChats(addChat(chats, currentMessage))
        setCurrentMessage("")

    }

    return (
        <div className="chat-container">
            <ul className={`chat-ul`}>
                <AnimatePresence initial={false} mode="popLayout">
                    {chats.map((chat, index) => (
                        (index % 2) === 0 ? (<motion.li
                            key={index}
                            className={`chat-li`}
                            layout
                            initial={{opacity: 0, y: 50, scale: 0.3}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0, scale: 0.5, transition: {duration: 0.2}}}
                        >
                            {/*<CloseButton*/}
                            {/*    close={() => setNotifications(remove(notifications, id))}*/}
                            {/*/>*/}
                            <MyChatCard message={chat?.message}/>

                        </motion.li>) : (<motion.li
                            key={index + 24}
                            className={`response-li`}
                            layout
                            initial={{opacity: 0, y: 50, scale: 0.3}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0, scale: 0.5, transition: {duration: 0.2}}}
                        >
                            <ResponseChatCard message={chat?.message}/>
                        </motion.li>)

                    ))}
                </AnimatePresence>
            </ul>
            <section
                className="chat-add w-full flex  bg-[#F3F6F6] items-center ">
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


export function MyChatCard({message}) {
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
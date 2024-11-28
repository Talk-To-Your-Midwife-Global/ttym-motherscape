"use client"
import Image from "next/image"
import messageImage from "@/public/images/message-undraw.svg"
// import voice from "@/public/icons/voice.svg"
import {montserrat} from "@/app/fonts";
import {ChatCard} from "@/app/dashboard/components/index";
import {useWebSocket} from "@/app/hooks/useWebSocket";
import {useEffect, useState} from "react";

export function Chat({accessToken, isPddaired = true}) {
    const [isPaired, setIsPaired] = useState(false);
    const [chatList, setChatList] = useState([]);
    
    const {
        isConnected,
        onEvent,
        sendMessage,
        newEvent
    } = useWebSocket(`ws://${process.env.NEXT_PUBLIC_HOSTNAME}/ws/`, accessToken)

    const handleIsAssigned = (data) => {
        console.log(data)
        if (data.length > 0) {
            setIsPaired(true)
            console.log(chatList.length)
            setChatList(prevList => data.filter(person => person.person.id !== prevList.includes(person.person.id)));
            console.log(chatList.length)
            console.log(chatList)
        } else {

        }
    }

    const requestMidwife = () => {
        sendMessage('request.midwife');
    }

    useEffect(() => {
        onEvent('chat.list', handleIsAssigned);
        onEvent('register.midwife', handleIsAssigned);
        onEvent('connect.new', handleIsAssigned)
        sendMessage('chat.list')
    }, [isConnected, newEvent]);

    if (isPaired) {
        return (
            <section className="mt-10 flex flex-col gap-2 .items-center px-5">
                <div>
                    <div className={`border-2 rounded-full flex items-center gap-2 bg-white p-2`}>
                        <span className={`iconify lucide--search`}></span>
                        <input type={"search"} name={'search'} placeholder={'Search here...'}
                               className={`flex-1 outline-none bg-transparent text-primaryText`}/>
                        {/*<Image src={voice} alt={'search'} />*/}
                    </div>
                </div>
                {/* favourites */}
                <section
                    className={`my-5 flex gap-3 text-[#878787A1] bg-[#F2F2F2BD] border-2 border-dashed rounded-full w-10 h-10 items-center justify-center`}>
                    <div className={`flex items-center`}>
                        <span className={`iconify lucide--plus`}></span>
                    </div>
                </section>

                <section>
                    {
                        chatList.map((chat) => (
                            <div key={chat?.person.id}>
                                <ChatCard info={chat}/>
                            </div>
                        ))
                    }
                </section>
            </section>
        )
    }
    if (!isPaired === true) {
        return (
            <section>
                <section className={'mt-10 flex flex-col gap-2 items-center'}>
                    <Image src={messageImage} alt="Chat"/>
                    <div className={`flex flex-col gap-3 justify-center`}>
                        <p className={`${montserrat.className} text-primaryText text-sm flex flex-col items-center`}>
                            Hold on, you will be paired with the
                            <span className={`text-primaryColor font-medium`}>Global Midwife</span>
                        </p>
                        <span className={`text-center`}> or </span>
                        <button onClick={() => requestMidwife()}
                                className={`p-2 rounded-md text-white bg-primaryColor`}>
                            Speak to a midwife today
                        </button>
                    </div>
                </section>
            </section>
        )
    }


}
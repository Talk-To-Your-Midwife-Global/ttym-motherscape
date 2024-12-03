"use client"
import Image from "next/image"
import {useEffect, useState} from "react";
import {useWebSocket} from "@/app/hooks/useWebSocket";
import {montserrat} from "@/app/fonts";
import {ChatCard} from "@/app/dashboard/components/index";
import messageImage from "@/public/images/message-undraw.svg"

// import voice from "@/public/icons/voice.svg"

export function Chat({accessToken}) {
    const [isPaired, setIsPaired] = useState({status: false, pending: false});
    const [chatList, setChatList] = useState([]);
    const chatDisplay = JSON.parse(localStorage.getItem("chatDisplay"));

    const {
        isConnected,
        onEvent,
        sendMessage,
    } = useWebSocket(`wss://${process.env.NEXT_PUBLIC_HOSTNAME}/ws/`, accessToken)

    const handleIsAssigned = (data) => {
        console.log('handleAssigned', data);
        if (data.length > 0) {
            localStorage.setItem("chatDisplay", JSON.stringify(true));
            setIsPaired(prevState => ({...prevState, pending: true, status: true}));
            setChatList(prevList => data.filter(person => person.person.id !== prevList.includes(person.person.id)));
        } else {
            setIsPaired({...isPaired, status: false, pending: true})
        }
    }

    const handlePendingAssignment = (data) => {
        console.log('pending assignment', data[0]?.status);
        if (data[0].length > 0 && data[0]?.status === "pending-them") {
            localStorage.setItem("chatDisplay", JSON.stringify(false));
            setIsPaired(({...isPaired, pending: true}));
        } else {
            setIsPaired({...isPaired, status: true, pending: false});
        }
    }

    const requestMidwife = () => {
        sendMessage('request.midwife');
        setIsPaired(prevState => ({...prevState, pending: true}));
    }

    useEffect(() => {
        onEvent('chat.list', handleIsAssigned);
        onEvent('connect.new', handleIsAssigned)
        onEvent('request.list', handlePendingAssignment)
        sendMessage('request.list');
        sendMessage('chat.list')
    }, [isConnected]);

    if (chatDisplay) {
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

    return (
        <section>
            <section className={'mt-10 flex flex-col gap-2 items-center'}>
                <Image src={messageImage} alt="Chat"/>
                <div className={`flex flex-col gap-3 justify-center`}>
                    {
                        isPaired.pending ?
                            <p className={`${montserrat.className} text-primaryText text-sm flex flex-col items-center`}>
                                Hold on, you are being paired with a
                                <span className={`text-primaryColor font-medium`}>Global Midwife</span>
                            </p>
                            :
                            <button onClick={() => requestMidwife()}
                                    className={`p-2 rounded-md text-white bg-primaryColor`}>
                                Speak to a midwife today
                            </button>
                    }
                </div>
            </section>
        </section>
    )


}
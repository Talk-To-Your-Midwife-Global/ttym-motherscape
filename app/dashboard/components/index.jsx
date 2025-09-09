"use client"
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
} from "date-fns";
import {montserrat} from "@/app/_fonts";
import Link from "next/link";
import calendarIcon from "@/public/icons/calendar-three.svg"
import nameFlower from "@/public/images/name-flower.svg"
import optionsIcon from "@/public/icons/options.svg"
import {
    menstrualCycleDateGenerator,
    necessaryDataForMenstrualUI,
    relatableDay,
    relatableNumber
} from "@/app/_lib/functions";
import {bookmarkPost, unbookmarkPost} from "@/app/dashboard/actions/action";
import drip from "@/public/icons/drip.svg";
import clock from "@/public/icons/clock.svg";
import cycle from "@/public/icons/cycle.svg";
import pregnancyIcon from "@/public/icons/pregnancy.svg";
import {ActionLink, MiniLoader} from "@/app/_components";
import {useCycleInfo, useUserInfo} from "@/app/dashboard/lib/dataFetching";
import {useRouter} from "next/navigation";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {getRelativeTime} from "@/app/dashboard/lib/functions";
import {Events} from "@/app/dashboard/components/events";
import goodFace from "@/public/icons/faces/good.svg";
import badFace from "@/public/icons/faces/bad.svg";
import angryFace from "@/public/icons/faces/angry.svg";
import tiredFace from "@/public/icons/faces/tired.svg";
import happyFace from "@/public/icons/faces/happy.svg";
import neutralFace from "@/public/icons/faces/neutral.svg";
import flower from "@/public/images/name-flower.svg";
import cycleCalendarIcon from "@/public/icons/pregnant/cyclecalendar.svg"
import cycleTimeCircleIcon from "@/public/icons/pregnant/cycletimecircle.svg"
import cycleGraphIcon from "@/public/icons/pregnant/cyclegraph.svg"
import cycleWeightIcon from "@/public/icons/pregnant/cycleweight.svg"
import notificationIcon from "@/public/icons/bell.svg"
import {BookmarkingIcon} from "@/app/dashboard/components/icons";
import {ArticleParent} from "@/app/dashboard/components/ui/ArticleParent";
import {Log} from "@/app/_lib/utils";
import posthog from "posthog-js";
import {ProfileImage} from "@/app/_components/ProfileImage";
import {SideNav} from "@/app/dashboard/components/sideNav";
import {TapWrapper} from "@/app/_components/TapWrapper";

export function DashboardHeader(user) {
    Log('dashboardheader_info_display', {user});
    return (
        <header className={"px-5"}>
            <section className={"text-primaryText"}>
                <p className={`text-subText text-sm font-medium ${montserrat.className}`}>Welcome 👋</p>
                <p className={"flex items-center text-3xl"}> {user?.user.username} <Image src={flower}
                                                                                          alt={"flower"}/></p>
            </section>
        </header>
    )
}

export function DashboardNav({text = "", accessToken}) {
    const [hasNotifications, setHasNotifications] = useState(false);
    const [open, setOpen] = useState(false);
    const {user} = useUserInfo(accessToken);

    const handleOpen = (value) => {
        setOpen(value);
    }

    return (
        <section>
            <nav className={"w-full flex justify-between items-center my-5"}>
                <div className={"bg-[#0F969C] w-[55px] h-[55px] rounded-full w-fit h-fit"}>
                    <SideNav userProfileInfo={user} accessToken={accessToken} open={open} handleOpen={handleOpen}/>
                </div>

                <div className={`rounded-full h-[50px] p-4 flex gap-4 items-center justify-end`}>
                    <TapWrapper>
                        <div className={"w-[55px] h-[55px] rounded-full border-2 flex items-center justify-center "}>
                            <Image src={calendarIcon} alt={"Calendary icon"} width={17.4} height={17.4}/>
                        </div>
                    </TapWrapper>
                    <TapWrapper>
                        <div
                            className={"w-[55px] h-[55px] relative rounded-full border-2 flex items-center justify-center "}>
                            {hasNotifications && <div
                                className={"absolute bg-primaryColor w-[20px] h-[20px] text-[12px] text-white " +
                                    "rounded-full p-1 top-0 right-0 flex items-center justify-center"}>
                                <span>5</span>
                            </div>}
                            <Image src={notificationIcon} width={17.4} height={17.4} alt={"active bell icon"}/>
                        </div>
                    </TapWrapper>

                </div>
            </nav>
        </section>
    )
}

export function NavItem({children, text = "default", style = "", withText = true, active = false}) {
    return (
        <section
            className={`${montserrat.className} ${active ? 'text-primaryColor' : 'text-[#0000004D]'} ${style} w-[35px]`}>
            <Link className={"flex flex-col justify-end gap-2 items-center"} href={"/dashboard/" + text}>
                <div className={"pt-3"}>
                    {children}
                </div>

                {withText && <p className={"capitalize text-sm font-medium"}>
                    {text}
                </p>}
            </Link>
        </section>
    )
}

export function Card({head, status, highlight = "", children}) {
    return (
        <article className={"bg-white rounded-lg w-full h-16 drop-shadow-sm border my-5 flex items-center"}>
            <div className={"flex items-center px-2"}>
                {children}
            </div>

            <div className={"flex-1"}>
                <p> {head} <span className="text-primaryColor font-medium text-sm">{highlight}</span></p>
                <p className={`text-[#72777A] text-sm`}>{status}</p>
            </div>
        </article>
    )
}

export const CircularProgressBar = ({children, percentage, bg = "currentColor", foreBg = "currentColor"}) => {
    const [percent, setPercent] = useState(0)
    const radius = 150;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    useEffect(() => {
        const interval = setInterval(() => {
            setPercent((prev) => {
                if (prev >= percentage) {
                    clearInterval(interval);
                    return percentage
                } else {
                    return prev + 1;
                }
            });
        }, 100)
    }, [percent])

    return (
        <div className="flex gap-3 mb-10 items-center justify-center relative">
            <svg width="550" height="340" className="-rotate-90">
                <circle
                    className="text-gray-300"
                    stroke={bg}
                    strokeWidth="25"
                    fill="transparent"
                    r={radius}
                    cx="170"
                    cy="170"
                />
                <circle
                    className="text-blue-500"
                    stroke={foreBg}
                    strokeWidth="25"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx="170"
                    cy="170"
                    style={{transition: 'stroke-dashoffset 0.1s ease'}}
                />
            </svg>
            <div className={'absolute flex flex-col items-center justify-center gap-5'}>
                {children}
            </div>
        </div>
    );
};

export function PregnancyProgressBar({trimester, weeks, daysRemaining, progress}) {
    return (
        <div className="flex flex-col gap-4 items-start w-full .max-w-lg p-4 border rounded-md shadow-lg bg-white">
            <span className="text-primaryText text-sm font-medium">{trimester}</span>
            <div className="flex justify-between w-full .flex-col">
                <span className="text-md text-primaryText font-bold">{weeks} weeks</span>
                <span className="text-primaryText text-sm">{daysRemaining} days to childbirth</span>
            </div>


            {/* Progress Bar */}
            <div className="relative w-full h-4 bg-gray-200  rounded-full">

                <div className="bg-gray-200  h-4 rounded-l-full w-[120px]">
                    {/* Segment 1 */}
                    <div
                        className="absolute top-0 left-0 h-4 bg-tertiaryColor rounded-l-full"
                        style={{width: `${progress.segment1}%`}}
                    ></div>
                </div>

                {/* Segment 2 */}
                <div className="bg-[#0F969C26] absolute top-0 left-[calc(40%)]  h-4 .rounded-l-full w-[90px]">
                    <div
                        className="absolute top-0 .left-[calc(40%)] h-4 bg-primaryColor"
                        style={{width: `${progress.segment2}%`}}
                    ></div>
                </div>

                {/* Segment 3 */}
                <div
                    className="absolute top-0 left-[calc(70%)] .-z-10 h-4 bg-cyan-200 rounded-r-full"
                    style={{width: `${progress.segment3}%`}}
                ></div>

                {/* Circle Indicator */}
                <div
                    className="absolute top-1/2 left-[calc(40%)] transform -translate-y-1/2 w-6 h-6 bg-white border-4 border-tertiaryColor rounded-full"
                    style={{left: `calc(${progress.circlePosition}% - 12px)`}}
                ></div>
            </div>
        </div>

    );
}

export function MenstrualCycleCardMain({accessToken}) {
    const {data, error, isLoading} = useCycleInfo(accessToken);
    const generalCycleInfo = necessaryDataForMenstrualUI(data || []);

    if (isLoading) return <div>loading...</div>
    Log("From the card")
    Log({data});
    if (error) {
        return (
            <div>
                error
                {error.message}
            </div>
        )
    }

    return (
        <section className={"mt-4"}>
            {
                generalCycleInfo?.stage === "Menstrual" ?
                    <>
                        <Card head={`You are currently in: ${generalCycleInfo?.stage} Phase`}
                              status={` Period started  days ago`}>
                            <Image src={drip} alt={"drip "}/>
                        </Card>
                        <Card head={`Period Length: ${generalCycleInfo?.periodLength} days`}
                              status={generalCycleInfo?.periodLength > 5 ? 'Abnormal' : 'Normal'}>
                            <Image src={clock} alt={"drip "}/>
                        </Card>
                    </> :
                    <>
                        <Card head={`Period begins: ${relatableDay(generalCycleInfo?.daysToPeriod)} `}
                              status={`${generalCycleInfo?.daysToPeriod} day${generalCycleInfo?.daysToPeriod > 1 ? 's' : ''} to go`}>
                            <Image src={drip} alt={"drip "}/>
                        </Card>
                        <Card head={`You are currently in: ${generalCycleInfo?.stage} Phase`}
                              status={`Day ${generalCycleInfo?.daysDone} of ${generalCycleInfo?.cycleLength}`}>
                            <Image src={clock} alt={"drip "}/>
                        </Card>
                    </>

            }
            <Card head={`Cycle Length: ${generalCycleInfo?.cycleLength} days`}
                  status={generalCycleInfo?.cycleLength >= 26 && generalCycleInfo?.cycleLength <= 31 ? 'Normal' : 'Abnormal'}>
                <Image src={cycle} alt={"drip"}/>
            </Card>
            <Card head={`Pregnancy`} status={generalCycleInfo?.stage === "Ovulation" ? "High" : 'Low'}>
                <Image src={pregnancyIcon} alt={"drip "}/>
            </Card>
        </section>
    )
}

export function PregnancyCycleCardMain({data, accessToken}) {
    return (
        <section className={"mt-4"}>
            <Card head={`Week ${data?.week} of 40`}
                  status={`Current Week Of Pregnancy`}>
                <Image src={cycleCalendarIcon} alt={"calendar icon"}/>
            </Card>
            <Card head={`You are currently in your:`} highlight={`${data?.trimester} Trimester`}
                  status={`${data?.month} Months Pregnant`}>
                <Image src={cycleTimeCircleIcon} alt={"A clock"}/>
            </Card>
            <Card head={`${data?.length || 0}cm long`}
                  status={'Baby Size'}>
                <Image src={cycleGraphIcon} alt={"graph icon"}/>
            </Card>
            <Card head={`${data?.weight}g`} status={'Baby Weight'}>
                <Image src={cycleWeightIcon} alt={"weight icon"}/>
            </Card>
        </section>
    )
}


export function InsightCard({insight, accessToken}) {
    const [bookmarked, setBookmarked] = useState(false);

    const handlePostBookmarking = async (id) => {
        setBookmarked(prevState => !prevState)
        if (bookmarked) {
            const marked = await unbookmarkPost(id, accessToken)
            setBookmarked(marked.marked)
        } else {
            const marked = await bookmarkPost(id, accessToken)
            setBookmarked(marked.marked)
        }

    }
    return (
        <article
            className={`bg-white carousel-item rounded-2xl px-5 py-4 h-[250px] flex-shrink-0 w-48 drop-shadow-custom-green`}>
            <div
                className={`border-2 border-black rounded-full w-20 h-20 flex items-center justify-center overflow-hidden`}>
                <Image src={`${PUBLICHOSTNAME}${insight?.image}`} width={200} height={200}
                       alt={"image of a bloating stomach"}/>
            </div>
            <header>
                <h3 className={`${montserrat.className} text-subText text-sm uppercase my-3 font-medium`}>{insight?.tags[0].name}</h3>
                <h2 className={`text-primaryText font-semibold w-full`}> {insight?.title} </h2>
            </header>
            <section className={`my-4 flex gap-4 items-center`}>
                <div onClick={() => {
                    handlePostBookmarking(1) // TODO: Fix this

                }} className={` ${bookmarked ? 'text-primaryColor' : 'text-transparent'}`}>
                    <BookmarkingIcon/>
                </div>
                <span className={"text-sm"}>{relatableNumber(Number(insight?.reads))} reads</span>
            </section>
        </article>
    )
}

export function ChatCard({key, info}) {
    Log(info)
    const router = useRouter()
    const [showOptions, setShowOptions] = useState(false)
    const optionsRef = useRef(null);
    const userHasProfilePic = info.person.profile_pic;
    const userHasNewMessages = info?.preview !== "No messages yet...";
    const lastMessageTime = getRelativeTime(new Date(info.last_updated))

    const handleClickOutside = () => {
        setShowOptions(false)
    }

    const handleAddUserToFavList = (userInfo) => {
        // TODO: add user to fav list
        Log('added user to fav list')
    }

    const handleMarkMessageAsRead = (userInfo) => {
        // TODO: mark message as read
        Log('marked message as read')
    }

    const handleMoveToChat = () => {
        router.push(`/chatroom/${info?.id}/`)

    }
    /**
     * Remove pop-up when user click anywhere on the screen
     */
    useEffect(() => {
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    })

    return (
        <section key={key} className={`w-full flex gap-3 mb-5`}>
            <div className={`overflow-hidden w-[55px] h-[55px] relative`}>
                {userHasProfilePic ?
                    <Image src={`${PUBLICHOSTNAME}${info?.person.profile_pic || '/media/'}`}
                           alt={"user profile image"} width={55} height={55} className={`overflow-hidden rounded-full`}
                    /> :
                    <div
                        className={`w-[55px] h-[55px] rounded-full overflow-hidden flex items-center justify-center border-2 bg-[#E4E4E4D4]`}>
                        <span className={`iconify lucide--user text-2xl text-primaryText`}></span>
                    </div>
                }
                <div className={`absolute w-2 h-2 bg-[#0FE16D] z-2 bottom-0 right-2 rounded-full`}></div>
            </div>
            <section className={`flex items-center text-primaryText`} tabIndex={0}
                     onClick={() => handleMoveToChat('identifier')}>
                <div className={`grow`}>
                    <div className={`flex gap-2`}>
                        <h2 className={`font-semibold text-lg`}>{info?.person?.full_name} </h2>
                        {/*<span*/}
                        {/*    className={`bg-[#F04A4C] text-white text-[12px] .p-1 w-[20px] h-[20px] flex items-center justify-center rounded-full`}>2</span>*/}

                    </div>
                    {userHasNewMessages &&
                        <div>
                            <h3 className={`text-sm font-light w-[200px] h-[20px] truncate ${montserrat.className}`}>{info?.preview}</h3>
                            <p className={`text-[10px] text-[#797C7B80] font-light`}>{lastMessageTime}</p>
                        </div>
                    }
                </div>
            </section>
            <div className={`flex-1 flex items-center justify-end relative`}>
                <div tabIndex={0} onClick={() => setShowOptions(!showOptions)}>
                    <Image src={optionsIcon} alt={"chat card options icon"}/>
                </div>
                {
                    showOptions &&
                    <section ref={optionsRef}
                             className={`flex text-primaryText absolute shadow-lg bg-white right-5 top-10 w-[150px] h-[100px] rounded-xl z-20 `}>
                        <ul className={`flex flex-col gap-4 space-evenly p-5 text-sm`}>
                            <li onClick={() => handleAddUserToFavList()}>Add to Favorite</li>
                            <li onClick={() => handleMarkMessageAsRead()}>Mark as read</li>
                        </ul>
                    </section>
                }
            </div>
        </section>
    )
}

export function InsightParent({head, desc, accessToken}) {
    // const {insights, isLoadingInsights, insightError} = useInsightsInfo()
    //
    // if (isLoadingInsights) {
    //     return <MiniLoader/>
    // }
    //
    // if (insightError) {
    //     return <section>
    //         <p>Error loading insights {insightError.message}</p>
    //     </section>
    // }

    return (
        <section className={"px-5 my-10 "}>
            <header>
                <div className={"flex justify-between"}>
                    <h2 className={"text-primaryText font-bold text-xl"}>{head} </h2> <Link href={"/"}>See
                    More</Link> {/* TODO: use the right link*/}
                </div>
                <p className={`${montserrat.className} text-subText`}>{desc}</p>
            </header>
            <section className={'`carousel flex overflow-x-auto scroll-smooth space-x-4 py-4'}>
                {/* TODO: Empty state ui and loop instead */}
                {/*{*/}
                {/*    insights &&*/}
                {/*    insights?.data?.map(insight => (*/}
                {/*        <InsightCard key={insight.id} insight={insight} accessToken={accessToken}/>*/}
                {/*    ))*/}
                {/*}*/}
                <ArticleParent/>
            </section>
        </section>
    )
}

function CalendarTemplate({
                              startWeek,
                              endWeek,
                              currentMonth,
                              specialDates = [],
                              action = {},
                              dateClick = undefined
                          }, withFlower = true) {
    const days = []
    let day = startWeek;
    while (day <= endWeek) {
        days.push(day)
        day = addDays(day, 1)
    }
    return (
        <section className={`p-4 max-w-md text-primaryText`}>
            <div className={`flex mb-5`}>
                <div className={`flex-1 flex items-center gap-2`}>
                    <Image src={calendarIcon} alt={`Calendar icon`}/>
                    <h2> {format(currentMonth, "MMMM yyyy")} </h2>
                    {withFlower && <Image src={nameFlower} alt={'pink flower'}/>}
                </div>
                <div>
                    <ActionLink text={action?.actionText} href={action?.link} onClick={action?.action}/>
                </div>
            </div>
            <div className={`grid grid-cols-7 gap-2`}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayName, index) => (
                    <div key={index} className={`text-center text-[#6C7072] text-sm`}>
                        {dayName}
                    </div>
                ))}
                {
                    days.map((day, index) => {
                        const isCurrentMonth = isSameMonth(day, currentMonth)
                        const customStyle = specialDates.find((styleDate) => isSameDay(styleDate.date, day))?.style

                        return (
                            <div key={index} onClick={() => dateClick(day)} className={`p-2 text-center rounded-full
                                ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                                ${customStyle && customStyle}
                            `}>
                                {format(day, 'd')}
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export function ShortCalendar({
                                  action,
                                  withFlower,
                                  accessToken,
                                  specialDates,
                                  type = "menstrual",
                                  dateClick = undefined
                              }) {
    // const {data, error, isLoading} = useCycleInfo(accessToken)
    let specialDays = specialDates;
    // if (type !== "menstrual") {
    //     specialDays = specialDates;
    // } else {
    //     specialDays = specialDates ? specialDates : menstrualCycleDateGenerator(data?.current_cycle?.start_date, data?.period_length, "general", data?.cycle_length);
    // }

    Log({specialDays});

    const [currentMonth, setCurrentMonth] = useState(new Date())
    const startWeek = startOfWeek(new Date())
    const endWeek = endOfWeek(new Date())

    // if (isLoading) {
    //     return (
    //         <div>
    //             loading...
    //         </div>
    //     )
    // }
    //
    // if (error) {
    //     return (
    //         <div>
    //             error
    //             {error.message}
    //         </div>
    //     )
    // }
    return (
        <div>
            <CalendarTemplate startWeek={startWeek} endWeek={endWeek} currentMonth={currentMonth}
                              specialDates={specialDays} action={action} dateClick={dateClick}
                              withFlower={withFlower}/>
        </div>
    )
}

export function Calendar({action, withFlower, specialDates, accessToken}) {
    const {data, error, isLoading} = useCycleInfo(accessToken);
    specialDates = specialDates ? specialDates : menstrualCycleDateGenerator(data?.start_date, data?.period_length, "general", data?.cycle_length);
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const startMonth = startOfMonth(currentMonth)
    const endMonth = endOfMonth(currentMonth)
    const startWeek = startOfWeek(startMonth)
    const endWeek = endOfWeek(endMonth)

    if (isLoading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                error
                {error.message}
            </div>
        )
    }

    return (
        <div>
            <CalendarTemplate startWeek={startWeek} endWeek={endWeek} currentMonth={currentMonth}
                              specialDates={specialDates} action={action} withFlower={withFlower}/>
        </div>
    )
}

export function FeelingsInsightsAndEvents({accessToken}) {
    const faces = [
        {desc: "good", img: goodFace, color: "#251FD1"},
        {desc: "bad", img: badFace},
        {desc: "angry", img: angryFace},
        {desc: "tired", img: tiredFace},
        {desc: "happy", img: happyFace},
        {desc: "neutral", img: neutralFace}
    ]
    const [feelingRecorded, setFeelingRecorded] = useState(false)
    const [feeling, setFeeling] = useState({feeling: '', number: 0});

    const handleFeeling = (selectedFeeling) => {
        posthog.capture('home_feelings_click');
        const randomNumber = Math.floor(Math.random() * 100, 1);
        setFeeling({...feeling, feeling: selectedFeeling, number: randomNumber})
        setFeelingRecorded(true);
    }

    const getRespectiveImage = (feelingName) => {
        const respectiveFeeling = faces.filter((face) => face.desc === feelingName);
        return respectiveFeeling[0].img;
    }
    return (
        <section>
            {!feelingRecorded ?
                <section className={"text-primaryText "}>
                    <header className={"px-5 font-bold text-xl"}>
                        <h2>How do you feel today?</h2>
                    </header>
                    <section className={"flex justify-evenly my-5"}>
                        {faces.map(face => {
                            return (
                                <div key={face.desc} className={"flex flex-col items-center justify-evenly"}>
                                    <Image onClick={() => handleFeeling(face.desc)} src={face.img} alt={"face"}/>
                                    <p> {face.desc} </p>
                                </div>
                            )
                        })
                        }
                    </section>
                </section> :
                <div className={"bg-tertiaryColor text-white p-4 rounded-3xl  mx-5"}>
                    <heading className="text-white flex justify-between text-xl">
                        <div className="text-white flex gap-2">
                            <h2 className='capitalize'>Feeling {feeling.feeling}?</h2>
                            <Image className={'text-white'} src={getRespectiveImage(feeling.feeling)}
                                   alt={"face"}/>
                        </div>
                        <span className="iconify lucide--x"></span>
                    </heading>
                    <p className={`font-extralight text-sm my-4`}>
                        You are feeling <span>{feeling.feeling}</span> with <b>{feeling.number} others</b>
                    </p>
                    <div className="flex mt-3 .items-end justify-end mt-5">
                        <Link href="/dashboard/community">
                            <span className="text-sm text-left underline">Learn more about your emotions</span>
                        </Link>
                    </div>
                </div>
            }

            <section className={"px-5 my-10 "}>
                <header>
                    <div className={"flex justify-between"}>
                        <h2 className={"text-primaryText font-bold text-xl"}>Cycle Insights</h2> <Link
                        href={"/dashboard/community"}>See More</Link> {/* TODO: use the right link*/}
                    </div>
                    <p className={`${montserrat.className} text-subText`}>Personalized health tips based on logged
                        data</p>
                </header>
                {/*<Insights accessToken={accessToken}/>*/}
                <ArticleParent/>
            </section>
            <Events accessToken={accessToken}/>
        </section>
    )
}

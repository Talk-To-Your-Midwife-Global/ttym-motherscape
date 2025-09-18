"use client"
import {Drawer} from "vaul"
import {useCalendarView} from "@/app/contexts/showCalendarContext";
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import 'react-phone-number-input/style.css'
import {useState, useTransition} from "react";
import {IconButton} from "@/app/_components";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {Log} from "@/app/_lib/utils";
import posthog from "posthog-js";


export function RestartCalendar({refreshPage, accessToken}) {
    const [isPending, startTransition] = useTransition();
    const {isUsingPredictedCycle, setIsUsingPredictedCycle} = useCalendarView();
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (date) => {
        // Because passing it directly is causing issues
        const formattedDate = date.toISOString().split('T')[0];
        if (date) {
            setSelectedDate(formattedDate); // the raw date was passed because the formatted date causes an error
        }
    }

    const handleDateConfirm = () => {
        posthog.capture('user_newcycle_indication');

        const jsonBody = JSON.stringify({
            start_date: selectedDate
        })

        Log("RestartCalendar.jsx; restart date handleDateConfirm", {jsonBody})

        startTransition(async () => {
            const res = await fetch(`${PUBLICHOSTNAME}/menstrual/cycles/start/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: jsonBody
            })
            const response = await res.json();
            if (!res.ok) {
                Log("RestartCalendar.jsx; handleDateConfirm @ /cycles/end failed", {response});
                posthog.captureException(`RestartCalendar.jsx; handleDateConfirm @ /cycles/end failed, ${response}`);
            }
            Log("RestartCalendar.jsx; handleDateConfirm success", {response})
            setIsUsingPredictedCycle(false);
        })
        window.location.reload() // because all the other SPA related ways of refreshing for Next.js failed to work
        setSelectedDate(selectedDate)
    }

    return (
        <Drawer.Root dismissible={false} open={isUsingPredictedCycle}
                     onOpenChange={setIsUsingPredictedCycle}>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed .h-screen .w-screen inset-0 .bg-red-100 bg-[#00000061] .z-40"/>
                <Drawer.Content
                    className="bg-white flex flex-col rounded-t-[10px] mt-24 max-h-[578px] fixed bottom-0 left-0 right-0 outline-none text-primaryText shadow-xl">
                    <div className="mx-auto my-2 w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 .mb-2"/>
                    <Drawer.Title className={"flex flex-col justify-center items-center my-2 "}>
                        <h2>It&apos;s Been a While 👋</h2>
                        <p className={"text-[#6C6C6C] text-center"}>When did your period begin? Confirm or adjust below
                            to keep
                            things on track.</p>
                    </Drawer.Title>
                    <div className={"flex flex-col items-center justify-center gap-5"}>
                        <DayPicker
                            animate
                            navLayout="around"
                            mode="single"
                            startMonth={new Date(new Date().getFullYear(), new Date().getMonth() - 1)}
                            endMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
                            selected={selectedDate}
                            onSelect={handleDateChange}
                            timeZone="UTC"
                            classNames={{
                                today: `border-2 border-primaryColor rounded-full`, // Add a border to today's date
                                selected: `border-pink text-white bg-[#E82A73] rounded-full`, // Highlight the selected day
                                // root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
                                week_day: `bg-white`, // eg. Mon, tue,
                                // day: `bg-white`,

                                chevron: `fill-[#000000] border-2 .p-2 rounded-full`, // Change the color of the chevron
                            }}
                        />

                        <IconButton customStyles={"mb-3"} text={"confirm"} isPending={isPending}
                                    onClick={handleDateConfirm}/>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
"use client"
import {useEffect, useState, useTransition} from "react";
import {inter} from "@/app/_fonts";
import {IconButton} from "@/app/_components";
import {ShortCalendar} from "@/app/dashboard/components/index";
import {logLog} from "@/app/dashboard/actions/action";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {formatDate} from "@/app/_lib/functions";
import {compareDesc} from "date-fns";
import {Log} from "@/app/_lib/utils";
import {useCalendarView} from "@/app/contexts/showCalendarContext";
import posthog from "posthog-js";


export const moodEmoticons = {
    "happy": "😊",
    "sad": "😔",
    "calm": "😌",
    "tired": "😴",
    "energetic": "⚡",
    "irritated": "😠",
    "horny": "💕",
    "depressed": "😞",
    "mood swings": "🌪️",
    "anxious": "😰",
    "uneasy": "😟",
    "frustrated": "😤",
    "mixed feelings": "😕"
};
export const symptomEmoticons = {
    "fine": "💪",
    "fatigue": "🥱",
    "insomnia": "😴",
    "cramps": "🤕",
    "headache": "🤯",
    "abdominal pain": "🤰",
    "acne": "🌸",
    "tender breast": "🤱",
    "swelling": "💧",
    "cravings": "🍫",
    "nausea": "🤢",
    "heartburn": "🔥",
    "constipation": "🚽",
    "diarrhea": "💩",
    "vaginal discharge": "🩸",
    "dizziness": "😵",
    "frequent urination": "🚻",
    "shortness of breath": "😮‍💨",
    "morning sickness": "🌅"
};

export function Logs({accessToken}) {
    const [disableBtn, setDisableButton] = useState(true);
    const [isPending, startTransition] = useTransition();
    const [feelingState, setFeelingState] = useState({moods: [], symptoms: []})
    const [userType, setUserType] = useState("");
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const {viewingDate, setViewingDate} = useCalendarView();


    async function getUserLogs() {
        Log("Logs Page accesstoken and url", {accessToken, PUBLICHOSTNAME, viewingDate})
        try {
            const response = await fetch(`${PUBLICHOSTNAME}/logs?date=${formatDate(viewingDate)}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error("Could not fetch logs");
            }
            const logs = await response.json();
            const hasLogs = logs.length > 0;
            Log("logs.jsx; fetching logs", {logs, hasLogs})
            if (hasLogs) {
                setDisableButton(true)
                setFeelingState({moods: logs[0].mood, symptoms: logs[0].symptoms});
                setShouldUpdate(true);
                Log("feeling state", {feelingState});
            } else {
                setDisableButton(false)
                setShouldUpdate(false);
                setFeelingState({moods: [], symptoms: []});
            }
        } catch (err) {
            Log("Error in Log component while fetching logs", {err});
        }
    }

    const handleSubmit = () => {
        posthog.capture('userlog_logging');
        const method = shouldUpdate ? "PUT" : "POST";
        Log("logs.jsx; handleSubmit", {method})
        startTransition(async () => {
            const res = await logLog(feelingState, accessToken, userType, viewingDate, method);
            if (res.success) {
                setDisableButton(true)
            }
        })
    }

    const handleMoodToggle = (item) => {
        posthog.capture('mood_toggle', {item})
        Log(feelingState);
        setFeelingState({
            symptoms: feelingState?.symptoms,
            moods: feelingState?.moods?.includes(item)
                ? feelingState?.moods.filter((i) => i !== item)
                : [...feelingState.moods, item]
        })
        setDisableButton(false)
    };

    const handleSymptomsToggle = (item) => {
        posthog.capture('symptom_toggle', {item})
        setFeelingState({
            moods: feelingState?.moods,
            symptoms: feelingState?.symptoms?.includes(item)
                ? feelingState?.symptoms.filter((i) => i !== item)
                : [...feelingState.symptoms, item]
        })
        setDisableButton(false)
    };

    const handleViewDayLogs = (day) => {
        posthog.capture('view_selected_day_logs');
        const notBeyondToday = !(compareDesc(new Date(), viewingDate) === 1);
        if (notBeyondToday) {
            Log("moving to which date", {day})
            setViewingDate(day);
            getUserLogs();
        }
    }

    const moodData = ['happy', 'sad', 'calm', 'tired', 'energetic', 'mood swings', 'irritated', 'depressed', 'anxious', 'uneasy', 'mixed feelings', 'horny', 'frustrated']


    const symptomsData = ['fine', 'cramps', 'acne', 'cravings', 'headache', 'tender breast', 'fatigue', 'abdominal pain', 'swelling', 'vaginal discharge', 'heartburn', 'constipation', 'nausea', 'diarrhea', 'insomnia', 'morning sickness', 'dizziness', 'shortness of breath', 'frequent urination']


    useEffect(() => {
        setUserType(localStorage.getItem('userType') !== "midwife" ? "PATIENTLOG" : "MIDWIFELOG")
        getUserLogs()
    }, [viewingDate])

    return (
        <section className={`${inter.className} h-[100%] mt-5`}>
            <ShortCalendar specialDates={[{date: viewingDate, style: 'border border-primaryColor'}]}
                           action={{actionText: "View Calendar", link: "/dashboard/calendar"}}
                           dateClick={handleViewDayLogs}
                           accessToken={accessToken}
            />
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-8">
                    <h3 className="text-xl font-semibold">Mood</h3>
                    <section className="flex flex-wrap gap-3">
                        {moodData.map((mood, index) => {
                            return <input type="button" value={`${moodEmoticons[mood]}  ${mood}`} name="mood"
                                          key={index}
                                          onClick={() => handleMoodToggle(mood)}
                                          className={`cursor-pointer text-sm p-2 px-4 py-2 font-medium capitalize rounded-full .bg-[#0F969C12] text-[#3A3A3A]  ${
                                              feelingState.moods?.includes(mood) ? 'border border-primaryColor rounded-full text-primaryColor bg-[#0F969C12]' : 'text-[#3A3A3A] border border-[#D2D2D2] '
                                          }`}>
                            </input>
                        })}
                    </section>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Symptoms</h3>
                    <section className="flex flex-wrap gap-3 mt-2">
                        {symptomsData.map((symptom, index) => {
                            return <input type="button" value={`${symptomEmoticons[symptom]}  ${symptom}`} name="mood"
                                          key={index}
                                          onClick={() => handleSymptomsToggle(symptom)}
                                          className={`cursor-pointer text-sm p-2 px-4 py-2 font-medium capitalize rounded-full .bg-[#0F969C12] text-[#3A3A3A] ${
                                              feelingState.symptoms?.includes(symptom) ? 'border border-primaryColor rounded-full bg-[#0F969C12] text-primaryColor' : 'text-[#3A3A3A] border border-[#D2D2D2] '
                                          }`}>
                            </input>
                        })}
                    </section>
                </div>
            </form>
            <div className="my-[25%] w-full flex justify-center">
                <IconButton isPending={isPending} text="Apply" onClick={handleSubmit} icon="iconify lucide--arrow-right"
                            disabled={disableBtn}/>
            </div>
        </section>
    )
}
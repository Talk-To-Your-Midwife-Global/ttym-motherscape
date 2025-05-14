"use client"
import {useEffect, useState} from "react";
import {inter} from "@/app/fonts";
import {IconButton} from "@/app/components";
import {ShortCalendar} from "@/app/dashboard/components/index";
import {logLog} from "@/app/dashboard/actions/action";
import {PUBLICHOSTNAME} from "@/app/config/main";
import {formatDate} from "@/app/lib/functions";
import {compareDesc} from "date-fns";


export function Logs({accessToken}) {
    const [disableBtn, setDisableButton] = useState(true)
    const [feelingState, setFeelingState] = useState({moods: [], symptoms: []})
    const [day, setDay] = useState(new Date());
    const [userType, setUserType] = useState("");

    async function getUserLogs() {
        console.log({accessToken, PUBLICHOSTNAME})
        try {
            const response = await fetch(`${PUBLICHOSTNAME}/logs?date=${formatDate(day)}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error("Could not fetch logs");
            }
            const logs = await response.json();
            const hasLogs = logs.length > 0;
            if (hasLogs) {
                setFeelingState({...logs[0]?.entry});
            } else {
                setFeelingState({moods: [], symptoms: []});
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async () => {
        const res = await logLog(feelingState, accessToken, userType)
    }

    const handleMoodToggle = (item) => {
        console.log(feelingState);
        setFeelingState({
            symptoms: feelingState?.symptoms,
            moods: feelingState?.moods?.includes(item)
                ? feelingState?.moods.filter((i) => i !== item)
                : [...feelingState.moods, item]
        })
        setDisableButton(false)
    };

    const handleSymptomsToggle = (item) => {
        setFeelingState({
            moods: feelingState?.moods,
            symptoms: feelingState?.symptoms?.includes(item)
                ? feelingState?.symptoms.filter((i) => i !== item)
                : [...feelingState.symptoms, item]
        })
        setDisableButton(false)
    };

    const handleViewDayLogs = (day) => {
        const notBeyondToday = !(compareDesc(new Date(), day) === 1);
        if (notBeyondToday) {
            setDay(day);
            getUserLogs();
        }
    }

    const moodData = ['happy', 'sad', 'calm', 'energetic', 'mood swings', 'irritated', 'depressed', 'anxious', 'uneasy', 'mixed feelings', 'horny', 'frustrated']
    const symptomsData = ['fine', 'cramps', 'acne', 'cravings', 'headache', 'tender breast', 'fatigue', 'backache', 'abdominal pain', 'swelling', 'vaginal discharge', 'heart burn', 'constipation', 'nausea', 'diarrhea', 'insomnia', 'morning sickness', 'dizziness', 'shortness of breath', 'frequent urination']

    useEffect(() => {
        setUserType(localStorage.getItem('userType') !== "midwife" ? "PATIENTLOG" : "MIDWIFELOG")
        getUserLogs()
    }, [])

    return (
        <section className={`${inter.className} h-[100%] mt-5`}>
            <ShortCalendar specialDates={[{date: day, style: 'border border-primaryColor'}]}
                           action={{actionText: "View Calendar", link: "/dashboard/calendar"}}
                           dateClick={handleViewDayLogs}
                           accessToken={accessToken}
            />
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-8">
                    <h3 className="text-xl font-semibold">Mood</h3>
                    <section className="flex flex-wrap gap-3">
                        {moodData.map((mood, index) => {
                            return <input type="button" value={mood} name="mood" key={index}
                                          onClick={() => handleMoodToggle(mood)}
                                          className={`cursor-pointer text-sm p-2 px-4 py-2 font-medium capitalize rounded-full bg-[#0F969C12]  ${
                                              feelingState.moods?.includes(mood) ? 'border border-primaryColor rounded-full text-primaryColor' : 'text-primaryColor  border-primaryColor '
                                          }`}>
                            </input>
                        })}
                    </section>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Symptoms</h3>
                    <section className="flex flex-wrap gap-3 mt-2">
                        {symptomsData.map((symptom, index) => {
                            return <input type="button" value={symptom} name="mood" key={index}
                                          onClick={() => handleSymptomsToggle(symptom)}
                                          className={`cursor-pointer text-sm p-2 px-4 py-2 font-medium capitalize rounded-full bg-[#0F969C12] ${
                                              feelingState.symptoms?.includes(symptom) ? 'border border-primaryColor rounded-full text-primaryColor' : 'text-primaryColor  border-primaryColor '
                                          }`}>
                            </input>
                        })}
                    </section>
                </div>
            </form>
            <div className="my-[25%] w-full flex justify-center">
                <IconButton text="Apply" onClick={handleSubmit} icon="iconify lucide--arrow-right"
                            disabled={disableBtn}/>
            </div>
        </section>
    )
}
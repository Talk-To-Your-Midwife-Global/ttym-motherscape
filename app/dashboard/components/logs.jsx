"use client"
import {useState} from "react";
import {inter} from "@/app/fonts";
import {IconButton} from "@/app/components";
import {ShortCalendar} from "@/app/dashboard/components/index";
import {logLog} from "@/app/dashboard/actions/action";

export function Logs({accessToken}) {
    const [disableBtn, setDisableButton] = useState(true)
    const [feelingState, setFeelingState] = useState({moods: [], symptoms: []})
    const userType = localStorage.getItem('userType') !== "midwife" ? "PATIENTLOG" : "MIDWIFELOG"
    console.log(userType)
    const handleSubmit = async () => {
        console.log(feelingState)
        const res = await logLog(feelingState, accessToken, userType)
        console.log(res)
    }

    const handleMoodToggle = (item) => {
            setFeelingState({
                symptoms: feelingState?.symptoms,
                moods: feelingState?.moods?.includes(item)
                    ? feelingState?.moods.filter((i) => i !== item)
                    :  [...feelingState.moods, item]
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

    const moodData = ['happy', 'sad', 'calm', 'energetic', 'mood swings', 'irritated', 'depressed', 'anxious', 'uneasy', 'mixed feelings', 'horny', 'frustrated']
    const symptomsData = ['fine', 'cramps', 'acne', 'cravings', 'headache', 'tender breast', 'fatigue', 'backache', 'abdominal pain', 'swelling', 'vaginal discharge', 'heart burn', 'constipation', 'nausea', 'diarrhea', 'insomnia', 'morning sickness', 'dizziness', 'shortness of breath', 'frequent urination']
    return (
        <section className={`${inter.className} h-[100%] mt-5`}>
            <ShortCalendar specialDates={[{date: new Date(), style: 'border border-primaryColor'}]}  action={{actionText: "View Calendar", link:"/dashboard/calendar"}} />
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-8">
                    <h3 className="text-xl font-semibold">Mood</h3>
                    <section className="flex flex-wrap gap-3">
                        {moodData.map((mood, index) => {
                            return <input type="button" value={mood} name="mood" key={index} onClick={() => handleMoodToggle(mood)}
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
                            return <input type="button" value={symptom} name="mood" key={index} onClick={() => handleSymptomsToggle(symptom)}
                                          className={`cursor-pointer text-sm p-2 px-4 py-2 font-medium capitalize rounded-full bg-[#0F969C12] ${
                                              feelingState.symptoms?.includes(symptom) ? 'border border-primaryColor rounded-full text-primaryColor' : 'text-primaryColor  border-primaryColor '
                                          }`}>
                            </input>
                        })}
                    </section>
                </div>
            </form>
            <div className="my-[25%] w-full flex justify-center">
                <IconButton text="Apply" onClick={handleSubmit} icon="iconify lucide--arrow-right" disabled={disableBtn} />
            </div>
        </section>
    )}
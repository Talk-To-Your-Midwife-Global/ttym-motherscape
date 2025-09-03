"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState, useTransition} from "react";
import {IconButton, PageSlideAnimator} from "@/app/_components";
import {inter} from "@/app/_fonts";
import {OnboardHeading} from "@/app/onboarding/_components/OnboardHeading";
import {SlidePickerWheel} from "@/app/onboarding/_components/SlidePickerWheel";
import {DayPicker} from "react-day-picker";
import {QuestionNav} from "@/app/questions/components/menstrualcycletracker";

export function QuestionParent({question, updateUser, onboardLength}) {
    const router = useRouter()
    const [answers, setAnswers] = useState({})
    const [isPending, startTransition] = useTransition();


    const handleQuestionAnswers = (questionAnswers) => {
        setAnswers((prevState) => ({...prevState, ...questionAnswers}))
    }
    const handleSubmit = () => {
        localStorage.setItem("answers", JSON.stringify({...JSON.parse(localStorage.getItem('answers')) || {}, ...answers}))
        const next = String(Number(question) + 1)
        console.log({next})
        // After the final question
        if (next <= onboardLength) {
            setTimeout(() => router.push(`/onboarding/trackmyperiod/${next}`), 200)
        } else {
            startTransition(async () => {
                const data = JSON.parse(localStorage.getItem("answers"))
                console.log({data})
                const res = await updateUser(data);
                console.log({res});
                if (res.success) {
                    setTimeout(() => router.push(`/dashboard`), 100)
                } else {
                    setTimeout(() => router.push(`/onboarding/`), 100)
                }
            })
        }
    }

    const questions = {
        2: <CycleLength handleAnswers={handleQuestionAnswers} state={answers} submit={handleSubmit}/>,
        3: <PeriodDays handleAnswers={handleQuestionAnswers} state={answers} submit={handleSubmit}/>,
        5: <CycleRegularity handleAnswers={handleQuestionAnswers} submit={handleSubmit} state={answers}/>,
        6: <LastPeriod handleAnswers={handleQuestionAnswers} submit={handleSubmit}/>,
        8: <SymptomsTracking handleAnswers={handleQuestionAnswers} state={answers} submit={handleSubmit}/>,
        12: <NotificationPreferences handleAnswers={handleQuestionAnswers} submit={handleSubmit} state={answers}/>

    }

    return (
        <section>
            <QuestionNav last={question === 8}
                         url={question > 1 ? `/onboarding/trackmyperiod/${question - 1}` : '/onboarding/'}
                         question={question}/>
            <PageSlideAnimator>
                {questions[question]}
            </PageSlideAnimator>
        </section>
    )
}

function CycleLength({handleAnswers, submit, state}) {
    const [disableBtn, setDisableButton] = useState(true)

    const handleChange = (num) => {
        if (num > 0) {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
        handleAnswers({...state, 'cycleInfo': num})
    }

    const handleSubmit = () => {
        submit()
    }
    return (
        <section className={`${inter.className} h-svh overflow-hidden`}>
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-5">
                    {/*TODO: remove and possibly delete the component*/}
                    {/*<QuestionHead text="What is the average*/}
                    {/*    length of your*/}
                    {/*    menstrual cycle?"/>*/}
                    <OnboardHeading title={"How long does your cycle usually last?"}
                                    subTitle={"Most women’s cycles last between 26–32 days, with 28 being the average"}/>
                    <SlidePickerWheel name={'cycleInfo'} onChange={handleChange}/>
                </div>
            </form>
            <div className="fixed bottom-10 w-full flex justify-center">
                <IconButton text="Continue" onClick={handleSubmit} icon="iconify lucide--arrow-right"
                            disabled={disableBtn}/>
            </div>
        </section>
    )
}

function PeriodDays({handleAnswers, submit, state}) {
    const [disableBtn, setDisableButton] = useState(true)

    const handleChange = (event) => {
        const {name, value} = event.target
        if (name === 'periodLength' && value > 0) {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
        handleAnswers({...state, [name]: value})
    }

    const handleSubmit = () => {
        submit()
    }
    return (
        <section className={`${inter.className} h-svh overflow-hidden`}>
            <form className="px-[20px] h-[300px] max-h-[300px] text-primaryText">
                <div className="flex flex-col gap-2 mb-5">
                    {/*TODO: Delete this component*/}
                    {/*<QuestionHead text="How many days does your period usually last?"/>*/}
                    <OnboardHeading title={"How many days does your period usually last"}
                                    subTitle={"Most periods last 3–7 days. If yours is sometimes shorter or longer, just choose the number that feels most typical for you."}/>
                </div>

                <div className="h-[300px]">
                    <div className="h-[300px] flex items-center justify-center gap-2">
                        <input
                            className="border-b-2 border-black w-20 text-[#000] text-[42px] font-semibold h-11 bg-transparent px-[10px] outline-none"
                            type="number" min={1} max={60} name="periodLength"
                            id="period-length" onChange={handleChange}/>
                        <span className="text-[42px] font-semibold">days</span>
                    </div>
                </div>
            </form>
            <div className="fixed bottom-10 w-full flex justify-center">
                <IconButton text="Continue" onClick={handleSubmit} icon="iconify lucide--arrow-right"
                            disabled={disableBtn}/>
            </div>
        </section>
    )
}

function CycleRegularity({handleAnswers, submit, state}) {
    const [answers, setAnswers] = useState({})
    const [disableBtn, setDisableButton] = useState(true)

    const handleChange = (event) => {
        const {name, value} = event.target

        if (name === 'cycleRegularity') {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
        handleAnswers({...state, [name]: value})
    }

    return (
        <section className={`${inter.className} h-svh overflow-hidden`}>
            {/*TODO: remove this*/}
            {/*<QuestionHead text="Tell us about your cycle pattern"*/}
            {/*              desc={"Cycles can be regular or irregular, and both are completely normal."}/>*/}
            <OnboardHeading title={"Tell us about your cycle pattern"}
                            subTitle={"Cycles can be regular or irregular, and both are completely normal."}/>

            <form className="px-[20px] text-primaryText">
                <div className="space-y-4 p-4 text-[#1E1E1E] relative">
                    <div>
                        <input type="radio" id="regular" name="cycleRegularity" onChange={handleChange} value={true}
                               className="peer mt-1 h-5 w-5 accent-[#0F969C] absolute right-6 top-9"/>
                        <label
                            htmlFor="regular"
                            className="flex items-start justify-between border border-[#D0D0D0] rounded-lg p-4 cursor-pointer peer-checked:border-[#0F969C] peer-checked:text-[#0F969C]">
                            <div>
                                <p className="font-medium .text-[#1E1E1E]">Regular</p>
                                <p className="text-sm .text-[#1E1E1E] .hover:text-[#0F969C]">
                                    Your period usually comes around the same time each month (within a few days).
                                </p>
                            </div>
                        </label>
                    </div>

                    <div>
                        <input type="radio" id="irregular" onChange={handleChange} name="cycleRegularity" value={false}
                               className="peer mt-1 h-5 w-5 accent-[#0F969C] absolute right-6 top-40"/>
                        <label
                            htmlFor="irregular"
                            className="flex items-start justify-between border border-[#D0D0D0] rounded-lg p-4 cursor-pointer peer-checked:border-[#0F969C] peer-checked:text-[#0F969C]">
                            <div>
                                <p className="font-medium">Irregular</p>
                                <p className="text-sm">
                                    Your period usually comes around the same time each month (within a few days).
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </form>
            <div className="fixed bottom-10 w-full flex justify-center">
                <IconButton text="Continue" onClick={submit} icon="iconify lucide--arrow-right" disabled={disableBtn}/>
            </div>
        </section>
    )
}

function LastPeriod({handleAnswers, submit, state}) {
    const [disableBtn, setDisableButton] = useState(true)
    const [selected, setSelected] = useState(new Date());

    const handleChange = (date) => {
        // Because passing it directly is causing issues
        const formattedDate = date.toISOString().split('T')[0];
        if (date) {
            setSelected(date); // the raw date was passed because the formatted date causes an error
            setDisableButton(false);
        }

        handleAnswers({...state, periodStart: formattedDate})
    }

    return (
        <section className={`${inter.className} h-svh overflow-hidden`}>
            {/*TODO: Remove this*/}
            {/*<QuestionHead text="When did your last period start?"/>*/}
            <OnboardHeading title={"When did your last period start?"}
                            subTitle={"Think back to the first day of bleeding. If you don’t remember exactly, it’s okay. Just give your best estimate."}/>
            <form className="px-[20px] mt-3 text-primaryText">
                <div className="flex items-center gap-2 mb-5 border border-[#C1C1C1] rounded-md p-2">
                    <input type="text" value={selected?.toLocaleDateString('en-US')} name="periodStart" id="last-period"
                           className="bg-transparent flex-1 "
                           disabled={true}/>
                    <span className="iconify mdi--calendar-range-outline text-xl"></span>
                </div>
                <div className="flex items-center justify-center ">
                    <DayPicker
                        animate
                        captionLayout="dropdown"
                        mode="single"
                        startMonth={new Date(new Date().getFullYear(), new Date().getMonth() - 1)}
                        endMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
                        selected={selected}
                        onSelect={handleChange}
                        timeZone="UTC"

                    />
                </div>
            </form>
            <div className="fixed bottom-10 w-full flex justify-center z-[50]">
                <IconButton text="Continue" onClick={submit} icon="iconify lucide--arrow-right" disabled={disableBtn}
                />
            </div>
        </section>
    )
}

function SymptomsTracking({handleAnswers, submit, state}) {
    const [disableBtn, setDisableButton] = useState(true)

    const handleSubmit = (event) => {
        submit()
    }

    const handleMoodToggle = (item) => {
        if (state?.moods) {
            handleAnswers({
                moods: state?.moods?.includes(item)
                    ? state?.moods.filter((i) => i !== item)
                    : [...state.moods, item]
            })
        }
        setDisableButton(false)
    };

    const handleSymptomsToggle = (item) => {
        handleAnswers({
            symptoms: state?.symptoms?.includes(item)
                ? state?.symptoms.filter((i) => i !== item)
                : [...state.symptoms, item]
        })
        setDisableButton(false)
    };
    // Initialize the moods and symptoms to avoid array method errors; important!
    useEffect(() => {
        handleAnswers({
            moods: [],
            symptoms: []
        })
    }, [])

    const moodData = ['happy', 'sad', 'calm', 'energetic', 'mood swings', 'irritate', 'depressed', 'anxious', 'uneasy', 'horny', 'frustrated']
    const symptomsData = ['fine', 'cramps', 'acne', 'cravings', 'tender breast', 'fatigue', 'backache']
    return (
        <section className={`${inter.className} h-[100%] .overflow-hidden`}>
            <OnboardHeading title={"Do you usually experience any of these symptoms?"}/>
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-8">
                    <h3 className="text-xl text-primaryColor font-medium">Mood</h3>
                    <section className="flex flex-wrap gap-2">
                        {moodData.map((mood, index) => {
                            return <input type="button" value={mood} name="mood" key={index}
                                          onClick={() => handleMoodToggle(mood)}
                                          className={`cursor-pointer text-sm p-2 px-4 py-2 capitalize rounded-full border-2 border-primaryColor ${
                                              state.moods?.includes(mood) ? 'bg-primaryColor rounded-full text-white' : 'text-primaryColor  border-primaryColor '
                                          }`}>
                            </input>
                        })}
                    </section>
                </div>
                <div>
                    <h3 className="text-xl text-primaryColor font-medium">Symptoms</h3>
                    <section className="flex flex-wrap gap-2 mt-2">
                        {symptomsData.map((symptom, index) => {
                            return <input type="button" value={symptom} name="mood" key={index}
                                          onClick={() => handleSymptomsToggle(symptom)}
                                          className={`cursor-pointer text-sm p-2 px-4 py-2 capitalize rounded-full border-2 border-primaryColor ${
                                              state.symptoms?.includes(symptom) ? 'bg-primaryColor rounded-full text-white' : 'text-primaryColor  border-primaryColor '
                                          }`}>
                            </input>
                        })}
                    </section>
                </div>
            </form>
            <div className="fixed bottom-10 w-full flex justify-center">
                <IconButton text="Continue" onClick={handleSubmit} icon="iconify lucide--arrow-right"
                            disabled={disableBtn}
                />
            </div>
        </section>
    )
}

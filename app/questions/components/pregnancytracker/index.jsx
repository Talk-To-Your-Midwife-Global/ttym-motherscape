"use client"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation";
import {inter} from "@/app/fonts";
import Link from "next/link"
import {PageSlideAnimator} from "@/app/components";
import {IconButton} from "@/app/components";

function QuestionNav({url, icon = "lucide--chevron-left", last = false,}) {
    return (
        <nav className="px-[10px] flex justify-between items-center my-5 text-mainText">
            <Link href={url} className=".bg-[#16898E1A] w-12 h-12 rounded-full flex justify-center items-center">
                <span className={`iconify ${icon} text-2xl`}></span>
            </Link>
            {!last ? <Link href='/questions/' className="text-mainText font-medium"><span
                className="iconify lucide--x text-2xl relative top-1"></span></Link> : ''}

        </nav>
    )
}

function ProgressIndicator({target = 0, total = 3}) {
    return (
        <div className="flex space-x-2 px-[20px]">
            {Array.from({length: total}).map((_, index) => (
                <div
                    key={index}
                    className={`flex-1 rounded-full h-2 ${target > 0 && index < target ? 'bg-primaryColor' : 'bg-[#E4E4E4]'}`}
                />
            ))}
        </div>
    );
}

function QuestionHead({text}) {
    return (
        <header className="text-primaryText my-5 px-[20px] font-medium">
            <h2 className="text-2xl"> {text} </h2>
        </header>
    )
}

export function PregnancyQuestionParent({question, updateUser}) {
    const router = useRouter()
    const [answers, setAnswers] = useState({})

    const handleQuestionAnswers = (questionAnswers) => {
        setAnswers((prevState) => ({...prevState, ...questionAnswers}))
    }
    const handleSubmit = () => {
        localStorage.setItem("answers", JSON.stringify({...JSON.parse(localStorage.getItem('answers')) || {}, ...answers}))
        const next = String(Number(question) + 1)

        // After the final question
        if (next <= 3) {
            setTimeout(() => router.push(`/questions/${next}`), 200)
        } else {
            const result = updateUser(JSON.parse(localStorage.getItem("answers"))).then(res => {
                console.log(res);
                if (res.success === true) {
                    setTimeout(() => router.push(`/dashboard`), 200)
                } else {
                    setTimeout(() => router.push(`/questions`), 200)
                }
            })
        }
    }

    const questions = {
        1: <GeneralInformation handleAnswers={handleQuestionAnswers} state={answers} submit={handleSubmit}/>,
        2: <HealthAndMedicalHistory handleAnswers={handleQuestionAnswers} submit={handleSubmit} state={answers}/>,
        // 3: <LifeStyle handleAnswers={handleQuestionAnswers} submit={handleSubmit}/>,
        3: <SymptomsTracking handleAnswers={handleQuestionAnswers} state={answers} submit={handleSubmit}/>,
        // 4: <NotificationPreferences handleAnswers={handleQuestionAnswers} submit={handleSubmit} state={answers}/>
    }

    return (
        <section>
            <QuestionNav last={question === questions.length}
                         url={question > 1 ? `/questions/${question - 1}` : '/questions/'}/>
            <ProgressIndicator target={question}/>
            <PageSlideAnimator>
                {questions[question]}
            </PageSlideAnimator>
        </section>
    )
}

function GeneralInformation({handleAnswers, submit, state}) {
    const [disableBtn, setDisableButton] = useState(true)

    const handleChange = (event) => {
        const {name, value} = event.target

        if (name === 'age' && value > 0) {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
        handleAnswers({...state, [name]: value})
    }
    const handleSubmit = () => {
        submit()
    }

    useEffect(() => {
        handleAnswers({
            dueDate: null
        })
    }, [disableBtn])
    return (
        <section className={`${inter.className} h-svh overflow-hidden`}>
            <QuestionHead text="General Information"/>
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-5">
                    <label htmlFor="dueDate" className="font-normal">What is your estimated due date (if
                        known)?</label>
                    <input type="date" name="dueDate" id="dueDate"
                           className={`border-2 border-slate-300 .text-[#808080] h-11 rounded-md bg-transparent px-[10px] outline-none w-full`}
                           onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                    <label htmlFor="last-period" className="font-normal">Do you know the date of your last menstrual
                        period (LMP)?</label>
                    <input type="date" name="lmp" id="last-period"
                           className={`border-2 border-slate-300 .text-[#808080] h-11 rounded-md bg-transparent px-[10px] outline-none w-full`}
                           onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                    <label htmlFor="isFirstPregnancy" className="font-normal">Is this your first pregnancy?</label>
                    <div className="grid">
                        <svg
                            className="pointer-events-none z-10 right-1 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden"
                            viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                  clipRule="evenodd"></path>
                        </svg>
                        <select defaultValue=""
                                className="w-full h-11 appearance-none forced-colors:appearance-auto row-start-1 col-start-1 rounded-lg bg-slate-50 hover:border-primaryColor hover:bg-white border-2 .text-[#808080] px-2 outline-none"
                                name="isFirstPregnancy" onChange={handleChange}>
                            <option value="" disabled hidden>Yes/No</option>
                            <option value={"true"}>Yes</option>
                            <option value={"false"}>No</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="age" className="font-normal">How old are you?</label>
                        <input
                            className="border-2 border-slate-300 .text-[#808080] h-11 rounded-md bg-transparent px-[10px] outline-none"
                            placeholder="Age eg. 16" type="number" min={8} name="age"
                            id="age" onChange={handleChange}/>
                    </div>
                </div>
            </form>
            <div className="relative -bottom-[10%] w-full flex justify-center">
                <IconButton text="Continue" onClick={handleSubmit} icon="iconify lucide--arrow-right"
                            disabled={disableBtn}/>
            </div>
        </section>
    )
}

function HealthAndMedicalHistory({handleAnswers, submit, state}) {
    const handleChange = (event) => {
        const {name, value} = event.target
        console.log(name, value);
        handleAnswers({...state, [name]: value})
    }

    return (
        <section className={`${inter.className} .h-svh overflow-hidden`}>
            <QuestionHead text="Health and Medical History"/>
            <form className="px-[20px] text-primaryText">
                <div className={`mb-5`}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="existingConditions" className="font-normal">Do you have any pre-existing medical
                            conditions?</label>
                        <input
                            className="border-2 border-slate-300 .text-[#808080] h-11 rounded-md bg-transparent px-[10px] outline-none"
                            placeholder="Eg. Hypertension, diabetes..." type="text" name="existingConditions"
                            id="existingConditions" onChange={handleChange}/>
                    </div>
                </div>

                <div className={`mb-5`}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="existingMedications" className="font-normal">Are you currently taking any
                            medications or supplements?</label>
                        <input
                            className="border-2 border-slate-300 .text-[#808080] h-11 rounded-md bg-transparent px-[10px] outline-none"
                            placeholder="Eg. Folic acid" type="text" name="existingMedications"
                            id="existingMedications" onChange={handleChange}/>
                    </div>
                </div>

                <div className={`mb-5`}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="allergies" className="font-normal">Do you have any known allergies?</label>
                        <input
                            className="border-2 border-slate-300 .text-[#808080] h-11 rounded-md bg-transparent px-[10px] outline-none"
                            placeholder="Eg. Peanuts, milk..." type="text" name="allergies"
                            id="allergies" onChange={handleChange}/>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="pastComplications" className="font-normal">Have you had any complications in
                            previous pregnancies (if applicable)?</label>
                        <input
                            className="border-2 border-slate-300 .text-[#808080] h-11 rounded-md bg-transparent px-[10px] outline-none"
                            placeholder="Eg. Ectopic pregnancy" type="text" name="pastComplications"
                            id="pastComplications" onChange={handleChange}/>
                    </div>
                </div>
            </form>
            <div className="relative my-10 .-bottom-[15%] w-full flex justify-center">
                <IconButton text="Continue" onClick={submit} icon="iconify lucide--arrow-right"/>
            </div>
        </section>
    )
}


function SymptomsTracking({handleAnswers, submit, state}) {
    const handleChange = (event) => {
        const {name, value} = event.target
        handleAnswers({...state, [name]: value})
    }

    const handleSubmit = (event) => {
        submit()
    }

    return (
        <section className={`${inter.className} h-[100%] .overflow-hidden`}>
            <QuestionHead text="Current Symptoms and Experiences"/>
            <form className="px-[20px] text-primaryText">
                <div className={`mb-5`}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="symtoms" className="font-normal">Are you experiencing any symptoms currently
                            (e.g., nausea, fatigue, mood changes)?</label>
                        <input
                            className="border-2 border-slate-300 .text-[#808080] h-11 rounded-md bg-transparent px-[10px] outline-none"
                            placeholder="(e.g., nausea, fatigue, mood changes)" type="text" name="symptoms"
                            id="symptoms" onChange={handleChange}/>
                    </div>
                </div>
                <div className={`mb-5`}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="changesInHealth" className="font-normal">Have you noticed any significant
                            changes in
                            your health or body recently?</label>
                        <input
                            className="border-2 border-slate-300 .text-[#808080] h-11 rounded-md bg-transparent px-[10px] outline-none"
                            placeholder="eg bloating, fatigue" type="text" name="changesInHealth"
                            id="changesInHealth" onChange={handleChange}/>
                    </div>
                </div>

                <div className={`mb-5`}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="lookInto" className="font-normal">Do you have any specific concerns about
                            your pregnancy that you would like the app to address?</label>
                        <input
                            className="border-2 border-slate-300 .text-[#808080] h-11 rounded-md bg-transparent px-[10px] outline-none"
                            placeholder="eg. health food" type="text" name="lookInto"
                            id="lookInto" onChange={handleChange}/>
                    </div>
                </div>
            </form>
            <div className="my-[25%] w-full flex justify-center">
                <IconButton text="Continue" onClick={handleSubmit} icon="iconify lucide--arrow-right"/>
            </div>
        </section>
    )
}

// function NotificationPreferences({handleAnswers, submit, state}) {
//     const [disableBtn, setDisableButton] = useState(true)
//
//     const handleChange = (event) => {
//         const {name, value} = event.target
//
//         if (name === 'notificationPreference') {
//             setDisableButton(false)
//         } else {
//             setDisableButton(true)
//         }
//
//         handleAnswers({...state, [name]: value})
//
//         submit()
//     }
//     return (
//         <section className={`${inter.className} h-svh overflow-hidden`}>
//             <QuestionHead text="Notification Preferences"/>
//             <form className="px-[20px] text-primaryText">
//                 <div className="flex flex-col gap-2 mb-5">
//                     <label htmlFor="cycle-info" className="font-medium">What type of reminders would you like to receive
//                         (e.g., doctor’s appointments, health tips, hydration)?</label>
//
//                     <div className="grid">
//                         <svg
//                             className="pointer-events-none z-10 right-1 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden"
//                             viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
//                             <path fillRule="evenodd"
//                                   d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
//                                   clipRule="evenodd"></path>
//                         </svg>
//                         <select defaultValue=""
//                                 className="w-full h-11 appearance-none forced-colors:appearance-auto row-start-1 col-start-1 rounded-lg bg-slate-50 hover:border-primaryColor hover:bg-white border-2 text-[#808080] px-2 outline-none"
//                                 name="notificationPreference" onChange={handleChange}>
//                             <option value="" hidden disabled>eg. 1 day</option>
//                             <option value="1">1 day</option>
//                             <option value="2">2 days</option>
//                             <option value="3">3 days</option>
//                             <option value="5">5 days</option>
//                         </select>
//                     </div>
//                 </div>
//             </form>
//             <div className="relative -bottom-[35%] w-full flex justify-center">
//
//                 <IconButton href="/dashboard" text="Continue" icon="iconify lucide--arrow-right" disabled={disableBtn}/>
//             </div>
//         </section>
//     )
// }
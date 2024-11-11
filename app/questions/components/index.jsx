"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { inter } from "@/app/fonts";
import Link from "next/link"
import { PageSlideAnimator } from "@/app/components";
import { IconButton } from "@/app/components";

function QuestionNav({url, icon="lucide--chevron-left", last=false,}) {
    return (
        <nav className="px-[10px] flex justify-between items-center my-5 text-mainText">
            <Link href={url}  className=".bg-[#16898E1A] w-12 h-12 rounded-full flex justify-center items-center">
                <span className={`iconify ${icon} text-2xl`}></span>
            </Link>
            {!last ?  <Link href='/questions/' className="text-mainText font-medium"><span className="iconify lucide--x text-2xl relative top-1"></span></Link> : ''}
           
        </nav>
    )
}

function ProgressIndicator({target=0, total=5}) {
    return (
        <div className="flex space-x-2 px-[20px]">
          {Array.from({ length: total }).map((_, index) => (
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

export function QuestionParent({question}) {
    const router = useRouter()
    const [answers, setAnswers] = useState({})


    const handleQuestionAnswers = (questionAnswers) => {
        setAnswers((prevState) => ({...prevState, ...questionAnswers})) 
        console.log('qanswers', questionAnswers)

        console.log(answers)
    }
    const handleSubmit = () => {
        localStorage.setItem("answers", JSON.stringify({...JSON.parse(localStorage.getItem('answers')) || {}, ...answers}))
        const next = String(Number(question) + 1)

        if (next <= 5) {
            setTimeout(() => router.push(`/questions/${next}`), 200)
        }
        
    }

    const questions = {
        1: <BasicCycleInformation handleAnswers={handleQuestionAnswers} state={answers} submit={handleSubmit} />,
        2: <CycleRegularity handleAnswers={handleQuestionAnswers}  submit={handleSubmit} state={answers}/>,
        3: <LastPeriod handleAnswers={handleQuestionAnswers}  submit={handleSubmit}/>,
        4: <SymptomsTracking handleAnswers={handleQuestionAnswers} state={answers} submit={handleSubmit}/>,
        5: <NotificationPreferences handleAnswers={handleQuestionAnswers} submit={handleSubmit} state={answers}/>
        
    }

    return (
        <section>
            <QuestionNav last={question == 6 ? true : false} url={question > 1 ? `/questions/${question - 1}`: '/questions/'} />
            <ProgressIndicator target={question}  />
            <PageSlideAnimator>
                {questions[question]}
            </PageSlideAnimator>
        </section>
    )
}

function BasicCycleInformation({handleAnswers, submit, state}) {
    const [disableBtn, setDisableButton] = useState(true)

    const handleChange = (event) => {
        const {name, value} = event.target

        if(name == 'periodLength' && value > 0) {
            setDisableButton(false)
        }else {
            setDisableButton(true)
        }
        handleAnswers({...state, [name]: value})
    }
    const handleSubmit = () => {
        submit()
    }
    return  (
        <section className={`${inter.className} h-svh overflow-hidden`}>
            <QuestionHead text="Basic Cycle Information" />
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-5">
                    <label htmlFor="cycle-info" className="font-medium">What is the average length of your menstrual cycle?</label>
                    <div className="grid">
                        <svg className="pointer-events-none z-10 right-1 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path>
                        </svg>
                        <select defaultValue="" className="w-full h-11 appearance-none forced-colors:appearance-auto row-start-1 col-start-1 rounded-lg bg-slate-50 hover:border-primaryColor hover:bg-white border-2 text-[#808080] px-2 outline-none" name="cycleInfo" onChange={handleChange}>
                            <option value="" disabled hidden>Average Length</option>
                            <option value="25">25 days</option>
                            <option value="26">26 days</option>
                            <option value="27">27 days</option>
                            <option value="28">28 days</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="period-length" className="font-medium">How many days does your period usually last?</label>
                        <input className="border-2 border-slate-300 text-[#808080] h-11 rounded-md bg-transparent px-[10px] outline-none" placeholder="Days of Period" type="number" name="periodLength" id="period-length" onChange={handleChange} />
                    </div>
                </div>
            </form>
            <div className="relative -bottom-[25%] w-full flex justify-center">
                <IconButton text="Continue" onClick={handleSubmit} icon="iconify lucide--arrow-right" disabled={disableBtn} />
            </div>
        </section>
    )
}

function CycleRegularity({handleAnswers, submit, state}) {
    const [answers, setAnswers] = useState({})
    const [disableBtn, setDisableButton] = useState(true)

    const handleChange = (event) => {
        const {name, value} = event.target

        if(name == 'cycleRegularity') {
            setDisableButton(false)
        }else {
            setDisableButton(true)
        }

        handleAnswers({...state, [name]: value})
        console.log(answers)
    }

    return (
        <section className={`${inter.className} h-svh overflow-hidden`}> 
            <QuestionHead text="Cycle Regularity" />
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-5">
                    <label htmlFor="cycle-regularity" className="font-medium">Is your cycle regular or irregular?</label>
                    <div className="grid">
                        <svg className="pointer-events-none z-10 right-1 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path>
                        </svg>
                        <select defaultValue="" className="w-full h-11 appearance-none forced-colors:appearance-auto row-start-1 col-start-1 rounded-lg bg-slate-50 hover:border-primaryColor hover:bg-white border-2 text-[#808080] px-2 outline-none" id="cycle-regularity"  name="cycleRegularity" onChange={handleChange}>
                            <option value="" disabled hidden>eg. regular</option>
                            <option value="regular">Regular</option>
                            <option value="irregular">Irregular</option>
                        </select>
                    </div>
                </div>
                <div className="text-sm text-[#667085] font-medium flex flex-col gap-5">
                   <p>Regular: Roughly the same number of days each cycle.</p> 
                    <p>Irregular: Varies significantly from month to month. This helps the app adapt predictions based on consistency.</p> 
                </div>
            </form>
            <div className="relative -bottom-[25%] w-full flex justify-center">
                <IconButton text="Continue" onClick={submit} icon="iconify lucide--arrow-right" disabled={disableBtn} />
            </div>
        </section>
    )
}

function LastPeriod({handleAnswers, submit, state}) {
    const [disableBtn, setDisableButton] = useState(true)

    const handleChange = (event) => {
        const {name, value} = event.target
        // console.log(name, value)

        if(name == 'lastPeriod') {
            setDisableButton(false)
        }else {
            setDisableButton(true)
        }
            
        handleAnswers({...state, [name]: value})
    }

    return (
        <section className={`${inter.className} h-svh overflow-hidden`}>
            <QuestionHead text="Last Period Details" />
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-5">
                    <label htmlFor="last-period" className="font-medium">When did your last period start?</label>
                    <input type="date" name="lastPeriod" id="last-period" onChange={handleChange}/>
                </div>
            </form>
            <div className="relative -bottom-[45%] w-full flex justify-center">
                <IconButton text="Continue" onClick={submit} icon="iconify lucide--arrow-right" disabled={disableBtn} />
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
                :  [...state.moods, item]
            })
        }
        setDisableButton(false)
      };

      const handleSymptomsToggle = (item) => {
        handleAnswers({
            symptoms: state?.symptoms?.includes(item)
            ? state?.symptoms.filter((i) => i !== item)
            :  [...state.symptoms, item]
        })
        setDisableButton(false)
      };
    // Initialize the moods and symptoms to avoid array method errors; important! 
      useEffect(()=> {
        handleAnswers({
            moods: [],
            symptoms: []
        })
      } , [])

    const moodData = ['happy', 'sad', 'calm', 'energetic', 'mood swings', 'irritate', 'depressed', 'anxious', 'uneasy', 'horny', 'frustrated']
    const symptomsData = ['fine', 'cramps', 'acne', 'cravings', 'tender breast', 'fatigue', 'backache']
    return (
        <section className={`${inter.className} h-[100%] .overflow-hidden`}>
            <QuestionHead text="Symptoms Tracking Preferences" />
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-8">
                    <label htmlFor="last-period" className="font-medium">Which symptoms would you like to track?</label>
                    <h3 className="text-xl text-primaryColor font-medium">Mood</h3>
                    <section className="flex flex-wrap gap-2">
                        {moodData.map((mood, index) => {
                            return <input type="button" value={mood} name="mood" key={index} onClick={() => handleMoodToggle(mood)}
                            className={`cursor-pointer text-sm p-2 px-4 py-2 capitalize2  rounded-full border-2 border-primaryColor ${
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
                            return <input type="button" value={symptom} name="mood" key={index} onClick={() => handleSymptomsToggle(symptom)}
                            className={`cursor-pointer text-sm p-2 px-4 py-2 capitalize rounded-full border-2 border-primaryColor ${
                            state.symptoms?.includes(symptom) ? 'bg-primaryColor rounded-full text-white' : 'text-primaryColor  border-primaryColor '
                            }`}>
                            </input>  
                        })}
                    </section>
                </div>
            </form>
            <div className="my-[25%] w-full flex justify-center">
                <IconButton text="Continue" onClick={handleSubmit} icon="iconify lucide--arrow-right" disabled={disableBtn} />
            </div>
        </section>
)}

function NotificationPreferences({handleAnswers, submit, state}) {
    const [disableBtn, setDisableButton] = useState(true)

    const handleChange = (event) => {
        const {name, value} = event.target

        if(name == 'notificationPreference') {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }

        handleAnswers({...state, [name]: value})

        submit()
    }
    return  (
        <section className={`${inter.className} h-svh overflow-hidden`}>
            <QuestionHead text="Notification Preferences" />
            <form className="px-[20px] text-primaryText">
                <div className="flex flex-col gap-2 mb-5">
                    <label htmlFor="cycle-info" className="font-medium">Would you like reminders before your period starts? If yes, how many days before?</label>

                    <div className="grid">
                        <svg className="pointer-events-none z-10 right-1 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path>
                        </svg>
                        <select defaultValue="" className="w-full h-11 appearance-none forced-colors:appearance-auto row-start-1 col-start-1 rounded-lg bg-slate-50 hover:border-primaryColor hover:bg-white border-2 text-[#808080] px-2 outline-none" name="notificationPreference" onChange={handleChange}>
                            <option value="" hidden disabled >eg. 1 day</option>
                            <option value="1">1 day</option>
                            <option value="2">2 days</option>
                            <option value="3">3 days</option>
                            <option value="5">5 days</option>
                        </select>
                    </div>
                </div>
            </form>
            <div className="relative -bottom-[35%] w-full flex justify-center">
                
                <IconButton href="/dashboard" text="Continue" icon="iconify lucide--arrow-right" disabled={disableBtn} />
            </div>
        </section>
    )
}
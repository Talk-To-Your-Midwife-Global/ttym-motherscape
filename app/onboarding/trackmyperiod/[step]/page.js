import Image from "next/image";
import {StepOne, StepThree, FlashTwo, FlashThree} from "../../_components"
import rafiki from "../../../../public/images/rafiki.svg"
import cuate from "../../../../public/images/cuate.svg"
import pinkCalendar from "../../../../public/images/pink-calendar.svg"
import {SideSliderButtons} from "@/app/onboarding/_components/SideSliderButtons";
import {QuestionParent} from "@/app/onboarding/_components/QuestionParent";
import {updateUser} from "@/app/_actions";
import {Log} from "@/app/_lib/utils";

export default async function Page({params}) {
    const step = await params;
    Log(step)
    const onboardViewLength = 7;
    const view = {
        '1': {
            type: "SPLASH",
            page:
                <StepOne
                    userType="trackmyperiod"
                    title={"Track Your Cycle with Confidence!"}
                    description={"Stay on top of your period, symptoms, and mood with personalized insights tailored to your unique cycle."}>
                    <Image src={rafiki} className="" alt="image of a woman at different stages of pregnancy"/>
                </StepOne>
        },
        '2': {
            type: "QUESTION",
            page: <QuestionParent updateUser={updateUser} question={'2'} onboardLength={onboardViewLength}/>
        },
        '3': {
            type: "QUESTION",
            page: <QuestionParent updateUser={updateUser} question={'3'} onboardLength={onboardViewLength}/>
        },
        '4': {
            type: "SPLASH",
            page:
                <FlashTwo
                    question={'4'}
                    userType="trackmyperiod"
                    title={"Your Personalized Tracker"}
                    description={"Your insights help us understand your unique cycle better"}>
                    <Image src={pinkCalendar} className="" alt="pink calendar"/>
                </FlashTwo>
        },
        '5': {
            type: "QUESTION",
            page: <QuestionParent updateUser={updateUser} question={'5'} onboardLength={onboardViewLength}/>
        },
        '6': {
            type: "QUESTION",
            page: <QuestionParent updateUser={updateUser} question={'6'} onboardLength={onboardViewLength}/>
        },
        '7': {
            type: "SPLASH",
            page:
                <FlashThree
                    userType="trackmyperiod"
                    title={"A Community to Rely on"}
                    description={"A community forum to share your journey or listen to success stories"}>
                    <Image src={cuate} className="" alt="three women talking"/>
                </FlashThree>
        },
    };

    const currentView = view[step.step];
    Log(currentView)

    if (currentView && currentView.type === "SPLASH") {
        return (
            <SideSliderButtons userType={'trackmyperiod'} step={step.step} max={onboardViewLength}>
                {currentView['page']}
            </SideSliderButtons>
        )
    }
    if (currentView && currentView.type === "QUESTION") {
        return currentView['page']
    }
}
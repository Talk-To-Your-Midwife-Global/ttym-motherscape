import Image from "next/image"
import {StepOne, StepTwo, StepThree} from "../../_components"
import rafiki from "../../../../public/images/pregnant/rafiki.svg"
import cuate from "../../../../public/images/pregnant/cuate.svg"
import pana from "../../../../public/images/pregnant/pana.svg"

export default async function Page({params}) {
    const step = await params;
    const userType = "trackmypregnancy";
    const view = {
        '1': <StepOne
            userType={userType}
            title={"Welcome to Your Pregnancy Journey"}
            description={"Track your pregnancy, stay informed, and connect with professionals."}

        >
            <Image src={pana} className="" alt="image of a woman at different stages of pregnancy"/>
        </StepOne>,
        '2': <StepTwo
            userType={userType}
            title={"Your Journey, Your Way!"}
            description={"Set your due date, track milestones, and receive insights tailored to your unique pregnancy journey. Start personalizing your experience now!"}

        >
            <Image src={rafiki} className="" alt="three women talking"/>
        </StepTwo>,
        '3': <StepThree
            userType={userType}
            title={"You’re Not Alone!"}
            description={"Join a supportive community of moms-to-be and connect with experts who can answer your questions and guide you."}

        >
            <Image src={cuate} className="" alt="three women talking"/>
        </StepThree>,
    };
    return (
        view[step.step]
    )
}
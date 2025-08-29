import Image from "next/image";
import {StepOne, StepTwo, StepThree} from "../../_components"
import rafiki from "../../../../public/images/rafiki.svg"
import cuate from "../../../../public/images/cuate.svg"
import pana from "../../../../public/images/pana.svg"
import {SideSliderButtons} from "@/app/onboarding/_components/SideSliderButtons";

export default async function Page({params}) {
    const step = await params;
    console.log(step);
    const view = {
        '1': <StepOne
            userType="trackmyperiod"
            title={"Track Your Cycle with Confidence!"}
            description={"Stay on top of your period, symptoms, and mood with personalized insights tailored to your unique cycle."}
        >
            <Image src={rafiki} className="" alt="image of a woman at different stages of pregnancy"/>
        </StepOne>,
        '2': <StepTwo
            userType="trackmyperiod"
            title={"A Community to Rely on"}
            description={"A community forum to share your journey or listen to success stories"}
        >
            <Image src={cuate} className="" alt="three women talking"/>
        </StepTwo>,
        '3': <StepThree
            title={"Want to talk to a midwife or a doctor"}
            description={"Get in touch with our midwives and doctors to help better your monthly flow"}
        >
            <Image src={pana} className="" alt="three women talking"/>
        </StepThree>,
    };

    return (
        <SideSliderButtons userType={'trackmyperiod'} step={step.step}>
            {view[step.step]}
        </SideSliderButtons>
    )
}
import Image from "next/image"
import { StepOne, StepTwo, StepThree } from "../../components"
import rafiki from "../../../../public/images/rafiki.svg"
import cuate from "../../../../public/images/cuate.svg"
import pana from "../../../../public/images/pana.svg"

export default async function Page({params}) {
    const step = await params;
    const view = {
        '1':<StepOne userType="midwife">
                <Image src={rafiki} className="" alt="image of a woman at different stages of pregnancy" />
            </StepOne>,
        '2':<StepTwo userType="midwife"> 
                <Image src={cuate} className="" alt="three women talking" />
            </StepTwo>, 
        '3':<StepThree> 
                <Image src={pana} className="" alt="three women talking" />
            </StepThree>,
    };
    return (
        view[step.step]
    )
}
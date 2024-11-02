import { StepOne, StepTwo, StepThree, StepFour } from "../components"

export default async function Page({params}) {
    const step = await params;
    const view = {
        '1': <StepOne />,
        '2': <StepTwo />, 
        '3': <StepThree />,
        '4': <StepFour />
    };

    return (
        view[step.step]
    )
}
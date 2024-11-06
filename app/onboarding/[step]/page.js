import { StepOne, StepTwo, StepThree } from "../components"

export default async function Page({params}) {
    const step = await params;
    const view = {
        '1': <StepOne />,
        '2': <StepTwo />, 
        '3': <StepThree />,
    };

    return (
        view[step.step]
    )
}
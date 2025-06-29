import {QuestionParent} from "../components/menstrualcycletracker";
import {PregnancyQuestionParent} from "@/app/questions/components/pregnancytracker";
import {updateUser, updatePregnantUser} from "@/app/_actions";
import {returnTypeOfPatient} from "@/app/_actions/auth";

export default async function Page({params}) {
    const {question} = await params;
    const patientType = await returnTypeOfPatient();
    console.log({patientType});

    if (patientType === "trackmyperiod") {
        return (
            <QuestionParent updateUser={updateUser} question={question}/>
        )
    }

    if (patientType === "trackmypregnancy") {
        return (
            <PregnancyQuestionParent updateUser={updatePregnantUser} question={question}/>
        )
    }
}
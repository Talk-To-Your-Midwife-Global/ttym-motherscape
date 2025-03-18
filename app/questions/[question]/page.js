import {QuestionParent} from "../components/menstrualcycletracker";
import {PregnancyQuestionParent} from "@/app/questions/components/pregnancytracker";
import {updateUser, updatePregnantUser} from "@/app/actions";
import {returnTypeOfPatient} from "@/app/actions/auth";

export default async function Page({params}) {
    const {question} = await params;
    const patientType = await returnTypeOfPatient();

    if (patientType === "trackmyperiod") {
        return (
            <QuestionParent updateUser={updateUser} question={question}/>
        )
    }

    if (patientType === "pregnancytracker") {
        return (
            <PregnancyQuestionParent updateUser={updatePregnantUser} question={question}/>
        )
    }
}
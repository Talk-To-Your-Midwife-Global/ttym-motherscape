import {PregnancyQuestionParent} from "@/app/questions/components/pregnancytracker";
import {QuestionParent} from "@/app/onboarding/_components/QuestionParent";
import {updateUser, updatePregnantUser} from "@/app/_actions";
import {returnTypeOfPatient} from "@/app/_actions/auth";

export default async function Page({params}) {
    const {question} = await params;
    const patientType = await returnTypeOfPatient();
    Log({patientType});

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
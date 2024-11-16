import { QuestionParent } from "../components";
import {updateUser} from "@/app/actions";

export default async function Page({params}) {
    const question = await params;
    
    return (
       <QuestionParent updateUser={updateUser} question={question.question}/>
    )
}
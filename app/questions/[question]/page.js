import { QuestionParent } from "../components";

export default async function Page({params}) {
    const question = await params;
    
    return (
       <QuestionParent question={question.question}/>
    )
}
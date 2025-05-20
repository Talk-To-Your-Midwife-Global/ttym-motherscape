import {Reader} from "@/app/(reader)/read/_components/Reader";
import {convertDashDelimitedToSpacedString, convertSpacedStringToDashDelimited} from "@/app/_lib/functions";

export default async function Page({params}) {
    const routeName = await params;
    console.log(routeName.article);

    const blogTitle = convertDashDelimitedToSpacedString(routeName.article);

    return (
        <section>
            <Reader blogTitle={blogTitle}/>
        </section>
    )
}
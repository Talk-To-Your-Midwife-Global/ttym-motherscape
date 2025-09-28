import {BLOCKS} from "@contentful/rich-text-types";

const RichH2 = ({children}) => {
    return <h2 className={"font-bold text-xl my-2"}>{children}</h2>
}

const RichParagraph = ({children}) => {
    return (
        <div className={"my-4"}> {children} </div>
    )
}

const RichOrderedList = ({children}) => {
    return (
        <ol className={"list-decimal mx-8"}>
            {children}
        </ol>
    )
}

const RichUnOrderedList = ({children}) => {
    return (
        <ul className={"list-disc mx-8"}>
            {children}
        </ul>
    )
}

export const OPTIONS = {
    renderNode: {
        [BLOCKS.HEADING_2]: (node, children) => <RichH2>{children}</RichH2>,
        [BLOCKS.PARAGRAPH]: (node, children) => <RichParagraph>{children}</RichParagraph>,
        [BLOCKS.OL_LIST]: (node, children) => <RichOrderedList>{children}</RichOrderedList>,
        [BLOCKS.UL_LIST]: (node, children) => <RichUnOrderedList>{children}</RichUnOrderedList>
    }
}
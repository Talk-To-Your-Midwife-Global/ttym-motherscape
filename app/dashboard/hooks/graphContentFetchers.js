import useSWR from 'swr'
import {contentGqlFetcher} from "@/app/dashboard/actions/action";

export const postsPreviewQuery = `query BlogPost {\n  blogPostCollection {\n    items {\n      title\n      headerImage {\n        title\n        fileName\n        url\n      }\n      blogInsight {\n        insight\n      }\n    }\n  }\n}`;

export const getOnePostQuery = (blogPostTitle) => {
    return {
        query: `query BlogPost($where: BlogPostFilter) {\r\n  blogPostCollection(where: $where) {\r\n    items {\r\n      mainParagraph {\r\n        json\r\n      }\r\n    }\r\n  }\r\n}"`,
        variables: {"where": {"title": `${blogPostTitle}`}}
    }
}

export function useContentFetcher({query, variables}) {
    const {
        data,
        isLoading,
        error
    } = useSWR([query, variables], ([query, variables]) => contentGqlFetcher(query, variables))

    return {
        blogData: data,
        isLoading,
        error,
    }
}
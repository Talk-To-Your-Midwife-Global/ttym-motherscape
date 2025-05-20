import useSWR from "swr";
import {contentGqlFetcher} from "@/app/dashboard/actions/action";

export const useContentFetcher = ({query, variables}) => {
    const {
        data,
        isLoading,
        error
    } = useSWR([query, variables], ([query, variables]) => contentGqlFetcher(query, variables))

    // I need the exact blog content and not the surrounding things
    const blogContent = data?.blogPostCollection.items;

    return {
        blogData: blogContent,
        isLoading,
        error,
    }
}
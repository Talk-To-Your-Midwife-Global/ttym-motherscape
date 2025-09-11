import useSWR from "swr";
import {contentGqlFetcher} from "@/app/dashboard/actions/action";
import {Log} from "@/app/_lib/utils";

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

export const useEventFetcher = ({query, variables}) => {
    const {
        data,
        isLoading,
        error
    } = useSWR([query, variables], ([query, variables]) => contentGqlFetcher(query, variables))

    const eventContent = data?.eventCollection.items;

    Log('events graphql', {data});
    return {
        data: eventContent,
        isLoading,
        error
    }
}
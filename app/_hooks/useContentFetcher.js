import useSWR from "swr";
import {contentGqlFetcher} from "@/app/dashboard/actions/action";

export const useContentFetcher = ({query, variables}) => {
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
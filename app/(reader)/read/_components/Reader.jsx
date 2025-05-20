import {getOnePostQuery} from "@/app/dashboard/hooks/graphContentFetchers";

// import {useContentFetcher} from "@/app/dashboard/lib/dataFetching";

export function Reader({blogTitle}) {
    // const {blogData} = useContentFetcher(getOnePostQuery(blogTitle));

    return (
        <section>
            Reading here
        </section>
    )
}
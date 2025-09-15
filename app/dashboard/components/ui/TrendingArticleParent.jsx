"use client"
import {useTransition} from "react";
import {ArticleCard} from "@/app/dashboard/components/ui/ArticleCard";
import {postsPreviewQuery} from "@/app/dashboard/hooks/graphContentFetchers";
import {useContentFetcher} from "@/app/_hooks/useContentFetcher";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {bookmarkPost} from "@/app/dashboard/actions/action";
import {Log} from "@/app/_lib/utils";


export function TrendingArticleParent() {
    const [isPending, startTransition] = useTransition();
    const {blogData, isLoading, error} = useContentFetcher({query: postsPreviewQuery, variables: null})
    Log(blogData)

    const theresContent = blogData ? blogData.length > 0 : false;

    const handleBookmarking = (id) => {
        startTransition(async () => {
            const res = await bookmarkPost(id);
            Log(res);
        })
    }


    if (error) {
        // throw new Error(error.message);
        throw new Error(`ArticleParent.jsx: useContentFetcher() ${error}`)

    }

    if (isLoading) {
        return <div>
            <ContainerWrapper>
                Loading...
            </ContainerWrapper>
        </div>
    }

    if (theresContent) {
        return (
            <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 p-4`}>
                {
                    blogData && blogData.map(item => {
                            return <div key={item.title}>
                                <ArticleCard
                                    content={{
                                        title: item.title,
                                        id: item.sys.id,
                                        publishDate: item.sys.publishedAt,
                                        slug: item.titleSlug
                                    }}
                                    imagery={item?.headerImage}
                                    bookmarkAction={handleBookmarking}
                                />
                            </div>
                        }
                    )
                }
            </section>
        )
    } else {
        // TODO: add empty state here
        return (
            <div>
                No articles Found
            </div>
        )
    }
}
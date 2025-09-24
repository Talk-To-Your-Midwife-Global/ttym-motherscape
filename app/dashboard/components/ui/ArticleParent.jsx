"use client"
import {useTransition} from "react";
import {ArticleCard, SmallArticleCard} from "@/app/dashboard/components/ui/ArticleCard";
import {postsPreviewQuery} from "@/app/dashboard/hooks/graphContentFetchers";
import {useContentFetcher} from "@/app/_hooks/useContentFetcher";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {bookmarkPost} from "@/app/dashboard/actions/action";
import {Log} from "@/app/_lib/utils";


export function ArticleParent() {
    const {blogData, isLoading, error} = useContentFetcher({query: postsPreviewQuery, variables: null})
    Log(blogData)

    const theresContent = blogData ? blogData.length > 0 : false;

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
            <section className={`carousel flex flex-col gap-10 overflow-x-auto scroll-smooth .space-x-4 px-4`}>
                {
                    blogData && blogData.map(item => {
                            return <div key={item.title}>
                                <SmallArticleCard
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
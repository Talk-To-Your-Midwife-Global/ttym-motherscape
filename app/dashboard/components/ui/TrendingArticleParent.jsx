"use client"
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {Log} from "@/app/_lib/utils";
import {ArticleCard} from "@/app/dashboard/components/ui/Articles";
import {useArticles} from "@/app/contexts/ArticlesContext";
import posthog from "posthog-js";


export function TrendingArticleParent() {
    const {blogData, error, isLoading, handleArticleCardClick} = useArticles();
    Log({blogData});

    const theresContent = blogData ? blogData.length > 0 : false;

    if (error) {
        posthog.captureException(`ArticleParent.jsx: useContentFetcher() ${error}`)
        // throw new Error(`ArticleParent.jsx: useContentFetcher() ${error}`)
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
            <section className={`.carousel flex overflow-x-auto scroll-smooth space-x-4 p-4`}>
                {
                    blogData && blogData.map(item => {
                            return <div key={item.title}>
                                <ArticleCard
                                    handleClick={handleArticleCardClick}
                                    content={{
                                        title: item.title,
                                        id: item.sys.id,
                                        publishDate: item.sys.publishedAt,
                                        slug: item.titleSlug,
                                        insight: item.blogInsight.insight
                                    }}
                                    imagery={item?.headerImage}
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
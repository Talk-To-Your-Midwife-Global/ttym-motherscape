"use client"
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {Log} from "@/app/_lib/utils";
import {SmallArticleCard} from "@/app/dashboard/components/ui/Articles";
import {useArticles} from "@/app/contexts/ArticlesContext";


export function ArticleParent() {
    const {blogData, error, isLoading, handleArticleCardClick} = useArticles();
    Log({blogData});

    const theresContent = blogData ? blogData.length > 0 : false;

    if (error) {
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
            <section className={`carousel flex flex-col gap-10 overflow-x-auto scroll-smooth px-4`}>
                {
                    blogData && blogData.map(item => {
                            return <div key={item.title}>
                                <SmallArticleCard
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
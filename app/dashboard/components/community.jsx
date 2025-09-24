"use client"
import {useState} from "react";
import {ArticleCard, SmallArticleCard} from "@/app/dashboard/components/ui/ArticleCard";
import {useContentFetcher} from "@/app/_hooks/useContentFetcher";
import {postsPreviewQuery} from "@/app/dashboard/hooks/graphContentFetchers";
import {Log} from "@/app/_lib/utils";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {ModifiedReader} from "@/app/(reader)/read/_components/ModifiedReader";

export function Community({accessToken}) {
    const [read, setRead] = useState(false);
    const [article, setArticle] = useState({});
    const tags = ['all', 'pregnancy', 'menopause', 'weight loss', 'something']
    const {blogData, isLoading, error} = useContentFetcher({query: postsPreviewQuery, variables: null})
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

    const handleArticleClick = (article) => {
        Log({article});
        setArticle(article);
        setRead(true);
    }
    return (
        <section className={"mt-1"}>
            {/*<section className={`flex gap-2 mx-6 my-5`}>*/}
            {/*    <div className={`bg-white border-2 flex-1 flex items-center px-2 rounded-3xl`}>*/}
            {/*        <Image src={searchIcon} alt={'search icon'}/>*/}
            {/*        <input type={"search"} placeholder={"Search here..."}*/}
            {/*               className={`px-2 outline-none flex-1 text-primaryText`}/>*/}
            {/*    </div>*/}
            {/*    <motion.div*/}
            {/*        variants={tapVariants}*/}
            {/*        whileHover={{scale: 1.1}}*/}
            {/*        whileTap={{scale: 0.95}}*/}
            {/*        className={`bg-primaryColor w-10 h-10 rounded-md flex items-center justify-center`}>*/}
            {/*        <Image src={bookMarkIcon} alt={'bookmark icon'}/>*/}
            {/*    </motion.div>*/}
            {/*</section>*/}
            {/*<section className={`flex gap-2 px-4 carousel overflow-x-auto scroll-smooth my-2`}>*/}
            {/*    {tags.map((tag) => (*/}
            {/*        <button key={tag}*/}
            {/*                className={`rounded-full px-3 py-2 text-primaryColor bg-[#EBF4F5] h-[40px] min-w-fit capitalize text-sm`}>*/}
            {/*            {tag}*/}
            {/*        </button>*/}
            {/*    ))}*/}
            {/*</section>*/}
            <section className={"overflow-x-hidden h-[360px] mb-10 w-full"}>
                <header className={`px-[26px] my-5 text-[#000] font-medium`}>
                    <h1 className={`text-xl`}>Trending Articles</h1>
                </header>
                {/*    Trending Articles  go here*/}
                <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 p-4`}>
                    {
                        blogData && blogData.map(item => {
                                return <div key={item.title}>
                                    <ArticleCard
                                        handleClick={handleArticleClick}
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
            </section>

            <section className={"overflow-x-hidden h-[260px] w-full"}>
                <header className={`px-[26px] my-5 text-[#000] font-medium`}>
                    <h1 className={`text-xl`}>Articles</h1>
                    <section>

                    </section>
                </header>
                <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 p-4`}>
                    {/*<Insights accessToken={accessToken}/>*/}
                    {/*<ArticleParent/>*/}
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
                                        />
                                    </div>
                                }
                            )
                        }
                    </section>
                </section>
            </section>

            {
                read && <ModifiedReader handleNotReading={() => setRead(false)} read={read} setRead={setRead}
                                        article={article}/>
            }
        </section>
    )
}
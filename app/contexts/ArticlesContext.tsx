"use client"

import {createContext, useContext, useState} from "react";
import {useContentFetcher} from "@/app/_hooks/useContentFetcher";
import {postsPreviewQuery} from "@/app/dashboard/hooks/graphContentFetchers";
import {ArticleParent} from "@/app/dashboard/components/ui/ArticleParent";
import {ModifiedReader} from "@/app/(reader)/read/_components/ModifiedReader";
import {Log} from "@/app/_lib/utils";
import {TrendingArticleParent} from "@/app/dashboard/components/ui/TrendingArticleParent";

const ArticlesContext = createContext();

function ArticlesHQ({children}) {
    const [currentArticle, setCurrentArticle] = useState({});
    const [articles, setArticles] = useState({}); // optio0nal
    const [loading, setLoading] = useState(false); // optional
    const [read, setRead] = useState(false);

    const {blogData, isLoading, error} = useContentFetcher({query: postsPreviewQuery, variables: null});

    const handleNotReading = () => {
        setRead(false);
    }

    const handleArticleCardClick = (content) => {
        Log("ArticleHQ: handleArticleCardClick() content", {content})
        setCurrentArticle(content)
        setRead(true);
    }

    const values = {
        currentArticle, setCurrentArticle, handleArticleCardClick,
        isLoading, blogData, error,
        read, setRead, handleNotReading: () => handleNotReading(),
    }


    return (
        <ArticlesContext.Provider value={values}>
            {children}
        </ArticlesContext.Provider>
    )
}

export function useArticles() {
    return useContext(ArticlesContext);

}

ArticlesHQ.Articles = ArticleParent;
ArticlesHQ.Trending = TrendingArticleParent;
ArticlesHQ.Reader = ModifiedReader;

export {ArticlesHQ};
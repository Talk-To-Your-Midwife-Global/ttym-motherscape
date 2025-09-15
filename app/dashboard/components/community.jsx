"use client"
import Image from "next/image";
import {motion} from "framer-motion";
import {tapVariants} from "@/app/_lib/motions";
import {Insights} from "@/app/dashboard/components/insights";
import {ArticleCard} from "@/app/dashboard/components/ui/ArticleCard";
import bookMarkIcon from "@/public/icons/bookmark-main.svg"
import searchIcon from "@/public/icons/search-icon.svg"
import {TrendingArticleParent} from "@/app/dashboard/components/ui/TrendingArticleParent";
import {ArticleParent} from "@/app/dashboard/components/ui/ArticleParent";

export function Community({accessToken}) {
    const tags = ['all', 'pregnancy', 'menopause', 'weight loss', 'something']
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
                    <h1 className={`text-xl`}>Trending</h1>
                </header>
                {/*    Article Parent goes here*/}
                <TrendingArticleParent/>
            </section>

            <section className={"overflow-x-hidden h-[260px] w-full"}>
                <header className={`px-[26px] my-5 text-[#000] font-medium`}>
                    <h1 className={`text-xl`}>Articles</h1>
                    <section>

                    </section>
                </header>
                <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 p-4`}>
                    {/*<Insights accessToken={accessToken}/>*/}
                    <ArticleParent/>
                </section>
            </section>
        </section>
    )
}
"use client"
import {TapWrapper} from "@/app/_components/TapWrapper";
import {ArticlesHQ} from "@/app/contexts/ArticlesContext";

export function Community() {
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
            <section className={"overflow-x-hidden overflow-y-clip h-[360px] mb-10 w-full"}>
                <header className={`px-[26px] my-5 text-[#000] font-medium`}>
                    <h1 className={`text-xl`}>Trending Articles</h1>
                </header>

                <ArticlesHQ.Trending/>
                <ArticlesHQ.Reader/>
            </section>
            {/*Talktoyoursisters*/}
            <section>
                <section
                    className={"border-2 mx-4 h-[108px] rounded-xl bg-radial-glow grid grid-cols-2 max-w-[400px] "}>
                    <div className={"text-white pl-3 py-2 flex flex-col .items-center justify-center"}>
                        <h3 className={"font-light text-[12px]"}>Talk To Your Sisters 💬</h3>
                        <p className={'text-sm'}>Real women. Real stories. Real support.</p>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <TapWrapper customStyles={"flex items-center justify-center mt-3"}
                                    link={"https://chat.whatsapp.com/IqHGnXGfxTSAadI946eLuq?mode=ems_copy_t"}>
                            <div
                                className={"bg-white rounded-3xl text-[12px] text-center p-2"}>Join Community
                            </div>
                        </TapWrapper>
                    </div>
                </section>

            </section>

            <section className={"overflow-x-hidden overflow-y-clip w-full"}>
                <header className={`px-[26px] my-5 text-[#000] font-medium`}>
                    <h1 className={`text-xl`}>Articles</h1>
                    <section>
                    </section>
                </header>
                <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 p-4`}>
                    <ArticlesHQ.Articles/>
                    <ArticlesHQ.Reader/>
                </section>
            </section>
        </section>
    )
}
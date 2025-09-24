'use client';

import {clsx} from 'clsx';
import {useState} from 'react';
import {Drawer} from 'vaul';
import {Log} from "@/app/_lib/utils";
import {useContentFetcher} from "@/app/_hooks/useContentFetcher";
import {getOnePostQuery} from "@/app/dashboard/hooks/graphContentFetchers";
import {richTextToJsx} from "@madebyconnor/rich-text-to-jsx";
import {Spinner} from "@/app/_components/Spinner";
import {Reader} from "@/app/(reader)/read/_components/Reader";

const snapPoints = ['200px', 1];

export function ModifiedReader({read, setRead, article, handleNotReading}) {
    const [snap, setSnap] = useState(snapPoints[0]);
    const {blogData, isLoading} = useContentFetcher(getOnePostQuery(article.slug));
    const blogInsight = blogData ? blogData[0]?.blogInsight?.insight : undefined;
    const blogHeaderImage = blogData ? blogData[0]?.headerImage : undefined;
    Log({snap})


    if (isLoading) {
        return (
            <Drawer.Root open={read} setOpen={setRead} snapPoints={snapPoints} activeSnapPoint={snap}
                         setActiveSnapPoint={setSnap} modal={false}>
                <Drawer.Overlay className="fixed inset-0 bg-[#00000061]"/>
                <Drawer.Portal>
                    <Drawer.Content
                        data-testid="content"
                        className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[90%] mx-[-1px]">
                        <div
                            className={clsx('flex flex-col max-w-md mx-auto w-full p-4 pt-5', {
                                'overflow-y-auto': snap === 1,
                                'overflow-hidden': snap !== 1,
                            })}
                        >
                            <p className={"text-yellow-600 flex items-center gap-2"}><Spinner/> Fetching Article
                            </p>
                            <Drawer.Title
                                className="text-2xl mt-2 font-medium text-gray-400 capitalize">{article?.title}</Drawer.Title>
                            {/*<p className="text-sm mt-1 text-gray-600 mb-6">40 videos, 20+ exercises</p>*/}
                            <p className="text-gray-600">
                                {article?.insight}
                            </p>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        )
    } else {
        return (
            <Drawer.Root open={read} setOpen={setRead} snapPoints={snapPoints} activeSnapPoint={snap}
                         setActiveSnapPoint={setSnap} modal={false}>
                <Drawer.Overlay className="fixed inset-0 bg-[#00000061]"/>
                <Drawer.Portal>
                    <Drawer.Content
                        data-testid="content"
                        className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[100%] mx-[-1px]">
                        <div
                            className={clsx('flex flex-col max-w-md mx-auto w-full px-4 .pt-5', {
                                'overflow-y-auto': snap === 1,
                                'overflow-hidden': snap !== 1,
                            })}
                        >
                            {snap !== 1 &&
                                <div>
                                    <div className={"flex justify-between pt-5"}>
                                        <div className={"flex items-center gap-2 mb-4 mx-3"}>
                                            <span className={'iconify material-symbols--check-circle text-2xl'}></span>
                                            <p>Push up to read</p>
                                        </div>
                                        <div tabIndex={0} onClick={() => handleNotReading()}
                                             className={"bg-black text-white w-[20px] h-[20px] flex items-center justify-center rounded-full"}>
                                            <span
                                                className={"iconify font-bold material-symbols--close-rounded"}></span>
                                        </div>
                                    </div>
                                    <Drawer.Title
                                        className="text-2xl mt-2 font-medium text-gray-400 capitalize">{article?.title}</Drawer.Title>
                                    {/*<p className="text-sm mt-1 text-gray-600 mb-6">40 videos, 20+ exercises</p>*/}
                                    <p className="text-gray-600 line-clamp-2">
                                        {article?.insight}
                                    </p>
                                </div>
                            }

                            {snap === 1 && <>

                                <div
                                    className={"  text-yellow-600 mb-4 mx-2"}>
                                    <div
                                        className={"sticky top-0 z-20 bg-white/80 p-2 flex flex-col items-center gap-2"}>
                                        <span className={'iconify material-symbols--check-circle text-2xl'}></span>
                                        <p className={"text-yellow-600"}>Currently reading</p>
                                    </div>
                                    <Reader blogData={blogData}/>
                                </div>
                            </>
                            }
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        );
    }
}
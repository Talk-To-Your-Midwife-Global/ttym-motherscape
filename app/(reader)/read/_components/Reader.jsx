"use client"
import {getOnePostQuery} from "@/app/dashboard/hooks/graphContentFetchers";
import {useContentFetcher} from "@/app/_hooks/useContentFetcher";
import {ReaderNav} from "@/app/_components/ReaderNav";
import Image from "next/image";
import {montserrat} from "@/app/_fonts";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {richTextToJsx} from "@madebyconnor/rich-text-to-jsx";
import {convertDashDelimitedToSpacedString} from "@/app/_lib/functions";
import {formatDistanceToNow} from "date-fns"; // todo: use for date

export function Reader({blogTitle}) {
    console.log({blogTitle});
    const {blogData} = useContentFetcher(getOnePostQuery(blogTitle));
    console.log({blogData});
    console.log(blogData && blogData[0]?.blogInsight?.insight)

    const blogInsight = blogData ? blogData[0]?.blogInsight?.insight : undefined;
    const blogHeaderImage = blogData ? blogData[0]?.headerImage : undefined;

    console.log(blogData ? richTextToJsx(blogData[0]?.mainParagraph.json) : undefined)
    console.log(blogData ? blogData[0]?.mainParagraph.json : undefined)

    return (
        <section>
            <nav>
                <ContainerWrapper>
                    <ReaderNav/>
                </ContainerWrapper>
            </nav>
            <ContainerWrapper>
                <section className="text-black">
                    <p className={`${montserrat.className} capitalize text-gray-500`}>{convertDashDelimitedToSpacedString(blogTitle)}</p>
                    <h2 className="text-xl font-bold wrap mt-5 ">{blogInsight ? blogInsight : ''}</h2>
                    {/*    Author stuff */}
                    <div className="my-10 flex gap-5 items-center">
                        <div>
                            {blogHeaderImage &&
                                <Image src={blogHeaderImage?.url} alt={blogHeaderImage?.title}
                                       width={50} height={50}
                                       className="rounded-full"/>
                            }
                        </div>
                        <div className={`${montserrat.className}`}>
                            <p className={`${montserrat.className} font-medium`}>Trudy Akorita</p>
                            <p className="text-sm">Today at 11:37 am </p>
                        </div>
                    </div>

                    <div className="my-4 h-[300px] relative">
                        {blogHeaderImage &&
                            <Image src={blogHeaderImage?.url} alt={blogHeaderImage?.title}
                                   fill={true}
                                   className="w-full rounded-md"/>
                        }
                    </div>
                </section>
                <div className="text-black">
                    {/*TODO: attempt to give more spacing to the paragraphs; modify the way the elements look*/}
                    {
                        richTextToJsx(blogData ? blogData[0]?.mainParagraph.json : [])
                    }
                </div>

            </ContainerWrapper>
        </section>
    )
}
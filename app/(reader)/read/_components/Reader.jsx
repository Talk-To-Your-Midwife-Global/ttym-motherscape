"use client"
import Image from "next/image";
import {montserrat} from "@/app/_fonts";
import {richTextToJsx} from "@madebyconnor/rich-text-to-jsx";
import {Log} from "@/app/_lib/utils";
import {getRelativeTime} from "@/app/dashboard/lib/functions";

export function Reader({blogTitle, blogData}) {
    Log({blogTitle});
    Log({blogData});
    Log(blogData && blogData[0]?.blogInsight?.insight)

    const blogInsight = blogData ? blogData[0]?.blogInsight?.insight : undefined;
    const blogHeaderImage = blogData ? blogData[0]?.headerImage : undefined;

    Log(blogData ? richTextToJsx(blogData[0]?.mainParagraph.json) : undefined)
    Log(blogData ? blogData[0]?.mainParagraph.json : undefined)

    return (
        <section>
            <section className="text-black">
                {/*    Author stuff */}
                <div className=".my-10 flex gap-5 items-center">
                    <div>
                        {blogHeaderImage &&
                            <Image src={blogHeaderImage?.url} alt={blogHeaderImage?.title}
                                   width={50} height={50}
                                   className="rounded-full w-[50px] h-[50px]"/>
                        }
                    </div>
                    <div className={`${montserrat.className}`}>
                        <p className={`${montserrat.className} font-medium`}>{blogData[0]?.author.name}</p>
                        <p className="text-sm">{getRelativeTime(blogData[0]?.sys.publishedAt)}</p>
                    </div>
                </div>

                <div className="my-4 h-[300px] relative">
                    {blogHeaderImage &&
                        <Image src={blogHeaderImage?.url} alt={blogHeaderImage?.title}
                               fill={true}
                               className="w-full rounded-3xl"/>
                    }
                </div>
                <header>
                    <h2 className={"text-2xl text-black font-semibold capitalize"}>{blogData[0]?.title}</h2>
                </header>
            </section>
            <div className="text-black mt-5">
                {/*TODO: attempt to give more spacing to the paragraphs; modify the way the elements look*/}
                {
                    richTextToJsx(blogData ? blogData[0]?.mainParagraph.json : [])
                }
            </div>


        </section>
    )
}
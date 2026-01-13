"use client"
import healthImage from "@/public/images/adobe-stock-health-image.webp";
import {getRelativeTime} from "@/app/dashboard/lib/functions";
import {ImageDisplay} from "@/app/dashboard/components/ui/ArticleCard";
import {TapWrapper} from "@/app/_components/TapWrapper";

export function ArticleCard({content, imagery, handleClick}) {
    return (
        <article tabIndex={0} onClick={() => handleClick(content)}
                 className="shadow-md w-[301px] max-w-[300px] h-[293px] rounded-md p-2 border-2 border-[#DADADA]">
            <div>
                <ImageDisplay images={[imagery?.url || healthImage]} aspectRatio={"long"}/>
            </div>
            <div
                className="flex flex-col z-5 px-2 py-4 backdrop-blur-md rounded-lg">
                <div>
                    <p className="font-bold text-black .h-[50px] text-pretty line-clamp-2">
                            <span
                                className="text-wrap capitalize">{content?.title}</span>
                    </p>
                    <p className={"line-clamp-2 text-[#3A3A3A99]"}>
                        {content?.insight}
                    </p>
                </div>
                <div className={"flex items-center gap-1 mt-2 text-[#666869]"}>
                    <span className={"iconify mdi--clock-outline "}></span>
                    <span>{getRelativeTime(content?.publishDate)}</span>
                </div>
            </div>
        </article>
    )
}

export function SmallArticleCard({content, imagery, handleClick}) {
    return (
        <TapWrapper>
            <section onClick={() => handleClick(content)} tabIndex={0} className={"flex gap-2 text-primaryText"}>
                <div>
                    <ImageDisplay images={[imagery?.url || healthImage]} className={"w-[80px] h-[80px]"}
                                  aspectRatio={"square"}/>
                </div>
                <div>
                    <div className={"w-[200px] h-[50px]"}>
                        <h3 className={"text-primaryText line-clamp-2 capitalize font-bold"}>{content?.title}</h3>
                    </div>
                    <div className={"flex items-center gap-1 text-[#666869] "}>
                        <span className={"iconify mdi--clock-outline "}></span>
                        <span>{getRelativeTime(content?.publishDate)}</span>
                    </div>
                </div>
            </section>
        </TapWrapper>
    )
}

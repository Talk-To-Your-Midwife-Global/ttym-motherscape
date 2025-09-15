import Image from "next/image";
import Link from "next/link";
import {BookmarkingIcon} from "@/app/dashboard/components/icons";
import healthImage from "@/public/images/adobe-stock-health-image.webp"
import {cn} from "@/app/_lib/utils";
import {CustomCarousel} from "@/app/_components/CustomeCarousel"
import {getRelativeTime} from "@/app/dashboard/lib/functions";


export const ImageDisplay = ({
                                 images,
                                 aspectRatio = "landscape",
                                 className,
                                 alt = "Image"
                             }) => {
    const aspectRatioClass = {
        square: "aspect-square",
        video: "aspect-video",
        portrait: "aspect-[3/4]",
        landscape: "aspect-[4/3]",
        long: "aspect-[21/9]",
        other9: "aspect-[9/16]"
    }[aspectRatio];
    console.log(images.length);
    if (images.length === 0) {
        return (
            <div className={cn(
                "w-full bg-gray-100 flex items-center justify-center rounded-lg",
                aspectRatioClass,
                className
            )}>
                <p className="text-gray-400">No image available</p>
            </div>
        );
    }

    if (images.length === 1) {
        return (
            <div className={cn(
                "w-full overflow-hidden rounded-lg",
                aspectRatioClass,
                className
            )}>
                <Image
                    src={images[0]}
                    alt={alt}
                    className="w-full h-full object-cover"
                    width={147}
                    height={100}
                />
            </div>
        );
    }

    return (
        <div className={cn("w-full", aspectRatioClass, className)}>
            <CustomCarousel autoPlay={true}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`${alt} ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                ))}
            </CustomCarousel>
        </div>
    );
};

export function ArticleCard({content, imagery, bookmarkAction}) {
    const link = content && content?.slug;
    return (
        <article tabIndex={0}
                 className="shadow-md w-[271px] max-w-[300px] h-[230px] rounded-md outline-[#0F969C] p-2 border-2 border-[#DADADA] overflow-hidden">
            <div className="aspect-video">
                {/*<Image src={imagery?.url || healthImage} width={237} height={120} alt="Some blue background image"*/}
                {/*       className="rounded-lg"/>*/}
                <ImageDisplay images={[imagery?.url || healthImage]} aspectRatio={"video"}/>
            </div>
            <div
                className=".h-[150px] flex flex-col py-4 z-5 px-4 backdrop-blur-md rounded-lg">
                <div>
                    <p className="font-bold text-black h-[50px] .w-[150px] text-pretty truncate">
                        <Link href={`/read/${link}`}>
                            <span
                                className="text-wrap truncate .h-[100px] .w-[150px] capitalize">{content?.title}</span>
                        </Link>
                    </p>
                </div>
                {/*<div className="text-transparent flex items-center gap-3 mt-2 fixed bottom-4 ">*/}
                {/*    <div className="flex items-center gap-2" tabIndex="0" onClick={() => bookmarkAction(content.id)}>*/}
                {/*        <BookmarkingIcon/> <span className="text-primaryText text-[12px]">bookmark</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </article>
    )
}

export function SmallArticleCard({content, imagery,}) {
    const link = content && content?.slug;
    return (
        <Link href={`/read/${link}`}>
            <section tabIndex={0} className={"flex gap-2 text-primaryText"}>
                <div>
                    <ImageDisplay images={[imagery?.url || healthImage]} className={"w-[80px] h-[80px]"}
                                  aspectRatio={"square"}/>
                </div>
                <div>
                    <div className={"w-[200px] h-[50px] wrap"}>
                        <h3 className={"text-primaryText wrap line-clamp-2 capitalize font-bold"}>{content?.title}</h3>
                    </div>
                    <div className={"flex items-center gap-1 "}>
                        <span className={"iconify mdi--clock-outline "}></span>
                        <span>{getRelativeTime(content?.publishDate)}</span>
                    </div>
                </div>
            </section>
        </Link>
    )
}
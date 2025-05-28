import Image from "next/image";
import Link from "next/link";
import {BookmarkingIcon} from "@/app/dashboard/components/icons";
import healthImage from "@/public/images/adobe-stock-health-image.webp"
import {convertSpacedStringToDashDelimited} from "@/app/_lib/functions";

export function ArticleCard({content, imagery}) {
    const link = convertSpacedStringToDashDelimited(content.title);
    return (
        <Link href={`/read/${link}`}>
            <article tabIndex={1}
                     className="relative shadow-md min-w-[200px] max-w-[300px] h-[200px] rounded-md grid content-end outline-[#0F969C]">
                <div className="absolute">
                    {/*<img src="" alt="some image"/>*/}
                    <Image src={imagery?.url || healthImage} width={200} height={100} alt="Some blue background image"
                           className="rounded-lg"/>
                </div>

                <div
                    className="h-[100px] flex flex-col py-4 z-5  px-4 backdrop-blur-md rounded-lg">
                    <p className="text-[#0E0E0EB0] text-sm capitalised ">Fatigue</p>
                    <p className="font-bold text-black w-[160px] truncate">
                        <a href="#" className="truncate h-[50px] capitalize">{content?.title}</a>
                    </p>
                    <p></p>
                    <div className="text-transparent flex items-center gap-3">
                        <BookmarkingIcon/> <span className="text-primaryText text-sm">read</span>
                    </div>
                </div>
            </article>
        </Link>
    )
}
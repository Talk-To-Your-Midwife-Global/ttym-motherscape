import Image from "next/image";
import Link from "next/link";
import {BookmarkingIcon} from "@/app/dashboard/components/icons";
import healthImage from "@/public/images/adobe-stock-health-image.webp"

export function ArticleCard({content, imagery, bookmarkAction}) {
    const link = content && content?.slug;
    return (
        <article tabIndex={1}
                 className="relative shadow-md min-w-[200px] max-w-[300px] h-[250px] rounded-md grid content-end outline-[#0F969C]">
            <div className="absolute">
                <Image src={imagery?.url || healthImage} width={200} height={100} alt="Some blue background image"
                       className="rounded-lg"/>
            </div>
            <div
                className="h-[150px] flex flex-col py-4 z-5 px-4 backdrop-blur-md rounded-lg">
                <div>
                    <p className="text-[#0E0E0EB0] text-sm capitalised ">Fatigue</p>
                    <p className="font-bold text-black h-[50px] w-[150px] text-pretty truncate">
                        <Link href={`/read/${link}`}>
                            <p className="text-wrap truncate .h-[100px] w-[150px] capitalize">{content?.title}</p>
                        </Link>
                    </p>
                </div>
                <div className="text-transparent flex items-center gap-3 mt-2 fixed bottom-4 ">
                    <div className="flex items-center gap-2" tabIndex="0" onClick={() => bookmarkAction(content.id)}>
                        <BookmarkingIcon/> <span className="text-primaryText text-[12px]">bookmark</span>
                    </div>
                </div>
            </div>
        </article>
    )
}
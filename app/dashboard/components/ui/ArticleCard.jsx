import Image from "next/image";
import {cn, Log} from "@/app/_lib/utils";
import {CustomCarousel} from "@/app/_components/CustomeCarousel"


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
    Log(images.length);
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


"use client"
import React, {useState, useEffect, useCallback} from 'react';

export const CustomCarousel = ({
                                   children,
                                   autoPlay = false,
                                   interval = 5000
                               }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % children.length);
    }, [children.length]);

    const previousSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + children.length) % children.length);
    }, [children.length]);

    useEffect(() => {
        if (!isPlaying) return;

        const timer = setInterval(() => {
            nextSlide();
        }, interval);

        return () => clearInterval(timer);
    }, [isPlaying, interval, nextSlide]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                previousSlide();
            } else if (event.key === 'ArrowRight') {
                nextSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, previousSlide]);

    return (
        <div className="relative group">
            <div className="overflow-hidden rounded-lg">
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{transform: `translateX(-${currentSlide * 100}%)`}}
                >
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className="w-full flex-shrink-0"
                            aria-hidden={currentSlide !== index}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={previousSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Previous slide"
            >
                {/*<ChevronLeft className="h-6 w-6 text-gray-800" />*/}
                <span className={"iconify lucide--chevron-left"}></span>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Next slide"
            >
                {/*<ChevronRight className="h-6 w-6 text-gray-800" />*/}
                <span className={"iconify lucide--chevron-right"}> </span>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {children.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentSlide === index
                                ? 'bg-white w-4'
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={currentSlide === index}
                    />
                ))}
            </div>
        </div>
    );
};
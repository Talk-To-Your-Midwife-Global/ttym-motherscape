"use client";

import {useEffect, useRef, useState} from "react";

export function SlidePickerWheel({
                                     min = 25,
                                     max = 35,
                                     initial = 25,
                                     suffix = "days",
                                     onChange,
                                 }) {
    const items = Array.from({length: max - min + 1}, (_, i) => min + i);
    const initVal = Number(initial);
    const startIndex =
        initVal >= min && initVal <= max ? initVal - min : Math.floor(items.length / 2);

    const [selectedIndex, setSelectedIndex] = useState(startIndex);

    const containerRef = useRef(null);
    const itemHeightRef = useRef(0);
    const rafRef = useRef(null);
    const scrollEndTimerRef = useRef(null);

    const scrollToIndex = (idx, smooth = false) => {
        const el = containerRef.current;
        if (!el || !itemHeightRef.current) return;
        el.scrollTo({
            top: idx * itemHeightRef.current,
            behavior: smooth ? "smooth" : "auto",
        });
    };

    // Measure item height and pad the container so the center is true center
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const measure = () => {
            const first = el.querySelector("[data-item]");
            const h = first ? first.getBoundingClientRect().height : 0;
            if (!h) return;
            itemHeightRef.current = h;

            // center padding so the item in the middle lines up perfectly
            const pad = Math.max(0, (el.clientHeight - h) / 2);
            el.style.paddingTop = `${pad}px`;
            el.style.paddingBottom = `${pad}px`;

            // ensure we're scrolled to the selected index after measuring
            scrollToIndex(selectedIndex, false);
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [selectedIndex]);

    // Notify parent when selection changes
    useEffect(() => {
        if (typeof onChange === "function") onChange(items[selectedIndex]);
    }, [selectedIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    // Scroll handler: update selected while scrolling; snap when scroll ends
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);

            rafRef.current = requestAnimationFrame(() => {
                if (!el || !itemHeightRef.current) return;
                const idx = Math.round(el.scrollTop / itemHeightRef.current);
                const clamped = Math.max(0, Math.min(items.length - 1, idx));
                setSelectedIndex(clamped);
            });

            if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
            scrollEndTimerRef.current = setTimeout(() => {
                if (!el || !itemHeightRef.current) return;
                const idx = Math.round(el.scrollTop / itemHeightRef.current);
                const clamped = Math.max(0, Math.min(items.length - 1, idx));
                scrollToIndex(clamped, true);
            }, 120); // snap delay after user stops
        };

        el.addEventListener("scroll", handleScroll, {passive: true});
        return () => {
            el.removeEventListener("scroll", handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
        };
    }, []);

    return (
        <div className="flex items-center justify-center h-[250px] .bg-gray-50">
            <div className="relative w-[180px] h-40">
                {/* top fade */}
                <div
                    className="pointer-events-none absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent z-20 p-2"/>
                {/* bottom fade */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent z-20"/>

                {/* custom center highlight — fully under your control, no library border */}
                <div
                    className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-full h-12 flex items-center z-30">
                    <span className="text-5xl font-bold text-black">{items[selectedIndex]}</span>
                    <span
                        className="ml-5 text-3xl self-bottom font-semibold text-black absolute left-12">{suffix}</span>
                </div>

                {/* scrollable column */}
                <div
                    ref={containerRef}
                    className="h-40 overflow-y-scroll snap-y snap-mandatory .text-center day-wheel-scroll"
                    style={{WebkitOverflowScrolling: "touch"}}
                >
                    {items.map((val, i) => (
                        <div
                            key={val}
                            data-item
                            onClick={() => scrollToIndex(i, true)}
                            className={`snap-center py-2 text-lg select-none ${
                                i === selectedIndex ? "text-transparent" : "text-gray-400"
                            }`}
                        >
                            {val}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

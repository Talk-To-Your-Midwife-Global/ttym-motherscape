import {twMerge} from "tailwind-merge";
import {clsx} from "clsx";

export function cn(...inputs) {
    return twMerge(clsx(...inputs));
}


//
export function Log(...inputs) {
    if (typeof window === "undefined") {
        if (process.env.environment !== "production") {
            console.log(...inputs);
        }
    }
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production") {
        console.log(...inputs);
    }
}

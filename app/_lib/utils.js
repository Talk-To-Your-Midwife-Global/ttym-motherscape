import {twMerge} from "tailwind-merge";
import {clsx} from "clsx";

export function cn(...inputs) {
    return twMerge(clsx(...inputs));
}

export function Log(...inputs) {
    if (process.env.environment === "development") {
        console.log(...inputs);
    }
}
import {twMerge} from "tailwind-merge";
import {clsx} from "clsx";


// PREGNANT, MENSTRUATING, MENOPAUSED, POSTPARTUM, UNASSIGNED
export const USERTYPE = {
    menstrual: "MENSTRUATING",
    pregnant: "PREGNANT",
    menopaused: "MENOPAUSED",
    postpartum: "POSTPARTUM",
    unassigned: "UNASSIGNED",
}

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

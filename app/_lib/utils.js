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


export const generateFibonacci = (n = 1, max = 21) => {
    // 1, 1, 2, 3, 5, 8, 13, 21
    const nums = [1, 2];
    const hashMap = {};
    for (let i = 2; i < 10; i++) {
        nums[i] = nums[i - 1] + nums[i - 2];
        hashMap[nums[i - 1] + nums[i - 2]] = 1;
    }
    return hashMap;
}
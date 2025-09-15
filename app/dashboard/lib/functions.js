import {Log} from "@/app/_lib/utils";

export function getRelativeTime(date) {
    const now = new Date();
    date = new Date(date)
    
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
        {label: "year", seconds: 31536000},
        {label: "month", seconds: 2592000},
        {label: "week", seconds: 604800},
        {label: "day", seconds: 86400},
        {label: "hour", seconds: 3600},
        {label: "minute", seconds: 60},
        {label: "second", seconds: 1},
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            if (interval.label === "hour" && count === 1) {
                return "An hour ago";
            }
            return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}

export function convertCommaStringToArray(string) {
    Log(string.split(',').map(item => item.trim()))
    return string.split(',').map(item => item.trim());
}

export function formatNumberWithOrdinal(num) {
    if (typeof num !== 'number' || isNaN(num)) {
        throw new Error('Input must be a valid number');
    }

    const absNum = Math.abs(num);
    const suffix = (absNum % 10 === 1 && absNum % 100 !== 11) ? 'st' :
        (absNum % 10 === 2 && absNum % 100 !== 12) ? 'nd' :
            (absNum % 10 === 3 && absNum % 100 !== 13) ? 'rd' : 'th';

    return `${num}${suffix}`;
}

export function computeNumberOfMonthsFromDays(days) {
    if (days < 31) {
        return 0
    }
    return days % 30;
}

export function poundsToGrams(pounds) {
    if (typeof pounds !== 'number' || isNaN(pounds)) {
        throw new Error('Input must be a valid number');
    }
    const grams = pounds * 453.592;
    return parseFloat(grams.toFixed(2)); // Round to 2 decimal points
}

export function generateNumbers(k) {

    const intervalStart = (k - 3) > 0 ? (k - 3) : 0;
    const intervalEnd = k + 3;

    return Array.from({length: intervalEnd - intervalStart + 1}, (_, index) => intervalStart + index);
}
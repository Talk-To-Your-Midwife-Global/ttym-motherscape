import {addDays, eachDayOfInterval, endOfMonth, format, getMonth, subDays} from "date-fns";
import {Log} from "@/app/_lib/utils";

/**
 * Generate an object containing months and all the days of the month for the calendar component
 * @returns an object of month objects
 */

export const STAGES = {
    MENSTRUAL: "MENSTRUAL",
    FOLLICULAR: "FOLLICULAR",
    OVULATION: "OVULATION",
    LUTEAL: "LUTEAL",
    SAFE: "SAFE"
}

export function generateMonths() {
    const months = {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {}
    };

    const currentDate = new Date();
    // allocate the days for each month
    for (const month in months) {
        currentDate.setMonth(month);
        currentDate.setDate(1);
        let endDate = endOfMonth(currentDate);
        let interval = eachDayOfInterval({
            start: currentDate,
            end: endDate
        })
        // loop through each day and assign required object
        for (const day of interval) {
            let betterLookingDay = format(day, "yyyy-MM-dd")
            months[month][betterLookingDay] = {
                style: "",
                stage: ""
            }
        }
    }
    return months
}


// for each cycle, the menstrual, the ovulation, the safe and pass them to the monthAllocator

export function getMenstrualDates(start, end) {
    start = new Date(start);
    end = new Date(end)
    const days = eachDayOfInterval({
        start, end
    });
    const style = "bg-[#E82A73] text-white rounded-2xl"
    return styleDates(days, style);
}

export function getOvulationDates(ovulationDay) {
    const start = subDays(ovulationDay, 2);
    const end = addDays(ovulationDay, 1);
    const days = eachDayOfInterval({start, end});
    const fertileDays = styleDates(days, "bg-[#DEE4F5] text-black rounded-full");
    fertileDays[2].style = "bg-[#07226B] text-white rounded-full"
    return fertileDays;
}

export function getSafeDays(safeDaysArray) {
    const res = [];
    const style = "bg-[#3CB9FB50] text-black rounded-full"
    for (const range of safeDaysArray) {
        const start = new Date(range.start_date);
        const end = new Date(range.end_date)
        const interval = eachDayOfInterval({start, end});
        const styled = styleDates(interval, style);
        res.push(...styled);
    }
    return res;
}

function styleDates(dates, style) {
    return dates.map(day => {
        return {
            date: format(day, 'yyyy-MM-dd'),
            style: day.style ? `${day.style} ${style}` : style,
            stage: undefined
        }
    });
}

export function enrichMonthsObject(cycles) {
    const months = generateMonths();
    for (const cycle of cycles) {
        const menstrualDates = getMenstrualDates(cycle.start_date, cycle.bleed_end_date);
        const ovulationDates = getOvulationDates(cycle.ovulation_day);
        const safeDates = getSafeDays(cycle.safe_days);
        monthAllocator(safeDates, STAGES.SAFE, months, cycle.id);
        monthAllocator(menstrualDates, STAGES.MENSTRUAL, months, cycle.id);
        monthAllocator(ovulationDates, STAGES.OVULATION, months, cycle.id)

        const today = format(new Date(), "yyyy-MM-dd");
        const month = new Date().getMonth();

        months[month][today].style = months[month][today].style + ' border-2 border-primaryColor'
    }
    return months
}


export function monthAllocator(dates, stage = undefined, months, id = undefined) {
    for (const day of dates) {
        const month = getMonth(day.date);
        months[month][day.date] = {
            style: day.style,
            stage: stage,
            id: id
        }
    }
}

export function parseMonthForCalendar(monthObject) {
    const res = []
    for (const day in monthObject) {
        res.push({
            date: day,
            style: monthObject[day].style,
            stage: monthObject[day].stage
        })
    }
    return res;
}
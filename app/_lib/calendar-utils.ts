import {addDays, eachDayOfInterval, endOfMonth, format, getMonth, isWithinInterval, subDays} from "date-fns";
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

export function getMenstrualDates(start, end, periodLength = null, cycleId = null) {
    start = new Date(start);
    end = new Date(end)
    let periodLengthIndicatedEndDate;
    if (periodLength) periodLengthIndicatedEndDate = addDays(start, periodLength);

    let unconfirmedStyledDates;
    let unconfirmedStyle = "text-black rounded-full border border-[#E82A73] border-dashed";
    const cycleHasNotActuallyStartedYet = !cycleId;
    if (cycleHasNotActuallyStartedYet) {
        const unconfirmedIntervalDates = eachDayOfInterval(
            {start: start, end: periodLengthIndicatedEndDate || end})
        return styleDates(unconfirmedIntervalDates, unconfirmedStyle, {isPredicted: true});
    }
    let unconfirmedIntervalDates;
    const today = new Date();
    const isLatestAvailableCycle = isWithinInterval(today, {start, end});
    if (isLatestAvailableCycle) {
        unconfirmedIntervalDates = eachDayOfInterval(
            {start: addDays(today, 1), end: end})
        unconfirmedStyledDates = styleDates(unconfirmedIntervalDates, unconfirmedStyle, {isPredicted: true});
    }
    const days = eachDayOfInterval({
        start, end
    });
    const style = "bg-[#E82A73] text-white rounded-2xl";
    if (unconfirmedStyledDates) return [...styleDates(days, style), ...unconfirmedStyledDates];
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

function styleDates(dates, style, extraOptions = null) {
    return dates.map(day => {
        return {
            ...extraOptions,
            date: format(day, 'yyyy-MM-dd'),
            style: day.style ? `${day.style} ${style}` : style,
            stage: undefined,
        }
    });
}

export function enrichMonthsObject(cycles = [], periodLength = null) {
    const months = generateMonths();
    for (const cycle of cycles) {
        const menstrualDates = getMenstrualDates(cycle.start_date, cycle.bleed_end_date, periodLength, cycle.id);
        const ovulationDates = getOvulationDates(cycle.ovulation_day);
        const safeDates = getSafeDays(cycle.safe_days);
        monthAllocator(safeDates, STAGES.SAFE, months, cycle.id, cycle.paused);
        monthAllocator(menstrualDates, STAGES.MENSTRUAL, months, cycle.id, cycle.paused);
        monthAllocator(ovulationDates, STAGES.OVULATION, months, cycle.id, cycle.paused)

        const today = format(new Date(), "yyyy-MM-dd");
        const month = new Date().getMonth();
        months[month][today].style = months[month][today].style + ' border-2 border-primaryColor'
    }
    return months
}


export function monthAllocator(dates, stage = undefined, months, id = undefined, isPaused = false) {
    for (const day of dates) {
        const month = getMonth(day.date);
        months[month][day.date] = {
            style: day.style,
            stage: stage,
            id: id,
            isPredicted: day.isPredicted,
            isPaused: isPaused
        }
    }
}

export function parseMonthForCalendar(monthObject) {
    const res = []
    for (const day in monthObject) {
        if (monthObject[day].isPredicted) {
            res.push({
                date: day,
                style: monthObject[day].style,
                stage: monthObject[day].stage,
                id: monthObject[day].id,
                isPredicted: monthObject[day].isPredicted,
                isPaused: monthObject[day].isPaused
            })
        } else {
            res.push({
                date: day,
                style: monthObject[day].style,
                stage: monthObject[day].stage,
                id: monthObject[day].id,
                isPaused: monthObject[day].isPaused
            })
        }
    }
    return res;
}
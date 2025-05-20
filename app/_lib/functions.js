import {addDays, differenceInDays} from "date-fns";
import {computeNumberOfMonthsFromDays, formatNumberWithOrdinal, poundsToGrams} from "@/app/dashboard/lib/functions";

export function fetcher(url, token = "") {
    if (token.length > 1) {
        console.log('fetcher ');
        return fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            return res.json()
        })
    }
    return fetch(url).then(res => res.json())
}

export function fetchUser(url, token) {
    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(res => {
        // console.log(res)
        return res.json()
    })
}

export function fetchCycle(url, token) {
    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(res => {
        const result = res.json()
        return result
    }).then(result => {
        console.log({result});
        const formattedData = {
            ...result,
            dates: menstrualCycleDateGenerator(result.current_cycle.start_date, result.period_length, "general", result.cycle_length),
            daysDone: computeDaysDone(result.current_cycle.start_date),
            daysToPeriod: computeDaysToPeriod(result.current_cycle.start_date, result.cycle_length),
            percentageComplete: computeCycleCompletion(computeDaysDone(result.current_cycle.start_date), result.cycle_length),
        }
        return formattedData
    })
}

export function fetchPregnancy(url, token) {
    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(res => {
        return res.json()
    }).then(result => {
        result = necessaryDataForPregnancyUI(result)
        return {
            ...result
        }
    })
}

export function postFetcher(url, token, formBody) {
    return fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formBody)
    }).then(res => {
        return res.json()
    })
}

/**
 * Remove spaces in a string
 * @param {string} sentence
 * @returns {string} sentence without spaces
 */
export function removeSpaces(sentence) {
    return sentence.replace(/\s+/g, '');
}

export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

/**
 * Makes a number in the thousands more relatable
 * @param int
 * @returns {string} A more relatable number like 2K or 20K
 */
export function relatableNumber(int) {
    if (Math.abs(int) >= 1.0e9) {
        return Math.round((int) / 1.0e9) + "B"
    } else if (Math.abs(int) >= 1.0e6) {
        return Math.round((int) / 1.0e6) + "M"
    } else if (Math.abs(int) >= 1.0e3) {
        return Math.round((int) / 1.0e3) + "K"
    } else {
        return int.toString()
    }
}

/**
 * Get a relatable start date
 * @param numberOfDays
 * @returns {string}
 */
export function relatableDay(numberOfDays) {
    if (numberOfDays >= 2) {
        return `${numberOfDays} days`
    }
    if (numberOfDays >= 0) {
        return `Tomorrow`;
    }
    return `${numberOfDays} days`;
}

/**
 * Returns the type of patient
 * @param {string} userType
 * @returns {string}
 */
export function matchUserStatus(userType, reverse = false) {
    if (!reverse) {
        switch (userType) {
            case "gettingpregnant":
                return "GETTING PREGNANT";
            case "trackmyperiod":
                return "MENSTRUATING";
            case "trackmypregnancy":
                return "PREGNANT";
            default:
                return "NORMAL";
        }
    } else {
        switch (userType) {
            case "GETTING PREGNANT":
                return "gettingpregnant";
            case "MENSTRUATING":
                return "trackmyperiod";
            case "PREGNANT":
                return "trackmypregnancy";
            default:
                return "trackmyperiod";
        }
    }

}

export function necessaryDataForUser(allData) {
    return {
        user: {
            email: allData.user.email,
            fullName: allData.user.full_name,
            isConfigured: allData.user.is_configured,
            isOnline: allData.user.is_online,
            isVerified: allData.user.is_verified,
            lastLogin: allData.user.last_login,
            phoneNumber: allData.user.phone_number,
            profilePic: allData.user.profile_pic,
            role: allData.user.role,
            username: allData.user.username,
            isAssigned: true,
        },
        tokens: {
            access: allData.tokens.access,
            refresh: allData.tokens.refresh,
        }
    }
}

export function necessaryDataForPregnancyUI(data) {
    console.log(data);
    return {
        days: data.day,
        today: formatDate(new Date()),
        week: data.week,
        trimester: formatNumberWithOrdinal(data.trimester),
        expectedDate: data.expected_date,
        size: data.size,
        countdown: data.countdown,
        weight: poundsToGrams(data.weight),
        length: data.length,
        event: data.event,
        month: computeNumberOfMonthsFromDays(data.day),
        percentage: computeCycleCompletion(data.week, 40),
        progressBarValues: computeProgressBarValues(data.day, data.week),
    }
}

function computeProgressBarValues(days, week) {
    const month = computeNumberOfMonthsFromDays(days);
    console.log(month);
    let result = {
        segment1: 0,
        segment2: 0,
        segment3: 0,
        circlePosition: 0
    }
    if (month <= 3) {
        result.segment1 = week * 3.34;

    } else if (month > 3 && month <= 6) {
        result.segment1 = 40
        result.segment2 = week * 8.4;
    } else {
        result.segment1 = 40
        result.segment2 = 100;
        result.segment3 = week * 2.3;
    }
    result.circlePosition = week * 2.5;
    console.log(result);
    return result;

}

// Convert this whole thing into a class soon
export function necessaryDataForMenstrualUI(allData) {
    // console.log('cycle legnth', allData.cycle_length)
    const {current_cycle} = allData;
    console.log({current_cycle});
    const dates = menstrualCycleDateGenerator(current_cycle?.start_date, allData.period_length, "general", allData.cycle_length)
    const daysDone = computeDaysDone(current_cycle?.start_date)
    const daysToPeriod = computeDaysToPeriod(current_cycle?.start_date, allData.cycle_length)
    const percentageComplete = computeCycleCompletion(daysDone, allData.cycle_length)
    return {
        cycleLength: allData.cycle_length,
        periodLength: allData.period_length,
        stage: current_cycle?.phase,
        pregnancyProb: current_cycle?.pregnancy_probability,
        periodStartDate: current_cycle?.start_date,
        nextPeriodDate: current_cycle?.next_phase_date,
        nextPhaseStartDate: current_cycle?.next_phase_date,
        daysDone,
        daysToPeriod,
        percentageComplete,
        daysToOvulation: computeDaysToOvulation(daysDone, daysToPeriod, allData.cycle_length),
        calendar: dates,

    }
}

/**
 * Compute the number of days completed in a cycle
 * @param periodStart
 * @returns {number}
 */
function computeDaysDone(periodStart) {
    return differenceInDays(new Date(), periodStart)
}

/**
 * Compute current completion in percentage
 * @param daysDone
 * @param cycleLength
 * @returns {number}
 */
function computeCycleCompletion(daysDone, cycleLength) {
    return (100 / cycleLength) * daysDone;
}

/**
 * Compute the number of days to the next period
 * @param periodStart
 * @param cycleLength
 * @returns {number}
 */
function computeDaysToPeriod(periodStart, cycleLength) {
    const cycleEnd = addDays(periodStart, cycleLength)
    return differenceInDays(cycleEnd, new Date())
}

/**
 * Compute the number of days to the next ovulation
 * @param done
 * @param toPeriod
 * @param cycleLength
 * @returns {number|*}
 */
function computeDaysToOvulation(done, toPeriod, cycleLength) {
    // Confirm if user has crossed the current cycle's ovulation
    if (done > Math.round(cycleLength / 2)) {
        return toPeriod + (cycleLength - 14)
    }
    // if user is yet to reach cycle ovulation
    return (cycleLength - 14) - done;
}

/**
 * Generate all the relevant menstrual cycle phase dates
 * i.e.  menstrual, follicular, ovulation and luteal dates
 * @param lmp
 * @param periodLength
 * @param stage
 * @param cycleLength
 * @returns {({date: *, style: string}|{date: Date, style: string})[]}
 */
export function menstrualCycleDateGenerator(lmp, periodLength, stage = "general", cycleLength = 28) {
    const lastCycleDay = addDays(lmp, cycleLength)
    const menstrualDates = generateMenstrualDates(lmp, periodLength);
    const follicularDates = generateFollicularDates(lmp, lastCycleDay)
    const ovulationDates = generateOvulationDates(lastCycleDay)
    const lutealDates = generateLutealDates(lastCycleDay)

    switch (stage.toLowerCase()) {
        case "menstrual":
            return menstrualDates;
        case "follicular":
            return follicularDates;
        case "ovulation":
            return ovulationDates;
        case "luteal":
            return lutealDates;
        default:
            return [
                ...menstrualDates,
                ...follicularDates,
                ...ovulationDates,
                ...lutealDates,
            ]
    }

}

/**
 * Get the menstrual phase dates
 * @param lmp
 * @param periodLength
 * @returns {{date: *, style: string}[]}
 */
function generateMenstrualDates(lmp, periodLength) {
    let day = new Date(lmp)
    let endDay = addDays(lmp, periodLength)
    return generateDays(day, endDay, 'bg-[#E82A73] text-white rounded-2xl')
}

/**
 * Get the follicular phase dates for the cycle
 * @param lmp
 * @param lastCycleDay
 * @returns {{date: *, style: string}[]}
 */
function generateFollicularDates(lmp, lastCycleDay) {
    const ovulationDay = getOvulationDay(lastCycleDay)
    return generateDays(lmp, addDays(ovulationDay, -1), 'bg-[#DEE4F5]')
}

/**
 * Get the ovulation phase dates; not to be confused with the ovulation date
 * Ovulation day is 14 days before the end of the cycle
 * @param lastCycleDay
 * @deps date-fns
 * @returns {[...{date: *, style: string}[],{date: Date, style: string}]}
 */
function generateOvulationDates(lastCycleDay) {
    const ovulationDay = getOvulationDay(lastCycleDay)
    const daysBeforeOvulation = addDays(ovulationDay, -2)
    const dayAfterOvulation = addDays(daysBeforeOvulation, 1)

    let days = generateDays(daysBeforeOvulation, dayAfterOvulation, 'bg-[#DEE4F5]')
    days = [...days, {date: ovulationDay, style: 'bg-[#07226B] text-white'}]
    return days
}

/**
 * Get the ovulation date for the cycle
 * @param lastCycleDay
 * @returns {Date} predicted day of ovulation
 */
function getOvulationDay(lastCycleDay) {
    return addDays(lastCycleDay, -14)
}

/**
 * Get all the luteal phase dates
 * @param lastCycleDay
 * @returns {{date: *, style: string}[]}
 */
function generateLutealDates(lastCycleDay) {
    return generateDays(addDays(getOvulationDay(lastCycleDay), 2), lastCycleDay)
}

/**
 * Generate a range of days with custom style
 * @param start
 * @param end
 * @param style
 * @returns {{date: *, style: string}[]}
 */
function generateDays(start, end, style = "") {
    const days = []
    let day = start
    while (day <= end) {
        days.push(day)
        day = addDays(day, 1)
    }
    return days.map(day => {
        return {
            date: day,
            style
        }
    })
}

export function convertSpacedStringToDashDelimited(text) {
    return text.toLowerCase().split(' ').join('-');
}

export function convertDashDelimitedToSpacedString(text) {
    return text.toLowerCase().split('-').join(' ');
}
import {addDays, differenceInDays} from "date-fns";


export function fetcher(url, token = "") {
    if (token.length > 1) {
        console.log('fetcher ');
        return fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
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
        const formattedData = {
            ...result,
            dates: menstrualCycleDateGenerator(result.period_start, result.period_length, "general", result.cycle_length),
            daysDone: computeDaysDone(result.period_start),
            daysToPeriod: computeDaysToPeriod(result.period_start, result.cycle_length),
            percentageComplete: computeCycleCompletion(computeDaysDone(result.period_start), result.cycle_length),
        }
        return formattedData
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
    // switch (numberOfDays) {
    //     case numberOfDays >= 2:
    //         return `${numberOfDays} days to go`
    //     case numberOfDays >= 0:
    //         return "Tomorrow"
    //     default:
    //         return `${numberOfDays} days`
    // }

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
export function matchUserStatus(userType) {
    switch (userType) {
        case "gettingpregnant":
            return "GETTING PREGNANT";
        case "menstrualcycletracker":
            return "NORMAL";
        case "pregnancytracker":
            return "PREGNANT";
        default:
            return "NORMAL";
    }
}

export function necessaryDataForUser(allData) {
    // console.log(allData)
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

// Convert this whole thing into a class soon
export function necessaryDataForMenstrualUI(allData) {
    // console.log('cycle legnth', allData.cycle_length)
    const dates = menstrualCycleDateGenerator(allData.period_start, allData.period_length, "general", allData.cycle_length)
    const daysDone = computeDaysDone(allData.period_start)
    const daysToPeriod = computeDaysToPeriod(allData.period_start, allData.cycle_length)
    const percentageComplete = computeCycleCompletion(daysDone, allData.cycle_length)
    return {
        cycleLength: allData.cycle_length,
        periodLength: allData.period_length,
        stage: allData.stage,
        pregnancyProb: allData.preg_probability,
        periodStartDate: allData.period_start,
        nextPeriodDate: allData.next_period,
        nextPhaseStartDate: allData.next_phase,
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
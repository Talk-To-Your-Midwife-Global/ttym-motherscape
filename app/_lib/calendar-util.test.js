import {vi, describe, expect, it, test} from "vitest";
import {generateMonths, STAGES} from "@/app/_lib/calendar-utils";
import * as calendarUtils from "./calendar-utils";
import {format, formatDistance} from "date-fns";


const cycles = [
    {
        "id": 14,
        "start_date": "2025-10-08",
        "bleed_end_date": "2025-10-11",
        "end_date": "2025-11-05",
        "safe_days": [
            {
                "start_date": "2025-10-08",
                "end_date": "2025-10-16"
            },
            {
                "start_date": "2025-10-23",
                "end_date": "2025-11-05"
            }
        ],
        "ovulation_day": "2025-10-22",
        "cycle_length": 28
    }
]

const styles = {
    menstrualDashed: "text-black rounded-full border border-[#E82A73] border-dashed",

}

describe("generateMonths()", () => {
    it('should return an object of date key paired with an object having style and stage props', () => {
        const generatedMonths = generateMonths();
        const today = new Date();
        const formattedToday = format(new Date(), 'yyyy-MM-dd');
        const currentMonth = today.getMonth();
        expect(generatedMonths[currentMonth]).toBeDefined();
        expect(generatedMonths[currentMonth]).toEqual(expect.objectContaining(
            {[formattedToday]: {style: "", stage: ""}}
        ))
    });
})

describe("getMenstrualDates()", () => {
    it('should be called with a start date and end date', () => {
        const getMenstrualDatesSpy = vi.spyOn(calendarUtils, 'getMenstrualDates');
        const currentCycle = cycles[0];
        const menstrualDates = calendarUtils.getMenstrualDates(currentCycle.start_date, currentCycle.end_date);
        expect(getMenstrualDatesSpy).toHaveBeenCalledWith(expect.any(String), expect.any(String));
        getMenstrualDatesSpy.mockRestore();
    });


    it('should return a suitable range of dates from the start date to end date', () => {
        const currentCycle = cycles[0];
        const menstrualDates = calendarUtils.getMenstrualDates(currentCycle.start_date, currentCycle.bleed_end_date, null, null);
        const distance = formatDistance(new Date(currentCycle.start_date), new Date(currentCycle.bleed_end_date), {
            unit: 'days'
        });

        expect(menstrualDates[0]).toEqual(expect.objectContaining({
            date: expect.stringMatching(/\d{4}-\d{2}-\d{2}/g),
            style: expect.stringContaining(styles.menstrualDashed)
        }))
        expect(menstrualDates[menstrualDates.length - 1]).toEqual(expect.objectContaining({
            date: expect.stringMatching(/\d{4}-\d{2}-\d{2}/g),
            style: expect.stringContaining(styles.menstrualDashed)
        }))
        expect(menstrualDates.length).toBe(Number(distance.match(/\d/)[0]) + 1);
        expect(menstrualDates.length).toBeLessThanOrEqual(7);
    });
})


describe("getOvulationDates()", () => {
    it('should be called with the ovulation date', () => {
        const dateChecker = /\d{4}-\d{2}-\d{2}/g;
        const getOvulationDatesSpy = vi.spyOn(calendarUtils, 'getOvulationDates');
        const currentCycle = cycles[0];
        const ovulationDates = calendarUtils.getOvulationDates(currentCycle.ovulation_day);
        expect(getOvulationDatesSpy).toHaveBeenCalledWith(expect.stringMatching(dateChecker));
        getOvulationDatesSpy.mockRestore();
    });


    it('should return a suitable range of dates from the start date to end date', () => {
        const currentCycle = cycles[0];
        const ovulationDates = calendarUtils.getOvulationDates(currentCycle.ovulation_day);
        const style = "bg-[#DEE4F5] text-black"
        expect(ovulationDates[0]).toEqual(expect.objectContaining({
            date: expect.stringMatching(/\d{4}-\d{2}-\d{2}/g),
            style: expect.stringContaining(style)
        }))
        expect(ovulationDates[ovulationDates.length - 2]).toEqual(expect.objectContaining({
            date: expect.stringMatching(/\d{4}-\d{2}-\d{2}/g),
            style: expect.stringContaining("bg-[#07226B] text-white")
        }))
        expect(ovulationDates.length).toBe(4);
    });
})


describe("getSafeDays()", () => {
    it('should be called with an array of objects and return an array of object', () => {
        const currentCycle = cycles[0];
        const getSafeDaysSpy = vi.spyOn(calendarUtils, 'getSafeDays');
        const safeDays = calendarUtils.getSafeDays(currentCycle['safe_days']);
        expect(getSafeDaysSpy).toHaveBeenCalledWith(expect.toSatisfy((val) => Array.isArray(val)));
        expect(getSafeDaysSpy).toHaveReturnedWith(expect.toSatisfy((val) => Array.isArray(val)));

        getSafeDaysSpy.mockRestore();
    });

    it('should return an array of safe days with required style property', () => {
        const currentCycle = cycles[0];
        const safeDays = calendarUtils.getSafeDays(currentCycle['safe_days']);
        expect(safeDays[0]).toEqual(expect.objectContaining({
            date: currentCycle.safe_days[0].start_date,
            style: expect.stringContaining("bg-[#3CB9FB50] text-black")
        }))
    });
})

describe("monthAllocator()", () => {
    it('should modify the month with menstrual days style and stage', () => {
        const currentCycle = cycles[0];
        const months = generateMonths();
        const menstrualDates = calendarUtils.getMenstrualDates(currentCycle.start_date, currentCycle.bleed_end_date);
        const style = styles.menstrualDashed;
        calendarUtils.monthAllocator(menstrualDates, STAGES.MENSTRUAL, months);
        expect(months[9][currentCycle.start_date]).toEqual(expect.objectContaining({
            style: expect.stringContaining(style),
            stage: STAGES.MENSTRUAL
        }))

        expect(months[9][currentCycle.bleed_end_date]).toEqual(expect.objectContaining({
            style: expect.stringContaining(style),
            stage: STAGES.MENSTRUAL
        }));
    });

    it('should modify the month with ovulation days style and stage', () => {
        const currentCycle = cycles[0];
        const months = generateMonths();
        const ovulationDates = calendarUtils.getOvulationDates(currentCycle.ovulation_day);
        const style = "bg-[#DEE4F5] text-black"
        calendarUtils.monthAllocator(ovulationDates, STAGES.OVULATION, months);
        expect(months[9][currentCycle.ovulation_day]).toEqual({
            style: expect.stringContaining("bg-[#07226B] text-white"),
            stage: STAGES.OVULATION
        })

        expect(months[9][ovulationDates[0].date]).toEqual({
            style: expect.stringContaining(style),
            stage: STAGES.OVULATION
        });
        expect(months[2]['2025-03-10']).toEqual(expect.objectContaining({
            stage: ''
        }))
    });
});

describe("parseMonthForCalendar()", () => {
    it('should accept an object of objects', () => {
        const parseMonthForCalendarSpy = vi.spyOn(calendarUtils, "parseMonthForCalendar");
        const currentCycle = cycles[0];
        const months = generateMonths();
        const ovulationDates = calendarUtils.getOvulationDates(currentCycle.ovulation_day);
        const style = "bg-[#07226B] text-white"
        calendarUtils.monthAllocator(ovulationDates, STAGES.OVULATION, months);

        expect(months[9][currentCycle.ovulation_day]).toEqual({
            style: expect.stringContaining(style),
            stage: STAGES.OVULATION
        })
        const parsedMonths = calendarUtils.parseMonthForCalendar(months[9]);
        expect(parseMonthForCalendarSpy).toHaveBeenCalledWith(expect.objectContaining({
            '2025-10-20': {
                style: expect.any(String),
                stage: expect.any(String)
            }
        }))
    });

    it('should return an array of objects', () => {
        const currentCycle = cycles[0];
        const months = generateMonths();
        const ovulationDates = calendarUtils.getOvulationDates(currentCycle.ovulation_day);
        const style = "bg-[#DEE4F5] text-black"
        calendarUtils.monthAllocator(ovulationDates, STAGES.OVULATION, months);

        expect(months[9][currentCycle.ovulation_day]).toEqual({
            style: expect.stringContaining("bg-[#07226B] text-white"),
            stage: STAGES.OVULATION
        })

        const parsedMonths = calendarUtils.parseMonthForCalendar(months[9]);
        expect(parsedMonths[19].style).toContain(style);
    });
})
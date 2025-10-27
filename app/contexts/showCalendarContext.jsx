"use client"

import {createContext, useContext, useState} from "react";
import {parseMonthForCalendar} from "@/app/_lib/calendar-utils";
import {addMonths, getMonth, subMonths} from "date-fns";
import {Log} from "@/app/_lib/utils";

const CalendarViewContext = createContext();

export function CalendarViewContextProvider({children}) {
    const [viewLarge, setViewLarge] = useState(false);
    const [viewingDate, setViewingDate] = useState(new Date());
    const [logs, setLogs] = useState(undefined);
    const [viewLogs, setViewLogs] = useState(false);
    const [isUsingPredictedCycle, setIsUsingPredictedCycle] = useState(false); // TODO: this has to go
    const [cycleInfo, setCycleInfo] = useState({});
    const [months, setMonths] = useState({}); // all the months
    const [currentViewingMonth, setCurrentViewingMonth] = useState(new Date());
    const [currentViewingMonthDates, setCurrentViewingMonthDates] = useState([]);

    const handleMonthSetting = (data, month = undefined) => {
        month = month || getMonth(new Date());
        setCurrentViewingMonthDates(parseMonthForCalendar(data[month]));
        Log("showCalendarContext.jsx", {
            month,
            rawmonthData: data[month],
            parsed: parseMonthForCalendar(data[month]),
            currentViewingMonthDates
        });
    }

    const moveCalendarForwards = () => {
        setCurrentViewingMonth(addMonths(currentViewingMonth, 1));
        const month = getMonth(addMonths(currentViewingMonth, 1));
        setCurrentViewingMonthDates(parseMonthForCalendar(months[month]));
    }

    const moveCalendarBackwards = () => {
        setCurrentViewingMonth(subMonths(currentViewingMonth, 1));
        const month = getMonth(subMonths(currentViewingMonth, 1));
        setCurrentViewingMonthDates(parseMonthForCalendar(months[month]));
    }

    const values = {
        viewLarge, setViewLarge,
        viewingDate, setViewingDate,
        logs, setLogs,
        viewLogs, setViewLogs,
        isUsingPredictedCycle, setIsUsingPredictedCycle,
        cycleInfo, setCycleInfo,
        months, setMonths,
        currentViewingMonthDates, setCurrentViewingMonthDates,
        currentViewingMonth, setCurrentViewingMonth,
        handleMonthSetting, moveCalendarBackwards, moveCalendarForwards
    }

    return <CalendarViewContext.Provider value={values}>
        {children}
    </CalendarViewContext.Provider>
}

export function useCalendarView() {
    return useContext(CalendarViewContext);
}

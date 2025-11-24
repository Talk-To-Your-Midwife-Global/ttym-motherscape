"use client"

import {createContext, useContext, useState} from "react";
import {parseMonthForCalendar} from "@/app/_lib/calendar-utils";
import {addMonths, getMonth, subMonths} from "date-fns";
import {Log} from "@/app/_lib/utils";

const CalendarViewContext = createContext();

export function CalendarViewContextProvider({children}) {
    const [viewLarge, setViewLarge] = useState(false);
    const [viewingDate, setViewingDate] = useState({date: new Date()});
    const [logs, setLogs] = useState(undefined);
    const [viewLogs, setViewLogs] = useState(false);
    const [isUsingPredictedCycle, setIsUsingPredictedCycle] = useState(false); // around because of the restartCalendar component
    const [cycleInfo, setCycleInfo] = useState({});
    const [months, setMonths] = useState({}); // all the months
    const [currentViewingMonth, setCurrentViewingMonth] = useState(new Date());
    const [currentViewingMonthDates, setCurrentViewingMonthDates] = useState([]);
    const [showMenstrualQuestion, setShowMenstrualQuestion] = useState(false);
    const [showUnConfirmMenstrualDateQuestion, setShowUnConfirmMenstrualDateQuestion] = useState(false);
    const [showConfirmPredictedMenstrualDateQuestion, setShowConfirmPredictedMenstrualDateQuestion] = useState(false);

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
        const parsedDates = parseMonthForCalendar(months[month])
        Log("current viewing months", {parsedDates});
        setCurrentViewingMonthDates(parsedDates);
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
        handleMonthSetting, moveCalendarBackwards, moveCalendarForwards,
        showMenstrualQuestion, setShowMenstrualQuestion,
        showUnConfirmMenstrualDateQuestion, setShowUnConfirmMenstrualDateQuestion,
        showConfirmPredictedMenstrualDateQuestion, setShowConfirmPredictedMenstrualDateQuestion
    }

    return <CalendarViewContext.Provider value={values}>
        {children}
    </CalendarViewContext.Provider>
}

export function useCalendarView() {
    return useContext(CalendarViewContext);
}

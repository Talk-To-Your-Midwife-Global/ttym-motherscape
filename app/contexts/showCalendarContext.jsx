"use client"

import {createContext, useContext, useState} from "react";

const CalendarViewContext = createContext();

export function CalendarViewContextProvider({children}) {
    const [viewLarge, setViewLarge] = useState(false);
    const [viewingDate, setViewingDate] = useState(new Date());
    const [logs, setLogs] = useState(undefined);
    const [viewLogs, setViewLogs] = useState(false);
    const [isUsingPredictedCycle, setIsUsingPredictedCycle] = useState(true);
    const [cycleInfo, setCycleInfo] = useState({})

    const values = {
        viewLarge, setViewLarge,
        viewingDate, setViewingDate,
        logs, setLogs,
        viewLogs, setViewLogs,
        isUsingPredictedCycle, setIsUsingPredictedCycle,
        cycleInfo, setCycleInfo,
    }

    return <CalendarViewContext.Provider value={values}>
        {children}
    </CalendarViewContext.Provider>
}

export function useCalendarView() {
    return useContext(CalendarViewContext);
}

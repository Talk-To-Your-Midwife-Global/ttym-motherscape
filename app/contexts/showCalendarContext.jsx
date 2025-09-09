"use client"

import {createContext, useContext, useState} from "react";

const CalendarViewContext = createContext();

export function CalendarViewContextProvider({children}) {
    const [viewLarge, setViewLarge] = useState(false);
    return <CalendarViewContext.Provider value={{viewLarge, setViewLarge}}>
        {children}
    </CalendarViewContext.Provider>
}

export function useCalendarView() {
    return useContext(CalendarViewContext);
}

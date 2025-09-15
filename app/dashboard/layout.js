import {CalendarViewContextProvider} from "@/app/contexts/showCalendarContext";

export default function DashboardLayout({children}) {
    return (
        <CalendarViewContextProvider>
            {children}
        </CalendarViewContextProvider>
    )
}
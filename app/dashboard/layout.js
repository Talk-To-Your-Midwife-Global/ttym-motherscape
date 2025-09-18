import {CalendarViewContextProvider} from "@/app/contexts/showCalendarContext";
import {GeneralContextProvider} from "@/app/contexts/GeneralContext";

export default function DashboardLayout({children}) {
    return (
        <GeneralContextProvider>
            <CalendarViewContextProvider>
                {children}
            </CalendarViewContextProvider>
        </GeneralContextProvider>
    )
}
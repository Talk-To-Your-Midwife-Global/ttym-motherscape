import {CalendarViewContextProvider} from "@/app/contexts/showCalendarContext";
import {GeneralContextProvider} from "@/app/contexts/GeneralContext";
import {Toaster} from "sonner";

export default function DashboardLayout({children}) {
    return (
        <GeneralContextProvider>
            <CalendarViewContextProvider>
                {children}
            </CalendarViewContextProvider>
            <Toaster richColors position={"bottom-right"} expand={true}/>
        </GeneralContextProvider>
    )
}
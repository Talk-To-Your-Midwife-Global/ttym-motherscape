import {CalendarViewContextProvider} from "@/app/contexts/showCalendarContext";
import {GeneralContextProvider} from "@/app/contexts/GeneralContext";
import {Toaster} from "sonner";
import {ArticlesHQ} from "@/app/contexts/ArticlesContext";

export default function DashboardLayout({children}) {
    return (
        <GeneralContextProvider>
            <ArticlesHQ>
                <CalendarViewContextProvider>
                    {children}
                </CalendarViewContextProvider>
            </ArticlesHQ>
            <Toaster richColors position={"bottom-right"} expand={true}/>
        </GeneralContextProvider>
    )
}
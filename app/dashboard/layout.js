import {CalendarViewContextProvider} from "@/app/contexts/showCalendarContext";
import {GeneralContextProvider} from "@/app/contexts/GeneralContext";
import {Toaster} from "sonner";
import {ArticlesHQ} from "@/app/contexts/ArticlesContext";
import {RefreshTokenizer} from "@/app/dashboard/components/RefreshTokenizer";

export default function DashboardLayout({children}) {

    return (
        <GeneralContextProvider>
            <ArticlesHQ>
                <CalendarViewContextProvider>
                    <RefreshTokenizer>
                        {children}
                    </RefreshTokenizer>
                </CalendarViewContextProvider>
            </ArticlesHQ>
            <Toaster richColors position={"bottom-right"} expand={true}/>
        </GeneralContextProvider>
    )
}
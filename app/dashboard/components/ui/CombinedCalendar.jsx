"use client"
import {Calendar, ShortCalendar} from "@/app/dashboard/components";
import {useCalendarView} from "@/app/contexts/showCalendarContext";
import {useCycleInfo, useLogsInfo} from "@/app/dashboard/lib/dataFetching";
import {UserSymptomsAndLogViewer} from "@/app/dashboard/components/ui/UserSymptpmsAndLogViewer";
import {Log} from "@/app/_lib/utils";
import {startOfMonth} from "date-fns";
import {formatDate, necessaryDataForMenstrualUI, parseLogs} from "@/app/_lib/functions";
import {useEffect} from "react";
import posthog from "posthog-js";

export function CombinedCalendar({accessToken}) {
    const {data, error: cycleError, isLoading: cycleLoading} = useCycleInfo(accessToken);
    const {
        viewLarge,
        setViewLarge,
        setViewingDate,
        logs,
        setLogs,
        viewLogs,
        setViewLogs,
        setIsUsingPredictedCycle
    } = useCalendarView();
    const today = new Date();
    const dateRange = `${formatDate(startOfMonth(today))}&${formatDate(today)}`;
    const {logData} = useLogsInfo(accessToken, dateRange);
    const generalCycleInfo = necessaryDataForMenstrualUI(data || []);
    Log("generalCycleInfo in Combined Calendar", {generalCycleInfo});

    const handleDateClick = (date) => {
        posthog.capture("combined_calendar_date_clicked");
        setViewingDate(date);
        setViewLogs(true);
        Log("CombinedCalendar.jsx; useCycleInfo", {data});
        Log("CombinedCalendar.jsx; logData: with range", {logData});

        // save logs in context if it is not having it already
        if (!logs) {
            const parsedLogs = parseLogs(logData);
            setLogs(parsedLogs);
            Log("CombinedCalendar.jsx, useCalendarView: logs", {logs})
        }

        setViewLarge(false)
    }

    useEffect(() => {
        const isUsingAssumedSystemPredictedValues = generalCycleInfo?.stage === "upcoming" || generalCycleInfo?.stage === "missed" || generalCycleInfo?.stage === "completed";

        Log("CombinedCalendar.jsx: useEffect()", {isUsingAssumedSystemPredictedValues});

        if (isUsingAssumedSystemPredictedValues) {
            setIsUsingPredictedCycle(true);
        }
    }, [data])
    return (
        <>
            {
                viewLarge ?
                    <section>
                        <Calendar
                            dateClick={handleDateClick}
                            accessToken={accessToken}
                            specialDates={generalCycleInfo?.calendar}
                            withFlower={true}/>
                        <div className={'text-[#72777A] text-[10px] px-5 flex gap-3'}>
                            <span className={`flex gap-2 w-fit `}>
                                <div className={'w-4 h-4 bg-[#F8CEDE] rounded-full'}> </div> <span className="w-fit">Recorded Flows</span>
                            </span>
                            <span className={`flex gap-2`}>
                                <div
                                    className={'w-4 h-4 border border-dashed border-[#E82A73] rounded-full'}> </div> <span>Predicted Period</span>
                            </span>
                            <span className={`flex gap-2`}>
                                <div className={'w-4 h-4 bg-[#DEE4F5] rounded-full'}> </div> <span>Fertile Window</span>
                            </span>
                        </div>
                    </section> : <ShortCalendar
                        specialDates={generalCycleInfo?.calendar}
                        dateClick={handleDateClick}
                        accessToken={accessToken} withFlower={true}/>
            }
            {/*TODO: make it such that a tap on the short calendar reveals the large*/}
            <UserSymptomsAndLogViewer open={viewLogs} setOpen={setViewLogs} cycleInfo={generalCycleInfo}/>
        </>
    )
}

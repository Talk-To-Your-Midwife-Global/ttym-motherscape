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
import {useCyclesForTheYear} from "@/app/_lib/calendar-hooks";
import {enrichMonthsObject} from "@/app/_lib/calendar-utils";

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
        setIsUsingPredictedCycle,
        months, setMonths,
        currentViewingMonth,
        currentViewingMonthDates, setCurrentViewingMonthDates, handleMonthSetting,
        moveCalendarBackwards, moveCalendarForwards
    } = useCalendarView();
    const today = new Date();
    const dateRange = `${formatDate(startOfMonth(today))}&${formatDate(today)}`;
    const {logData} = useLogsInfo(accessToken, dateRange);
    const generalCycleInfo = necessaryDataForMenstrualUI(data || []); // TODO: this becomes the current viewing calendar dates
    Log("generalCycleInfo in Combined Calendar", {generalCycleInfo});
    const {cyclesForYear, cyclesForYearError} = useCyclesForTheYear(accessToken);
    const cyclesData = enrichMonthsObject(cyclesForYear || []);

    const handleDateClick = (date) => {
        posthog.capture("combined_calendar_date_clicked");
        setViewingDate(date);
        setViewLogs(true);
        Log("CombinedCalendar.jsx; useCycleInfo", {data, logData});

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
    }, [data]);

    useEffect(() => {
        console.log({cyclesForYears: cyclesData, cyclesForYear, cyclesForYearError});
        if (cyclesData) {
            setMonths(cyclesData)
            handleMonthSetting(cyclesData);
        }
    }, [cyclesForYear]);

    return (
        <>
            {
                viewLarge ?
                    <section>
                        <Calendar
                            currentMonth={currentViewingMonth}
                            dateClick={handleDateClick}
                            moveForwards={moveCalendarForwards}
                            moveBackwards={moveCalendarBackwards}
                            accessToken={accessToken}
                            specialDates={currentViewingMonthDates}
                            withFlower={true}/>
                        <div className={'text-[#72777A] text-[10px] px-5 grid grid-cols-3 gap-3'}>
                            <span className={`flex gap-2 w-fit `}>
                                <div className={'w-4 h-4 bg-[#F8CEDE] rounded-full'}> </div> <span className="w-fit">Blood Flow</span>
                            </span>
                            {/*<span className={`flex gap-2`}>*/}
                            {/*    <div*/}
                            {/*        className={'w-4 h-4 border border-dashed border-[#E82A73] rounded-full'}> </div> <span>Predicted Period</span>*/}
                            {/*</span>*/}
                            <span className={`flex gap-2`}>
                                <div className={'w-4 h-4 bg-[#DEE4F5] rounded-full'}> </div> <span>Fertile Window</span>
                            </span>
                            <span className={`flex gap-2`}>
                                <div className={'w-4 h-4 bg-[#07226B] rounded-full'}> </div> <span>Ovulation day</span>
                            </span>
                            <span className={`flex gap-2`}>
                                <div className={'w-4 h-4 bg-[#3CB9FB50] rounded-full'}> </div> <span>Safe days</span>
                            </span>
                        </div>
                    </section> : <ShortCalendar
                        specialDates={currentViewingMonthDates}
                        currentMonth={currentViewingMonth}
                        dateClick={handleDateClick}
                        moveForwards={moveCalendarForwards}
                        moveBackwards={moveCalendarBackwards}
                        accessToken={accessToken} withFlower={true}/>
            }
            {/*TODO: make it such that a tap on the short calendar reveals the large*/}
            <UserSymptomsAndLogViewer open={viewLogs} setOpen={setViewLogs} cycleInfo={generalCycleInfo}/>
        </>
    )
}

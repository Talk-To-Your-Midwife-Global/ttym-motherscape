"use client"
import {Calendar, ShortCalendar} from "@/app/dashboard/components";
import {useCalendarView} from "@/app/contexts/showCalendarContext";
import {useCycleInfo, useLogsInfo} from "@/app/dashboard/lib/dataFetching";
import {UserSymptomsAndLogViewer} from "@/app/dashboard/components/ui/UserSymptpmsAndLogViewer";
import {Log} from "@/app/_lib/utils";
import {isPast, isSameMonth, isThisMonth, isWithinInterval, startOfMonth} from "date-fns";
import {formatDate, necessaryDataForMenstrualUI, parseLogs} from "@/app/_lib/functions";
import {useEffect} from "react";
import posthog from "posthog-js";
import {useCyclesForTheYear} from "@/app/_lib/calendar-hooks";
import {enrichMonthsObject, STAGES} from "@/app/_lib/calendar-utils";

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
        setMonths,
        currentViewingMonth,
        currentViewingMonthDates, handleMonthSetting,
        moveCalendarBackwards, moveCalendarForwards,
        showMenstrualQuestion, setShowMenstrualQuestion
    } = useCalendarView();
    const today = new Date();
    const dateRange = `${formatDate(startOfMonth(today))}&${formatDate(today)}`;
    const {logData} = useLogsInfo(accessToken, dateRange);
    const generalCycleInfo = necessaryDataForMenstrualUI(data || []); // TODO: this becomes the current viewing calendar dates
    const {cyclesForYear, cyclesForYearError} = useCyclesForTheYear(accessToken);
    const cyclesData = enrichMonthsObject(cyclesForYear || [], generalCycleInfo.periodLength);


    const handleDateClick = (date) => {
        Log("interest", {date});
        const currentDay = new Date(date.date);
        setViewingDate(date);

        const dayIsAPredictedMenstrualDate = !(!date.id && date.stage === STAGES.MENSTRUAL);
        if (dayIsAPredictedMenstrualDate) {
            posthog.capture("combined_calendar_date_clicked");
            setShowMenstrualQuestion(false)
            setViewLogs(true); //the pop-up
            // save logs in context if it is not having it already
            if (!logs) {
                const parsedLogs = parseLogs(logData);
                setLogs(parsedLogs);
            }
            setViewLarge(false)
        } else {
            // set the menstrual question to true as well if there is a past date or today
            if (isPast(currentDay)) {
                setShowMenstrualQuestion(true);
            }
            setViewLogs(true)
        }
    }

    useEffect(() => {
        const isUsingAssumedSystemPredictedValues = generalCycleInfo?.stage === "completed";
        Log("CombinedCalendar.jsx: useEffect()", {isUsingAssumedSystemPredictedValues});
        if (isUsingAssumedSystemPredictedValues) {
            setIsUsingPredictedCycle(true);
        }
    }, [data]);

    useEffect(() => {
        Log({cyclesForYears: cyclesData, cyclesForYear, cyclesForYearError});
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
                        <div className={'text-[#72777A] text-[10px] px-4 grid grid-cols-3 gap-2'}>
                            <span className={`flex gap-1 w-fit`}>
                                <div
                                    className={'w-4 h-4 border border-dashed border-[#E82A73] rounded-full'}> </div> <span
                                className="w-fit">Predicted Blood Flow</span>
                            </span>
                            <span className={`flex gap-1 w-fit`}>
                                <div className={'w-4 h-4 bg-[#F8CEDE] rounded-full'}> </div> <span
                                className="w-fit line-clamp-2 wrap">Confirmed Blood Flow</span>
                            </span>
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
            <UserSymptomsAndLogViewer accessToken={accessToken} open={viewLogs} setOpen={setViewLogs}
                                      showMenstrualQuestion={showMenstrualQuestion} cycleInfo={generalCycleInfo}/>
        </>
    )
}

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
        showMenstrualQuestion, setShowMenstrualQuestion,
        showUnConfirmMenstrualDateQuestion, setShowUnConfirmMenstrualDateQuestion,
        setShowConfirmPredictedMenstrualDateQuestion
    } = useCalendarView();
    const today = new Date();
    const dateRange = `${formatDate(startOfMonth(today))}&${formatDate(today)}`;
    const {logData} = useLogsInfo(accessToken, dateRange);
    const generalCycleInfo = necessaryDataForMenstrualUI(data);
    const {cyclesForYear, cyclesForYearError} = useCyclesForTheYear(accessToken);
    const cyclesData = enrichMonthsObject(cyclesForYear || [], generalCycleInfo?.periodLength);
    Log({data})

    const handleDateClick = (date) => {
        Log("interest", {date});
        const currentDay = new Date(date.date);
        setViewingDate(date);

        const dayIsAConfirmedMenstrualDate = date.id && date.stage === STAGES.MENSTRUAL;

        if (dayIsAConfirmedMenstrualDate && !(date.isPredicted)) {
            setShowConfirmPredictedMenstrualDateQuestion(false);
            setShowUnConfirmMenstrualDateQuestion(true);
            setShowMenstrualQuestion(false);
        } else {
            setShowUnConfirmMenstrualDateQuestion(false);
            if (isPast(currentDay)) {
                setShowMenstrualQuestion(true);
            }
        }
        setViewLogs(true)
        // save logs in context if it is not having it already
        if (!logs) {
            const parsedLogs = parseLogs(logData);
            setLogs(parsedLogs);
        }
    }

    useEffect(() => {
        Log({cyclesForYears: cyclesData, cyclesForYear, cyclesForYearError});
        if (generalCycleInfo) {
            if (generalCycleInfo.cycleNull === true) {
                setIsUsingPredictedCycle(true);
            }
        } else {
            setIsUsingPredictedCycle(false);
        }

        if (cyclesData) {
            setMonths(cyclesData)
            handleMonthSetting(cyclesData);
        }
        // determine if is in paused state or has null current_cycle
        if (cyclesForYear) {
            const actualRecordedCycles = cyclesForYear.filter(cycle => !!cycle.id);
            const isInPausedState = actualRecordedCycles[actualRecordedCycles.length - 1]?.paused;
            Log({isInPausedState, check: generalCycleInfo?.cycleNull})
            if (isInPausedState || !data) {
                setIsUsingPredictedCycle(true);
            }
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
            <UserSymptomsAndLogViewer accessToken={accessToken} open={viewLogs} setOpen={setViewLogs}
                                      showMenstrualQuestion={showMenstrualQuestion}
                                      showUnConfirmMenstrualDateQuestion={showUnConfirmMenstrualDateQuestion}
                                      cycleInfo={generalCycleInfo}/>
        </>
    )
}

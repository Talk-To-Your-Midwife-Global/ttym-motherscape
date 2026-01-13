// import {isSameDay} from "date-fns";


export type CalendarDate = {
    date: Date;
    style: string;
    id: number;
    isPaused: boolean;
    stage: string;
}

export type ShortCalendarProps = {
    action: () => void | undefined;
    withFlower: boolean;
    specialDates: Object[];
    currentMonth: string;
    moveForwards(): void;
    moveBackwards(): void;
    dateClick(date: CalendarDate): void;

}
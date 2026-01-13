"use client"
import useSWR from "swr";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {fetcher} from "@/app/_lib/functions";
import {Log} from "@/app/_lib/utils";


const CURRENT_YEAR = new Date();

export function useCyclesForTheYear(accessToken, date: Date = CURRENT_YEAR) {
    const year = date.getFullYear();
    const {
        data,
        isLoading,
        error
    } = useSWR([`${PUBLICHOSTNAME}/menstrual/cycles?year=${year}`, accessToken], ([url, accessToken]) => fetcher(url, accessToken));
    Log("cyclesForYear", {data, year})
    return {
        cyclesForYear: data, cyclesForYearLoading: isLoading, cyclesForYearError: error
    }
}

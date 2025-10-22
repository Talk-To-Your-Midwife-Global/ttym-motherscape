"use client"
import useSWR from "swr";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {fetcher} from "@/app/_lib/functions";

export function useCyclesForTheYear(accessToken) {
    const {
        data,
        isLoading,
        error
    } = useSWR([`${PUBLICHOSTNAME}/menstrual/cycles`, accessToken], ([url, accessToken]) => fetcher(url, accessToken));
    console.log("cyclesForYear", {data})
    return {
        cyclesForYear: data, cyclesForYearLoading: isLoading, cyclesForYearError: error
    }
}

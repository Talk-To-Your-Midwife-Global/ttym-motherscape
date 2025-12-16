"use client"
import useSWR from "swr";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {fetcher} from "@/app/_lib/functions";
import {Log} from "@/app/_lib/utils";

export function useCyclesForTheYear(accessToken) {
    const {
        data,
        isLoading,
        error
    } = useSWR([`${PUBLICHOSTNAME}/menstrual/cycles`, accessToken], ([url, accessToken]) => fetcher(url, accessToken));
    Log("cyclesForYear", {data})
    return {
        cyclesForYear: data, cyclesForYearLoading: isLoading, cyclesForYearError: error
    }
}

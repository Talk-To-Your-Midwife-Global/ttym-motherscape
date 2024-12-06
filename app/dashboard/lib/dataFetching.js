import useSWR from 'swr'
import {fetchCycle, fetcher, fetchPregnancy, fetchUser} from "@/app/lib/functions";
import {PUBLICHOSTNAME} from "@/app/config/main";
import {error} from "next/dist/build/output/log";

export function useUserInfo(accessToken) {
    const {
        data,
        error,
        isLoading
    } = useSWR([`${PUBLICHOSTNAME}/auth/token/`, accessToken], ([url, accessToken]) => fetchUser(url, accessToken));
    return {
        user: data,
        isLoading,
        error,
    }
}


export function useCycleInfo(accessToken) {
    const {
        data,
        isLoading,
        error
    } = useSWR([`${PUBLICHOSTNAME}/user/patient/details/`, accessToken], ([url, accessToken]) => fetchCycle(url, accessToken));
    return {
        data,
        isLoading,
        error,
    }
}

export function usePregnancyInfo(accessToken) {
    const {
        data,
        isLoading,
        error
    } = useSWR([`${PUBLICHOSTNAME}/user/pregnancy`, accessToken], ([url, accessToken]) => fetchPregnancy(url, accessToken))

    return {
        pregnancyData: data,
        pregnancyError: error,
        pregnancyLoading: isLoading,
    }
}

export function useInsightsInfo() {
    const {data, isLoading, error} = useSWR([`${PUBLICHOSTNAME}/insights/`], ([url]) => fetcher(url));
    // console.log(data)
    return {
        insights: data,
        isLoadingInsights: isLoading,
        insightError: error,
    }
}

export function useLogsInfo(accessToken) {
    const {
        data,
        isLoading,
        error
    } = useSWR([`${PUBLICHOSTNAME}/logs/`, accessToken], ([url, accessToken]) => fetcher(url, accessToken));

    return {
        logs: data,
        isLoadingLogs: isLoading,
        logsError: error,
    }
}


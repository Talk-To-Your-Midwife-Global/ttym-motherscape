import useSWR from 'swr'
import {fetchCycle, fetcher, fetchUser} from "@/app/lib/functions";

const HOSTNAME = `http://${process.env.NEXT_PUBLIC_HOSTNAME}`;

export function useUserInfo(accessToken) {
    const {
        data,
        error,
        isLoading
    } = useSWR([`${HOSTNAME}/auth/token/`, accessToken], ([url, accessToken]) => fetchUser(url, accessToken));
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
    } = useSWR([`${HOSTNAME}/user/patient/details/`, accessToken], ([url, accessToken]) => fetchCycle(url, accessToken));
    return {
        data,
        isLoading,
        error,
    }
}

export function useInsightsInfo() {
    const {data, isLoading, error} = useSWR([`${HOSTNAME}/insights/`], ([url]) => fetcher(url));
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
    } = useSWR([`${HOSTNAME}/logs/`, accessToken], ([url, accessToken]) => fetcher(url, accessToken));

    return {
        logs: data,
        isLoadingLogs: isLoading,
        logsError: error,
    }
}

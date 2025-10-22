import useSWR from 'swr'
import {fetchCycle, fetcher, fetchPregnancy, fetchUser} from "@/app/_lib/functions";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {contentGqlFetcher} from "@/app/dashboard/actions/action";
import {Log} from "@/app/_lib/utils";

export function useUserInfo(accessToken) {
    const {
        data,
        error,
        isLoading
    } = useSWR([`${PUBLICHOSTNAME}/user/`, accessToken], ([url, accessToken]) => fetchUser(url, accessToken));
    return {
        user: data,
        isLoading,
        error,
    }
}


export function useCycleInfo(accessToken) {
    Log("useCycleINfo", {accessToken});
    const {
        data,
        isLoading,
        error
    } = useSWR([`${PUBLICHOSTNAME}/menstrual/profile/`, accessToken], ([url, accessToken]) => fetchCycle(url, accessToken));
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
    } = useSWR([`${PUBLICHOSTNAME}/pregnancy/`, accessToken], ([url, accessToken]) => fetchPregnancy(url, accessToken))
    Log('usePregnancyInfo', {data})
    return {
        pregnancyData: data,
        pregnancyError: error,
        pregnancyLoading: isLoading,
    }
}

export function useInsightsInfo() {
    const {data, isLoading, error} = useSWR([`${PUBLICHOSTNAME}/insights/`], ([url]) => fetcher(url));
    // Log(data)
    return {
        insights: data,
        isLoadingInsights: isLoading,
        insightError: error,
    }
}

export function useLogsInfo(accessToken, dateRange = '') {
    const {
        data,
        isLoading,
        error
    } = useSWR([`${PUBLICHOSTNAME}/logs/?${dateRange}`, accessToken], ([url, accessToken]) => fetcher(url, accessToken));

    return {
        logData: data,
        isLoadingLogs: isLoading,
        logsError: error,
    }
}


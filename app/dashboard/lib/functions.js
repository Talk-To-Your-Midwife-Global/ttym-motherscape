import useSWR from 'swr'
import {fetchCycle, fetcher, fetchUser} from "@/app/lib/functions";


export function useUserInfo(accessToken) {
    const {data, error, isLoading} = useSWR([`http://${process.env.NEXT_PUBLIC_HOSTNAME}:8000/auth/token/`, accessToken], ([url, accessToken]) => fetchUser(url, accessToken));
    return {
        user: data,
        isLoading,
        error,
    }
}


export function useCycleInfo(accessToken) {
    const {data, isLoading, error} = useSWR([`http://${process.env.NEXT_PUBLIC_HOSTNAME}:8000/user/patient/details/`, accessToken], ([url, accessToken]) => fetchCycle(url, accessToken));
    return {
        data,
        isLoading,
        error,
    }
}

export function useInsightsInfo() {
    const {data, isLoading, error} = useSWR([`http://${process.env.NEXT_PUBLIC_HOSTNAME}:8000/insights/`], ([url]) => fetcher(url));
    // console.log(data)
    return {
        insights: data,
        isLoadingInsights: isLoading,
        insightError: error,
    }
}



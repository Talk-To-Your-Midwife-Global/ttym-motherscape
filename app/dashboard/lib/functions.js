export function useInsightsInfo() {
    const {data, isLoading, error} = useSWR([`http://${process.env.NEXT_PUBLIC_HOSTNAME}:8000/insights/`], ([url]) => fetcher(url));

    return {
        insights: data,
        isLoadingInsights: isLoading,
        insightError: error,
    }
}



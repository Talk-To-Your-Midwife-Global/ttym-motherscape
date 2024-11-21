import {InsightCard} from "@/app/dashboard/components/index";
import {useInsightsInfo} from "@/app/dashboard/lib/functions";

export function Insights({accessToken}) {

    const {insights, isLoadingInsights, insightError} = useInsightsInfo();
    if(isLoadingInsights) {
        return (
            <div>
                Loading insights
            </div>
        )
    }
    if (insightError) {
        return (
            <div>
                Error loading insights
                {insightError.message}
            </div>
        )
    }
    return (
        <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 p-4`}>
            {
                insights?.data?.map(insight => (
                    <InsightCard key={insight.id} insight={insight} accessToken={accessToken} />
                ))
            }
        </section>
    )
}
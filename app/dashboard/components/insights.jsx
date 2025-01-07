import {InsightCard} from "@/app/dashboard/components/index";
import {useInsightsInfo} from "@/app/dashboard/lib/dataFetching";
import {SmallEmptyState} from "@/app/components";

export function Insights({accessToken}) {
    const {insights, isLoadingInsights, insightError} = useInsightsInfo();
    // console.log(insights)
    if (isLoadingInsights) {
        return (<div>
            Loading insights
        </div>)
    }
    if (insightError) {
        return (<div>
            Error loading insights
            {insightError.message}
        </div>)
    }
    return (<section>
        <section className={`carousel flex overflow-x-auto scroll-smooth space-x-4 p-4`}>
            {insights && insights?.data?.map(insight => (
                <InsightCard key={insight.id} insight={insight} accessToken={accessToken}/>))}
        </section>
        {(insights.length < 1) && <div><SmallEmptyState text={"No article published yet"}/></div>}
    </section>)
}
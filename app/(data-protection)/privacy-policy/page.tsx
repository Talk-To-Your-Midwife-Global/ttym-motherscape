"use client"
import {usePrivacyPolicyFetcher} from "@/app/_hooks/useContentFetcher";
import {privacyPolicyQuery} from "@/app/dashboard/hooks/graphContentFetchers";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {OPTIONS} from "@/app/(data-protection)/_components/BeautifullyRich";
import {TapWrapper} from "@/app/_components/TapWrapper";
import {Loader} from "@/app/_components";
import {Log} from "@/app/_lib/utils";


export default function Page() {
    const {data, isLoading, error} = usePrivacyPolicyFetcher(privacyPolicyQuery);

    if (isLoading) {
        return <Loader/>
    }
    Log({data, privacyPolicyQuery});

    return (
        <ContainerWrapper>
            <TapWrapper link={'/auth/register'}>
              <span
                  className="iconify material-symbols-light--chevron-left-rounded font-medium text-3xl text-[#000]"></span>
            </TapWrapper>

            <section className={"text-primaryText"}>
                <h2>TTYM Privacy Policy</h2>
                {documentToReactComponents(data?.privacyPolicy.contractDetails?.json, OPTIONS)}
            </section>
        </ContainerWrapper>
    )
}
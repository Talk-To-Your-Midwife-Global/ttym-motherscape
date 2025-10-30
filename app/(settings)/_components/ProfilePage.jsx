"use client"
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {useUserProfileInfo} from "@/app/_lib/fetchers";
import {ProfileImage} from "@/app/_components/ProfileImage";
import {Log} from "@/app/_lib/utils";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {useCycleInfo} from "@/app/dashboard/lib/dataFetching";
import {IconButton} from "@/app/_components";
import {useEffect, useState} from "react";
import {eachDayOfInterval, format} from "date-fns";


export default function ProfilePage({accessToken}) {
    const {userProfileInfo, isLoading, error} = useUserProfileInfo(accessToken);
    const {data, error: cycleError, isLoading: cycleLoading} = useCycleInfo(accessToken);
    Log("ProfilePage.jsx", {userProfileInfo});
    const [cycleInfo, setCycleInfo] = useState([]);
    const getUserStatus = (status) => {
        if (status === "MENSTRUATING") {
            return "PERIOD TRACKING"
        } else {
            return "PREGNANCY TRACKING"
        }
    }

    useEffect(() => {
        function parseCycleInfo() {
            const cycleObj = {};
            const result = [];
            if (data) {
                cycleObj['cycle length'] = `${data.cycle_length} days`;
                cycleObj['period length'] = `${data.period_length} days`;
                cycleObj['average flow'] = eachDayOfInterval({
                    start: data?.current_cycle.start_date,
                    end: data?.current_cycle?.bleed_end_date
                }).length;
                cycleObj['last period start'] = format(data.last_period_start, "MMM dd");
            }

            for (const item in cycleObj) {
                result.push({name: [item], value: cycleObj[item]});
            }
            setCycleInfo(result);
        }

        parseCycleInfo()

    }, [data]);
    return (
        <section className={"w-full overflow-hidden"}>
            <SettingsNav pageLabel="Personal Profile"/>
            <ContainerWrapper>
                <ProfileImage userProfileInfo={userProfileInfo}/>
                <div className={"flex justify-between items-center mt-5"}>
                    <span className={" text-[#00000080]"}>Current Mode: </span>
                    <span className={"text-pink font-bold"}>{getUserStatus(data?.status)}</span>
                </div>

                <div className={"flex items-center justify-center w-full gap-4 mt-10"}>
                    <IconButton href={"/edit-profile"}
                                customStyles={"w-fit px-4 w-[150px] text-black border-[#00000033]"}
                                variant={"secondary"}
                                text={'Edit profile'} icon={"iconify mdi--pencil-outline"}/>
                    <IconButton href={"/settings"}
                                customStyles={"w-fit px-4 .w-[150px] text-black border-[#00000033]"}
                                variant={"secondary"}
                                text={'Settings'} icon={"iconify mdi--pencil-outline"}/>
                </div>

                <div className={"mt-5"}>
                    <hr className={"border-t-4 border-dotted"}/>
                </div>

                <section className={"mt-5 border-2 border-dotted rounded-xl border-[#C1C1C1] p-4 flex flex-col gap-5"}>
                    <div className={"flex items-center justify-between text-[#00000080]"}>
                        <div className={"text-black text-lg font-bold"}>Cycle Info</div>
                        <div className={"capitalize text-primaryColor border-2 border-primaryColor rounded-md p-2"}>
                            <p>{data?.current_cycle.current_phase} Phase</p>
                        </div>
                    </div>

                    {cycleInfo.map(info => {
                        return (
                            <div className={"flex items-center justify-between text-[#00000080]"}>
                                <div className={"text-black capitalize"}>{info.name}</div>
                                <div className={"p-2"}>
                                    <p>{info.value}</p>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </ContainerWrapper>
        </section>
    )
}
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import Link from "next/link";

export default function Page() {
    return (
        <section className={"w-full overflow-hidden"}>
            <SettingsNav pageLabel="Settings"/>
            <ContainerWrapper>
                <section className={"text-black"}>
                    <h3 className={"font-medium mb-3"}>Notifications</h3>
                    <form className={"ml-4 flex flex-col gap-3"}>
                        <div className={"flex items-center gap-2"}>
                            <input id={"periodReminder"} type="checkbox" name={"notifications"}
                                   className={"h-[20px] w-[20px] default:text-primaryColor default:bg-primaryColor"}/>
                            <label htmlFor="PeriodReminder">Period Reminders</label>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <input id={"periodReminder"} type="checkbox" name={"notifications"}
                                   className={"h-[20px] w-[20px] bg-primaryColor"}/>
                            <label htmlFor="PeriodReminder">Fertile Window</label>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <input id={"periodReminder"} type="checkbox" name={"notifications"}
                                   className={"h-[20px] w-[20px] bg-primaryColor"}/>
                            <label htmlFor="PeriodReminder">Health Tips and Reminders</label>
                        </div>
                    </form>
                </section>
                <section className={"text-black mt-5"}>
                    <h3 className={"font-medium mb-3"}>Account</h3>
                    <div className={"flex flex-col gap-3 ml-3"}>
                        <Link href={"/change-password"} className={"border-b-2 border-[#C1C1C1] py-2"}>
                            Change Password
                        </Link>
                        {/*<Link href={""}>Delete Account</Link>*/}
                        <Link href={"/logout"} className={"border-b-2 border-[#C1C1C1] py-2"}>Log Out</Link>
                    </div>
                </section>
            </ContainerWrapper>
        </section>
    )
}
import ToggleSwitch from "@/app/(settings)/_components/ToggleSwitch";
import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {ContainerWrapper} from "@/app/_components/ContainerWrapper";
import {NotificationToggle} from "@/app/(settings)/_components/NotificationToggle";

export default function Page() {
    return (
        <section>
            <SettingsNav pageLabel="Notifications"/>
            <ContainerWrapper>
                <NotificationToggle label="Symptom Reminders"/>
                <NotificationToggle label="Pregnancy updates"/>
                <NotificationToggle label="Appointments Alerts"/>
            </ContainerWrapper>
        </section>
    )
}
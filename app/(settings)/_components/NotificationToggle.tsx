import ToggleSwitch from "@/app/(settings)/_components/ToggleSwitch";

export function NotificationToggle({label}) {
    return (
        <div className="flex gap-3 items-center mb-10">
            <ToggleSwitch/> <span>{label}</span>
        </div>
    )
}
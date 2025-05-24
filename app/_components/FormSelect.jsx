import {convertSpacedStringToDashDelimited} from "@/app/_lib/functions";

export function FormSelect({label, options, disbaled = true}) {
    const name = convertSpacedStringToDashDelimited(label);

    return (
        <div className="flex flex-col gap-2 my-2">
            <label className="text-[#999999] text-sm capitalize">Language</label>
            <select name={name} disabled={disbaled}
                    className="border-2 border-[#999999] rounded-md p-2 placeholder-text-gray-500">
                <option value="#">--No Selection --</option>
                {/*Expects an object: {value, label}*/}
                {options && options.map(option => (
                    <option key={option.value} value={option.value}>{option?.label}</option>
                ))}
            </select>
        </div>
    )
}
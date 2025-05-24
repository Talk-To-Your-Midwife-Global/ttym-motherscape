import {convertSpacedStringToDashDelimited} from "@/app/_lib/functions";

export function Input({type = 'text', label, placeholderText, value = undefined}) {
    const name = convertSpacedStringToDashDelimited(label);
    return (
        <div className="flex flex-col gap-2 my-2">
            <label htmlFor={label} className="text-[#999999] text-sm capitalize">{label}</label>
            <input type={type} id={label} name={name} placeholder={placeholderText}
                   className="border-2 border-[#999999] rounded-md p-2 placeholder-text-gray-500"/>
        </div>
    )
}
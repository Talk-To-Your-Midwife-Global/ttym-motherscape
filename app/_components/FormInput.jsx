import {convertSpacedStringToDashDelimited} from "@/app/_lib/functions";
import {cn} from "@/app/_lib/utils";

export function FormInput({
                              label,
                              placeholderText,
                              fieldErrors = undefined,
                              type = 'text',
                              disabled = true,
                              value = undefined
                          }) {
    const name = convertSpacedStringToDashDelimited(label);
    return (
        <div className="flex flex-col gap-2 my-2">
            <label htmlFor={label} className="text-[#999999] text-sm capitalize">{label}</label>
            <input disabled={disabled} type={type} id={label} name={name} placeholder={placeholderText}
                   className={cn(`p-2`, !disabled && `border-2 border-[#999999] rounded-md placeholder-text-gray-500`,
                       disabled && `text-black`)}/>
            {fieldErrors && <span className="text-red-400 text-sm flex items-center gap-2">
                <span className="iconify lucide--info"></span>
                {fieldErrors[name][0]}
            </span>}
        </div>
    )
}
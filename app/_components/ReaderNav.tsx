import Link from "next/link";

export function ReaderNav() {
    return (
        <div className="flex justify-between">
            <div>
                <Link href="/dashboard/community"
                      className="bg-[#16898E1A] w-12 h-12 rounded-full flex justify-center items-center">
                    <span className={`iconify lucide--chevron-left text-2xl`}></span>
                </Link>
            </div>

            {/*<div className="bg-[#16898E1A] w-12 h-12 rounded-full flex justify-center items-center">*/}
            {/*    <span className="iconify lucide--bookmark"></span>*/}
            {/*</div>*/}
        </div>

    )
}
export function ProfileFormButton({action}) {
    return (
        <div className="flex mt-4">
            <button
                onClick={action}
                className="bg-primaryColor text-white p-2 w-full rounded-full flex items-center justify-center gap-2">
                <p>Edit</p>
                <span className="iconify lucide--square-pen"></span>
            </button>
        </div>
    )
}
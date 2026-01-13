export function ProfileSaveButton({action}) {
    return (
        <div className="flex mt-4">
            <button
                onClick={action}
                className="bg-primaryColor text-white p-2 w-full rounded-full flex items-center justify-center gap-2">
                <p>Save changes</p>
                <span className="iconify lucide--arrow-right"></span>
            </button>
        </div>
    )
}
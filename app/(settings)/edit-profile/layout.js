import {Toaster} from "sonner";

export default function EditProfileLayout({children}) {
    return (
        <>
            {children}
            <Toaster position={"top-center"} richColors/>
        </>
    )
}
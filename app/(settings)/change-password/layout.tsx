import {Toaster} from "sonner";

export default function ChangePasswordLayout({children}) {
    return (
        <>
            {children}
            <Toaster position={"top-center"} richColors/>
        </>
    )
}
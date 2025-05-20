import {ContainerWrapper} from "@/app/_components/ContainerWrapper";

export default function ReaderLayout({children, params}) {
    return (
        <section>
            {/*Keeps everything nice and tucked*/}
            {/*<ContainerWrapper>*/}
            {children}
            {/*</ContainerWrapper>*/}
        </section>
    )
}
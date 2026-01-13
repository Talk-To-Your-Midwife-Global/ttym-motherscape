import {SettingsNav} from "@/app/(settings)/_components/SettingsNav";
import {Accordion} from "@/app/(settings)/_components/Accordion";

export default function Page() {
    return (
        <section>
            <SettingsNav pageLabel="About TTYM"/>
            <Accordion/>
        </section>
    )
}
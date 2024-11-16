import Link from "next/link";

export default function Page() {
    return (
        <section className={"my-3"}>
            <Link href={"/dashboard/me"} > Go to main dashboard</Link>
        </section>
    )
}
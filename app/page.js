"use client"

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Loader} from "./_components";


export default function Page() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/auth/signIn');
            // router.push('/wait-list');
        }, 0);

        return () => clearTimeout(timer);
    }, [])

    return (<Loader/>);
}

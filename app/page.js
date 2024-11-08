"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "./components";


export default function Page() {
  const router = useRouter()

  useEffect(()=> {
    const timer = setTimeout(() => {
      // router.push('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [])
  
  return (
    <Loader />
  );
}

"use client"

import {useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {Button} from "@/app/components"
import facebook from "../../../public/images/facebook.svg"
import google from "../../../public/images/google.svg"
import apple from "../../../public/images/apple.svg"

export function HelpCenterLinks({signIn = true}) {
    return (
        <section className="text-primaryText text-center text-sm font-medium">
            <p className="mb-5">{signIn ? "Already have an account?" : "Don't have an account?"}
                <Link className="text-primaryColor"
                      href={`/auth/${signIn ? 'signIn' : 'register'}`}>{signIn ? ' Sign In' : ' Sign Up'}</Link>
            </p>
            <p>Need help? Visit our
                <Link className="text-primaryColor" href="#"> help center</Link>
            </p> {/** TODO:Create help center page */}
        </section>
    )
}

export function AuthNav({backUrl}) {
    return (
        <nav className="my-5">
            <Link href={backUrl} className="w-12 h-12 rounded-full flex justify-center
                    items-center">
                <span
                    className="iconify material-symbols-light--chevron-left-rounded font-medium text-3xl text-[#000]"></span>
            </Link>
        </nav>
    )
}



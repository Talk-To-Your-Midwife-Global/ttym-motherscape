"use client"
import React, {useEffect} from 'react';
import {useState} from 'react';
// import {useToast} from '@/hooks/use-toast';
import {useActionState} from "react";
import {addToWaitlist} from "@/app/_actions/waitlist";
import appLogo from "@/public/icons/Obaa-logo-Horizontal.svg"
import {IconButton} from "@/app/_components/index";
import Image from "next/image";


export function Waitlist() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    // const {toast} = useToast();
    const [formState, action] = useActionState(addToWaitlist, undefined)
    console.log({formState})

    useEffect(() => {
        if (formState?.success) {
            setIsSubmitted(true)
        }
    }, [formState]);

    if (isSubmitted) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <main className="flex-grow container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-center min-h-[80vh]">
                        <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="p-6 text-center">
                                <div
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <span className="iconify lucide--check-circle h-4 w-4 text-green-600"> </span>
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">You're on the list!</h2>
                                <p className="text-gray-600 mb-6">
                                    Thank you for joining our waitlist. We'll notify you as soon as we launch.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F969C] transition-colors"
                                >
                                    Sign up another email
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/*<Navbar/>*/}
            <main className="flex-grow container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-center min-h-[80vh] py-12">
                    <div className="w-full max-w-2xl mx-auto text-center">
                        <div className="mb-8">
                            <div
                                className="mx-auto mb-6 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#0F969C]/10">
                                <div
                                    className="bg-primaryColor rounded-full w-[100px] h-[100px] flex items-center justify-center p-2">
                                    <Image src={appLogo} alt="obaa+logo"/>
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Join Our Waitlist
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Be the first to know when we launch our revolutionary maternal healthcare platform.
                                Get early access and exclusive updates delivered to your inbox.
                            </p>
                        </div>

                        <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Get Early Access</h2>
                                <p className="text-gray-600 mb-6">
                                    Join thousands of others waiting for our launch
                                </p>

                                <form action={action} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First
                                                Name</label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                placeholder="Abena"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0F969C] focus:border-[#0F969C]"
                                            />
                                            {formState?.errors?.firstName && (
                                                <p className="text-sm text-red-500">{formState?.fieldErrors?.firstName}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last
                                                Name</label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                placeholder="Saah"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0F969C] focus:border-[#0F969C]"
                                            />
                                            {formState?.errors?.lastName && (
                                                <p className="text-sm text-red-500">{formState?.fieldErrors?.lastName}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email
                                            Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="abena.saah@example.com"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0F969C] focus:border-[#0F969C]"
                                        />
                                        {formState?.errors?.email && (
                                            <p className="text-sm text-red-500">{formState?.fieldErrors?.email}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-4 py-3 bg-[#0F969C] text-white font-medium rounded-md hover:bg-[#0F969C]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F969C] transition-colors"
                                    >
                                        Join Waitlist
                                    </button>
                                    {/*<div className="flex items-center justify-center">*/}
                                    {/*    <IconButton type='submit' text="Join Waitlist"*/}
                                    {/*                loadingText="Fixing you in our future"/>*/}
                                    {/*</div>*/}
                                </form>

                                <div className="mt-6 text-sm text-gray-500">
                                    <p>
                                        By joining our waitlist, you agree to receive updates about our launch.
                                        We respect your privacy and won't spam you.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Early Access</h3>
                                <p className="text-gray-600">Be among the first to experience our platform</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Exclusive Updates</h3>
                                <p className="text-gray-600">Get behind-the-scenes insights and progress updates</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Special Offers</h3>
                                <p className="text-gray-600">Receive launch discounts and special promotions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
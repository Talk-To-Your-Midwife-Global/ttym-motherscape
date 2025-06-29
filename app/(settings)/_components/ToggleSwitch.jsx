"use client"
import {useState} from 'react';
import {cn} from "@/app/_lib/utils";

export default function ToggleSwitch() {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
        <button
            onClick={toggleSwitch}
            className={cn(`relative inline-flex items-center h-4 rounded-full w-8 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`, isEnabled ? 'bg-teal-600' : 'bg-gray-300'
            )}
        >
            <span className="sr-only">Toggle</span>
            <span
                className={`inline-block w-5 h-5 transform bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
        </button>
    );
}
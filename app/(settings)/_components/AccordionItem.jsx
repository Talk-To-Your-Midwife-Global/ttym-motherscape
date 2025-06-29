"use client"
import {ChevronIcon} from "@/app/(settings)/_components/icons/ChevronIcon";
import {useState} from "react";

export const AccordionItem = ({title, children, initiallyOpen = false}) => {
    const [isOpen, setIsOpen] = useState(initiallyOpen);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item .border-b border-gray-200 last:border-b-0">
            <h2>
                <button
                    type="button"
                    className="accordion-header flex items-center justify-between w-full p-4 sm:p-5 text-left text-gray-700 hover:bg-gray-50 focus:outline-none .focus:ring-2 focus:ring-indigo-300 rounded-t-lg"
                    onClick={toggleOpen}
                    aria-expanded={isOpen}
                >
                    <span className="text-sm sm:text-lg font-medium">{title}</span>
                    <ChevronIcon isOpen={isOpen}/>
                </button>
            </h2>
            {/* Accordion content with transition */}
            <div
                className={`accordion-content bg-white px-4 sm:px-5 text-gray-600 text-sm sm:text-base overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[500px] py-3 sm:py-4' : 'max-h-0' // Adjusted max-height and padding for open state
                }`}
                style={{
                    // max-height is handled by Tailwind, but you could use style for dynamic max-height if needed
                    // paddingTop: isOpen ? '0.75rem' : '0', // Handled by py-*
                    // paddingBottom: isOpen ? '1rem' : '0', // Handled by py-*
                }}
            >
                <div className="pb-1">
                    {children}
                </div>
            </div>
        </div>
    );
};
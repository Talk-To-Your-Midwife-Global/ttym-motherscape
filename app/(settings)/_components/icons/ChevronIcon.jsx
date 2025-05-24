export const ChevronIcon = ({isOpen}) => (
    <svg
        className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
    </svg>
);

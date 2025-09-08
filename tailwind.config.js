/** @type {import('tailwindcss').Config} */
const {addIconSelectors} = require('@iconify/tailwind');
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./_components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'onboarding-bg': "url('/images/bg-1.png')",
                'onbaording-bg-2': "url('/images/bg-2.png')",
            },
            dropShadow: {
                "custom-green": "0px 14px 6px #0F969C21",
                "custom-black": "40px 44px 16px #0F969C21",
                "large-green": "10px 24px 10px 15px #0F969C",
            },
            boxShadow: {
                "custom-green": "10px 14px 106px 4px #0F969C21",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                secondary: "var(--secondary)",
                mainText: "var(--main-text)",
                subText: "var(--sub-text)",
                black: "var(--black)",
                pink: "var(--pink)",
                primaryText: "var(--primary-text-color)",
                primaryColor: "var(--primary-color)",
                tertiaryColor: "var(--tertiary-color)"
            },
        },
    },
    plugins: [
        addIconSelectors(['lucide', 'material-symbols-light', 'mdi', 'ic'])
    ],
};

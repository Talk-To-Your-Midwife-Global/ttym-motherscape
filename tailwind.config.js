/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "var(--secondary)",
        mainText: "var(--main-text)",
        subText: "var(--sub-text)",
        black: "var(--black)",
        pink: "var(--pink)",
      },
    },
  },
  plugins: [],
};

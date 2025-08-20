import {inter} from "./_fonts";
import "./globals.css";

export const metadata = {
    title: "TTYM Global | Talk To Your Midwife",
    description: "Talk To Your Midwife",
    manifest: "/manifest.json",

    // For apple
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Obaa+ | TTYM Global",
    },

    icons: {
        icon: '/icons/manifest-icon-192.maskable.png',
        apple: '/icons/manifest-icon-192.maskable.png',
    }
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        {/* <UserProvider> */}
        <body
            className={`${inter.className}`}
        >
        {children}
        </body>
        {/* </UserProvider> */}
        </html>
    );
}

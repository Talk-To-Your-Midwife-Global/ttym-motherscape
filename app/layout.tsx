import {inter} from "./_fonts";
import "./globals.css";

const APP_NAME = "Obaa+ App";
const APP_DEFAULT_TITLE = "Obaa+ (TTYM Global)";
const APP_TITLE_TEMPLATE = "%s - Obaa+";
const APP_DESCRIPTION = "Designed to help women manage their reproductive health, including menstrual tracking, pregnancy tracking, and communication with certified midwives.";

export const metadata = {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",

    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Obaa+ | TTYM Global",
    },

    icons: {
        icon: '/icons/manifest-icon-192.maskable.png',
        apple: '/icons/manifest-icon-192.maskable.png',
    },

    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    fit: "cover",
    userScalable: false
}


export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body
            className={`${inter.className}`}
        >
        {children}
        </body>
        </html>
    );
}

export default function manifest() {
    return {
        id: "/",
        start_url: "/",
        scope: "/",
        name: "Obaa+ (TTYM Global)",
        short_name: "Obaa+",
        description: "Designed to help women manage their reproductive health, including menstrual tracking, pregnancy tracking, and communication with certified midwives.",
        theme_color: "#0F969C",
        background_color: "#0F969C",
        display: "standalone",
        icons: [
            {
                "purpose": "any",
                "sizes": "1706x1706",
                "src": "icons/maskable_icon.png",
                "type": "image/png"
            },
            {
                "purpose": "maskable",
                "sizes": "1706x1706",
                "src": "icons/maskable_icon.png",
                "type": "image/png"
            },
            {
                "purpose": "maskable",
                "sizes": "128x128",
                "src": "icons/maskable_icon_x128.png",
                "type": "image/png"
            },
            {
                "purpose": "any",
                "sizes": "144x144",
                "src": "icons/android-launchericon-144-144.png",
                "type": "image/png"
            },
            {
                "purpose": "maskable",
                "sizes": "144x144",
                "src": "icons/android-launchericon-144-144.png",
                "type": "image/png"
            },
            {
                "purpose": "maskable",
                "sizes": "192x192",
                "src": "icons/maskable_icon_x192.png",
                "type": "image/png"
            },
            {
                "purpose": "maskable",
                "sizes": "512x512",
                "src": "icons/maskable_icon_x512.png",
                "type": "image/png"
            }
        ]
    }
}
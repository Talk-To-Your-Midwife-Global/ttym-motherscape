import posthog from "posthog-js";

if (process.env.NODE_ENV === "production") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        defaults: "2025-05-24",
        autocapture: {
            // Disable Copy/Cut Analytics
            capture_copied_text: false,

            // DOM Event List
            // dom_event_allowlist: ["click", "submit"],

            element_allowlist: ["button", "form", "a"],


        }
    });
}

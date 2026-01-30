"use client";

import {useEffect, useTransition} from "react";
import {refreshUserAccessToken} from "@/app/_actions/auth";
import posthog from "posthog-js";
import {Log} from "@/app/_lib/utils";

export function RefreshTokenizer({children}) {
    const [isPending, startTransition] = useTransition();
    const callRefreshFunction = () => {
        startTransition(async () => {
            const {serverError, success, message} = await refreshUserAccessToken();
            if (serverError) {
                posthog.captureException(`refreshTokenizer.js callRefreshFunction() error: `);
                Log({serverError, success, message});
            } else {
                Log({serverError, success, message});
                posthog.capture(`refreshTokenizer.js callRefreshFunction success`);
            }
        })
    }

    useEffect(() => {
        callRefreshFunction();

        const handleFocus = () => {
            callRefreshFunction();
        }

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        }
    }, []);
    return children
}
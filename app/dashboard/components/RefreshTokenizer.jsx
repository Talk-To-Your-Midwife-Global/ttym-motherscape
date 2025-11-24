"use client";

import {useEffect, useTransition} from "react";
import {refreshUserAccessToken} from "@/app/_actions/auth";
import posthog from "posthog-js";

export function RefreshTokenizer({children}) {
    const [isPending, startTransition] = useTransition();
    const callRefreshFunction = () => {
        startTransition(async () => {
            const {serverError, success, message} = await refreshUserAccessToken();
            if (serverError) {
                posthog.captureException(`refreshTokenizer.js callRefreshFunction() error: `);
                console.log({serverError, success, message});
            } else {
                console.log({serverError, success, message});
                posthog.capture(`refreshTokenizer.js callRefreshFunction success`);
            }
        })
    }

    useEffect(() => {
        const refreshTokenInterval = setInterval(callRefreshFunction, 60 * 13 * 1000);
        return () => {
            clearInterval(refreshTokenInterval);
        }
    }, []);
    return children
}
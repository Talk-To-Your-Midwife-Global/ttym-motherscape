"use client"
import {useCallback, useEffect, useState, useRef} from "react";
import {Log} from "@/app/_lib/utils";
import posthog from "posthog-js";

export const useWebSocket = (url, token) => {
    const [newEvent, setNewEvent] = useState("");
    const [ws, setWs] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const eventHandlers = useRef({})

    useEffect(() => {
        const socket = new WebSocket(`${url}?token=${token}`);
        setWs(socket);

        socket.onopen = () => {
            Log("WebSocket opened");
            setIsConnected(true);
        }

        socket.onmessage = (event) => {
            Log('message received', event.data)
            setNewEvent(event.data)

            try {
                const parsed = JSON.parse(event.data);
                const {source, data} = parsed;

                if (eventHandlers.current[source]) {
                    eventHandlers.current[source](data);
                } else {
                    Log('Event type does not have a handler')
                }
            } catch (error) {
                posthog.captureException(error);
            }
        }

        socket.onerror = (error) => {
            posthog.captureException(error);
        }

        socket.onclose = () => {
            setIsConnected(false)
        }

        return () => {
            socket.close();
        }
    }, [url]);

    const onEvent = useCallback((eventType, handler) => {
        eventHandlers.current[eventType] = handler;
    }, [])


    const sendMessage = useCallback((eventType, data = {}) => {
        Log(data);
        const message = JSON.stringify({source: eventType, ...data})
        Log(message)
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message)
        } else {
            Log('Websocket not ready', message)
        }

    }, [ws])
    return {isConnected, onEvent, sendMessage, newEvent};
}
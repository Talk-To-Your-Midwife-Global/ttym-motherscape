"use client"
import {useCallback, useEffect, useState, useRef} from "react";

export const useWebSocket = (url, token) => {
    const [newEvent, setNewEvent] = useState("");
    const [ws, setWs] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const eventHandlers = useRef({})

    useEffect(() => {
        const socket = new WebSocket(`${url}?token=${token}`);
        setWs(socket);

        socket.onopen = () => {
            console.log("WebSocket opened");
            setIsConnected(true);
        }

        socket.onmessage = (event) => {
            console.log('message received', event.data)
            setNewEvent(event.data)

            try {
                const parsed = JSON.parse(event.data);
                const {source, data} = parsed;

                if (eventHandlers.current[source]) {
                    eventHandlers.current[source](data);
                } else {
                    console.warn('Event type does not have a handler')
                }
            } catch (error) {
                console.log(error);
            }
        }

        socket.onerror = (error) => {
            console.log(error);
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
        console.log(data);
        const message = JSON.stringify({source: eventType, ...data})
        console.log(message)
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message)
        } else {
            console.warn('Websocket not ready', message)
        }

    }, [ws])
    return {isConnected, onEvent, sendMessage, newEvent};
}
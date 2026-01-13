"use client"
import {useState, createContext, useContext} from "react";

const GeneralContext = createContext()

export function GeneralContextProvider({children}) {
    const [hasNotification, setHasNotification] = useState(false);
    const [notification, setNotification] = useState({});

    const values = {
        hasNotification, setHasNotification,
        notification, setNotification
    }

    return (
        <GeneralContext.Provider value={values}>
            {children}
        </GeneralContext.Provider>
    )
}

export function useGeneralContext() {
    return useContext(GeneralContext);
}
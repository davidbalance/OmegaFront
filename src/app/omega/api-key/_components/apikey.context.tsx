'use client'

import React, { createContext, useContext, useState } from 'react'

interface ApikeyContextProps {
    value?: any;
    setApikey: (value: string) => void;
    clear: () => void;
}

const ApikeyContext = createContext<ApikeyContextProps | undefined>(undefined);

export const useApikey = () => {
    const context = useContext(ApikeyContext);
    if (!context) {
        throw new Error('useApikey must be used within a ApikeyProvider');
    }
    return context;
}

const ApikeyProvider = ({
    children
}: { children: React.ReactNode }) => {

    const [value, setValue] = useState<string | undefined>(undefined);

    const setApikey = (apikey: string) => setValue(apikey);
    const clear = () => setValue(undefined);

    return (
        <ApikeyContext.Provider value={{ value, setApikey, clear }}>
            {children}
        </ApikeyContext.Provider>
    )
}

export default ApikeyProvider
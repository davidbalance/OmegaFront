'use client'

import React, { createContext, useContext, useState } from 'react'

interface ApiKeyContextProps {
    value?: any;
    setApiKey: (value: string) => void;
    clear: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextProps | undefined>(undefined);

export const useApiKey = () => {
    const context = useContext(ApiKeyContext);
    if (!context) {
        throw new Error('useApiKey must be used within a ApiKeyProvider');
    }
    return context;
}

const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {

    const [value, setValue] = useState<string | undefined>(undefined);

    const setApiKey = (apiKey: string) => setValue(apiKey);
    const clear = () => setValue(undefined);

    return (
        <ApiKeyContext.Provider value={{ value, setApiKey, clear }}>
            {children}
        </ApiKeyContext.Provider>
    )
}

export default ApiKeyProvider
'use client'

import React, { createContext, useContext, useRef, useState } from 'react'

interface DNIValidatorContextProps {
    ref: React.MutableRefObject<HTMLFormElement | null>;
    data: string;
    setData: (data: string) => void;
}

const DNIValidatorContext = createContext<DNIValidatorContextProps | undefined>(undefined);

export const useDNIValidator = () => {
    const context = useContext(DNIValidatorContext);
    if (!context) {
        throw new Error('useDNIValidator must be used within a DNIValidatorContext');
    }
    return context;
}

const DNIValidatorProvider: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {

        const [data, setData] = useState<string>('');
        const formRef = useRef<HTMLFormElement | null>(null);

        return (
            <DNIValidatorContext.Provider value={{
                data: data,
                ref: formRef,
                setData
            }}>
                {children}
            </DNIValidatorContext.Provider>
        )
    }

export default DNIValidatorProvider
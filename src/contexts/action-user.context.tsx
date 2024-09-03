'use client'

import { notifications } from '@mantine/notifications';
import React, { useState } from 'react'
import { createContext, useContext } from "react";

interface ActionUserContextProps {
    load: boolean;
    trigger: (promise: Promise<void>) => void;
}

const ActionUserContext = createContext<ActionUserContextProps | undefined>(undefined);

export const useActionUser = () => {
    const context = useContext(ActionUserContext);
    if (!context) {
        throw new Error('useActionUser must be used within a ActionUserProvider');
    }
    return context;
}


const ActionUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [load, setLoad] = useState<boolean>(false);

    const trigger = async (promise: Promise<void>) => {
        setLoad(true);
        try {
            console.log(1)
            await promise;
            console.log(2)
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoad(false);
        }
    }

    const value = { load, trigger }

    return (
        <ActionUserContext.Provider value={value}>
            {children}
        </ActionUserContext.Provider>
    )
}

export default ActionUserProvider
'use client'

import { getErrorMessage } from '@/lib/utils/errors';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react'
import { createContext, useContext } from "react";

interface ActionMenuContextProps {
    load: boolean;
    trigger: (promise: Promise<void>) => void;
}

const ActionMenuContext = createContext<ActionMenuContextProps | undefined>(undefined);

export const useActionMenu = () => {
    const context = useContext(ActionMenuContext);
    if (!context) {
        throw new Error('useActionMenu must be used within a ActionMenuProvider');
    }
    return context;
}


const ActionMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [load, setLoad] = useState<boolean>(false);

    const trigger = async (promise: Promise<void>) => {
        setLoad(true);
        try {
            await promise;
        } catch (error: any) {
            console.error(error);
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoad(false);
        }
    }

    const value = { load, trigger }

    return (
        <ActionMenuContext.Provider value={value}>
            {children}
        </ActionMenuContext.Provider>
    )
}

export default ActionMenuProvider
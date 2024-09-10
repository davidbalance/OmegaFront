'use client'

import React, { createContext, useContext, useState } from 'react'

interface OrderCloudCheckContextProps {
    id: number;
    type: string;
    value: boolean;
    toggle: () => void;
    setValue: (value: boolean) => void;
}

const OrderCloudCheckContext = createContext<OrderCloudCheckContextProps | undefined>(undefined);

export const useCloudCheck = () => {
    const context = useContext(OrderCloudCheckContext);
    if (!context) {
        throw new Error('useCloudCheck must be used within a OrderCloudCheckProvider');
    }
    return context;
}

interface OrderCloudCheckProviderProps { id: number, type: string, children: React.ReactNode }
const OrderCloudCheckProvider: React.FC<OrderCloudCheckProviderProps> = ({
    id,
    type,
    children
}) => {

    const [value, setValue] = useState<boolean>(false);
    const toggle = () => setValue(prev => !prev);

    return (
        <OrderCloudCheckContext.Provider value={{ id, type, value, toggle, setValue }}>
            {children}
        </OrderCloudCheckContext.Provider>
    )
}

export default OrderCloudCheckProvider
'use client'

import React, { createContext, useContext, useState } from 'react'

interface OrderCloudDownloadContextProps {
    loading: boolean;
    start: () => void;
    end: () => void;
}

const OrderCloudDownloadContext = createContext<OrderCloudDownloadContextProps | undefined>(undefined);

export const useCloudDownload = () => {
    const context = useContext(OrderCloudDownloadContext);
    if (!context) {
        throw new Error('useCloudDownload must be used within a OrderCloudDownloadProvider');
    }
    return context;
}

interface OrderCloudDownloadProviderProps { children: React.ReactNode }
const OrderCloudDownloadProvider: React.FC<OrderCloudDownloadProviderProps> = ({
    children
}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const start = () => setLoading(true);
    const end = () => setLoading(false);

    return (
        <OrderCloudDownloadContext.Provider value={{ loading, start, end }}>
            {children}
        </OrderCloudDownloadContext.Provider>
    )
}

export default OrderCloudDownloadProvider
'use client'

import { getErrorMessage } from '@/lib/utils/errors';
import { MedicalFileZipPayload } from '@/server/medical-test/server-types';
import { notifications } from '@mantine/notifications';
import React, { createContext, useCallback, useContext, useState } from 'react'
import { processBlob } from '../_helpers/process_blob.helper';

type OrderCloudDownloadContextProps = {
    loading: boolean;
    trigger: (values?: MedicalFileZipPayload[]) => void;
    addFile: (value: MedicalFileZipPayload) => void;
    removeFile: (value: MedicalFileZipPayload) => void;
}

const OrderCloudDownloadContext = createContext<OrderCloudDownloadContextProps | undefined>(undefined);

export const useCloudDownload = () => {
    const context = useContext(OrderCloudDownloadContext);
    if (!context) {
        throw new Error('useCloudDownload must be used within a OrderCloudDownloadProvider');
    }
    return context;
}

type OrderCloudDownloadProviderProps = {
    children: React.ReactNode;
}
const OrderCloudDownloadProvider: React.FC<OrderCloudDownloadProviderProps> = ({
    children
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<MedicalFileZipPayload[]>([]);

    const handleDownload = useCallback(async (values?: MedicalFileZipPayload[]) => {
        setLoading(true);
        try {
            await processBlob(values ?? files);
        } catch (error) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [files])

    const addFile = (value: MedicalFileZipPayload) => setFiles(prev => [...prev, value]);
    const removeFile = (value: MedicalFileZipPayload) => setFiles(prev => prev
        .filter(e => e.testId === value.testId
            && e.fileType === value.fileType));

    return (
        <OrderCloudDownloadContext.Provider value={{
            loading,
            trigger: handleDownload,
            addFile,
            removeFile
        }}>
            {children}
        </OrderCloudDownloadContext.Provider>
    )
}

export default OrderCloudDownloadProvider
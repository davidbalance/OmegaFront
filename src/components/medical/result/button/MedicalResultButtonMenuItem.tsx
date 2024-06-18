import { useFetch } from '@/hooks/useFetch/useFetch';
import { blobFile } from '@/lib/utils/blob-to-file';
import { Menu, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconPdf } from '@tabler/icons-react'
import React, { useCallback, useEffect, useState } from 'react'

interface MedicalResultButtonMenuItemProps {
    type: 'report' | 'result';
    file: number;
    label: string;
    fileName: string;
    icon: React.ReactNode;
    onStartDownload?: () => void;
    onEndDownload?: () => void;
}
const MedicalResultButtonMenuItem: React.FC<MedicalResultButtonMenuItemProps> = ({ icon, file, fileName, type, label, onEndDownload, onStartDownload }) => {

    const {
        data: fileBlob,
        error: fileError,
        reload: fileReload,
    } = useFetch<Blob>(`/api/medical/results/file/downloader/${type}/${file}`, 'GET', { loadOnMount: false, type: 'blob' });

    const handleClickEventDownload = useCallback(() => {
        fileReload();
        notifications.show({ message: 'La descarga ha comenzado', color: 'green' });
        onStartDownload?.();
    }, [fileReload, onStartDownload]);

    useEffect(() => {
        if (fileBlob) {
            notifications.show({ message: 'Archivo descargado' });
            blobFile(fileBlob, fileName);
            onEndDownload?.();
        }
    }, [fileBlob, fileName, onEndDownload]);

    useEffect(() => {
        if (fileError) {
            console.log(fileError);
            notifications.show({ message: fileError.message, color: 'red' });
            onEndDownload?.();
        }
    }, [fileError, onEndDownload]);

    return (
        <Menu.Item
            leftSection={icon}
            onClick={handleClickEventDownload} >
            {label}
        </Menu.Item >
    )
}

export { MedicalResultButtonMenuItem }
import { useFetch } from '@/hooks/useFetch';
import { blobFile } from '@/lib/utils/blob-to-file';
import { Tooltip, ActionIcon, rem, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDownload } from '@tabler/icons-react';
import React, { useCallback, useEffect } from 'react'

interface DownloadActionButtonProps {
    /**
     * Direccion URL donde se encuentra alojado el archivo.
     */
    url: string;
    /**
     * Nombre que el archivo tendra al ser descargado.
     */
    filename: string;
    /**
     * Funcion que es invocada cuando se realiza un click.
     * @returns 
     */
    onClick?: () => void;
}
const DownloadActionButton: React.FC<DownloadActionButtonProps> = ({ url, filename, onClick }) => {
    const { data, loading, error, reload, reset } = useFetch<Blob>(url, 'GET', { loadOnMount: false, type: 'blob' });

    const handleClickEventDownloadFile = useCallback(() => {
        reload();
        onClick?.();
    }, [reload, onClick]);

    useEffect(() => {
        if (data) {
            blobFile(data, filename)
            reset();
        }
    }, [data, filename, reset]);

    useEffect(() => {
        if (error) {
            notifications.show({ message: error.message, color: 'red' });
        }
    }, [error]);

    return (
        loading
            ? (
                <Loader size='xs' />
            ) : (
                <Tooltip
                    label='Descargar'
                    withArrow>
                    <ActionIcon size='sm' p={rem(2)} variant='transparent' onClick={handleClickEventDownloadFile}>
                        <IconDownload style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                </Tooltip>
            )
    )
}

export { DownloadActionButton }
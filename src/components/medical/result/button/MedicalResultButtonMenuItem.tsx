import { useFetch } from '@/hooks/useFetch';
import { blobFile } from '@/lib/utils/blob-to-file';
import { Menu } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect } from 'react'

interface MedicalResultButtonMenuItemProps {
    /**
     * Tipo del elemento que sera descargado.
     */
    type: 'report' | 'result';
    /**
     * Identificador unico del archivo.
     */
    file: number;
    /**
     * Etiqueta del boton de descarga.
     */
    label: string;
    /**
     * Nombre del archivo a descargar.
     */
    fileName: string;
    /**
     * Icono que sera colocado en el elemento del menu.
     */
    icon: React.ReactNode;
    /**
     * Funcion que es invocada cuando comienza la descarga del archivo.
     * @returns 
     */
    onStartDownload?: () => void;
    /**
     * Funcion que es invocada cuando finaliza la descarga del archivo.
     * @returns 
     */
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
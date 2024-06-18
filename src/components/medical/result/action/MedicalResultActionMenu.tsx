import { useFetch } from '@/hooks/useFetch/useFetch';
import { MedicalResult } from '@/lib/dtos/medical/result/response.dto';
import { blobFile } from '@/lib/utils/blob-to-file';
import { Menu, MenuTarget, Loader, ActionIcon, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconX, IconDotsVertical, IconDownload, IconPdf, IconPencil, IconVirus } from '@tabler/icons-react';
import React, { useCallback, useEffect, useState } from 'react'

type MedicalResultWithoutOrder = Omit<MedicalResult, 'order'>;
interface MedicalResultActionMenuProps {
    data: MedicalResultWithoutOrder;
    onClick?: () => void;
    downloadResult?: boolean;
    downloadReport?: boolean;
    onCreateReport?: () => void;
    onDiseaseModification?: () => void;
}
const MedicalResultActionMenu: React.FC<MedicalResultActionMenuProps> = ({
    data,
    downloadReport,
    downloadResult,
    onDiseaseModification,
    onCreateReport
}) => {

    const [disclosure, { close, open }] = useDisclosure(false)

    const { data: fileResultBlob,
        loading: fileResultLoading,
        error: fileResultError,
        reload: fileResultReload,
        reset: fileResultReset
    } = useFetch<Blob>(`/api/medical/results/file/downloader/result/${data.id}`, 'GET', { loadOnMount: false, type: 'blob' });

    const { data: fileReportBlob,
        loading: fileReportLoading,
        error: fileReportError,
        reload: fileReportReload,
        reset: fileReportReset
    } = useFetch<Blob>(`/api/medical/results/file/downloader/report/${data.report?.id || ''}`, 'GET', { loadOnMount: false, type: 'blob' });

    const handleClick = useCallback(() => open(), []);

    const handleClickDiseaseModification = useCallback(() => {
        onDiseaseModification?.();
    }, [onDiseaseModification]);

    const handleClickEventFileResultDownload = useCallback(() => {
        fileResultReload();
        notifications.show({ message: 'La descarga ha comenzado', color: 'green' });
    }, [fileResultReload]);

    const handleClickEventFileReportDownload = useCallback(() => {
        fileReportReload();
        notifications.show({ message: 'La descarga ha comenzado', color: 'green' });
    }, [fileReportReload]);

    const handleClickEventCreateReport = useCallback(() => {
        onCreateReport?.();
    }, [onCreateReport])

    useEffect(() => {
        if (fileResultBlob || fileReportBlob) {
            if (fileResultBlob) blobFile(fileResultBlob, `${data.examName}.pdf`);
            else if (fileReportBlob) blobFile(fileReportBlob, `${data.examName}.pdf`);
            fileResultReset();
            fileReportReset();
            notifications.show({ message: 'Descarga completa', color: 'green' });
        }
    }, [fileResultBlob, fileReportBlob, fileResultReset, fileReportReset, data]);

    useEffect(() => {
        if (fileReportError) notifications.show({ message: fileReportError.message, color: 'red' });
        else if (fileResultError) notifications.show({ message: fileResultError.message, color: 'red' });
    }, [fileReportError, fileResultError]);

    return (
        <Menu onClose={close} disabled={fileResultLoading || fileReportLoading}>
            <MenuTarget>
                {
                    fileResultLoading || fileReportLoading
                        ? <Loader size='xs' />
                        : <ActionIcon variant="transparent" onClick={handleClick}>
                            {disclosure ? <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} /> : <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                        </ActionIcon>
                }
            </MenuTarget>
            <Menu.Dropdown>
                {(onDiseaseModification || downloadResult) && <Menu.Label>Resultados medicos</Menu.Label>}
                {onDiseaseModification && (
                    <Menu.Item
                        onClick={handleClickDiseaseModification}
                        leftSection={
                            <IconVirus style={{ width: rem(16), height: rem(16) }} />}
                    >
                        Modificar morbilidades
                    </Menu.Item>

                )}
                {downloadResult && (
                    <Menu.Item onClick={handleClickEventFileResultDownload} leftSection={<IconDownload style={{ width: rem(16), height: rem(16) }} />}>
                        Descargar resultado
                    </Menu.Item>
                )}
                {(onDiseaseModification || downloadResult) && <Menu.Divider />}

                {(downloadReport || onCreateReport) && <Menu.Label>Reporteria medica</Menu.Label>}
                {onCreateReport && (
                    <Menu.Item
                        leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                        onClick={handleClickEventCreateReport}
                    >
                        Elaborar reporte
                    </Menu.Item>
                )}
                {(downloadReport && !!data.report) && (
                    <Menu.Item onClick={handleClickEventFileReportDownload} leftSection={<IconDownload style={{ width: rem(16), height: rem(16) }} />}>
                        Descargar reporte
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    )
}

export { MedicalResultActionMenu };
import { useFetch } from '@/hooks/useFetch';
import { blobFile } from '@/lib/utils/blob-to-file';
import { Menu, MenuTarget, ActionIcon, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconDotsVertical, IconDownload, IconPencil, IconVirus, IconUpload, IconTrash, IconEye } from '@tabler/icons-react';
import React, { useCallback, useEffect, useState } from 'react'
import { MedicalResultModalDiseases } from '../modal/MedicalResultModalDiseases';
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto';
import BlobPreview from '@/components/blob/preview/BlobPreview';

type MedicalResultWithoutOrder = MedicalResult;
interface MedicalResultActionMenuProps {
    /**
     * Valores del resultado medico usados en la inicializacion del componente.
     */
    data: MedicalResultWithoutOrder;
    /**
     * Valor que indica si se muestra el un resultado o reporte sin necesidad de descargar
     */
    preview?: boolean;
    /**
     * Estado que habilita la descarga de un reporte medico.
     */
    downloadResult?: boolean;
    /**
     * Estado que habilita la descarga de un resultado medico.
     */
    downloadReport?: boolean;
    /**
     * Funcion que es invocada cuando se realiza un click.
     * @returns 
     */
    onClick?: () => void;
    /**
     * Funcion que es invocada cuando se llama al evento de asignacion de morbilidades
     * @returns 
     */
    onUploadResult?: () => void;
    /**
     * Funcion que es invocada cuando se llama al evento de carga de resultado medico.
     * @returns 
     */
    onCreateReport?: () => void;
    /**
     * Funcion que es invocada cuando se llama al evento de creacion de reporte medico.
     * @returns 
     */
    onDiseaseModification?: (value: MedicalResult) => void;
    /**
     * Estado que habilita la eliminacion de un archivo de resultado medico.
     */
    onDeleteResultFile?: () => void;
}
const MedicalResultActionMenu: React.FC<MedicalResultActionMenuProps> = ({
    data,
    preview,
    downloadReport,
    downloadResult,
    onDeleteResultFile,
    onDiseaseModification,
    onUploadResult,
    onCreateReport,
}) => {

    const [blob, setBlob] = useState<Blob | null>(null);
    const [previewBlob, setPreviewBlob] = useState<boolean>(false);

    const [openedDiseaseModal, {
        open: OpenDiseaseModal,
        close: CloseDiseaseModal
    }] = useDisclosure(false);

    const [fileRemove, {
        close: fileRemoveClose,
        open: fileRemoveOpen
    }] = useDisclosure(false);

    const { data: fileResultBlob,
        loading: fileResultLoading,
        error: fileResultError,
        reload: fileResultReload,
        reset: fileResultReset
    } = useFetch<Blob>(`/api/medical/file/result/${data.id}`, 'GET', { loadOnMount: false, type: 'blob' });

    const { data: fileReportBlob,
        loading: fileReportLoading,
        error: fileReportError,
        reload: fileReportReload,
        reset: fileReportReset
    } = useFetch<Blob>(`/api/medical/file/report/${data.report?.id || ''}`, 'GET', { loadOnMount: false, type: 'blob' });

    const {
        data: deleteResultFileData,
        error: deleteResultFileError,
        reload: deleteResultFileReload,
        reset: deleteResultFileReset,
    } = useFetch(`/api/medical/file/result/${data.id}`, 'DELETE', { loadOnMount: false });

    const [shouldDelete, setShouldDelete] = useState<boolean>(false);

    const handleClickEventFileResultDownload = useCallback(() => {
        setPreviewBlob(false);
        fileResultReload();
        notifications.show({ message: 'La descarga ha comenzado', color: 'green' });
    }, [fileResultReload]);

    const handleClickEventFileResultPreview = useCallback(() => {
        setPreviewBlob(true);
        fileResultReload();
    }, [fileResultReload]);

    const handleClickEventFileResultUpload = useCallback(() => {
        onUploadResult?.();
    }, [onUploadResult]);

    const handleClickEventFileReportDownload = useCallback(() => {
        setPreviewBlob(false);
        fileReportReload();
        notifications.show({ message: 'La descarga ha comenzado', color: 'green' });
    }, [fileReportReload]);

    const handleClickEventFileReportPreview = useCallback(() => {
        setPreviewBlob(true);
        fileReportReload();
    }, [fileReportReload]);

    const handleClickEventCreateReport = useCallback(() => {
        onCreateReport?.();
    }, [onCreateReport]);

    const handleResultFileEventDeleteFile = useCallback(() => {
        setShouldDelete(true);
    }, []);

    useEffect(() => {
        if (fileResultBlob || fileReportBlob) {
            if (previewBlob) {
                setBlob(fileResultBlob || fileReportBlob);
            } else {
                if (fileResultBlob) blobFile(fileResultBlob, `${data.examName}.pdf`);
                else if (fileReportBlob) blobFile(fileReportBlob, `${data.examName}.pdf`);
                notifications.show({ message: 'Descarga completa', color: 'green' });
            }
            fileResultReset();
            fileReportReset();
        }
    }, [fileResultBlob, fileReportBlob, fileResultReset, fileReportReset, data]);

    useEffect(() => {
        if (fileReportError) notifications.show({ message: fileReportError.message, color: 'red' });
        else if (fileResultError) notifications.show({ message: fileResultError.message, color: 'red' });
        else if (deleteResultFileError) {
            notifications.show({ message: deleteResultFileError.message, color: 'red' });
            fileRemoveClose();
        }
    }, [fileReportError, fileResultError, deleteResultFileError, fileRemoveClose]);

    useEffect(() => {
        if (shouldDelete) {
            fileRemoveOpen();
            deleteResultFileReload();
            setShouldDelete(false);
        }
    }, [shouldDelete, deleteResultFileReload, fileRemoveOpen]);

    useEffect(() => {
        if (deleteResultFileData) {
            deleteResultFileReset();
            fileRemoveClose();
            onDeleteResultFile?.();
        }
    }, [deleteResultFileData, deleteResultFileReset, onDeleteResultFile, fileRemoveClose]);

    const handleClickEventDiseaseModification = useCallback(() => {
        OpenDiseaseModal();
    }, [OpenDiseaseModal]);

    const handleExamModalCloseEvent = useCallback(() => {
        CloseDiseaseModal();
    }, [CloseDiseaseModal]);

    const handleMedicalOrderResultFormSubmittion = useCallback((newValue: MedicalResult) => {
        onDiseaseModification?.(newValue);
        handleExamModalCloseEvent();
    }, [onDiseaseModification, handleExamModalCloseEvent]);

    const handleModalEventCloseBlobPreview = useCallback(() => {
        setPreviewBlob(false);
        setBlob(null);
    }, []);

    return (
        <>
            <MedicalResultModalDiseases
                medicalResult={data}
                opened={openedDiseaseModal}
                onClose={handleExamModalCloseEvent}
                onFormSubmitted={handleMedicalOrderResultFormSubmittion} />
            <BlobPreview
                blob={blob}
                opened={previewBlob && !!blob}
                onClose={handleModalEventCloseBlobPreview} />
            <Menu>
                <MenuTarget>
                    <ActionIcon
                        variant="transparent"
                        loading={fileRemove || fileResultLoading || fileReportLoading}>
                        <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </MenuTarget>
                <Menu.Dropdown>
                    {(onDiseaseModification || onUploadResult || downloadResult) && <Menu.Label>Resultados medicos</Menu.Label>}
                    {onDiseaseModification && (
                        <Menu.Item
                            onClick={handleClickEventDiseaseModification}
                            leftSection={
                                <IconVirus style={{ width: rem(16), height: rem(16) }} />}
                        >
                            Modificar morbilidades
                        </Menu.Item>

                    )}
                    {downloadResult && (
                        <Menu.Item onClick={handleClickEventFileResultDownload} leftSection={(
                            <IconDownload style={{ width: rem(16), height: rem(16) }} />
                        )}>
                            Descargar resultado
                        </Menu.Item>
                    )}
                    {downloadResult && preview && (
                        <Menu.Item onClick={handleClickEventFileResultPreview} leftSection={(
                            <IconEye style={{ width: rem(16), height: rem(16) }} />
                        )}>
                            Visualizar resultado
                        </Menu.Item>
                    )}
                    {(onUploadResult) && (
                        <Menu.Item onClick={handleClickEventFileResultUpload} leftSection={<IconUpload style={{ width: rem(16), height: rem(16) }} />}>
                            Subir resultado
                        </Menu.Item>
                    )}
                    {(onDeleteResultFile) && (
                        <Menu.Item
                            onClick={handleResultFileEventDeleteFile}
                            leftSection={
                                <IconTrash style={{ width: rem(16), height: rem(16) }} />
                            }>
                            Eliminar Archivo
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
                        <Menu.Item onClick={handleClickEventFileReportDownload} leftSection={(
                            <IconDownload style={{ width: rem(16), height: rem(16) }} />
                        )}>
                            Descargar reporte
                        </Menu.Item>
                    )}
                    {downloadReport && preview && (
                        <Menu.Item onClick={handleClickEventFileReportPreview} leftSection={(
                            <IconEye style={{ width: rem(16), height: rem(16) }} />
                        )}>
                            Visualizar reporte
                        </Menu.Item>
                    )}
                </Menu.Dropdown>
            </Menu>
        </>
    )
}

export { MedicalResultActionMenu };
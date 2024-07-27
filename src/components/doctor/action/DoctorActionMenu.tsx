import BlobPreview from '@/components/blob/preview/BlobPreview';
import { useFetch } from '@/hooks/useFetch';
import { Doctor } from '@/lib/dtos/user/doctor/base.response.dto';
import { ActionIcon, Menu, MenuTarget, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconBuilding, IconDotsVertical, IconEye, IconLock, IconUpload } from '@tabler/icons-react'
import React, { useCallback, useEffect, useState } from 'react'
import { blob } from 'stream/consumers';

type DoctorActionMenuProps = {
    doctor: Doctor
    /**
     * Variable que habilida el visualizador de imagenes
     */
    hasFile?: boolean;
    /**
     * Variable que habilita la opcion de asignacion de credenciales.
     */
    createCredential?: boolean;
    /**
     * Funcion que es llamada cuando se llama al evento de carga de firma.
     * @returns 
     */
    onUploadSignature: () => void;
    /**
     * Funcion que es llamada cuando se llama al evento de asignacion de empresa.
     * @returns 
     */
    onAssignCompany: () => void;
    /**
     * Funcion que es llamada cuando se llama al evento de creacion de credenciales.
     * @returns 
     */
    onCreateCredential?: () => void;
}
const DoctorActionMenu: React.FC<DoctorActionMenuProps> = ({
    doctor,
    createCredential,
    hasFile,
    onCreateCredential,
    onUploadSignature,
    onAssignCompany
}) => {
    if (createCredential && !onCreateCredential) {
        throw new Error('Set a onCreateCredential event');
    }

    const [blob, setBlob] = useState<Blob | null>(null);

    const [previewBlob, {
        open: OpenPreviewModal,
        close: ClosePreviewModal
    }] = useDisclosure(false);

    const { data: fileSignatureBlob,
        loading: fileSignatureLoading,
        error: fileSignatureError,
        reload: fileSignatureReload,
        reset: fileSignatureReset
    } = useFetch<Blob>(`/api/doctors/signature/${doctor.id}`, 'GET', { loadOnMount: false, type: 'blob' });

    const handleModalEventCloseBlobPreview = useCallback(() => {
        ClosePreviewModal();
        setBlob(null);
    }, []);

    const handleClickEventFileSignaturePreview = useCallback(() => {
        OpenPreviewModal();
        fileSignatureReload();
    }, [OpenPreviewModal]);

    useEffect(() => {
        if (fileSignatureBlob) {
            setBlob(fileSignatureBlob);
            fileSignatureReset();
        }
    }, [fileSignatureBlob, fileSignatureReset]);

    useEffect(() => {
        if (fileSignatureError) notifications.show({ message: fileSignatureError.message, color: 'red' });
    }, [fileSignatureError]);

    return (
        <>
            <BlobPreview
                blob={blob}
                opened={previewBlob && !!blob}
                onClose={handleModalEventCloseBlobPreview} />
            <Menu>
                <MenuTarget>
                    <ActionIcon variant="transparent" loading={fileSignatureLoading}>
                        <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </MenuTarget>
                <Menu.Dropdown>
                    <Menu.Label>Aplicacion</Menu.Label>
                    {createCredential && <Menu.Item
                        leftSection={<IconLock style={{ width: rem(14), height: rem(14) }} />}
                        onClick={onCreateCredential}>
                        Asignar credenciales
                    </Menu.Item>}
                    {hasFile && <Menu.Item
                        onClick={handleClickEventFileSignaturePreview}
                        leftSection={(
                            <IconEye style={{ width: rem(14), height: rem(14) }} />
                        )}>
                        Visualizar firma
                    </Menu.Item>}
                    <Menu.Item
                        leftSection={<IconUpload style={{ width: rem(14), height: rem(14) }} />}
                        onClick={onUploadSignature}>
                        Cargar firma
                    </Menu.Item>
                    <Menu.Item
                        leftSection={<IconBuilding style={{ width: rem(16), height: rem(16) }} />}
                        onClick={onAssignCompany}>
                        Asignar Empresa
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}

export { DoctorActionMenu }
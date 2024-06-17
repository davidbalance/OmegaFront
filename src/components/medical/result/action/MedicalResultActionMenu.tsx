import { useFetch } from '@/hooks/useFetch/useFetch';
import { MedicalResult } from '@/lib/dtos/medical/result/response.dto';
import { blobFile } from '@/lib/utils/blob-to-file';
import { Menu, MenuTarget, Loader, ActionIcon, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconX, IconDotsVertical, IconEdit, IconDownload } from '@tabler/icons-react';
import React, { useCallback, useEffect, useState } from 'react'

type MedicalResultWithoutOrder = Omit<MedicalResult, 'order'>;
interface MedicalResultActionMenuProps {
    data: MedicalResultWithoutOrder;
    onModification?: () => void;
}
const MedicalResultActionMenu: React.FC<MedicalResultActionMenuProps> = ({ data, onModification }) => {

    const [disclosure, { close, open }] = useDisclosure(false)
    const { data: fileBlob, loading: fileLoading, error: fileError, reload: fileReload, request: fileRequest } = useFetch<Blob>(`/api/exams/file`, 'POST', { loadOnMount: false, type: 'blob' });
    const [shouldDownloadFile, setShouldDownloadFile] = useState<boolean>(false);

    const handleClick = useCallback(() => open(), []);

    const handleClickEventModification = useCallback(() => {
        onModification?.();
    }, []);

    const handleClickEventDownload = useCallback(() => {
        fileRequest<{ type: 'report' | 'result', id: number }>({ type: 'result', id: data.id });
        setShouldDownloadFile(true);
    }, [fileRequest]);

    useEffect(() => {
        if (fileBlob) {
            blobFile(fileBlob, `${data.examName}.pdf`);
            notifications.show({ message: 'La descarga ha comenzado' })
        }
    }, [fileBlob, data]);

    useEffect(() => {
        if (fileError) {
            notifications.show({ message: fileError.message, color: 'red' });
        }
    }, [fileError]);

    useEffect(() => {
        if (shouldDownloadFile) {
            fileReload();
            setShouldDownloadFile(false);
        }
    }, [shouldDownloadFile])

    return (
        <Menu onClose={close} disabled={fileLoading}>
            <MenuTarget>
                {
                    fileLoading
                        ? <Loader size='xs' />
                        : <ActionIcon variant="transparent" onClick={handleClick}>
                            {disclosure ? <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} /> : <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />}
                        </ActionIcon>
                }
            </MenuTarget>
            <Menu.Dropdown>
                {onModification && <Menu.Item onClick={handleClickEventModification} leftSection={<IconEdit style={{ width: rem(16), height: rem(16) }} />}>
                    Modificar
                </Menu.Item>}
                <Menu.Item onClick={handleClickEventDownload} leftSection={<IconDownload style={{ width: rem(16), height: rem(16) }} />}>
                    Descargar resultado
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export { MedicalResultActionMenu };
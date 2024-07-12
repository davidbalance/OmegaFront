import { ListRowElement } from '@/components/layout/list-layout/ListRowElement'
import { useFetch } from '@/hooks/useFetch';
import { MedicalResultDisease } from '@/lib/dtos/medical/result/response.dto';
import { ActionIcon, rem, Text, Title, Tooltip } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import React, { useCallback, useEffect, useState } from 'react'

interface MedicalResultListElementProps {
    active: boolean;
    onClick: () => void;
    onDelete: (id: number) => void;
    medicalResult: number;
    disease: MedicalResultDisease;
}
const MedicalResultListElement: React.FC<MedicalResultListElementProps> = ({ active, medicalResult, disease, onClick, onDelete }) => {

    const {
        data: diseaseDELETEData,
        error: diseaseDELETEError,
        loading: diseaseDELETELoading,
        reload: diseaseDELETEReload,
        reset: diseaseDELETEReset,
    } = useFetch<any>(`/api/medical/results/${medicalResult}/diseases/${disease.id}`, 'DELETE', { loadOnMount: false });

    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const handleClickEventDelete = useCallback(() => {
        setShouldSendRequest(true);
    }, [])

    const handleClickEvent = useCallback(() => {
        onClick();
    }, [onClick]);

    useEffect(() => {
        if (diseaseDELETEError) notifications.show({ message: diseaseDELETEError.message, color: 'red' });
    }, [diseaseDELETEError]);

    useEffect(() => {
        if (shouldSendRequest) {
            diseaseDELETEReload();
            setShouldSendRequest(false);
        }
    }, [shouldSendRequest, diseaseDELETEReload]);

    useEffect(() => {
        if (diseaseDELETEData) {
            diseaseDELETEReset();
            onDelete(disease.id);
        }
    }, [diseaseDELETEData, onDelete]);

    return (
        <ListRowElement
            active={active}
            onClick={handleClickEvent}
            rightSection={(
                <Tooltip
                    label='Eliminar'
                    withArrow disabled={diseaseDELETELoading}>
                    <ActionIcon
                        variant='light' loading={diseaseDELETELoading}
                        onClick={handleClickEventDelete}>
                        <IconTrash style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                </Tooltip>
            )}>
            <Title order={6}>{disease.diseaseName}</Title>
            <Text size='xs'>{disease.diseaseGroupName}</Text>
        </ListRowElement>
    )
}

export default MedicalResultListElement
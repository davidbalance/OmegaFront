'use client'

import { ActionIcon, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback, useState } from 'react'
import { useSelect } from '../_context/select.context';
import { MedicalResultDisease } from '@/lib/dtos/medical/result/disease/base.response.dto';
import { notifications } from '@mantine/notifications';
import { deleteMedicalDisease } from '@/server/medical-disease.actions';

interface DiseaseDeleteButtonProps {
    id: number;
}
const DiseaseDeleteButton: React.FC<DiseaseDeleteButtonProps> = ({
    id
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const { value, clear } = useSelect<MedicalResultDisease>();

    const handleClick = useCallback(async () => {
        setLoading(true);
        try {
            await deleteMedicalDisease(id);
            if (value && value.id === id) {
                clear();
            }
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [id, value])

    return (
        <ActionIcon
            loading={loading}
            onClick={handleClick}>
            <IconTrash style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
    )
}

export default DiseaseDeleteButton
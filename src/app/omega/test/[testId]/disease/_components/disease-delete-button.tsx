'use client'

import { ActionIcon, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback, useState } from 'react'
import { useSelect } from '../_context/select.context';
import { notifications } from '@mantine/notifications';
import { MedicalDisease } from '@/server/medical_test/server_types';
import { removeMedicalResultDisease } from '@/server/medical_test/actions';

interface DiseaseDeleteButtonProps {
    diseaseReportId: string;
    testId: string;
}
const DiseaseDeleteButton: React.FC<DiseaseDeleteButtonProps> = ({
    diseaseReportId,
    testId
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const { value, clear } = useSelect<MedicalDisease>();

    const handleClick = useCallback(async () => {
        setLoading(true);
        try {
            await removeMedicalResultDisease({
                diseaseReportId,
                testId
            });
            if (value && value.diseaseReportId === diseaseReportId) {
                clear();
            }
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [testId, diseaseReportId, value, clear])

    return (
        <ActionIcon
            loading={loading}
            onClick={handleClick}>
            <IconTrash style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
    )
}

export default DiseaseDeleteButton
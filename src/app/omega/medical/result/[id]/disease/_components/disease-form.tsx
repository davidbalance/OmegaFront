'use client'

import LoadingOverlay from '@/components/_base/loading-overlay'
import { DiseaseGroupOption } from '@/lib/dtos/disease/group/base.response.dto';
import { MedicalResultDisease } from '@/lib/dtos/medical/result/disease/base.response.dto';
import { Box, Button, rem, Stack } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { FormEvent, useCallback, useRef, useState } from 'react'
import { useSelect } from '../_context/select.context';
import { createMedicalDisease, updateMedicalDisease } from '@/server/medical-disease.actions';
import { MedicalResultFormDisease } from '@/components/medical-result-form-disease';

interface MedicalResultDiseaseFormProps {
    id: number;
    options: DiseaseGroupOption[];
}
const MedicalResultDiseaseForm: React.FC<MedicalResultDiseaseFormProps> = ({
    id,
    options
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    const { value, clear } = useSelect<MedicalResultDisease>();

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const currentValue: Record<string, string> = {};
        formData.forEach((value, key) => {
            currentValue[key] = value as string;
        });

        const newValue = {
            diseaseId: Number(currentValue.diseaseId),
            diseaseName: currentValue.diseaseName,
            diseaseGroupId: Number(currentValue.diseaseGroupId),
            diseaseGroupName: currentValue.diseaseGroupName,
            diseaseCommentary: currentValue.diseaseCommentary,
        };

        try {
            if (value) {
                await updateMedicalDisease(value.id, newValue);
            } else {
                await createMedicalDisease(id, newValue);
            }
            clear();
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [id, value]);

    const handleClick = () => {
        if (formRef.current) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formRef.current.dispatchEvent(submitEvent);
        }
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <Stack h='100%' justify='space-between'>
                <Box flex={1}>
                    <MedicalResultFormDisease
                        value={value}
                        ref={formRef}
                        onSubmit={handleSubmit}
                        options={options} />
                </Box>
                <Button
                    size='xs'
                    fullWidth
                    onClick={handleClick}
                    leftSection={(
                        <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </Stack>
        </>
    )
}

export default MedicalResultDiseaseForm
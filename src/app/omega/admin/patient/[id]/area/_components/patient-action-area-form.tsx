'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import MedicalClientAreaForm from '@/components/medical-client-form-change-area';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { ManagementOption } from '@/lib/dtos/location/management/base.response.dto';
import { updateMedicalClientManagement } from '@/server/medical-client.actions';
import { Box, rem, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useRef, useState } from 'react'

interface PatientActionAreaFormProps {
    dni: string;
    options: ManagementOption[];
    area?: number;
    management?: number;
}
const PatientActionAreaForm: React.FC<PatientActionAreaFormProps> = ({
    dni,
    ...props
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const currentValue: Record<string, string> = {};
        formData.forEach((value, key) => {
            currentValue[key] = value as string;
        });

        try {
            const areaId: number = Number(currentValue.areaId);
            const managementId: number = Number(currentValue.managementId);
            await updateMedicalClientManagement(dni, { ...currentValue as any, areaId, managementId });
            router.back();
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [dni]);

    const handleClick = () => {
        if (formRef.current) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formRef.current.dispatchEvent(submitEvent);
        }
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <ModularBox flex={1} align='center'>
                <Box w='100%'>
                    <MedicalClientAreaForm
                        ref={formRef}
                        onSubmit={handleSubmit}
                        {...props} />
                </Box>
            </ModularBox>

            <ModularBox direction='row'>
                <Button
                    flex={1}
                    size='xs'
                    onClick={handleClick}
                    leftSection={
                        <IconDeviceFloppy
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />}>
                    Guardar
                </Button>
            </ModularBox>
        </>
    )
}

export default PatientActionAreaForm
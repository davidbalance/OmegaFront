'use client'

import { ModularBox } from '@/components/modular/box/ModularBox';
import { UserFormJobPosition } from '@/components/user/form/user-form-job-position';
import { JobPosition } from '@/lib/dtos/location/job/position/base.response.dto';
import { updateMedicalClientJobPosition } from '@/server/medical-client.actions';
import { LoadingOverlay, Box, rem, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useRef, useState } from 'react'

interface PatientJobPositionFormProps {
    dni: string;
    value?: string;
    options: JobPosition[]
}
const PatientJobPositionForm: React.FC<PatientJobPositionFormProps> = ({
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
            await updateMedicalClientJobPosition(dni, { jobPositionName: currentValue.name });
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
                    <UserFormJobPosition
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

export default PatientJobPositionForm
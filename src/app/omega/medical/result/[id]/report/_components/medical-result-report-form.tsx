'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import MedicalReportForm from '@/components/medical-report-form';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { MedicalReport } from '@/lib/dtos/medical/report/base.respoonse.dto';
import { createMedicalReport } from '@/server/medical-report.actions';
import { rem, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useRef, useState } from 'react'

interface MedicalResultReportFormProps extends Partial<Pick<MedicalReport, 'content'>> {
    medicalResult: number;
}
const MedicalResultReportForm: React.FC<MedicalResultReportFormProps> = ({
    medicalResult,
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
            await createMedicalReport({ ...currentValue as any, medicalResult: Number(medicalResult) });
            router.back();
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [router, medicalResult]);

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
                <MedicalReportForm
                    ref={formRef}
                    onSubmit={handleSubmit}
                    {...props} />
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

export default MedicalResultReportForm
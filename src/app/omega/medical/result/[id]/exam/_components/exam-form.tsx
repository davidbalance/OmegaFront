'use client'

import MedicalResultFormExam from '@/components/medical-result-form-exam';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { ExamTypeOption } from '@/lib/dtos/laboratory/exam/type/base.response.dto';
import { updateMedicalResult } from '@/server/medical-result.actions';
import { Button, LoadingOverlay, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useRef, useState } from 'react'

interface ExamFormProps {
    id: number;
    options: ExamTypeOption[];
    value?: {
        examType: string;
        examSubtype: string;
        examName: string;
    }
}
const ExamForm: React.FC<ExamFormProps> = ({
    id,
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
            await updateMedicalResult(id, currentValue as any);
            router.back();
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [id, router]);

    const handleClick = () => {
        if (formRef.current) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formRef.current.dispatchEvent(submitEvent);
        }
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <ModularBox flex={1}>
                <MedicalResultFormExam
                    ref={formRef}
                    onSubmit={handleSubmit}
                    {...props} />
            </ModularBox>

            <ModularBox>
                <Button
                    fullWidth
                    flex={1}
                    size='xs'
                    onClick={handleClick}
                    leftSection={(
                        <IconDeviceFloppy
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </ModularBox>
        </>
    )
}

export default ExamForm
'use client'

import ExamSubtypeForm from '@/components/exam/form/ExamSubtypeForm';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Exam } from '@/lib/dtos/laboratory/exam/base.response.dto';
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto';
import { parseForm } from '@/lib/utils/form-parse';
import { updateExam } from '@/server/exam.actions';
import { LoadingOverlay, Button, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useRef, useState } from 'react'

interface FormProps extends Pick<Exam, 'subtype' | 'id'> {
    options: ExamType[];
}
const Form: React.FC<FormProps> = ({
    id,
    ...props
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const values: any = parseForm(event.currentTarget);
        setLoading(true);
        try {
            await updateExam(id, { subtype: Number(values.subtype) });
            router.back();
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

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
                <ExamSubtypeForm
                    onSubmit={handleSubmit}
                    ref={formRef}
                    {...props} />
            </ModularBox>
            <ModularBox direction='row'>
                <Button
                    flex={1}
                    size='xs'
                    onClick={handleClick}
                    leftSection={(
                        <IconDeviceFloppy
                            style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </ModularBox>
        </>)
}

export default Form
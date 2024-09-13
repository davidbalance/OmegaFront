'use client'

import Form from '@/components/disease-form-group';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { DiseaseGroupOption } from '@/lib/dtos/disease/group/base.response.dto';
import { parseForm } from '@/lib/utils/form-parse';
import { updateDisease } from '@/server/disease.actions';
import { LoadingOverlay, Button, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useRef, useState } from 'react'

interface FormProps {
    id: number;
    group: number;
    options: DiseaseGroupOption[]
}
const DiseaseGroupForm: React.FC<FormProps> = ({
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
            await updateDisease(id, { group: Number(values.group) });
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
                <Form
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
                            style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </ModularBox>
        </>
    )
}

export default DiseaseGroupForm
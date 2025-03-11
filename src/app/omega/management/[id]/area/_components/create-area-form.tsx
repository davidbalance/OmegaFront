'use client'

import AreaForm from '@/components/area/area-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { createArea } from '@/server/area/actions';
import { CreateAreaPayload } from '@/server/area/server_types';
import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react'

const CreateAreaForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (value: CreateAreaPayload) => {
            setLoading(true);
            try {
                await createArea({ ...value });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [router]);

    const handleClick = () => {
        if (formRef.current) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formRef.current.dispatchEvent(submitEvent);
        }
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <AreaForm
                onSubmit={(e) => handleSubmit({ name: e.areaName })} />
        </>
    )
}

export default CreateAreaForm
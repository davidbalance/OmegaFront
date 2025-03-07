'use client'

import AreaForm from '@/components/area/area-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { createArea } from '@/server/area/actions';
import { CreateAreaPayload } from '@/server/area/server_types';
import { createManagement } from '@/server/management/actions';
import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreateAreaForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (payload: CreateAreaPayload) => {
        setLoading(true);
        try {
            await createArea(payload);
            router.back();
        } catch (error: any) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <AreaForm
                onSubmit={e => handleSubmit({ name: e.areaName })}
                loading={loading} />
        </>
    )
}

export default CreateAreaForm
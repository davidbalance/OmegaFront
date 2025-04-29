'use client'

import ManagementForm from '@/components/management/management-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { createManagement } from '@/server';
import { CreateManagementPayload } from '@/server/management/server-types';
import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreateManagementForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (payload: CreateManagementPayload) => {
        setLoading(true);
        try {
            await createManagement(payload);
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
            <ManagementForm
                onSubmit={e => handleSubmit({ name: e.managementName })}
                loading={loading} />
        </>
    )
}

export default CreateManagementForm
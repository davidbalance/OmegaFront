'use client'

import ManagementForm from '@/components/management/management-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { editManagement } from '@/server';
import { EditManagementPayload, Management } from '@/server/management/server-types';
import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type EditManagementFormProps = Management;
const EditManagementForm: React.FC<EditManagementFormProps> = ({
    managementId,
    managementName
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (payload: Omit<EditManagementPayload, 'managementId'>) => {
            setLoading(true);
            try {
                await editManagement({ ...payload, managementId });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [managementId, router])

    return (
        <>
            <LoadingOverlay visible={loading} />
            <ManagementForm
                managementName={managementName}
                onSubmit={handleSubmit}
                loading={loading} />
        </>
    )
}

export default EditManagementForm
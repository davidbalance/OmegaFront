'use client'

import LoadingOverlay from '@/components/_base/loading-overlay'
import ResourceForm from '@/components/developer/pages/resource_form'
import { getErrorMessage } from '@/lib/utils/errors'
import { createResource } from '@/server/resource/actions'
import { CreateResourcePayload } from '@/server/resource/server_types'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateResourceForm: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (value: CreateResourcePayload) => {
        setLoading(true);
        try {
            await createResource(value);
            router.back();
        } catch (error) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <ResourceForm
                loading={loading}
                useOrder
                onSubmit={handleSubmit} />
        </>
    )
}

export default CreateResourceForm
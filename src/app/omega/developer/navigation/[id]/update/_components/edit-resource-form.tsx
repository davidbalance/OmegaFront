'use client'

import LoadingOverlay from '@/components/_base/loading-overlay'
import ResourceForm from '@/components/developer/pages/resource-form'
import { getErrorMessage } from '@/lib/utils/errors'
import { editResource } from '@/server'
import { EditResourcePayload, Resource } from '@/server/resource/server-types'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type EditResourceFormProps = Resource;
const EditResourceForm: React.FC<EditResourceFormProps> = ({
    resourceId,
    resourceIcon,
    resourceAddress,
    resourceLabel
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (value: Omit<EditResourcePayload, 'resourceId'>) => {
        setLoading(true);
        try {
            await editResource({ ...value, resourceId });
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
                address={resourceAddress}
                icon={resourceIcon}
                label={resourceLabel}
                onSubmit={handleSubmit} />
        </>
    )
}

export default EditResourceForm
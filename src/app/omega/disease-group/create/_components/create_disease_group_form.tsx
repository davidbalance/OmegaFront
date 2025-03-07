'use client'

import LoadingOverlay from '@/components/_base/loading-overlay'
import DiseaseGroupForm from '@/components/disease_group/disease-group-form'
import { getErrorMessage } from '@/lib/utils/errors'
import { createDiseaseGroup } from '@/server/disease_group/actions'
import { CreateDiseaseGroupPayload } from '@/server/disease_group/server_types'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateDiseaseGroupForm: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (payload: CreateDiseaseGroupPayload) => {
        setLoading(true);
        try {
            await createDiseaseGroup(payload);
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
            <DiseaseGroupForm
                onSubmit={e => handleSubmit({ name: e.groupName })}
                loading={loading} />
        </>
    )
}

export default CreateDiseaseGroupForm
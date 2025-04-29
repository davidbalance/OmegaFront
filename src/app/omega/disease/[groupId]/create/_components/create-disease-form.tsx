'use client'

import DiseaseForm from '@/components/disease/disease-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { createDisease } from '@/server';
import { CreateDiseasePayload } from '@/server/disease/server-types';
import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface CreateDiseaseFormProps {
    groupId: string;
}
const CreateDiseaseForm: React.FC<CreateDiseaseFormProps> = ({
    groupId
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (payload: Omit<CreateDiseasePayload, 'groupId'>) => {
        setLoading(true);
        try {
            await createDisease({ ...payload, groupId });
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
            <DiseaseForm
                onSubmit={handleSubmit}
                loading={loading} />
        </>
    )
}

export default CreateDiseaseForm
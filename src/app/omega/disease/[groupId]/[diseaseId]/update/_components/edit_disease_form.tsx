'use client'

import DiseaseForm from '@/components/disease/disease-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { editDisease } from '@/server';
import { Disease, EditDiseasePayload } from '@/server/disease/server-types';
import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type EditDiseaseFormProps = Disease & {
    groupId: string;
};
const EditDiseaseForm: React.FC<EditDiseaseFormProps> = ({
    groupId,
    diseaseId,
    diseaseName
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (payload: Omit<EditDiseasePayload, 'diseaseId' | 'groupId'>) => {
            setLoading(true);
            try {
                await editDisease({ ...payload, groupId, diseaseId });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [diseaseId, groupId, router]);

    return (
        <>
            <LoadingOverlay visible={loading} />
            <DiseaseForm
                diseaseName={diseaseName}
                onSubmit={handleSubmit}
                loading={loading} />
        </>
    )
}

export default EditDiseaseForm;
'use client'

import ExamSubtypeForm from '@/components/exam_subtype/exam-subtype-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { createExamSubtype } from '@/server/exam_subtype/actions';
import { CreateExamSubtypePayload } from '@/server/exam_subtype/server_types';
import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type CreateSubtypeFormProps = {
    typeId: string;
}
const CreateSubtypeForm: React.FC<CreateSubtypeFormProps> = ({
    typeId
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (payload: Omit<CreateExamSubtypePayload, 'typeId'>) => {
            setLoading(true);
            try {
                await createExamSubtype({ ...payload, typeId });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [typeId, router]);

    return (
        <>
            <LoadingOverlay visible={loading} />
            <ExamSubtypeForm
                onSubmit={handleSubmit}
                loading={loading} />
        </>)
}

export default CreateSubtypeForm
'use client'

import ExamForm from '@/components/exam/exam-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { createExam } from '@/server';
import { CreateExamPayload } from '@/server/exam/server-types';
import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type CreateExamFormProps = {
    typeId: string;
    subtypeId: string;

}
const CreateExamForm: React.FC<CreateExamFormProps> = ({
    typeId,
    subtypeId
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (payload: Omit<CreateExamPayload, 'typeId' | 'subtypeId'>) => {
            setLoading(true);
            try {
                await createExam({ ...payload, typeId, subtypeId });
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
            <ExamForm
                onSubmit={handleSubmit}
                loading={loading} />
        </>)
}

export default CreateExamForm
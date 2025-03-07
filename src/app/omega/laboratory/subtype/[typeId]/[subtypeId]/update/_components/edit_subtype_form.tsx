'use client'

import ExamSubtypeForm from '@/components/exam_subtype/exam-subtype-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { editExamSubtype } from '@/server/exam_subtype/actions';
import { EditExamSubtypePayload, ExamSubtype } from '@/server/exam_subtype/server_types';
import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type EditSubtypeFormProps = Omit<ExamSubtype, 'hasExams'> & {
    typeId: string;
}
const EditSubtypeForm: React.FC<EditSubtypeFormProps> = ({
    typeId,
    subtypeId,
    subtypeName
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (payload: Omit<EditExamSubtypePayload, 'typeId' | 'subtypeId'>) => {
            setLoading(true);
            try {
                await editExamSubtype({ ...payload, typeId, subtypeId });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [typeId, subtypeId, router]);

    return (
        <>
            <LoadingOverlay visible={loading} />
            <ExamSubtypeForm
                subtypeName={subtypeName}
                onSubmit={handleSubmit}
                loading={loading} />
        </>)
}

export default EditSubtypeForm
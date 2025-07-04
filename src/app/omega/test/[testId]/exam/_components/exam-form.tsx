'use client'

import ExamSelect from '@/components/exam-select';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { getErrorMessage } from '@/lib/utils/errors';
import { ExamTypeOption } from '@/server/exam-type/server-types';
import { editMedicalTestExam } from '@/server';
import { EditMedicalTestExamPayload } from '@/server/medical-test/server-types';
import { Button, Flex, LoadingOverlay, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type ExamFormValue = Omit<EditMedicalTestExamPayload, 'testId'>;
const mappedKeys: Record<string, keyof ExamFormValue> = {
    typeId: 'examType',
    subtypeId: 'examSubtype',
    examId: 'examName',
}
interface ExamFormProps {
    testId: string;
    examTypeValue?: { name: string; value: string };
    examSubtypeValue?: { name: string; value: string };
    examValue?: { name: string; value: string };
    options: ExamTypeOption[];
}
const ExamForm: React.FC<ExamFormProps> = ({
    testId,
    examTypeValue,
    examSubtypeValue,
    examValue,
    options
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const [formValue, setFormValue] = useState<ExamFormValue>({
        examType: examTypeValue?.name || '',
        examSubtype: examSubtypeValue?.name || '',
        examName: examValue?.name || '',
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);
            try {
                await editMedicalTestExam({ testId, ...formValue });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [testId, router, formValue]);

    return (
        <form onSubmit={handleSubmit}>
            <LoadingOverlay visible={loading} />
            <ModularLayout>
                <ModularBox>
                    <Flex direction='column' gap={rem(8)}>
                        <ExamSelect
                            options={options}
                            examSubtypeValue={examSubtypeValue?.value}
                            examTypeValue={examTypeValue?.value}
                            examValue={examValue?.value}
                            useExam
                            useSubtype
                            onChange={(selectedValues) => {
                                setFormValue((prev) => {
                                    const updatedForm: any = { ...prev };
                                    selectedValues.forEach(({ name, label }) => {
                                        const key = mappedKeys[name] as any;
                                        if (key) {
                                            updatedForm[key] = label;
                                        }
                                    });
                                    return updatedForm;
                                });
                            }} />
                    </Flex>
                </ModularBox>

                <ModularBox>
                    <Button
                        fullWidth
                        flex={1}
                        size='xs'
                        type='submit'
                        leftSection={(
                            <IconDeviceFloppy
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5} />
                        )}>
                        Guardar
                    </Button>
                </ModularBox>
            </ModularLayout>
        </form>
    )
}

export default ExamForm
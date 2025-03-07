'use client'

import React, { useCallback, useState } from 'react'
import { ExamTypeOption } from '@/server/exam_type/server_types';
import { CreateMedicalTestPayload, MedicalTest } from '@/server/medical_test/server_types';
import ExamSelect from '@/components/exam-select';
import ExamSchema from '../_schema/exam.schema';
import { notifications } from '@mantine/notifications';
import { createMedicalTest } from '@/server/medical_test/actions';
import { getErrorMessage } from '@/lib/utils/errors';
import { Button, Flex, rem } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';

export type TestFormValue = Omit<CreateMedicalTestPayload, 'orderId'>;
type LaboratoryFormProps = {
    tests?: MedicalTest[];
    options: ExamTypeOption[];
    orderId: string;
}
const LaboratoryForm: React.FC<LaboratoryFormProps> = ({
    options,
    orderId,
    tests = []
}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const [formValue, setFormValue] = useState<TestFormValue>({
        examName: '',
        examSubtype: '',
        examType: ''
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        async (event) => {
            event.preventDefault();
            const safeValue = ExamSchema.safeParse(formValue);
            if (safeValue.error) {
                notifications.show({ message: JSON.stringify(safeValue.error.errors), color: 'red' });
                return;
            }

            if (tests.some(e => e.examName === safeValue.data.examName
                && e.examSubtype === safeValue.data.examSubtype
                && e.examType === safeValue.data.examType)) {
                notifications.show({ message: 'Prueba existente.', color: 'red' });
                return;
            }

            setLoading(true);
            try {
                await createMedicalTest({ ...safeValue.data, orderId });
            } catch (error) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [orderId, tests, formValue]);

    return (
        <form onSubmit={handleSubmit}>
            <Flex
                gap={rem(8)}
                direction='column'>
                <ExamSelect
                    options={options}
                    useExam
                    useSubtype
                    onChange={(selectedValues) => {
                        setFormValue((prev) => {
                            const updatedForm: any = { ...prev };
                            selectedValues.forEach(({ name, label }) => {
                                if (name === 'examId') {
                                    updatedForm.examName = label;
                                }
                                else if (name === 'subtypeId') {
                                    updatedForm.examSubtype = label;
                                }
                                else if (name === 'typeId') {
                                    updatedForm.examType = label;
                                }
                            });
                            return updatedForm;
                        });
                    }} />
                <Button
                    mt={rem(8)}
                    size='xs'
                    fullWidth
                    type='submit'
                    loading={loading}
                    leftSection={(
                        <IconDeviceFloppy style={{
                            width: rem(16),
                            height: rem(16)
                        }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </Flex>
        </form>
    )
}

export default LaboratoryForm
'use client'

import ExamSelect from '@/components/exam-select';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { getErrorMessage } from '@/lib/utils/errors';
import { moveExamSubtype } from '@/server/exam_subtype/actions';
import { MoveExamSubtypePayload } from '@/server/exam_subtype/server_types';
import { ExamTypeOption } from '@/server/exam_type/server_types';
import { Button, rem, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type MoveSubtypeFormValue = Pick<MoveExamSubtypePayload, 'toTypeId'>;
type MoveSubtypeFormProps = {
    options: ExamTypeOption[];
    fromTypeId: string;
    subtypeId: string;
}
const MoveSubtypeForm: React.FC<MoveSubtypeFormProps> = ({
    fromTypeId,
    subtypeId,
    options
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const [formValue, setFormValue] = useState<MoveSubtypeFormValue>({
        toTypeId: fromTypeId,
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);
            if (formValue.toTypeId === fromTypeId) {
                notifications.show({ message: 'No se ha cambiado el tipo del examen.', color: 'red' });
                setLoading(false);
                return;
            }
            try {
                await moveExamSubtype({ ...formValue, typeId: fromTypeId, subtypeId: subtypeId });
                router.back();
            } catch (error) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [router, formValue, fromTypeId, subtypeId]);

    return (
        <form onSubmit={handleSubmit}>
            <ModularLayout>
                <ModularBox flex={1}>
                    <Stack component='div' gap={rem(8)}>
                        <ExamSelect
                            options={options}
                            examTypeValue={formValue.toTypeId}
                            onChange={(selectedValues) => {
                                setFormValue((prev) => {
                                    const updatedForm: any = { ...prev };
                                    selectedValues.forEach(({ name, value }) => {
                                        if (name === 'typeId') updatedForm.toTypeId = value;
                                    });
                                    return updatedForm;
                                });
                            }}
                        />
                    </Stack>
                </ModularBox>
                <ModularBox>
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
                </ModularBox>
            </ModularLayout>
        </form>
    )
}

export default MoveSubtypeForm
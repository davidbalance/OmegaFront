'use client'

import DiseaseSelect from '@/components/disease-select';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { getErrorMessage } from '@/lib/utils/errors';
import { moveDiseaseToGroup } from '@/server';
import { MoveDiseasePayload } from '@/server/disease/server-types';
import { DiseaseGroupOption } from '@/server/disease-group/server-types';
import { Button, rem, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type MoveDiseaseFormValue = Pick<MoveDiseasePayload, 'toGroupId'>;
type MoveDiseaseFormProps = {
    options: DiseaseGroupOption[];
    fromGroupId: string;
    diseaseId: string;
}
const MoveDiseaseForm: React.FC<MoveDiseaseFormProps> = ({
    diseaseId,
    fromGroupId,
    options
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const [formValue, setFormValue] = useState<MoveDiseaseFormValue>({
        toGroupId: fromGroupId
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);
            if (formValue.toGroupId === fromGroupId) {
                notifications.show({ message: 'No se ha cambiado el grupo.', color: 'red' });
                setLoading(false);
                return;
            }
            try {
                await moveDiseaseToGroup({ diseaseId, fromGroupId, toGroupId: formValue.toGroupId });
                router.back();
            } catch (error) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [router, formValue, diseaseId, fromGroupId]);

    return (
        <form onSubmit={handleSubmit}>
            <ModularLayout>
                <ModularBox flex={1}>
                    <Stack component='div' gap={rem(8)}>
                        <DiseaseSelect
                            options={options}
                            groupValue={formValue.toGroupId}
                            onChange={(selectedValues) => {
                                setFormValue((prev) => {
                                    const updatedForm: any = { ...prev };
                                    selectedValues.forEach(({ value }) => {
                                        updatedForm.toGroupId = value;
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

export default MoveDiseaseForm
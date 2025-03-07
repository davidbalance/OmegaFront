'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import AreaSelect from '@/components/area-select';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Option } from '@/lib/types/option.type';
import { getErrorMessage } from '@/lib/utils/errors';
import { addAreaClient } from '@/server/medical_client/actions';
import { AddAreaMedicalClientPayload } from '@/server/medical_client/server_types';
import { rem, Button, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type AreaFormValue = Omit<AddAreaMedicalClientPayload, 'dni'>;
type AreaFormProps = {
    patientDni: string;
    options: Option[];
    areaValue?: string;
}
const AreaForm: React.FC<AreaFormProps> = ({
    patientDni,
    options,
    areaValue
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const [formValue, setFormValue] = useState<AreaFormValue>({
        areaId: '',
        areaName: ''
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);
            try {
                await addAreaClient({ ...formValue, dni: patientDni });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [patientDni, router, formValue]);

    return (
        <form onSubmit={handleSubmit}>
            <LoadingOverlay visible={loading} />
            <ModularLayout>
                <ModularBox flex={1}>
                    <Flex direction='column' gap={rem(8)}>
                        <AreaSelect
                            options={options}
                            areaValue={areaValue}
                            onChange={(selectedValues) => {
                                setFormValue((prev) => {
                                    const updatedForm: any = { ...prev };
                                    selectedValues.forEach(({ value, label }) => {
                                        updatedForm['areaId'] = value;
                                        updatedForm['areaName'] = label;
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

export default AreaForm
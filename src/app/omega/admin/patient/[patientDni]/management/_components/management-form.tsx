'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import ManagementSelect from '@/components/management-select';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Option } from '@/lib/types/option.type';
import { getErrorMessage } from '@/lib/utils/errors';
import { addManagementClient } from '@/server';
import { AddManagementMedicalClientPayload } from '@/server/medical-client/server-types';
import { rem, Button, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type ManagementValue = Omit<AddManagementMedicalClientPayload, 'dni'>;
type ManagementProps = {
    patientDni: string;
    options: Option[];
    managementValue?: string;
}
const Management: React.FC<ManagementProps> = ({
    patientDni,
    options,
    managementValue
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const [formValue, setFormValue] = useState<ManagementValue>({
        managementId: '',
        managementName: ''
    });


    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);
            try {
                await addManagementClient({ ...formValue, dni: patientDni });
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
                        <ManagementSelect
                            options={options}
                            managementValue={managementValue}
                            onChange={(selectedValues) => {
                                setFormValue((prev) => {
                                    const updatedForm: any = { ...prev };
                                    selectedValues.forEach(({ value, label }) => {
                                        updatedForm['managementId'] = value;
                                        updatedForm['managementName'] = label;
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

export default Management
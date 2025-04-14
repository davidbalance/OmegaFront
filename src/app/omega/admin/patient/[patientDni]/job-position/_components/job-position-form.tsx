'use client'

import JobPositionSelect from '@/components/job-position-select';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Option } from '@/lib/types/option.type';
import { getErrorMessage } from '@/lib/utils/errors';
import { addJobPositionClient } from '@/server';
import { AddJobPositionMedicalClientPayload } from '@/server/medical-client/server-types';
import { LoadingOverlay, rem, Button, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type JobPositionFormValue = Omit<AddJobPositionMedicalClientPayload, 'dni'>;
interface JobPositionFormProps {
    patientDni: string;
    options: Option[]
    jobPositionValue?: string;
}
const JobPositionForm: React.FC<JobPositionFormProps> = ({
    patientDni,
    options,
    jobPositionValue
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const [formValue, setFormValue] = useState<JobPositionFormValue>({
        jobPositionName: '',
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);
            try {
                await addJobPositionClient({
                    dni: patientDni,
                    jobPositionName: formValue.jobPositionName
                });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [patientDni, formValue, router]);

    return (
        <form onSubmit={handleSubmit}>
            <LoadingOverlay visible={loading} />
            <ModularLayout>
                <ModularBox flex={1}>
                    <Flex direction='column' gap={rem(8)}>
                        <JobPositionSelect
                            options={options}
                            jobPositionValue={jobPositionValue}
                            onChange={(selectedValues) => {
                                setFormValue((prev) => {
                                    const updatedForm: any = { ...prev };
                                    selectedValues.forEach(({ label }) => {
                                        updatedForm['jobPositionName'] = label;
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

export default JobPositionForm
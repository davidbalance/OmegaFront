'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { getErrorMessage } from '@/lib/utils/errors';
import { editUser, editUserByDni, updateClientName } from '@/server';
import { rem, Button, Flex, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import PatientSchema from '../_schemas/patient.schema'
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';

type PatientNameFormProps = {
    patientDni: string;
    patientName: string;
    patientLastname: string;
}
const PatientNameForm: React.FC<PatientNameFormProps> = ({
    patientDni,
    patientName,
    patientLastname
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof PatientSchema>>({
        initialValues: {
            patientName: patientName,
            patientLastname: patientLastname
        },
        validate: zodResolver(PatientSchema),
    });

    const handleSubmit = useCallback(async (value: z.infer<typeof PatientSchema>) => {
        setLoading(true);
        try {
            await updateClientName({
                ...value,
                dni: patientDni
            });
            await editUserByDni({
                lastname: value.patientLastname,
                name: value.patientName,
                userDni: patientDni
            })
            router.back();
        } catch (error: any) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [router, patientDni]);

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={loading} />
            <ModularLayout>
                <ModularBox flex={1}>
                    <Flex direction='column' gap={rem(8)}>
                        <TextInput
                            label='Nombre'
                            placeholder='Juan Carlos'
                            {...form.getInputProps('patientName')} />
                        <TextInput
                            label='Apellido'
                            placeholder='Gomez Bolaños'
                            {...form.getInputProps('patientLastname')} />
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

export default PatientNameForm
'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { Box, Button, Grid, GridCol, rem, Stack, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { DateInput } from '@mantine/dates'
import { useDniValidation } from '../_context/dni_validation.context'
import PatientSchema from '../_schemas/patient.schema'
import { z } from 'zod'
import { createClient } from '@/server'
import GenderSelector from '@/components/gender-selector'
import { getErrorMessage } from '@/lib/utils/errors'

type PatientFormProps = {
    allowRole?: boolean;
}
const PatientForm: React.FC<PatientFormProps> = ({
    allowRole
}) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { data } = useDniValidation();

    const form = useForm<z.infer<typeof PatientSchema>>({
        initialValues: {
            patientName: '',
            patientLastname: '',
            patientDni: '',
            patientEmail: '',
            patientGender: 'male',
            patientBirthday: new Date()
        },
        validate: zodResolver(PatientSchema),
    });

    const handleSubmit = useCallback(async (value: z.infer<typeof PatientSchema>) => {
        setLoading(true);
        try {
            await createClient({
                ...value,
                patientGender: value.patientGender as any
            });
            router.back();
        } catch (error: any) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        if (data !== null && data.patientDni !== form.values.patientDni) {
            form.setValues(e => ({
                ...e,
                patientName: data.patientName,
                patientLastname: data.patientLastname,
                patientDni: data.patientDni,
            }));
        }
    }, [data, form])

    return (
        <Box
            flex={1}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}>
            <ModularLayout>
                <ModularBox flex={1} pt={rem(20)}>
                    <Stack
                        w='100%'
                        align='center'
                        justify='center'>
                        <Grid maw={rem(750)}>
                            <GridCol span={6}>
                                <TextInput
                                    label='Nombre'
                                    placeholder='Juan Carlos'
                                    disabled={!data}
                                    {...form.getInputProps('patientName')} />
                            </GridCol>
                            <GridCol span={6}>
                                <TextInput
                                    label='Apellido'
                                    placeholder='Gomez Bolaños'
                                    disabled={!data}
                                    {...form.getInputProps('patientLastname')} />
                            </GridCol>
                            <GridCol span={6}>
                                <TextInput
                                    label='Cedula'
                                    placeholder='17XXXXXXXX'
                                    disabled={!data}
                                    {...form.getInputProps('patientDni')} />
                            </GridCol>
                            <GridCol span={6}>
                                <TextInput
                                    label='Correo electronico'
                                    placeholder='mi-correo@email.com'
                                    disabled={!data}
                                    {...form.getInputProps('patientEmail')} />
                            </GridCol>
                            <GridCol span={6}>
                                <GenderSelector
                                    disabled={!data}
                                    {...form.getInputProps('patientGender')} />
                            </GridCol>
                            <GridCol span={6}>
                                <DateInput
                                    label='Fecha de nacimiento'
                                    disabled={!data}
                                    {...form.getInputProps('patientBirthday')} />
                            </GridCol>
                            {
                                allowRole
                                    ? (<GridCol span={12}>
                                        <TextInput
                                            label='Rol'
                                            disabled={!data}
                                            {...form.getInputProps('patientRole')} />
                                    </GridCol>)
                                    : null
                            }
                        </Grid>
                    </Stack>
                </ModularBox>
                <ModularBox>
                    <Button
                        fullWidth
                        type='submit'
                        loading={loading}
                        disabled={loading || !data}>
                        Guardar
                    </Button>
                </ModularBox>
            </ModularLayout>
        </Box>
    )
}

export default PatientForm
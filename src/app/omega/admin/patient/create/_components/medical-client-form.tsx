'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { Box, Button, Grid, GridCol, rem, Stack, TextInput } from '@mantine/core'
import { joiResolver, useForm } from '@mantine/form'
import medicalClientSchema from '../_schema/medical-client.schema'
import React, { useEffect, useState } from 'react'
import { CreateMedicalClient } from '@/server/medical-client.actions'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { DateInput } from '@mantine/dates'
import MedicalClientGenderSelector from './medical-client-gender-selector'
import { useMedicalClientValidateDni } from '../_context/medical-client-validate-dni.context'

const defaultValues: CreateMedicalClient = {
    name: '',
    lastname: '',
    dni: '',
    email: '',
    gender: '',
    birthday: new Date()
}

type MedicalClientFormProps = {
    allowRole?: boolean;
}
const MedicalClientForm: React.FC<MedicalClientFormProps> = ({
    allowRole
}) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { dni, lastname, name } = useMedicalClientValidateDni();

    const form = useForm({
        initialValues: defaultValues,
        validate: joiResolver(medicalClientSchema)
    });

    const handleSubmit = async (data: CreateMedicalClient) => {
        setLoading(true);
        try {
            console.log(data);
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!!dni && dni.trim() !== '') form.setValues(e => ({ ...e, dni: dni }));
        if (!!name && name.trim() !== '') form.setValues(e => ({ ...e, name: name }));
        if (!!lastname && lastname.trim() !== '') form.setValues(e => ({ ...e, lastname: lastname }));
    }, [dni, name, lastname]);

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
                                    disabled={!name}
                                    {...form.getInputProps('name')} />
                            </GridCol>
                            <GridCol span={6}>
                                <TextInput
                                    label='Apellido'
                                    placeholder='Gomez Bolaños'
                                    disabled={!lastname}
                                    {...form.getInputProps('lastname')} />
                            </GridCol>
                            <GridCol span={6}>
                                <TextInput
                                    label='Cedula'
                                    placeholder='17XXXXXXXX'
                                    disabled={!dni}
                                    {...form.getInputProps('dni')} />
                            </GridCol>
                            <GridCol span={6}>
                                <TextInput
                                    label='Correo electronico'
                                    placeholder='mi-correo@email.com'
                                    disabled={!dni && !lastname && !name}
                                    {...form.getInputProps('email')} />
                            </GridCol>
                            <GridCol span={6}>
                                <MedicalClientGenderSelector
                                    disabled={!dni && !lastname && !name}
                                    {...form.getInputProps('gender')} />
                            </GridCol>
                            <GridCol span={6}>
                                <DateInput
                                    label='Fecha de nacimiento'
                                    disabled={!dni && !lastname && !name}
                                    {...form.getInputProps('birthday')} />
                            </GridCol>
                            {
                                allowRole
                                    ? (<GridCol span={12}>
                                        <TextInput
                                            label='Rol'
                                            {...form.getInputProps('role')} />
                                        disabled={!dni && !lastname && !name}
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
                        disabled={loading || (!dni && !lastname && !name)}>
                        Guardar
                    </Button>
                </ModularBox>
            </ModularLayout>
        </Box>
    )
}

export default MedicalClientForm
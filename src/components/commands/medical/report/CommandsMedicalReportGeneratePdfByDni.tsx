import { ModularBox } from '@/components/modular/box/ModularBox'
import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { useFetch } from '@/hooks/useFetch';
import { Box, Button, Grid, TextInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconId, IconReport } from '@tabler/icons-react';
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import React, { useCallback, useEffect, useState } from 'react'

const formSchema = Joi.object({
    dni: Joi
        .string()
        .min(10)
        .max(10)
        .messages({
            "string.empty": 'Especifique una cedula',
            "string.min": 'Logitud minima 10 caracteres',
            "string.max": 'Logitud maxima 10 caracteres',
        }),
});

const CommandsMedicalReportGeneratePdfByDni: React.FC = () => {

    const [shouldRequest, setShouldRequest] = useState<boolean>(false);

    const form = useForm({
        initialValues: { dni: '' },
        validate: joiResolver(formSchema)
    });

    const {
        body,
        data,
        error,
        loading,
        request,
        reload,
        reset,
    } = useFetch<any>('/api/medical/report/recreate/pdf', 'POST', { loadOnMount: false });

    const { show } = useConfirmation();

    const handleFormSubmit = useCallback(async ({ dni }: { dni: string }) => {
        const state = await show('Auto generacion de pdf', `Se van a recrear todos los reportes medicos del paciente ${dni}, esta operacion puede tomar mucho tiempo, ¿Esta de acuerdo?`);
        if (state) {
            request({ dni });
            setShouldRequest(true);
        }
    }, [request, show]);

    useEffect(() => {
        if (body && shouldRequest) {
            reload();
            setShouldRequest(false);
        }
    }, [body, shouldRequest, reload])

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    useEffect(() => {
        if (data) {
            reset();
        }
    }, [data, reset]);

    return (
        <ModularBox
            pos='relative'>
            <Box
                component='form'
                onSubmit={form.onSubmit(handleFormSubmit)}>
                <Grid>
                    <Grid.Col span={10}>
                        <TextInput
                            size='sm'
                            type='text'
                            placeholder='175******'
                            leftSection={
                                <IconId style={{ width: rem(16), height: rem(16) }} />
                            }
                            {...form.getInputProps('dni')} />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Button
                            fullWidth
                            type='submit'
                            variant='light'
                            leftSection={
                                <IconReport style={{ width: rem(16), height: rem(16) }} />
                            }
                            loading={loading}>
                            Generar
                        </Button>
                    </Grid.Col>
                </Grid>
            </Box>
        </ModularBox>
    )
}

export { CommandsMedicalReportGeneratePdfByDni }
'use client'

import { ModularBox } from '@/components/modular/box/ModularBox';
import { useConfirmation } from '@/contexts/confirmation.context';
import { parseForm } from '@/lib/utils/form-parse';
import { generateByDniMedicalReport } from '@/server/medical-report.actions';
import { Box, TextInput, rem, Button, Group } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconId, IconReport } from '@tabler/icons-react';
import Joi from 'joi';
import router from 'next/router';
import React, { FormEvent, useState } from 'react'

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

const CommandReportGenerateByDni: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { show } = useConfirmation();
    const form = useForm({
        initialValues: { dni: '' },
        validate: joiResolver(formSchema)
    });

    const handleSubmit = async (_: any, event: FormEvent<HTMLFormElement> | undefined) => {
        if (event) {
            const value: any = parseForm(event.currentTarget);
            const state = await show(`Se va a generar los reportes medicos en pdf para ${value.dni}. ¿Esta seguro?`);
            if (state) {
                setLoading(true);
                try {
                    await generateByDniMedicalReport(value);
                    router.back();
                } catch (error: any) {
                    notifications.show({ message: error.message, color: 'red' });
                } finally {
                    setLoading(false);
                }
            }
        }
    }

    return (
        <ModularBox pos='relative'>
            <Box
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}>

                <Group wrap='nowrap'>
                    <TextInput
                        w='100%'
                        name='dni'
                        size='sm'
                        type='text'
                        placeholder='175******'
                        leftSection={
                            <IconId style={{ width: rem(16), height: rem(16) }} />
                        }
                        {...form.getInputProps('dni')} />

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
                </Group>
            </Box>
        </ModularBox>
    )
}

export default CommandReportGenerateByDni
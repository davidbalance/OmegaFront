'use client'

import { createEmail } from '@/app/omega/admin/patient/_actions/medical-email.actions'
import { Box, TextInput, rem, ActionIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconKey, IconDeviceFloppy } from '@tabler/icons-react'
import Joi from 'joi'
import { joiResolver } from 'mantine-form-joi-resolver'
import React, { useState } from 'react'

const userSchema = Joi.object({
    email: Joi
        .string()
        .email({ tlds: { allow: false } })
        .empty()
        .messages({
            'string.email': 'Correo invalido',
            'string.empty': 'Se require de un correo',
        })
});

interface MedicalClientEmailFormProps {
    dni: string;
}
const MedicalClientEmailForm: React.FC<MedicalClientEmailFormProps> = ({
    dni
}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm({ initialValues: { email: '' }, validate: joiResolver(userSchema) });

    const handleSubmit = async (data: { email: string }): Promise<void> => {
        setLoading(true);
        try {
            await createEmail(dni, data.email);
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label='Ingrese un correo'
                placeholder="hello@email.com"
                leftSectionPointerEvents='none'
                size='xs'
                leftSection={<IconKey style={{ width: rem(16), height: rem(16) }} />}
                rightSection={
                    <ActionIcon
                        variant="subtle"
                        type='submit'
                        loading={loading}>
                        <IconDeviceFloppy
                            style={{ width: '70%', height: '70%' }}
                            stroke={1.5} />
                    </ActionIcon>
                }
                {...form.getInputProps('email')}
            />
        </Box>
    )
}

export { MedicalClientEmailForm }
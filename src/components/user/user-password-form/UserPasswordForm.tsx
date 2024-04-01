import { Box, Button, PasswordInput, rem } from '@mantine/core'
import { joiResolver, useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react'
import Joi from 'joi';
import React, { ForwardedRef } from 'react'

type IPasswordForm = {
    password: string;
    confirmPassword: string;
}

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const passwordSchema = Joi.object<IPasswordForm>({
    password: Joi
        .string()
        .empty()
        .required()
        .regex(new RegExp(strongPasswordRegex))
        .messages({
            "string.empty": 'Debe escribir una contraseña',
            "string.regex": "La contraseña debe tener tener especiales, numericos y de longitud 8"
        }),
    confirmPassword: Joi
        .string()
        .empty()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            "string.empty": "Debe confirmar la contraseña",
            "string.ref": "Las contraseñas no coinciden"
        })
});

type UserPasswordFormProps = {
    onSubmit: (values: Omit<IPasswordForm, 'confirmPassword'>) => void;
    data?: { password: string };
}
const UserPasswordForm = React.forwardRef<HTMLButtonElement, UserPasswordFormProps>(({ data, onSubmit }, ref: ForwardedRef<HTMLButtonElement>) => {

    const form = useForm({
        initialValues: {
            password: data?.password || '',
            confirmPassword: data?.password || ''
        },
        validate: joiResolver(passwordSchema)
    });

    return (
        <Box component='form' onSubmit={form.onSubmit(onSubmit)}>
            <PasswordInput
                label='Contraseña'
                placeholder='Contraseña'
                leftSection={<IconLock stroke={1.5} />}
                style={{ marginBottom: rem(16) }}
                {...form.getInputProps('password')}
            />

            <PasswordInput
                label='Confirmar Contraseña'
                placeholder='Confirmar Contraseña'
                leftSection={<IconLock stroke={1.5} />}
                style={{ marginBottom: rem(16) }}
                {...form.getInputProps('confirmPassword')}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
});

export default UserPasswordForm
import { Box, PasswordInput, rem, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
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

type AuthenticationFormPasswordProps = {
    /**
     * Funcion que es llamada cuando el formulario se envia.
     * @param values 
     * @returns 
     */
    onSubmit: (values: Omit<IPasswordForm, 'confirmPassword'>) => void;
    /**
     * Datos usados para llenar el formulario cuando es montado
     */
    data?: { password: string };
}
const AuthenticationFormPassword = React.forwardRef<HTMLButtonElement, AuthenticationFormPasswordProps>(({ data, onSubmit }, ref: ForwardedRef<HTMLButtonElement>) => {

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
                leftSection={<IconLock stroke={1.5} size={16} />}
                style={{ marginBottom: rem(16) }}
                {...form.getInputProps('password')}
            />

            <PasswordInput
                label='Confirmar Contraseña'
                placeholder='Confirmar Contraseña'
                leftSection={<IconLock stroke={1.5} size={16} />}
                style={{ marginBottom: rem(16) }}
                {...form.getInputProps('confirmPassword')}
            />
            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
});

AuthenticationFormPassword.displayName = 'AuthenticationFormPassword';

export { AuthenticationFormPassword }
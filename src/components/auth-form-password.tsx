'use client'

import { Box, Button, PasswordInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import React, { FormEvent, useCallback } from 'react'

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
            "string.pattern.base": "La contraseña debe tener tener especiales, numericos y de longitud 8"
        }),
    confirmPassword: Joi
        .string()
        .empty()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            "string.empty": "Debe confirmar la contraseña",
            "any.only": "Las contraseñas no coinciden"
        })
});

type AuthFormPasswordProps = {
    data?: { password: string };
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}
const AuthFormPassword = React.forwardRef<HTMLFormElement, AuthFormPasswordProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm({
        initialValues: {
            password: data?.password || '',
            confirmPassword: data?.password || ''
        },
        validate: joiResolver(passwordSchema)
    });

    const handleSubmit = useCallback((_: any, event: FormEvent<HTMLFormElement> | undefined) => {
        if (event) {
            onSubmit?.(event)
        }
    }, [onSubmit]);


    return (
        <Box
            ref={ref}
            component='form'
            mt={rem(16)}
            px={rem(16)}
            onSubmit={form.onSubmit(handleSubmit)}>
            <PasswordInput
                label='Contraseña'
                placeholder='Contraseña'
                style={{ marginBottom: rem(16) }}
                leftSection={(<IconLock stroke={1.5} size={16} />)}
                name='password'
                {...form.getInputProps('password')} />

            <PasswordInput
                label='Confirmar Contraseña'
                placeholder='Confirmar Contraseña'
                leftSection={(<IconLock stroke={1.5} size={16} />)}
                style={{ marginBottom: rem(16) }}
                {...form.getInputProps('confirmPassword')} />

            <Button type='submit' style={{ display: 'none' }} />
        </Box>
    )
});

AuthFormPassword.displayName = 'AuthFormPassword'

export default AuthFormPassword;
'use client'

import { Button, PasswordInput, rem } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';
import React, { useCallback } from 'react';
import PasswordSchema from './schemas/password.schema';
import { z } from 'zod';

type AuthPasswordFormProps = {
    data?: { password: string };
    onSubmit?: (value: z.infer<typeof PasswordSchema>) => void;
}
const AuthPasswordForm = React.forwardRef<HTMLFormElement, AuthPasswordFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof PasswordSchema>>({
        initialValues: {
            password: data?.password ?? '',
            confirmPassword: data?.password ?? ''
        },
        validate: zodResolver(PasswordSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof PasswordSchema>) => {
        onSubmit?.({ ...value });
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <PasswordInput
                label='Contraseña'
                placeholder='Contraseña'
                style={{ marginBottom: rem(16) }}
                leftSection={(<IconLock stroke={1.5} size={16} />)}
                {...form.getInputProps('password')} />

            <PasswordInput
                label='Confirmar Contraseña'
                placeholder='Confirmar Contraseña'
                leftSection={(<IconLock stroke={1.5} size={16} />)}
                style={{ marginBottom: rem(16) }}
                {...form.getInputProps('confirmPassword')} />

            <Button type='submit' style={{ display: 'none' }} />
        </form>
    )
});

AuthPasswordForm.displayName = 'AuthPasswordForm';
export default AuthPasswordForm;
"use client"

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useState } from 'react'
import loginSchema from '../_schema/login.schema';
import { Box, TextInput, PasswordInput, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { getErrorMessage } from '@/lib/utils/errors';

const LoginForm: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        initialValues: { email: '', password: '' },
        validate: zodResolver(loginSchema)
    });

    const handleLogin = useCallback(
        async (value: z.infer<typeof loginSchema>) => {
            setLoading(true);
            try {
                const response = await signIn('credentials', { redirect: false, ...value });
                if (response?.error) {
                    throw new Error("Credenciales no validas");
                }
                router.push('/omega');
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [router]);

    return (
        <Box
            mt='xl'
            onSubmit={form.onSubmit(handleLogin)}
            component='form'
            p={30}>
            <TextInput
                label='Correo Electronico'
                placeholder='omega@gmail.com'
                {...form.getInputProps('email')} />
            <PasswordInput
                label='Contraseña'
                placeholder='Escribe tu contraseña'
                mt='md'
                {...form.getInputProps('password')} />
            <Button
                fullWidth
                mt='xl'
                size='xs'
                type='submit'
                loading={loading}
                disabled={loading}>
                Iniciar Sesion
            </Button>
        </Box>
    )
}

export default LoginForm
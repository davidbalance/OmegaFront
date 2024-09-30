"use client"

import { useForm } from '@mantine/form';
import { joiResolver } from 'mantine-form-joi-resolver';
import React, { useState } from 'react'
import loginSchema from '../_schema/login.schema';
import { Box, TextInput, PasswordInput, Button } from '@mantine/core';
import { LoginCredential } from '../_lib/login-credential.type';
import { notifications } from '@mantine/notifications';
import { signIn } from 'next-auth/react';

const LoginForm: React.FC = () => {

    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: { username: '', password: '' },
        validate: joiResolver(loginSchema)
    });

    const handleLogin = async (value: LoginCredential) => {
        setLoading(true);
        try {
            const response = await signIn('credentials', { callbackUrl: 'omega', ...value });
            if (response?.error) {
                throw new Error(response.error);
            }
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            mt='xl'
            onSubmit={form.onSubmit(handleLogin)}
            component='form'
            p={30}>
            <TextInput
                label='Correo Electronico'
                placeholder='omega@gmail.com'
                {...form.getInputProps('username')} />
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
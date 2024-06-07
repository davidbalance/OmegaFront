'use client'

import { Box, Button, Paper, PasswordInput, TextInput, Title } from '@mantine/core'
import React, { useEffect } from 'react'
import classes from './Authentication.module.css'
import { useForm } from '@mantine/form'
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import { useAuth } from '@/hooks/useAuth/useAuth'
import { notifications } from '@mantine/notifications'

interface ILoginForm {
    username: string;
    password: string;
}

const loginSchema = Joi.object<ILoginForm>({
    username: Joi
        .string()
        .email({ tlds: { allow: false } })
        .empty()
        .required()
        .messages({
            'string.email': 'Correo invalido',
            'string.empty': 'Debe colocar un correo',
        }),
    password: Joi
        .string()
        .empty()
        .required()
        .messages({
            'string.empty': 'Debe ingresar una contraseña'
        })
});

const AuthenticationPage: React.FC = () => {

    const form = useForm({
        initialValues: { username: '', password: '' },
        validate: joiResolver(loginSchema)
    });

    const { loading, login, error } = useAuth();

    useEffect(() => {
        if (error) {
            notifications.show({
                message: error.message,
                color: 'red'
            })
        }
    }, [error]);

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.container} radius='xs' p="md" withBorder>
                <Title className={classes.title} order={4} ta='center' mt='xl' mb='xl'>
                    Bienvenido de vuelta a Omega!
                </Title>
                <Box mt='xl' onSubmit={form.onSubmit(login)} component='form' p={30}>
                    <TextInput label='Correo Electronico' placeholder='omega@gmail.com' {...form.getInputProps('username')} />
                    <PasswordInput label='Contraseña' placeholder='Escribe tu contraseña' mt='md' {...form.getInputProps('password')} />
                    <Button fullWidth mt='xl' size='xs' type='submit' loading={loading} disabled={loading}>
                        Iniciar Sesion
                    </Button>
                </Box>
            </Paper>
        </div >
    )
}

export default AuthenticationPage;
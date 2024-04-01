'use client'

import {
    Button,
    Paper,
    PasswordInput,
    TextInput,
    Title
} from '@mantine/core'
import React from 'react'
import style from './Authentication.module.css'
import { useForm } from '@mantine/form'
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import { useAuth } from '@/hooks'

interface ILoginForm {
    username: string;
    password: string;
}

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

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


const Authentication: React.FC = () => {

    const form = useForm({
        initialValues: { username: '', password: '' },
        validate: joiResolver(loginSchema)
    });
    
    const auth = useAuth();

    return (
        <div className={style.wrapper}>
            <Paper
                onSubmit={form.onSubmit(auth.login)}
                component='form'
                className={style.form} p={30}>
                <Title className={style.title} order={2} ta='center' mt='md' mb={50}>
                    Bienvenido de vuelta a Omega!
                </Title>

                <TextInput
                    label='Correo Electronico'
                    placeholder='omega@gmail.com'
                    size='md'
                    {...form.getInputProps('username')}
                />
                <PasswordInput
                    label='Contraseña'
                    placeholder='Escribe tu contraseña'
                    mt='md'
                    size='md'
                    {...form.getInputProps('password')}
                />
                <Button
                    fullWidth
                    mt='xl'
                    size='md'
                    type='submit'
                    loading={auth.loading}
                    disabled={auth.loading}>
                    Iniciar Sesion
                </Button>
            </Paper>
        </div>
    )
}

export default Authentication;
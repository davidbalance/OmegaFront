'use client'

import { Button, Checkbox, Paper, PasswordInput, TextInput, Title } from '@mantine/core'
import React from 'react'
import style from './Authentication.module.css'
import { useForm } from '@mantine/form'
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import { useAuth } from '@/hooks'

interface ILoginForm {
    username: string;
    password: string;
    keepmeLogged: boolean;
}

const loginSchema = Joi.object<ILoginForm>({
    username: Joi.string()
        .email({ tlds: { allow: false } })
        .empty()
        .messages({
            'string.email': 'Invalid email',
            'string.empty': 'Invalid email',
        }),
    password: Joi.string()
        .empty()
        .messages({
            'string.empty': 'Should enter a password',
        }),
    keepmeLogged: Joi.allow()
});


const Authentication: React.FC = () => {

    const form = useForm({
        initialValues: { username: '', password: '', keepmeLogged: false },
        validate: joiResolver(loginSchema)
    });
    const auth = useAuth();

    return (
        <div className={style.wrapper}>
            <Paper onSubmit={form.onSubmit(auth.login)} component='form' className={style.form} p={30}>
                <Title className={style.title} order={2} ta='center' mt='md' mb={50}>
                    Welcome back to Omega!
                </Title>

                <TextInput
                    autoComplete=''
                    label='Email address'
                    placeholder='omega@gmail.com'
                    size='md'
                    {...form.getInputProps('username')}
                />
                <PasswordInput
                    label='Password'
                    placeholder='Your password'
                    mt='md'
                    size='md'
                    {...form.getInputProps('password')}
                />
                <Checkbox
                    label='Keep me logged in'
                    mt='xl'
                    size='md'
                    {...form.getInputProps('keepmeLogged')} />
                <Button fullWidth mt='xl' size='md' type='submit' loading={auth.loading} disabled={auth.loading}>
                    Login
                </Button>
            </Paper>
        </div>
    )
}

export default Authentication;
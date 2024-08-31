'use client'

import React, { FormEvent, useCallback } from 'react'
import { SimpleGrid, rem, TextInput, Box, Button } from '@mantine/core';
import { IconId, IconAt } from '@tabler/icons-react';
import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi';
import { User } from '@/lib/dtos/user/user/base.response.dto';

type IUserDataForm = Omit<User, 'id' | 'hasCredential'>;

const userSchema = Joi.object<IUserDataForm>({
    name: Joi
        .string()
        .empty()
        .messages({
            "string.empty": 'Especifique un nombre'
        }),
    lastname: Joi
        .string()
        .empty()
        .messages({
            "string.empty": 'Especifique un apellido'
        }),
    dni: Joi
        .string()
        .min(10)
        .max(10)
        .messages({
            "string.empty": 'Especifique una cedula',
            "string.min": 'Logitud minima 10 caracteres',
            "string.max": 'Logitud maxima 10 caracteres',
        }),
    email: Joi
        .string()
        .email({ tlds: { allow: false } })
        .empty()
        .messages({
            'string.email': 'Correo invalido',
            'string.empty': 'Correo invalido',
        })
});

interface UserDataFormProps {
    data?: IUserDataForm;
    disabledDni?: boolean;
    disabledEmail?: boolean;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const UserDataForm = React.forwardRef<HTMLFormElement, UserDataFormProps>(({
    data,
    disabledDni,
    disabledEmail,
    onSubmit
}, ref) => {

    const form = useForm({
        initialValues: {
            name: data?.name || '',
            lastname: data?.lastname || '',
            dni: data?.dni || '',
            email: data?.email || ''
        },
        validate: joiResolver(userSchema)
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
            onSubmit={form.onSubmit(handleSubmit)}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} style={{ marginBottom: rem(16) }}>
                <TextInput
                    label="Nombre"
                    placeholder="Carlos Luis"
                    name='name'
                    {...form.getInputProps('name')} />
                <TextInput
                    label="Apellido"
                    placeholder="Sanchez Rodriguez"
                    name='lastname'
                    {...form.getInputProps('lastname')} />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 1 }} style={{ marginBottom: rem(16) }}>
                <TextInput
                    label="Cedula"
                    placeholder="17*******0"
                    max={10}
                    leftSection={<IconId stroke={1.5} />}
                    disabled={disabledDni}
                    name='dni'
                    {...form.getInputProps('dni')}
                />

                <TextInput
                    label="Correo Electronico"
                    placeholder="hello@email.com"
                    leftSection={<IconAt stroke={1.5} />}
                    disabled={disabledEmail}
                    name='email'
                    {...form.getInputProps('email')}
                />
            </SimpleGrid>
        </Box>
    );
});

export default UserDataForm
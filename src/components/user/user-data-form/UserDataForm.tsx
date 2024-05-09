import React from 'react'
import { SimpleGrid, rem, TextInput, Box, Button } from '@mantine/core';
import { IconId, IconAt } from '@tabler/icons-react';
import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi';
import { User as UserType } from '@/services/api/user/dtos';

type IUserForm = Omit<UserType, 'id'>;

const userSchema = Joi.object<IUserForm>({
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

type UserDataFormProps = {
    onSubmit: (values: IUserForm) => void;
    disabledDni?: boolean;
    disabledEmail?: boolean;
    data?: IUserForm;
}

const UserDataForm = React.forwardRef<HTMLButtonElement, UserDataFormProps>(({ data, onSubmit, disabledDni, disabledEmail }, ref) => {

    const form = useForm({
        initialValues: {
            name: data?.name || '',
            lastname: data?.lastname || '',
            dni: data?.dni || '',
            email: data?.email || ''
        },
        validate: joiResolver(userSchema)
    });

    return (
        <Box component='form' onSubmit={form.onSubmit(onSubmit)}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} style={{ marginBottom: rem(16) }}>
                <TextInput
                    label="Nombre"
                    placeholder="Carlos Luis"
                    {...form.getInputProps('name')} />
                <TextInput
                    label="Apellido"
                    placeholder="Sanchez Rodriguez"
                    {...form.getInputProps('lastname')} />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 1 }} style={{ marginBottom: rem(16) }}>
                <TextInput
                    label="Cedula"
                    placeholder="17*******0"
                    leftSection={<IconId stroke={1.5} />}
                    disabled={disabledDni}
                    {...form.getInputProps('dni')}
                />

                <TextInput
                    label="Correo Electronico"
                    placeholder="hello@email.com"
                    leftSection={<IconAt stroke={1.5} />}
                    disabled={disabledEmail}
                    {...form.getInputProps('email')}
                />
            </SimpleGrid>

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>

        </Box>
    );
});

UserDataForm.displayName = 'UserDataForm';

export default UserDataForm
import { Role } from '@/lib/types/role';
import { Box, Button, TextInput, rem } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import React from 'react'

const roleSchema = Joi.object<Role>({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Debe escribir el nombre del rol',
        }),
});

export type RoleFormProps = {
    onSubmit: (data: any) => void;
    data?: Role;
}
const RoleForm = React.forwardRef<HTMLButtonElement, RoleFormProps>(({ data, onSubmit }, ref) => {

    const form = useForm({
        initialValues: {
            name: data?.name || '',
        },
        validate: joiResolver(roleSchema)
    });

    return (
        <Box component='form' onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
                label='Nombre del rol'
                placeholder='Nombre del rol'
                leftSection={<IconSignature stroke={1.5} />}
                style={{ marginBottom: rem(16) }}
                {...form.getInputProps('name')}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
});

RoleForm.displayName = 'RoleForm';

export { RoleForm }
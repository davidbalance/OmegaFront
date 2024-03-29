import { PermissionModel, RoleModel } from '@/services'
import { Box, Button, Table, TextInput, rem } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import React from 'react'

type IRoleForm = {
    name: string;
}

const roleSchema = Joi.object<IRoleForm>({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Debe escribir el nombre del rol',
        }),
});

export type RoleFormProps = {
    permssions: PermissionModel[];
    onSubmit: (data: any) => void;
    data?: RoleModel;
}
const RoleForm = React.forwardRef<HTMLButtonElement, RoleFormProps>(({ permssions, data, onSubmit }, ref) => {

    const form = useForm({
        initialValues: {
            name: data?.name || '',
        },
        validate: joiResolver(roleSchema)
    });

    const handleSubmit = ({ name }: { name: string }) => {

    }

    return (
        <Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label='Nombre del rol'
                placeholder='Contraseña'
                leftSection={<IconSignature stroke={1.5} />}
                style={{ marginBottom: rem(16) }}
                {...form.getInputProps('name')}
            />

            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Permiso</Table.Th>
                        <Table.Th>Visualizar</Table.Th>
                        <Table.Th>Crear</Table.Th>
                        <Table.Th>Modificar</Table.Th>
                        <Table.Th>Eliminar</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody></Table.Tbody>
            </Table>

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
});

export default RoleForm
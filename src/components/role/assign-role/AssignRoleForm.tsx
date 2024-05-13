import { OmegaTd } from '@/components/table/omega-td/OmegaTd';
import { Box, Table, TextInput, Checkbox, Button } from '@mantine/core';
import React, { ChangeEvent, FormEvent, ForwardedRef, useState } from 'react'

export type Role = { name: string; id: number }
type UserRoleFormProps = {
    onSubmit: (values: { roles: number[] }) => void;
    roles: Role[];
    data?: { roles: number[] };
};
const AssignRoleForm = React.forwardRef<HTMLButtonElement, UserRoleFormProps>(({ onSubmit, roles, data }, ref: ForwardedRef<HTMLButtonElement>) => {

    const [selected, setSelected] = useState<number[]>(data?.roles || []);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, role: number) => {
        setError(undefined);
        event.target.checked
            ? setSelected([...selected, role])
            : setSelected(selected.filter(e => e !== role))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selected.length) {
            setError('Se debe seleccionar al menos un rol');
            return;
        }
        onSubmit({ roles: selected });
    }

    return (
        <Box component='form' onSubmit={handleSubmit} miw={400}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Roles del Sistema</Table.Th>
                        <Table.Th>Acceso</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <OmegaTd colSpan={2}>
                            <TextInput value='Seleccion roles del sistema' type='hidden' error={error} />
                        </OmegaTd>
                    </Table.Tr>
                    {
                        roles.map((role) => (
                            <Table.Tr key={role.id}>
                                <OmegaTd>{role.name}</OmegaTd>
                                <OmegaTd align='center'>
                                    <Checkbox
                                        defaultChecked={selected.includes(role.id)}
                                        onChange={(e) => handleChange(e, role.id)}
                                    />
                                </OmegaTd>
                            </Table.Tr>
                        ))
                    }
                </Table.Tbody>
            </Table>

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    );
})

AssignRoleForm.displayName = 'AssignRoleForm';

export { AssignRoleForm }
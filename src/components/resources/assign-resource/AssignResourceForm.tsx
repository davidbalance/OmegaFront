import { Box, Table, TextInput, Checkbox, Button } from '@mantine/core';
import React, { ChangeEvent, FormEvent, ForwardedRef, useState } from 'react'

export type Resource = { name: string; id: number }
type ResourceFormProps = {
    onSubmit: (values: { resources: number[] }) => void;
    resources: Resource[];
    data?: { resources: number[] };
};
const AssignResourceForm = React.forwardRef<HTMLButtonElement, ResourceFormProps>(({ onSubmit, resources, data }, ref: ForwardedRef<HTMLButtonElement>) => {

    const [selected, setSelected] = useState<number[]>(data?.resources || []);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, resource: number) => {
        setError(undefined);
        event.target.checked
            ? setSelected([...selected, resource])
            : setSelected(selected.filter(e => e !== resource))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selected.length) {
            setError('Se debe seleccionar al menos un rol');
            return;
        }
        onSubmit({ resources: selected });
    }

    return (
        <Box component='form' onSubmit={handleSubmit}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Roles del Sistema</Table.Th>
                        <Table.Th>Acceso</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td colSpan={2}>
                            <TextInput value='Seleccion roles del sistema' type='hidden' error={error} />
                        </Table.Td>
                    </Table.Tr>
                    {
                        resources.map((resource) => (
                            <Table.Tr key={resource.id}>
                                <Table.Td>{resource.name}</Table.Td>
                                <Table.Td align='center'>
                                    <Checkbox
                                        defaultChecked={selected.includes(resource.id)}
                                        onChange={(e) => handleChange(e, resource.id)}
                                    />
                                </Table.Td>
                            </Table.Tr>
                        ))
                    }
                </Table.Tbody>
            </Table>

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    );
})
export { AssignResourceForm }
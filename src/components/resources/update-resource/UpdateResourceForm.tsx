import { Resource } from '@/services/api/resource/dtos';
import { Box, Table, TextInput, Checkbox, Button } from '@mantine/core';
import React, { ChangeEvent, FormEvent, ForwardedRef, useState } from 'react';

type UpdateResourceFormProps = {
    onSubmit: (values: { resources: number[] }) => void;
    resources: Resource[];
    data?: { resources: number[] };
};
type ResourceClaims = {
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
};

const UpdateResourceForm = React.forwardRef<HTMLButtonElement, UpdateResourceFormProps>(({ onSubmit, resources, data }, ref: ForwardedRef<HTMLButtonElement>) => {
    
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

    const getResourceClaims = () => {
        return resources.reduce((claims: { [key: string]: ResourceClaims }, resource) => {
            if (!claims[resource.name]) {
                claims[resource.name] = {
                    read: false,
                    create: false,
                    update: false,
                    delete: false
                };
            }

            claims[resource.name][resource.claim as keyof ResourceClaims] = true;
            return claims;
        }, {});
    };

    return (
        <Box component='form' onSubmit={handleSubmit}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Roles del Sistema</Table.Th>
                        <Table.Th>LEER</Table.Th>
                        <Table.Th>CREAR</Table.Th>
                        <Table.Th>ACTUALIZAR</Table.Th>
                        <Table.Th>BORRAR</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td colSpan={5}>
                            <TextInput value='Seleccion roles del sistema' type='hidden' error={error} />
                        </Table.Td>
                    </Table.Tr>
                    {Object.entries(getResourceClaims()).map(([resource, claims]) => (
                        <Table.Tr key={resource}>
                            <Table.Td>{resource}</Table.Td>
                            {Object.entries(claims).map(([claim, value]) => (
                                <Table.Td key={claim} align='center'>
                                    <Checkbox
                                        onChange={(event) => handleChange(event, resources.find(e => e.name === resource && e.claim === claim)?.id as number)}
                                        disabled={!value}
                                    />
                                </Table.Td>
                            ))}
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    );
})

export default UpdateResourceForm
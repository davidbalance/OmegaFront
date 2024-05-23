import { Resource } from '@/services/api/resource/dtos';
import { Box, Table, TextInput, Checkbox, Button, ScrollArea } from '@mantine/core';
import React, { ChangeEvent, FormEvent, ForwardedRef, useState } from 'react'

type ResourceFormProps = {
    onSubmit: (values: { resources: number[] }) => void;
    resources: Resource[];
    data?: { resources: Resource[] };
};

type ResourceStatus = { status: boolean };

type ResourceClaims = {
    read?: ResourceStatus;
    create?: ResourceStatus;
    update?: ResourceStatus;
    delete?: ResourceStatus;
};
const AssignResourceForm = React.forwardRef<HTMLButtonElement, ResourceFormProps>(({ onSubmit, resources, data }, ref: ForwardedRef<HTMLButtonElement>) => {

    const [selected, setSelected] = useState<number[]>(data?.resources.map(e => e.id) || []);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, resource: number) => {
        console.log(data);
        setError(undefined);
        event.target.checked
            ? setSelected([...selected, resource])
            : setSelected(selected.filter(e => e !== resource))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selected.length) {
            setError('Se debe seleccionar al menos un permiso');
            return;
        }
        onSubmit({ resources: selected });
    }

    const claimItems = resources.reduce((claims: { [key: string]: ResourceClaims }, resource) => {
        if (!claims[resource.name]) {
            claims[resource.name] = {
                read: undefined,
                create: undefined,
                update: undefined,
                delete: undefined
            };
        }
        claims[resource.name][resource.claim as keyof ResourceClaims] = {
            status: selected.includes(resource.id)
        };
        console.log(claims, resource, data?.resources.includes(resource));
        return claims;
    }, {});

    return (
        <Box component='form' onSubmit={handleSubmit}>
            <ScrollArea.Autosize mah={350}>
                <Table stickyHeader>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Recursos del Sistema</Table.Th>
                            <Table.Th>LEER</Table.Th>
                            <Table.Th>CREAR</Table.Th>
                            <Table.Th>ACTUALIZAR</Table.Th>
                            <Table.Th>BORRAR</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td colSpan={5}>
                                <TextInput value='Seleccion recursos del sistema' type='hidden' error={error} />
                            </Table.Td>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {
                            Object.entries(claimItems).map(([resource, claims], index) => (
                                <Table.Tr key={`${resource}-${index}`}>
                                    <Table.Td>{resource}</Table.Td>
                                    {
                                        Object.entries(claims).map(([claim, value]) => (
                                            <Table.Td key={claim} align='center'>
                                                <Checkbox
                                                    defaultChecked={value ? value.status : false}
                                                    onChange={(event) => handleChange(event, resources.find(e => e.name === resource && e.claim === claim)?.id as number)}
                                                    disabled={!value}
                                                />
                                            </Table.Td>
                                        ))
                                    }
                                </Table.Tr>
                            ))
                        }
                    </Table.Tbody>
                </Table>
            </ScrollArea.Autosize>
            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    );
});

AssignResourceForm.displayName = 'AssignResourceForm';

export { AssignResourceForm }
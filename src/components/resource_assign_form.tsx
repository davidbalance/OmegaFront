'use client'
import { Resource } from '@/server/resource/server_types';
import { Box, Table, TextInput, Checkbox, ScrollArea, Button } from '@mantine/core';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'

type ResourceAssignFormProps = {
    data?: { resources: string[] };
    resources: Resource[];
    onSubmit?: (value: { resources: string[] }) => void;
};

const ResourceAssignForm = React.forwardRef<HTMLFormElement, ResourceAssignFormProps>((
    { onSubmit,
        resources,
        data
    }, ref) => {

    const [selected, setSelected] = useState<string[]>(data?.resources || []);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleChangeEvent = useCallback((event: ChangeEvent<HTMLInputElement>, resource: string) => {
        setError(undefined);
        setSelected(prev => event.target.checked
            ? [...prev, resource]
            : prev.filter(e => e !== resource)
        );
    }, []);

    const handleFormSubmittedEvent = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selected.length) {
            setError('Se debe seleccionar al menos un rol');
            return;
        }
        onSubmit?.({ resources: selected });
    }, [selected, onSubmit]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={handleFormSubmittedEvent}
            miw={400}>
            <ScrollArea h={400}>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Paginas del Sistema</Table.Th>
                            <Table.Th>Acceso</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td colSpan={2}>
                                <TextInput value='Acceso a las paginas del sistema' type='hidden' error={error} />
                            </Table.Td>
                        </Table.Tr>
                        {
                            resources.map((resource) => (
                                <Table.Tr key={resource.resourceId}>
                                    <Table.Td>{resource.resourceLabel}</Table.Td>
                                    <Table.Td align='center'>
                                        <Checkbox
                                            name={`resource-${resource.resourceId}`}
                                            type='checkbox'
                                            defaultChecked={selected.some(e => e === resource.resourceId)}
                                            onChange={(e) => handleChangeEvent(e, resource.resourceId)}
                                        />
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        }
                    </Table.Tbody>
                </Table>
            </ScrollArea>
            <Button type='submit' style={{ display: 'none' }} />
        </Box>
    );
});

ResourceAssignForm.displayName = 'ResourceAssignForm';

export default ResourceAssignForm
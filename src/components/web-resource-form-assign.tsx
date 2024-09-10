'use client'

import { OmegaNavResource } from '@/lib/dtos/omega/nav/resource/base.response.dto';
import { Box, Table, TextInput, Checkbox, ScrollArea, Button } from '@mantine/core';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'

type WebResourceFormAssignProps = {
    data?: { resources: number[] };
    resources: OmegaNavResource[];
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

const WebResourceFormAssign = React.forwardRef<HTMLFormElement, WebResourceFormAssignProps>(({ onSubmit, resources, data }, ref) => {
    const [selected, setSelected] = useState<number[]>(data?.resources || []);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleChangeEvent = useCallback((event: ChangeEvent<HTMLInputElement>, resource: number) => {
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
        onSubmit?.(event);
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
                                <Table.Tr key={resource.id}>
                                    <Table.Td>{resource.label}</Table.Td>
                                    <Table.Td align='center'>
                                        <Checkbox
                                            name={`resource-${resource.id}`}
                                            type='checkbox'
                                            defaultChecked={selected.includes(resource.id)}
                                            onChange={(e) => handleChangeEvent(e, resource.id)}
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

WebResourceFormAssign.displayName = 'WebResourceFormAssign';

export default WebResourceFormAssign
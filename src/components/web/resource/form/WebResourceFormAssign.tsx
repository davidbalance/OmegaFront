import { OmegaTd } from '@/components/table/omega-td/OmegaTd';
import { WebResource } from '@/lib/dtos/web/resources.response.dto';
import { Box, Table, TextInput, Checkbox, Button } from '@mantine/core';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'

type WebResourceFormAssignProps = {
    onSubmit: (values: { resources: number[] }) => void;
    resources: WebResource[];
    data?: { resources: number[] };
};
const WebResourceFormAssign = React.forwardRef<HTMLButtonElement, WebResourceFormAssignProps>(({ onSubmit, resources, data }, ref) => {
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
        onSubmit({ resources: selected });
    }, [selected]);

    return (
        <Box component='form' onSubmit={handleFormSubmittedEvent} miw={400}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Paginas del Sistema</Table.Th>
                        <Table.Th>Acceso</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <OmegaTd colSpan={2}>
                            <TextInput value='Acceso a las paginas del sistema' type='hidden' error={error} />
                        </OmegaTd>
                    </Table.Tr>
                    {
                        resources.map((resource) => (
                            <Table.Tr key={resource.id}>
                                <OmegaTd>{resource.label}</OmegaTd>
                                <OmegaTd align='center'>
                                    <Checkbox
                                        defaultChecked={selected.includes(resource.id)}
                                        onChange={(e) => handleChangeEvent(e, resource.id)}
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

export default WebResourceFormAssign
import { Area } from '@/lib/dtos/location/area/base.response.dto';
import { Management } from '@/lib/dtos/location/management/base.response.dto';
import { SelectorOption } from '@/lib/dtos/selector/response.dto'
import { Box, rem, Select, ComboboxItem, Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

interface FormType {
    managementId: number;
    managementName: string;
    areaId: number,
    areaName: string;
}

interface MedicalClientFormManagementAreaProps {
    /**
     * DNI del cliente medico.
     */
    managements: Management[];
    /**
     * Valores por defecto para cargar el formulario
     */
    defaultValue?: {
        management: SelectorOption<number>;
        area: SelectorOption<number>;
    }
    /**
     * Funcion que es invocada cuando se completa el envio del formmulario.
     * @param data 
     * @returns 
     */
    onFormSubmittion?: (data: FormType) => void;
}
const MedicalClientFormManagementArea = React.forwardRef<HTMLButtonElement, MedicalClientFormManagementAreaProps>((({ managements, defaultValue, onFormSubmittion }, ref) => {

    const [selectedManagement, setSelectedManagement] = useState<SelectorOption<number> | null>(null);
    const [selectedArea, setSelectedArea] = useState<SelectorOption<number> | null>(null);

    const [areas, setAreas] = useState<Area[]>([]);

    const handleFormSubmittion = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedManagement) {
            notifications.show({ message: 'Debe seleccionar una gerencia', color: 'red' });
            return;
        }
        if (!selectedArea) {
            notifications.show({ message: 'Debe seleccionar un area', color: 'red' });
            return;
        }
        onFormSubmittion?.({
            areaId: selectedArea.key,
            areaName: selectedArea.label,
            managementId: selectedManagement.key,
            managementName: selectedManagement.label
        });
    }, [onFormSubmittion, selectedManagement, selectedArea]);

    const handleManagementChange = useCallback((_: string | null, option: ComboboxItem) => {
        setSelectedArea(null);
        setSelectedManagement({ key: parseInt(option.value), label: option.label });
        const currentManagement = managements.find(e => e.id === parseInt(option.value));
        const currentAreas = currentManagement?.areas;
        setAreas(currentAreas || []);
    }, [managements]);

    const handleAreaChange = useCallback((_: string | null, option: ComboboxItem) => {
        setSelectedArea({ key: parseInt(option.value), label: option.label });
    }, []);

    const managementOptions = useMemo(() => managements.map(e => ({ label: e.name, value: `${e.id}` })), [managements]);
    const areaOptions = useMemo(() => areas.map(e => ({ label: e.name, value: `${e.id}` })) || [], [areas]);

    useEffect(() => {
        if (defaultValue?.management && managements) {
            setSelectedManagement(defaultValue.management);
            const currentManagement = managements.find(e => e.id === defaultValue.management.key);
            const currentAreas = currentManagement?.areas;
            setAreas(currentAreas || []);
        }
    }, [defaultValue?.management, managements]);

    useEffect(() => {
        if (areas.length && defaultValue?.area && selectedManagement) {
            setSelectedArea(defaultValue.area);
        }
    }, [areas, defaultValue?.area, selectedManagement]);

    return (
        <Box component='form' onSubmit={handleFormSubmittion}>

            <Select
                value={`${selectedManagement?.key || ''}`}
                data={managementOptions}
                checkIconPosition="left"
                onChange={handleManagementChange}
                label="Gerencias"
                pb={rem(16)}
                placeholder="Escoge una gerencia"
                searchable
                defaultDropdownOpened={false}
                nothingFoundMessage="Gerencia no encontrada..."
                allowDeselect={false}
                maxDropdownHeight={200}
            />

            <Select
                value={`${selectedArea?.key || ''}`}
                data={areaOptions}
                checkIconPosition="left"
                onChange={handleAreaChange}
                label="Areas"
                pb={rem(16)}
                placeholder="Escoge un area"
                searchable
                defaultDropdownOpened={false}
                nothingFoundMessage="Area no encontrada..."
                allowDeselect={false}
                maxDropdownHeight={200}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>

        </Box>
    )
}));

MedicalClientFormManagementArea.displayName = "MedicalClientFormManagementArea";

export { MedicalClientFormManagementArea }
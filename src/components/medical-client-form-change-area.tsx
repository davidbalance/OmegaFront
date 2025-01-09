'use client'

import { AreaOption } from '@/lib/dtos/location/area/base.response.dto';
import { ManagementOption } from '@/lib/dtos/location/management/base.response.dto';
import { Box, rem, Select, ComboboxItem, Button } from '@mantine/core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const CustomSelect = ({ onChange, ...props }: {
    value: string | null;
    data: { label: string, value: string }[];
    nothingFoundMessage: string;
    label: string;
    placeholder: string;
    name: string;
    onChange: (option: ComboboxItem) => void;
}) => {
    return (
        <Select
            checkIconPosition="left"
            pb={rem(16)}
            searchable
            defaultDropdownOpened={false}
            allowDeselect={false}
            maxDropdownHeight={200}
            onChange={(_, value) => onChange(value)}
            {...props}
        />
    );
}

interface MedicalClientAreaFormProps extends Omit<React.HTMLProps<HTMLFormElement>, 'ref'> {
    managementOptions: ManagementOption[];
    areaOptions: AreaOption[];
    management?: number;
    area?: number;
}
const MedicalClientAreaForm = React.forwardRef<HTMLFormElement, MedicalClientAreaFormProps>((({
    managementOptions,
    areaOptions,
    management,
    area,
    onSubmit,
    ...props
}, ref) => {

    const [selectedManagement, setSelectedManagement] = useState<ManagementOption | null>(null);
    const [selectedArea, setSelectedArea] = useState<AreaOption | null>(null);

    const handleManagementChange = useCallback((option: ComboboxItem) => {
        setSelectedManagement(managementOptions.find(e => e.id === Number(option.value)) || null);
    }, [managementOptions]);

    const handleAreaChange = useCallback((option: ComboboxItem) => {
        setSelectedArea(areaOptions.find(e => e.id === Number(option.value)) || null);
    }, [areaOptions])

    useEffect(() => {
        for (const currentManagement of managementOptions) {
            if (currentManagement.id === management) {
                setSelectedManagement(currentManagement);
                return;
            }
        }
        for (const currentArea of areaOptions) {
            if (currentArea.id === area) {
                setSelectedArea(currentArea);
                return;
            }
        }
    }, [management, area, managementOptions, areaOptions]);

    const memoizeManagements = useMemo(() => managementOptions.map(e => ({ label: e.name, value: e.id.toString() })), [managementOptions]);
    const memoizeAreas = useMemo(() => areaOptions.map(e => ({ label: e.name, value: e.id.toString() })), [areaOptions]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={onSubmit}
            mt={rem(16)}
            px={rem(16)}
            {...props}>

            <CustomSelect
                name='managementId'
                value={selectedManagement?.id.toString() || null}
                data={memoizeManagements}
                onChange={handleManagementChange}
                label="Gerencias"
                placeholder="Escoge una gerencia"
                nothingFoundMessage="Gerencia no encontrada..."
            />
            <input type='hidden' name='managementName' value={selectedManagement?.name} />

            <CustomSelect
                name='areaId'
                value={selectedArea?.id.toString() || null}
                data={memoizeAreas}
                onChange={handleAreaChange}
                label="Areas"
                placeholder="Escoge un area"
                nothingFoundMessage="Area no encontrada..."
            />
            <input type='hidden' name='areaName' value={selectedArea?.name} />

            <Button type='submit' style={{ display: 'none' }}></Button>

        </Box>
    )
}));

MedicalClientAreaForm.displayName = 'MedicalClientAreaForm'

export default MedicalClientAreaForm;
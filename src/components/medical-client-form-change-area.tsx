'use client'

import { Management, ManagementOption } from '@/lib/dtos/location/management/base.response.dto';
import { SelectorOption } from '@/lib/dtos/selector/response.dto'
import { Box, rem, Select, ComboboxItem, Button } from '@mantine/core'
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

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
    options: ManagementOption[];
    management?: number;
    area?: number;
}
const MedicalClientAreaForm = React.forwardRef<HTMLFormElement, MedicalClientAreaFormProps>((({
    options,
    management,
    area,
    onSubmit,
    ...props
}, ref) => {

    const [selectedManagement, setSelectedManagement] = useState<ManagementOption | null>(null);
    const [selectedArea, setSelectedArea] = useState<SelectorOption<string> | null>(null);

    const handleManagementChange = useCallback((option: ComboboxItem) => {
        setSelectedManagement(options.find(e => e.id === Number(option.value)) || null);
        setSelectedArea(null);
    }, [options]);

    const handleAreaChange = (option: ComboboxItem) => {
        setSelectedArea({ key: option.value, label: option.label });
    }

    useEffect(() => {
        for (const currentManagement of options) {
            if (currentManagement.id === management) {
                setSelectedManagement(currentManagement);
                for (const currentArea of currentManagement.areas) {
                    if (currentArea.id === area) {
                        setSelectedArea({ key: currentArea.id.toString(), label: currentArea.name });
                        return;
                    }
                }
                return;
            }
        }
    }, [management, area, options]);

    const managementOptions = useMemo(() => options.map(e => ({ label: e.name, value: e.id.toString() })), [options]);
    const areaOptions = useMemo(() => selectedManagement?.areas.map(e => ({ label: e.name, value: e.id.toString() })) || [], [selectedManagement]);

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
                data={managementOptions}
                onChange={handleManagementChange}
                label="Gerencias"
                placeholder="Escoge una gerencia"
                nothingFoundMessage="Gerencia no encontrada..."
            />
            <input type='hidden' name='managementName' value={selectedManagement?.name} />

            <CustomSelect
                name='areaId'
                value={selectedArea?.key || null}
                data={areaOptions}
                onChange={handleAreaChange}
                label="Areas"
                placeholder="Escoge un area"
                nothingFoundMessage="Area no encontrada..."
            />
            <input type='hidden' name='areaName' value={selectedArea?.label} />

            <Button type='submit' style={{ display: 'none' }}></Button>

        </Box>
    )
}));

MedicalClientAreaForm.displayName = 'MedicalClientAreaForm'

export default MedicalClientAreaForm;
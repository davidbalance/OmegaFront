'use client'

import { JobPosition } from '@/lib/dtos/location/job/position/base.response.dto';
import { Box, Button, ComboboxItem, rem, Select } from '@mantine/core';
import React, { FormEvent, useMemo, useState } from 'react'

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

interface UserFormJobPositionProps {
    value?: string;
    options: JobPosition[];
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const UserFormJobPosition = React.forwardRef<HTMLFormElement, UserFormJobPositionProps>(({
    value,
    options,
    onSubmit
}, ref) => {

    const [jobPositionSelected, setJobPositionSelected] = useState<string | null>(value ?? null);

    const handleSelectorChange = (value: ComboboxItem) => {
        setJobPositionSelected(value.label);
    };

    const jobPositionOptions = useMemo(() => options.map(e => ({ value: e.name, label: e.name })), [options]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={onSubmit}
            mt={rem(16)}
            px={rem(16)}>
            <CustomSelect
                name='name'
                value={jobPositionSelected}
                data={jobPositionOptions}
                onChange={handleSelectorChange}
                label="Puesto de trabajo"
                placeholder="Escoge un puesto de trabajo"
                nothingFoundMessage="Puesto de trabajo no encontrada..."
            />
            <Button
                type='submit'
                style={{ display: 'none' }}></Button>
        </Box>)
});

UserFormJobPosition.displayName = 'UserFormJobPosition';

export { UserFormJobPosition }
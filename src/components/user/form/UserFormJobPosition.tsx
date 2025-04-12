import { JobPosition } from '@/lib/dtos/location/job/position/base.response.dto';
import { BaseFormProps } from '@/lib/types/base-form-prop';
import { Box, Button, ComboboxItem, rem, Select } from '@mantine/core';
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

interface UserFormJobPositionProps extends BaseFormProps<string | null> {
    jobPosition: JobPosition[]
}

const UserFormJobPosition = React.forwardRef<HTMLButtonElement, UserFormJobPositionProps>(({ formData, onFormSubmitted, jobPosition }, ref) => {

    const [jobPositionSelected, setJobPositionSelected] = useState<string | null>(formData || null);

    useEffect(() => {
        setJobPositionSelected(formData || null);
    }, [formData])


    const handleSelectorChange = useCallback((value: string | null, _: ComboboxItem) => {
        setJobPositionSelected(value);
    }, []);

    const handleFormSubmittion = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onFormSubmitted(jobPositionSelected);
    }, [onFormSubmitted, jobPositionSelected]);

    const options = useMemo(() => jobPosition.map(e => e.name), [jobPosition]);

    return (
        <Box component='form' onSubmit={handleFormSubmittion}>
            <Select
                value={jobPositionSelected}
                data={options}
                checkIconPosition="left"
                onChange={handleSelectorChange}
                label="Puesto de trabajo"
                pb={rem(16)}
                placeholder="Escoge un puesto de trabajo"
                searchable
                defaultDropdownOpened={false}
                nothingFoundMessage="Puesto de trabajo no encontrada..."
                allowDeselect={false}
                maxDropdownHeight={200}
            />
            <Button
                type='submit'
                ref={ref}
                style={{ display: 'none' }}></Button>
        </Box>)
});

UserFormJobPosition.displayName = 'UserFormJobPosition';

export { UserFormJobPosition }
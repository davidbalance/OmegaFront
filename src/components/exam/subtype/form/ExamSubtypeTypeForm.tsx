import { Box, Button, ComboboxItem, rem, Select } from '@mantine/core'
import React, { FormEvent, useCallback, useMemo, useState } from 'react'
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto'
import { BaseFormProps } from '@/lib/types/base-form-prop'

interface ExamSubtypeTypeForm {
    type: string;
}

interface ExamSubtypeTypeFormProps extends BaseFormProps<ExamSubtypeTypeForm> {
    types: Omit<ExamType, 'subtypes'>[]
}

const ExamSubtypeTypeForm = React.forwardRef<HTMLButtonElement, ExamSubtypeTypeFormProps>(({ formData, types, onFormSubmitted }, ref) => {

    const [value, setValue] = useState<string>(formData?.type || '');

    const handleFormSubmittionEvent = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onFormSubmitted?.({ type: value });
    }, [onFormSubmitted, value]);

    const handleSelectChange = useCallback((value: string | null, option: ComboboxItem) => {
        setValue(option.value)
    }, []);

    const options = useMemo(() => types.map(e => ({ value: `${e.id}`, label: e.name })), [types]);

    return (
        <Box
            component='form'
            onSubmit={handleFormSubmittionEvent}
        >
            <Select
                value={value}
                data={options}
                checkIconPosition="left"
                onChange={handleSelectChange}
                label="Tipos de examenes"
                pb={rem(16)}
                placeholder="Escoge un tipo de examen"
                searchable
                defaultDropdownOpened={false}
                nothingFoundMessage=""
                allowDeselect={false}
                maxDropdownHeight={200}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>

        </Box>
    )
});

ExamSubtypeTypeForm.displayName = 'ExamSubtypeTypeForm';

export { ExamSubtypeTypeForm }
import { Box, Button, ComboboxItem, rem, Select } from '@mantine/core'
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto'
import { BaseFormProps } from '@/lib/types/base-form-prop'
import { ExamSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto';
import { notifications } from '@mantine/notifications';

interface ExamSubtypeForm {
    type: number;
    subtype: number;
}

interface ExamSubtypeFormProps extends BaseFormProps<ExamSubtypeForm> {
    types: ExamType[];
}

const ExamSubtypeForm = React.forwardRef<HTMLButtonElement, ExamSubtypeFormProps>(({ formData, types, onFormSubmitted }, ref) => {

    const [subtypes, setSubtypes] = useState<ExamSubtype[]>([]);

    const [typeSelected, setTypeSelected] = useState<string | null>(null);
    const [subtypeSelected, setSubtypeSelected] = useState<string | null>(null);

    const handleFormSubmittionEvent = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!!subtypeSelected && !!typeSelected) {
            onFormSubmitted?.({
                type: parseInt(typeSelected),
                subtype: parseInt(subtypeSelected),
            });
        } else {
            notifications.show({ message: 'Debe seleccionar al menos un subtipo' });
        }
    }, [
        typeSelected,
        subtypeSelected,
        onFormSubmitted
    ]);

    const handleTypeSelectChange = useCallback((value: string | null, option: ComboboxItem) => {
        setTypeSelected(value ? option.value : null);
        setSubtypeSelected(null);
        if (value) {
            const found = types.find(e => e.id === parseInt(option.value))
            setSubtypes(found ? found.subtypes : []);
        } else {
            setSubtypes([]);
        }
    }, [types]);

    const handleSubtypeSelectChange = useCallback((value: string | null, option: ComboboxItem) => {
        setSubtypeSelected(value ? option.value : null);
    }, []);

    useEffect(() => {
        if (formData) {
            for (const type of types) {
                for (const subtype of type.subtypes) {
                    if (subtype.id === formData.subtype) {
                        setSubtypes(type.subtypes);
                        setTypeSelected(`${type.id}`);
                        setSubtypeSelected(`${subtype.id}`);
                        return;
                    }
                }
            }
        }
    }, [formData, types]);

    const typeOptions = useMemo(() => types.map(e => ({ value: `${e.id}`, label: e.name })), [types]);
    const subtypeOptions = useMemo(() => subtypes.map(e => ({ value: `${e.id}`, label: e.name })), [subtypes]);

    return (
        <Box
            component='form'
            onSubmit={handleFormSubmittionEvent}
        >
            <Select
                value={typeSelected}
                data={typeOptions}
                checkIconPosition="left"
                onChange={handleTypeSelectChange}
                label="Tipos de examenes"
                pb={rem(16)}
                placeholder="Escoge un tipo de examen"
                searchable
                clearable
                defaultDropdownOpened={false}
                nothingFoundMessage=""
                allowDeselect={false}
                maxDropdownHeight={200}
            />
            <Select
                value={subtypeSelected}
                data={subtypeOptions}
                checkIconPosition="left"
                onChange={handleSubtypeSelectChange}
                label="Subtipos de examenes"
                pb={rem(16)}
                placeholder="Escoge un subtipo de examen"
                searchable
                clearable
                defaultDropdownOpened={false}
                nothingFoundMessage=""
                allowDeselect={false}
                maxDropdownHeight={200}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>

        </Box>
    )
});

ExamSubtypeForm.displayName = 'ExamSubtypeForm';

export { ExamSubtypeForm }
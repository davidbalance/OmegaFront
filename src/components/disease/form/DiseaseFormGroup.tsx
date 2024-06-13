import { BaseFormProps } from "@/lib/types/base-form-prop";
import { Box, Button, ComboboxItem, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { joiResolver } from "mantine-form-joi-resolver";
import React, { FormEvent, useEffect, useState } from "react";

type DiseaseFormGroup = { group: number };

export type DiseaseFormGroupProps = BaseFormProps<DiseaseFormGroup> & {
    options: { value: string, label: string }[]
};
const DiseaseFormGroup = React.forwardRef<HTMLButtonElement, DiseaseFormGroupProps>(({ formData, onFormSubmitted, options }, ref) => {

    const [group, setGroup] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (formData) {
            setGroup(formData.group);
        }
    }, [formData]);

    const handleFormSubmitted = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (group) {
            onFormSubmitted?.({ group });
        } else {
            setError('Debe seleccionar una option');
        }
    }

    const handleChangeEventSelector = (_: string | null, options: ComboboxItem) => {
        setError(null);
        setGroup(parseInt(options.value));
    }

    return (
        <Box
            component='form'
            onSubmit={handleFormSubmitted}
            w='100%'
            maw={750}
        >
            <Select
                value={`${group}`}
                onChange={handleChangeEventSelector}
                label="Grupo de morbilidades"
                placeholder="Grupo"
                data={options}
                allowDeselect={false}
                searchable
                error={error}
            />
            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
})

DiseaseFormGroup.displayName = 'DiseaseFormGroup';

export default DiseaseFormGroup
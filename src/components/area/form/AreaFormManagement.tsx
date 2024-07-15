import { BaseFormProps } from "@/lib/types/base-form-prop";
import { Box, Button, ComboboxItem, Select } from "@mantine/core";
import React, { FormEvent, useEffect, useState } from "react";

type FormType = { management: number };

export interface AreaFormManagementProps extends BaseFormProps<FormType> {
    /**
     * Valores que inicializan el selector del formulario.
     */
    options: { value: string, label: string }[];
};
const AreaFormManagement = React.forwardRef<HTMLButtonElement, AreaFormManagementProps>(({ formData, onFormSubmitted, options }, ref) => {

    const [management, setGroup] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (formData) {
            setGroup(formData.management);
        }
    }, [formData]);

    const handleFormSubmitted = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (management) {
            onFormSubmitted?.({ management });
        } else {
            setError('Debe seleccionar una opcion');
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
                value={`${management}`}
                onChange={handleChangeEventSelector}
                label="Gerencias"
                placeholder="Gerencia"
                data={options}
                allowDeselect={false}
                searchable
                error={error}
            />
            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
})

AreaFormManagement.displayName = 'AreaFormManagement';

export default AreaFormManagement
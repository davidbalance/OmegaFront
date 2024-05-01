import OmegaComboBox from '@/components/combobox/OmegaComboBox';
import { SelectorOption } from '@/lib';
import { BaseFormProps } from '@/lib/types/base-form-prop';
import { Disease } from '@/services/api/disease/dtos';
import { Box, Button, TextInput, rem, useCombobox } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import React, { useEffect, useState } from 'react'

export type DiseaseForm = Omit<Disease, 'id' | 'group'> & {
    group: number
};

const diseaseSchema = Joi.object({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Especifique un nombre'
        }),
});
type DiseaseFormProps = BaseFormProps<DiseaseForm> & {
    options: SelectorOption<number>[];
}
const DiseaseForm = React.forwardRef<HTMLButtonElement, DiseaseFormProps>(({ formData, options, onFormSubmitted }, ref) => {

    const [value, setValue] = useState<SelectorOption<number> | null>(null);
    const [error, setError] = useState<string | undefined>(undefined);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const form = useForm({
        initialValues: {
            name: formData?.name || '',
        },
        validate: joiResolver(diseaseSchema)
    });

    useEffect(() => {
        if (formData) {
            const index = options.findIndex(e => e.key === formData?.group);
            handleComboBoxChange(index);
        }
        return () => { }
    }, [formData])

    const handleForm = (data: any) => {
        if (!value) {
            setError('Debe seleccionar un grupo de morbilidades');
            return;
        }
        onFormSubmitted({ ...data, group: value?.key });
    }

    const handleComboBoxChange = (index: number) => {
        setError(undefined);
        setValue(options[index]);
    }

    return (
        <Box component='form' onSubmit={form.onSubmit(handleForm)}>

            <OmegaComboBox
                value={options.findIndex(e => e.key === formData?.group)}
                options={options.map((e) => e.label)}
                onChange={handleComboBoxChange}
                inputProps={{ error: error, label: "Escoge un grupo de morbilidades", mb: rem(16) }} />

            <TextInput
                label="Nombre del grupo de morbilidades"
                placeholder="Grupo de morbilidades"
                leftSection={<IconSignature stroke={1.5} />}
                {...form.getInputProps('name')}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
})

export default DiseaseForm
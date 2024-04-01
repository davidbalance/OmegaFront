import OmegaComboBox from '@/components/combobox/OmegaComboBox';
import { SelectorOption } from '@/lib';
import { Disease } from '@/services';
import { Box, Button, TextInput, useCombobox } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import React, { useState } from 'react'

type IDiseaseForm = Omit<Disease, 'id'>;

const diseaseSchema = Joi.object<IDiseaseForm>({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Especifique un nombre'
        }),
});
type DiseaseFormProps = {
    data?: any;
    groups: SelectorOption<number>[];
    onSubmit: (values: IDiseaseForm & { option: SelectorOption<number> }) => void;
}
const DiseaseForm = React.forwardRef<HTMLButtonElement, DiseaseFormProps>(({ data, groups, onSubmit }, ref) => {

    const [value, setValue] = useState<SelectorOption<number> | null>(null);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const form = useForm({
        initialValues: {
            name: data?.name || '',
        },
        validate: joiResolver(diseaseSchema)
    });

    const handleForm = (data: any) => {
        onSubmit({ ...data, option: value });
    }

    return (
        <Box component='form' onSubmit={form.onSubmit(handleForm)}>

            <OmegaComboBox
                options={groups}
                onChange={setValue} />

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
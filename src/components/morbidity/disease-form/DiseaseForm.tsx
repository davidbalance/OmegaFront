import OmegaComboBox from '@/components/combobox/OmegaComboBox';
import { SelectorOption } from '@/lib';
import { Disease as DiseaseType } from '@/services';
import { Box, Button, TextInput, useCombobox } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import React, { useState } from 'react'

type IDiseaseForm = Omit<DiseaseType, 'id'>;

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
    data?: DiseaseType;
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
                value={groups.findIndex(e => e.key === data?.group.id)}
                options={groups.map((e) => e.label)}
                onChange={(i) => setValue(groups[i])} />

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
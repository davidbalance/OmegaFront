import { MorbidityGroupModel, MorbidityModel } from '@/services';
import { Box, Button, Combobox, Input, InputBase, TextInput, useCombobox } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import React, { useState } from 'react'

type IMorbidityForm = Omit<MorbidityModel, 'id'>;

const morbiditySchema = Joi.object<IMorbidityForm>({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Especifique un nombre'
        }),
});
type MorbidityFormProps = {
    data?: any;
    groups: MorbidityGroupModel[];
    onSubmit: (values: IMorbidityForm) => void;
}
const MorbidityForm = React.forwardRef<HTMLButtonElement, MorbidityFormProps>(({ data, groups, onSubmit }, ref) => {

    const [value, setValue] = useState<MorbidityGroupModel | null>(null);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const form = useForm({
        initialValues: {
            name: data?.name || '',
        },
        validate: joiResolver(morbiditySchema)
    });

    const handleForm = (data: any) => {
        onSubmit(data);
    }


    const options = groups.map((item, index) => (
        <Combobox.Option value={`${index}`} key={index}>
            {item.name}
        </Combobox.Option>
    ));

    return (
        <Box component='form' onSubmit={form.onSubmit(handleForm)}>
            <TextInput
                label="Nombre del grupo de morbilidades"
                placeholder="Grupo de morbilidades"
                leftSection={<IconSignature stroke={1.5} />}
                {...form.getInputProps('name')}
            />

            <br />

            <Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                    setValue(groups[parseInt(val)]);
                    combobox.closeDropdown();
                }}
            >
                <Combobox.Target>
                    <InputBase
                        component="button"
                        type="button"
                        pointer
                        rightSection={<Combobox.Chevron />}
                        rightSectionPointerEvents="none"
                        onClick={() => combobox.toggleDropdown()}
                    >
                        {value?.name || <Input.Placeholder>Pick value</Input.Placeholder>}
                    </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
                        {options}
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
})

export default MorbidityForm
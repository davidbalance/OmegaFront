import { NavIcon } from '@/components/navbar/NavIcon';
import { OmegaWebResource } from '@/lib/dtos/omega/web/resource/base.response.dto';
import { Box, SimpleGrid, rem, TextInput, Button, Select, Stack, Group } from '@mantine/core'
import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi'
import React, { FormEvent, useMemo } from 'react'

const resourceSchema = Joi.object({
    name: Joi
        .string()
        .empty()
        .messages({
            "string.empty": 'Especifique un nombre'
        }),
    address: Joi
        .string()
        .empty()
        .messages({
            "string.empty": 'Especifique una direccion'
        }),
    icon: Joi
        .string()
        .empty()
        .messages({
            "string.empty": 'Especifique un icono'
        }),
    label: Joi
        .string()
        .empty()
        .messages({
            "string.empty": 'Especifique una etiqueta'
        })
});

type FormProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref'> & Partial<Pick<OmegaWebResource, 'address' | 'icon' | 'label' | 'name'>>
interface DeveloperPageFormProps extends FormProps { }
const DeveloperPageForm = React.forwardRef<HTMLFormElement, DeveloperPageFormProps>(({
    address,
    icon,
    label,
    name,
    onSubmit,
    ...props
}, ref) => {

    const form = useForm({
        initialValues: {
            name: name || '',
            address: address || '',
            icon: icon || Object.keys(NavIcon)[0],
            label: label || ''
        },
        validate: joiResolver(resourceSchema)
    });

    const options = useMemo((): string[] => Object.keys(NavIcon), []);

    const Icon = useMemo(() => NavIcon[form.values.icon as any], [form.values.icon]);

    const handleSubmit = (_: any, event: FormEvent<HTMLFormElement> | undefined) => {
        if (event) {
            onSubmit?.(event);
        }
    }

    return (
        <Box
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            ref={ref}
            {...props}>
            <Stack gap={rem(16)}>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput
                        name='name'
                        label="Recurso"
                        placeholder="Recurso"
                        {...form.getInputProps('name')} />
                    <TextInput
                        name='label'
                        label="Etiqueta"
                        placeholder="Etiqueta"
                        {...form.getInputProps('label')} />
                </SimpleGrid>

                <TextInput
                    name='address'
                    label="Direccion"
                    placeholder="/path/to/route"
                    {...form.getInputProps('address')} />

                <Group align='center' wrap='nowrap'>
                    <Icon />
                    <Select
                        w='100%'
                        name='icon'
                        data={options}
                        checkIconPosition="left"
                        label="Morbilidades"
                        pb={rem(16)}
                        placeholder="Escoge un icono"
                        searchable
                        defaultDropdownOpened={false}
                        nothingFoundMessage="Icono no encontrado"
                        allowDeselect={false}
                        maxDropdownHeight={200}
                        {...form.getInputProps('icon')}
                    />
                </Group>
            </Stack>
            <Button type='submit' style={{ display: 'none' }} />

        </Box>
    )
})

DeveloperPageForm.displayName = 'DeveloperPageForm';

export default DeveloperPageForm;
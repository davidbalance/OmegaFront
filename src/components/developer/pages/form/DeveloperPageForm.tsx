import { NavIcon } from '@/components/navbar/NavIcon';
import { POSTWebFullResourceRequestDto } from '@/lib/dtos/web/resources.request.dto';
import { Box, SimpleGrid, rem, TextInput, Button, Select, Grid, Flex } from '@mantine/core'
import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi'
import React, { useCallback, useMemo } from 'react'

const resourceSchema = Joi.object<POSTWebFullResourceRequestDto>({
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
            "string.empty": 'Especifique un apellido'
        }),
    icon: Joi
        .string()
        .empty()
        .messages({
            "string.empty": 'Especifique un apellido'
        }),
    label: Joi
        .string()
        .empty()
        .messages({
            "string.empty": 'Especifique un apellido'
        })
});

interface DeveloperPageFormProps {
    /**
     * Datos para ser precargados cuando el componente es montado. 
     */
    data?: POSTWebFullResourceRequestDto;
    /**
     * Funcion que es llamada cuando se envia el formulario.
     */
    onFormSubmittion: (data: POSTWebFullResourceRequestDto) => void;
}
const DeveloperPageForm = React.forwardRef<HTMLButtonElement, DeveloperPageFormProps>(({ data, onFormSubmittion }, ref) => {

    const form = useForm({
        initialValues: {
            name: data?.name || '',
            address: data?.address || '',
            icon: data?.icon || Object.keys(NavIcon)[0],
            label: data?.label || ''
        },
        validate: joiResolver(resourceSchema)
    });

    const options = useMemo((): string[] => Object.keys(NavIcon), []);

    const Icon = useMemo(() => NavIcon[form.values.icon as any], [form.values.icon]);

    const handleFormSubmittion = useCallback((formData: POSTWebFullResourceRequestDto) => {
        onFormSubmittion(formData);
    }, [onFormSubmittion]);

    return (
        <Box component='form' onSubmit={form.onSubmit(handleFormSubmittion)}>
            <Flex direction='column' gap={rem(16)}>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput
                        label="Recurso"
                        placeholder="Recurso"
                        {...form.getInputProps('name')} />
                    <TextInput
                        label="Etiqueta"
                        placeholder="Etiqueta"
                        {...form.getInputProps('label')} />
                </SimpleGrid>

                <TextInput
                    label="Direccion"
                    placeholder="/path/to/route"
                    {...form.getInputProps('address')} />

                <Grid>
                    <Grid.Col span={1}>
                        <Flex
                            h='100%'
                            justify='center'
                            align='center'>
                            <Icon />
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={11}>
                        <Select
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
                    </Grid.Col>
                </Grid>
            </Flex>
            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>

        </Box>
    )
})

DeveloperPageForm.displayName = 'DeveloperPageForm';

export { DeveloperPageForm }
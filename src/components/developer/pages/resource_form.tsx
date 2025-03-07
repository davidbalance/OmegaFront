'use client'

import { NavIcon } from '@/components/navbar/NavIcon';
import { CreateResourcePayload } from '@/server/resource/server_types';
import { SimpleGrid, rem, TextInput, Button, Select, Stack, Group } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import { z } from 'zod';
import ResourceSchema from './schema/resource.schema';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { IconDeviceFloppy } from '@tabler/icons-react';

type ResourceFormProps = Partial<Omit<CreateResourcePayload, 'order'>> & {
    useOrder?: boolean;
    loading?: boolean;
    onSubmit: (value: z.infer<typeof ResourceSchema>) => void;
};
const ResourceForm: React.FC<ResourceFormProps> = ({
    address,
    icon,
    label,
    useOrder,
    loading,
    onSubmit
}) => {

    const form = useForm<z.infer<typeof ResourceSchema>>({
        initialValues: {
            address: address ?? '',
            icon: icon ?? 'user',
            label: label ?? '',
            order: 0
        },
        validate: zodResolver(ResourceSchema)
    });

    const options = useMemo((): string[] => Object.keys(NavIcon), []);

    const Icon = useMemo(() => NavIcon[form.values.icon as any], [form.values.icon]);

    const handleSubmit = useCallback((value: z.infer<typeof ResourceSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <ModularBox>
                <Stack gap={rem(16)}>
                    <SimpleGrid cols={{ base: 1, sm: useOrder ? 2 : 1 }}>
                        {useOrder && <TextInput
                            label="Orden"
                            placeholder="Orden"
                            type='number'
                            {...form.getInputProps('order')} />}
                        <TextInput
                            label="Etiqueta"
                            placeholder="Etiqueta"
                            {...form.getInputProps('label')} />
                    </SimpleGrid>

                    <TextInput
                        label="Direccion"
                        placeholder="/path/to/route"
                        {...form.getInputProps('address')} />

                    <Group align='center' wrap='nowrap'>
                        <Icon />
                        <Select
                            w='100%'
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
            </ModularBox>

            <ModularBox>
                <Button
                    fullWidth
                    flex={1}
                    size='xs'
                    type='submit'
                    loading={loading}
                    leftSection={(
                        <IconDeviceFloppy
                            style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </ModularBox>
        </form>
    )
}

export default ResourceForm;
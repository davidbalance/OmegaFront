'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import LifestyleSchema from './schemas/lifestyle.schema'
import { z } from 'zod';
import { Box, Checkbox, Group, rem, SimpleGrid, Stack, TextInput } from '@mantine/core';

type LifestyleFormProps = {
    data?: Partial<z.infer<typeof LifestyleSchema>>,
    onSubmit?: (value: z.infer<typeof LifestyleSchema>) => void;
}
const LifestyleForm = React.forwardRef<HTMLFormElement, LifestyleFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof LifestyleSchema>>({
        initialValues: {
            lifestylePhysicalActivityActive: data?.lifestylePhysicalActivityActive || false,
            lifestylePhysicalActivityType: data?.lifestylePhysicalActivityType || '',
            lifestylePhysicalActivityDuration: data?.lifestylePhysicalActivityDuration || 0,
            lifestyleMedicationTaking: data?.lifestyleMedicationTaking || false,
            lifestyleMedicationName: data?.lifestyleMedicationName || '',
            lifestyleMedicationQuantity: data?.lifestyleMedicationQuantity || 0,
        },
        validate: zodResolver(LifestyleSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof LifestyleSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Stack gap={rem(16)}>
                <Group
                    gap={rem(32)}
                    justify='start'
                    align='center'>
                    <Checkbox
                        label="ACTIVIDAD FISICA"
                        {...form.getInputProps('lifestylePhysicalActivityActive')}
                    />
                    <SimpleGrid cols={{ base: 1, sm: 2 }} flex={1}>
                        <TextInput
                            disabled={!form.values.lifestylePhysicalActivityActive}
                            label="¿CÚAL?"
                            {...form.getInputProps('lifestylePhysicalActivityType')} />
                        <TextInput
                            label="TIEMPO"
                            disabled={!form.values.lifestylePhysicalActivityActive}
                            {...form.getInputProps('lifestylePhysicalActivityDuration')} />
                    </SimpleGrid>
                </Group>
                <Group
                    gap={rem(32)}
                    justify='start'
                    align='center'>
                    <Checkbox
                        label="MEDICACION HABITUAL"
                        {...form.getInputProps('lifestyleMedicationTaking')}
                    />
                    <SimpleGrid cols={{ base: 1, sm: 2 }} flex={1}>
                        <TextInput
                            disabled={!form.values.lifestyleMedicationTaking}
                            label="¿CÚAL?"
                            {...form.getInputProps('lifestyleMedicationName')} />
                        <TextInput
                            disabled={!form.values.lifestyleMedicationTaking}
                            label="CANTIDAD"
                            type='number'
                            min={1}
                            {...form.getInputProps('lifestyleMedicationQuantity')} />
                    </SimpleGrid>
                </Group>
            </Stack>
        </Box>
    )
});

LifestyleForm.displayName = 'LifestyleForm'

export default LifestyleForm
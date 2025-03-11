'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialLifestyleSchema from '../_schemas/initial-lifestyle.schema'
import { z } from 'zod';
import { Box, Checkbox, Divider, Group, rem, ScrollArea, SimpleGrid, Stack, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';

type InitialLifestyleFormProps = {
    data?: Partial<z.infer<typeof InitialLifestyleSchema>>,
    onSubmit?: (value: z.infer<typeof InitialLifestyleSchema>) => void;
}
const InitialLifestyleForm = React.forwardRef<HTMLFormElement, InitialLifestyleFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof InitialLifestyleSchema>>({
        initialValues: {
            lifestylePhysicalActivityActive: data?.lifestylePhysicalActivityActive || false,
            lifestylePhysicalActivityType: data?.lifestylePhysicalActivityType || '',
            lifestylePhysicalActivityDuration: data?.lifestylePhysicalActivityDuration || 0,
            lifestyleMedicationTaking: data?.lifestyleMedicationTaking || false,
            lifestyleMedicationName: data?.lifestyleMedicationName || '',
            lifestyleMedicationQuantity: data?.lifestyleMedicationQuantity || 0,
        },
        validate: zodResolver(InitialLifestyleSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof InitialLifestyleSchema>) => {
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

InitialLifestyleForm.displayName = 'InitialLifestyleForm'

export default InitialLifestyleForm
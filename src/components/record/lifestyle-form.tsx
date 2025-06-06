'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import LifestyleSchema, { adjustInitialValue } from './schemas/lifestyle.schema'
import { z } from 'zod';
import { Box, Checkbox, Group, rem, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';

type LifestyleFormProps = {
    data?: Partial<z.infer<typeof LifestyleSchema>>,
    onSubmit?: (value: z.infer<typeof LifestyleSchema>) => void;
}
const LifestyleForm = React.forwardRef<HTMLFormElement, LifestyleFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof LifestyleSchema>>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(LifestyleSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof LifestyleSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Antecedentes Personales</Title>
            <Title order={5} c="dimmed">Estilo de vida</Title>
            <Box
                mt={rem(16)}
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
                            label="Actividad física"
                            checked={form.values.lifestylePhysicalActivity}
                            {...form.getInputProps('lifestylePhysicalActivity')}
                        />
                        <SimpleGrid cols={{ base: 1, sm: 2 }} flex={1}>
                            <Textarea
                                disabled={!form.values.lifestylePhysicalActivity}
                                label="¿Cuál?"
                                rows={3}
                                {...form.getInputProps('lifestylePhysicalActivityType')} />
                            <TextInput
                                label="Tiempo / Cantidad"
                                disabled={!form.values.lifestylePhysicalActivity}
                                {...form.getInputProps('lifestylePhysicalActivityTimeQty')} />
                        </SimpleGrid>
                    </Group>
                    <Group
                        gap={rem(32)}
                        justify='start'
                        align='center'>
                        <Checkbox
                            label="Medicación habitual"
                            checked={form.values.lifestyleMedication}
                            {...form.getInputProps('lifestyleMedication')}
                        />
                        <SimpleGrid cols={{ base: 1, sm: 2 }} flex={1}>
                            <Textarea
                                disabled={!form.values.lifestyleMedication}
                                label="¿Cuál?"
                                rows={3}
                                {...form.getInputProps('lifestyleMedicationName')} />
                            <TextInput
                                disabled={!form.values.lifestyleMedication}
                                label="Tiempo / Cantidad"
                                min={1}
                                {...form.getInputProps('lifestyleMedicationTimeQty')} />
                        </SimpleGrid>
                    </Group>
                </Stack>
            </Box>
        </>
    )
});

LifestyleForm.displayName = 'LifestyleForm'

export default LifestyleForm
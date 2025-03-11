'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialToxicHabitsSchema from '../_schemas/initial-toxic-habits.schema'
import { z } from 'zod';
import { Box, Checkbox, Divider, Group, rem, ScrollArea, SimpleGrid, Stack, Textarea, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';


type InitialToxicHabitsFormProps = {
    data?: Partial<z.infer<typeof InitialToxicHabitsSchema>>,
    onSubmit?: (value: z.infer<typeof InitialToxicHabitsSchema>) => void;
}
const InitialToxicHabitsForm = React.forwardRef<HTMLFormElement, InitialToxicHabitsFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof InitialToxicHabitsSchema>>({
        initialValues: {
            toxicHabitTobacco: { consumer: false, consumed: false, consumptionTime: 0, other: '', quantity: 0, timeOfAbstinence: 0 },
            toxicHabitAlcohol: { consumer: false, consumed: false, consumptionTime: 0, other: '', quantity: 0, timeOfAbstinence: 0 },
            toxicHabitOther: { consumer: false, consumed: false, consumptionTime: 0, other: '', quantity: 0, timeOfAbstinence: 0 },
        },
        validate: zodResolver(InitialToxicHabitsSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof InitialToxicHabitsSchema>) => {
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
                        label="TABACCO"
                        {...form.getInputProps('toxicHabitTobacco.consumer')}
                    />
                    <SimpleGrid cols={{ base: 1, sm: 2 }} flex={1}>
                        <TextInput
                            disabled={!form.values.toxicHabitTobacco.consumer}
                            label="TIEMPO DE CONSUMO (AÑOS)"
                            type='number'
                            min={1}
                            {...form.getInputProps('toxicHabitTobacco.consumptionTime')} />
                        <TextInput
                            label="CANTIDAD"
                            disabled={!form.values.toxicHabitTobacco.consumer}
                            {...form.getInputProps('toxicHabitTobacco.quantity')} />
                        <Checkbox
                            label="EX CONSUMIDOR"
                            disabled={!form.values.toxicHabitTobacco.consumer}
                            {...form.getInputProps('toxicHabitTobacco.consumed')}
                        />
                        <TextInput
                            label="TIEMPO DE ABSTINENCIA (MESES)"
                            disabled={!form.values.toxicHabitTobacco.consumer}
                            {...form.getInputProps('toxicHabitTobacco.timeOfAbstinence')} />
                    </SimpleGrid>
                </Group>
                <Group
                    gap={rem(32)}
                    justify='start'
                    align='center'>
                    <Checkbox
                        label="ALCOHOL"
                        {...form.getInputProps('toxicHabitAlcohol.consumer')}
                    />
                    <SimpleGrid cols={{ base: 1, sm: 2 }} flex={1}>
                        <TextInput
                            disabled={!form.values.toxicHabitAlcohol.consumer}
                            label="TIEMPO DE CONSUMO (AÑOS)"
                            type='number'
                            min={1}
                            {...form.getInputProps('toxicHabitAlcohol.consumptionTime')} />
                        <TextInput
                            label="CANTIDAD"
                            disabled={!form.values.toxicHabitAlcohol.consumer}
                            {...form.getInputProps('toxicHabitAlcohol.quantity')} />
                        <Checkbox
                            label="EX CONSUMIDOR"
                            disabled={!form.values.toxicHabitAlcohol.consumer}
                            {...form.getInputProps('toxicHabitAlcohol.consumed')}
                        />
                        <TextInput
                            label="TIEMPO DE ABSTINENCIA (MESES)"
                            disabled={!form.values.toxicHabitAlcohol.consumer}
                            {...form.getInputProps('toxicHabitAlcohol.timeOfAbstinence')} />
                    </SimpleGrid>
                </Group>
                <Group
                    gap={rem(32)}
                    justify='start'
                    align='center'>
                    <Stack>
                        <Checkbox
                            label="OTRO"
                            {...form.getInputProps('toxicHabitOther.consumer')}
                        />
                        <TextInput
                            disabled={!form.values.toxicHabitOther.consumer}
                            label="OTROS"
                            {...form.getInputProps('toxicHabitOther.other')} />
                    </Stack>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} flex={1}>
                        <TextInput
                            disabled={!form.values.toxicHabitOther.consumer}
                            label="TIEMPO DE CONSUMO (AÑOS)"
                            type='number'
                            min={1}
                            {...form.getInputProps('toxicHabitOther.consumptionTime')} />
                        <TextInput
                            label="CANTIDAD"
                            disabled={!form.values.toxicHabitOther.consumer}
                            {...form.getInputProps('toxicHabitOther.quantity')} />
                        <Checkbox
                            label="EX CONSUMIDOR"
                            disabled={!form.values.toxicHabitOther.consumer}
                            {...form.getInputProps('toxicHabitOther.consumed')}
                        />
                        <TextInput
                            label="TIEMPO DE ABSTINENCIA (MESES)"
                            disabled={!form.values.toxicHabitOther.consumer}
                            {...form.getInputProps('toxicHabitOther.timeOfAbstinence')} />
                    </SimpleGrid>
                </Group>
            </Stack>
        </Box >
    )
});

InitialToxicHabitsForm.displayName = 'InitialToxicHabitsForm'

export default InitialToxicHabitsForm
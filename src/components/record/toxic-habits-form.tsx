'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import ToxicHabitsSchema from './schemas/toxic-habits.schema'
import { z } from 'zod';
import { Box, Checkbox, Group, rem, SimpleGrid, Stack, TextInput } from '@mantine/core';


type ToxicHabitsFormProps = {
    data?: Partial<z.infer<typeof ToxicHabitsSchema>>,
    onSubmit?: (value: z.infer<typeof ToxicHabitsSchema>) => void;
}
const ToxicHabitsForm = React.forwardRef<HTMLFormElement, ToxicHabitsFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof ToxicHabitsSchema>>({
        initialValues: {
            toxicHabitTobacco: data?.toxicHabitTobacco ?? { consumer: false, consumed: false, consumptionTime: 0, other: '', quantity: 1, timeOfAbstinence: 0 },
            toxicHabitAlcohol: data?.toxicHabitAlcohol ?? { consumer: false, consumed: false, consumptionTime: 0, other: '', quantity: 1, timeOfAbstinence: 0 },
            toxicHabitOther: data?.toxicHabitOther ?? { consumer: false, consumed: false, consumptionTime: 0, other: '', quantity: 1, timeOfAbstinence: 0 },
        },
        validate: zodResolver(ToxicHabitsSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof ToxicHabitsSchema>) => {
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
                        checked={form.values.toxicHabitTobacco.consumer}
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
                            checked={form.values.toxicHabitTobacco.consumed}
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
                        checked={form.values.toxicHabitAlcohol.consumer}
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
                            checked={form.values.toxicHabitAlcohol.consumed}
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
                            checked={form.values.toxicHabitOther.consumer}
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
                            checked={form.values.toxicHabitOther.consumed}
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

ToxicHabitsForm.displayName = 'ToxicHabitsForm'

export default ToxicHabitsForm
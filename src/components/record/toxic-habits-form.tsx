'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import ToxicHabitsSchema, { adjustInitialValue } from './schemas/toxic-habits.schema'
import { z } from 'zod';
import { Box, Checkbox, Divider, Group, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';


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
            toxicHabitTobacco: adjustInitialValue({ ...data?.toxicHabitTobacco, name: "Tobacco" }),
            toxicHabitAlcohol: adjustInitialValue({ ...data?.toxicHabitAlcohol, name: "Alcohol" }),
            toxicHabitOther: adjustInitialValue(data?.toxicHabitOther),
        },
        validate: zodResolver(ToxicHabitsSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof ToxicHabitsSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Antecedentes Personales</Title>
            <Title order={5} c="dimmed">Hábitos tóxicos</Title>
            <Box
                mt={rem(16)}
                ref={ref}
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Stack gap={rem(32)}>
                    <Box>
                        <Divider label='Tabaco' />
                        <Group
                            gap={rem(32)}
                            justify='start'
                            align='center'>
                            <Checkbox
                                label="Tabaco"
                                checked={form.values.toxicHabitTobacco.haveConsume}
                                {...form.getInputProps('toxicHabitTobacco.haveConsume')}
                            />
                            <SimpleGrid cols={{ base: 1, sm: 2 }} flex={1}>
                                <TextInput
                                    disabled={!form.values.toxicHabitTobacco.haveConsume}
                                    label="Tiempo de consumo (meses)"
                                    type='number'
                                    min={1}
                                    {...form.getInputProps('toxicHabitTobacco.consumptionTime')} />
                                <TextInput
                                    label="Cantidad"
                                    disabled={!form.values.toxicHabitTobacco.haveConsume}
                                    {...form.getInputProps('toxicHabitTobacco.quantity')} />
                                <Checkbox
                                    label="Ex consumidor"
                                    checked={form.values.toxicHabitTobacco.isExConsumer}
                                    disabled={!form.values.toxicHabitTobacco.haveConsume}
                                    {...form.getInputProps('toxicHabitTobacco.isExConsumer')}
                                />
                                <TextInput
                                    label="Tiempo de abstinencia (meses)"
                                    disabled={!form.values.toxicHabitTobacco.haveConsume || !form.values.toxicHabitTobacco.isExConsumer}
                                    {...form.getInputProps('toxicHabitTobacco.timeOfAbstinence')} />
                            </SimpleGrid>
                        </Group>
                    </Box>
                    <Box>
                        <Divider label='Alcohol' />
                        <Group
                            gap={rem(32)}
                            justify='start'
                            align='center'>
                            <Checkbox
                                label="Alcohol"
                                checked={form.values.toxicHabitAlcohol.haveConsume}
                                {...form.getInputProps('toxicHabitAlcohol.haveConsume')}
                            />
                            <SimpleGrid cols={{ base: 1, sm: 2 }} flex={1}>
                                <TextInput
                                    disabled={!form.values.toxicHabitAlcohol.haveConsume}
                                    label="Tiempo de consumo (meses)"
                                    type='number'
                                    min={1}
                                    {...form.getInputProps('toxicHabitAlcohol.consumptionTime')} />
                                <TextInput
                                    label="Cantidad"
                                    disabled={!form.values.toxicHabitAlcohol.haveConsume}
                                    {...form.getInputProps('toxicHabitAlcohol.quantity')} />
                                <Checkbox
                                    label="Ex consumidor"
                                    checked={form.values.toxicHabitAlcohol.isExConsumer}
                                    disabled={!form.values.toxicHabitAlcohol.haveConsume}
                                    {...form.getInputProps('toxicHabitAlcohol.isExConsumer')}
                                />
                                <TextInput
                                    label="Tiempo de abstinencia (meses)"
                                    disabled={!form.values.toxicHabitAlcohol.haveConsume || !form.values.toxicHabitAlcohol.isExConsumer}
                                    {...form.getInputProps('toxicHabitAlcohol.timeOfAbstinence')} />
                            </SimpleGrid>
                        </Group>
                    </Box>
                    <Box>
                        <Divider label='Otros' />
                        <Group
                            gap={rem(32)}
                            justify='start'
                            align='center'>
                            <Stack>
                                <Checkbox
                                    label="Otros"
                                    checked={form.values.toxicHabitOther.haveConsume}
                                    {...form.getInputProps('toxicHabitOther.haveConsume')}
                                />
                                <TextInput
                                    disabled={!form.values.toxicHabitOther.haveConsume}
                                    {...form.getInputProps('toxicHabitOther.name')} />
                            </Stack>
                            <SimpleGrid cols={{ base: 1, sm: 2 }} flex={1}>
                                <TextInput
                                    disabled={!form.values.toxicHabitOther.haveConsume}
                                    label="Tiempo de consumo (meses)"
                                    type='number'
                                    min={1}
                                    {...form.getInputProps('toxicHabitOther.consumptionTime')} />
                                <TextInput
                                    label="Cantidad"
                                    disabled={!form.values.toxicHabitOther.haveConsume}
                                    {...form.getInputProps('toxicHabitOther.quantity')} />
                                <Checkbox
                                    label="Ex consumidor"
                                    checked={form.values.toxicHabitOther.isExConsumer}
                                    disabled={!form.values.toxicHabitOther.haveConsume}
                                    {...form.getInputProps('toxicHabitOther.isExConsumer')}
                                />
                                <TextInput
                                    label="Tiempo de abstinencia (meses)"
                                    disabled={!form.values.toxicHabitOther.haveConsume || !form.values.toxicHabitOther.isExConsumer}
                                    {...form.getInputProps('toxicHabitOther.timeOfAbstinence')} />
                            </SimpleGrid>
                        </Group>
                    </Box>

                </Stack>
            </Box >
        </>
    )
});

ToxicHabitsForm.displayName = 'ToxicHabitsForm'

export default ToxicHabitsForm
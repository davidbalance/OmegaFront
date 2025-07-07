'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import LifestyleSchema, { adjustInitialValue } from './schemas/lifestyle.schema'
import { z } from 'zod';
import { ActionIcon, Box, Checkbox, Group, rem, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

type LifestyleFormProps = {
    data?: Partial<Omit<z.infer<typeof LifestyleSchema>, 'lifestyleMedicationName' | 'lifestyleMedicationTimeQty'> & {
        lifestyleMedicationName: string,
        lifestyleMedicationTimeQty: string
    }>,
    onSubmit?: (value: Omit<z.infer<typeof LifestyleSchema>, 'lifestyleMedicationName' | 'lifestyleMedicationTimeQty'> & {
        lifestyleMedicationName: string,
        lifestyleMedicationTimeQty: string
    }) => void;
}
const LifestyleForm = React.forwardRef<HTMLFormElement, LifestyleFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof LifestyleSchema>>({
        initialValues: adjustInitialValue({
            ...data,
            lifestyleMedicationName: data?.lifestyleMedicationName?.split('\n').filter(e => !!e),
            lifestyleMedicationTimeQty: data?.lifestyleMedicationTimeQty?.split('\n').filter(e => !!e)
        }),
        validate: zodResolver(LifestyleSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof LifestyleSchema>) => {
        console.log(value.lifestyleMedicationName.join('\n'), value.lifestyleMedicationTimeQty.join('\n'))
        onSubmit?.({
            ...value,
            lifestyleMedicationName: value.lifestyleMedicationName.filter(e => !!e).join('\n'),
            lifestyleMedicationTimeQty: value.lifestyleMedicationTimeQty.filter(e => !!e).join('\n')
        });
    }, [onSubmit]);

    const handleAdd = useCallback(() => {
        form.setValues(prev => ({
            ...prev,
            lifestyleMedicationName: [...(prev.lifestyleMedicationName ?? []), ""],
            lifestyleMedicationTimeQty: [...(prev.lifestyleMedicationTimeQty ?? []), ""],
        }));
    }, [form]);

    const handleRemove = useCallback((index: number) => {
        form.setValues(prev => ({
            ...prev,
            lifestyleMedicationName: [...(prev.lifestyleMedicationName?.slice(0, index) ?? []), ...(prev.lifestyleMedicationName?.slice(index + 1) ?? [])],
            lifestyleMedicationTimeQty: [...(prev.lifestyleMedicationTimeQty?.slice(0, index) ?? []), ...(prev.lifestyleMedicationTimeQty?.slice(index + 1) ?? [])],
        }));
    }, [form]);

    const handleMedicationChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
        console.log(e.target.checked)
        if (e.target.checked) {
            form.setValues(prev => ({
                ...prev,
                lifestyleMedicationName: [""],
                lifestyleMedicationTimeQty: [""],
            }));
        } else {
            form.setValues(prev => ({
                ...prev,
                lifestyleMedicationName: [],
                lifestyleMedicationTimeQty: [],
            }));
        }
        form.setValues(prev => ({ ...prev, lifestyleMedication: e.target.checked }))
    }, [form]);

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
                            onChange={handleMedicationChange}
                        />
                        <Stack gap={rem(32)} w='100%'>
                            {form.values.lifestyleMedicationName.map((_, i) => {
                                const medicationNameKey = `lifestyleMedicationName.${i}`;
                                const medicationQtyKey = `lifestyleMedicationTimeQty.${i}`;

                                const iterativeKey = `${medicationNameKey}_${medicationQtyKey}`

                                return (
                                    <Stack key={i}>
                                        <Group component='div' w='100%'>
                                            <Stack>
                                                {form.values.lifestyleMedicationName.length - 1 === i && <ActionIcon
                                                    variant='light'
                                                    onClick={handleAdd}>
                                                    <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                                </ActionIcon>}
                                                {form.values.lifestyleMedicationName.length > 1
                                                    && <ActionIcon variant='light'
                                                        onClick={() => handleRemove(i)}>
                                                        <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                                    </ActionIcon>}
                                            </Stack>
                                            <SimpleGrid cols={{ base: 1, sm: 2 }} flex={1}>
                                                <TextInput
                                                    disabled={!form.values.lifestyleMedication}
                                                    label="¿Cuál?"
                                                    {...form.getInputProps(medicationNameKey)} />
                                                <TextInput
                                                    disabled={!form.values.lifestyleMedication}
                                                    label="Tiempo / Cantidad"
                                                    min={1}
                                                    {...form.getInputProps(medicationQtyKey)} />
                                            </SimpleGrid>
                                        </Group>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </Group>
                </Stack>
            </Box>
        </>
    )
});

LifestyleForm.displayName = 'LifestyleForm'

export default LifestyleForm
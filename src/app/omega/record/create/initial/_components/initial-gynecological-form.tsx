'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialGynecologicalSchema from '../_schemas/initial-gynecological.schema'
import { z } from 'zod';
import { Box, Checkbox, Group, rem, ScrollArea, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';


type InitialGynecologicalFormProps = {
    data?: Partial<z.infer<typeof InitialGynecologicalSchema>>,
    onSubmit?: (value: z.infer<typeof InitialGynecologicalSchema>) => void;
}
const InitialGynecologicalForm = React.forwardRef<HTMLFormElement, InitialGynecologicalFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof InitialGynecologicalSchema>>({
        initialValues: {
            gynecologicalMenarche: data?.gynecologicalMenarche || '',
            gynecologicalCycle: data?.gynecologicalCycle || '',
            gynecologicalLastMenstruationDate: new Date(),
            gynecologicalDeeds: data?.gynecologicalDeeds || 0,
            gynecologicalBirths: data?.gynecologicalBirths || 0,
            gynecologicalCesarean: data?.gynecologicalCesarean || 0,
            gynecologicalAbortions: data?.gynecologicalAbortions || 0,
            gynecologicalDeadChildren: data?.gynecologicalDeadChildren || 0,
            gynecologicalLivingChildren: data?.gynecologicalLivingChildren || 0,
            gynecologicalSexualLife: data?.gynecologicalSexualLife || false,
            gynecologicalFamilyPlanningType: data?.gynecologicalFamilyPlanningType || '',
            gynecologicalExamPapanicolau: data?.gynecologicalExamPapanicolau ?? { done: false, result: '', time: 0 },
            gynecologicalExamColposcopy: data?.gynecologicalExamColposcopy ?? { done: false, result: '', time: 0 },
            gynecologicalExamBreastEcho: data?.gynecologicalExamBreastEcho ?? { done: false, result: '', time: 0 },
            gynecologicalExamMammography: data?.gynecologicalExamMammography ?? { done: false, result: '', time: 0 },
        },
        validate: zodResolver(InitialGynecologicalSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof InitialGynecologicalSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Antecedentes Personales</Title>
            <Title order={5} c="dimmed">Antecedentes gineco-obstétricos</Title>
            <Box
                mt={rem(16)}
                ref={ref}
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Stack gap={rem(16)}>
                    <SimpleGrid cols={{ base: 1, sm: 3 }}>
                        <TextInput
                            label="Menarquía"
                            {...form.getInputProps('gynecologicalMenarche')} />
                        <TextInput
                            label="Ciclos"
                            {...form.getInputProps('gynecologicalCycle')} />
                        <DateInput
                            label="Fecha de última menstruación"
                            {...form.getInputProps('gynecologicalLastMenstruationDate')} />
                    </SimpleGrid>
                    <SimpleGrid cols={{ base: 1, sm: 4 }}>
                        <TextInput
                            label="Gestas"
                            min={0}
                            type='number'
                            {...form.getInputProps('gynecologicalDeeds')} />
                        <TextInput
                            label="Partos"
                            min={0}
                            type='number'
                            {...form.getInputProps('gynecologicalBirths')} />
                        <TextInput
                            label="Cesáreas"
                            min={0}
                            type='number'
                            {...form.getInputProps('gynecologicalCesarean')} />
                        <TextInput
                            label="Abortos"
                            min={0}
                            type='number'
                            {...form.getInputProps('gynecologicalAbortions')} />
                    </SimpleGrid>
                    <SimpleGrid cols={{ base: 1, sm: 3 }}>
                        <TextInput
                            label="Hijos vivos"
                            min={0}
                            type='number'
                            {...form.getInputProps('gynecologicalLivingChildren')} />
                        <TextInput
                            label="Hijos muertos"
                            min={0}
                            type='number'
                            {...form.getInputProps('gynecologicalDeadChildren')} />
                        <Stack h='100%' justify='center' align='center'>
                            <Checkbox
                                label="Vida sexual activa"
                                checked={form.values.gynecologicalSexualLife}
                                {...form.getInputProps('gynecologicalSexualLife')}
                            />
                        </Stack>
                    </SimpleGrid>
                    <TextInput
                        label="Método de planificación familiar"
                        {...form.getInputProps('gynecologicalFamilyPlanningType')} />

                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <Stack
                            w="100%"
                            justify='flex-start'
                            align='start'>
                            <Checkbox
                                label="Papanicolaou"
                                checked={form.values.gynecologicalExamPapanicolau.done}
                                {...form.getInputProps('gynecologicalExamPapanicolau.done')}
                            />
                            <Group gap={rem(8)}>
                                <TextInput
                                    disabled={!form.values.gynecologicalExamPapanicolau.done}
                                    label="Tiempo (años)"
                                    type='number'
                                    min={1}
                                    {...form.getInputProps('gynecologicalExamPapanicolau.time')} />
                                <TextInput
                                    label="Resultado"
                                    disabled={!form.values.gynecologicalExamPapanicolau.done}
                                    {...form.getInputProps('gynecologicalExamPapanicolau.result')} />
                            </Group>
                        </Stack>
                        <Stack
                            w="100%"
                            justify='flex-start'
                            align='start'>
                            <Checkbox
                                label="Colposcopia"
                                checked={form.values.gynecologicalExamColposcopy.done}
                                {...form.getInputProps('gynecologicalExamColposcopy.done')}
                            />
                            <Group gap={rem(8)}>
                                <TextInput
                                    disabled={!form.values.gynecologicalExamColposcopy.done}
                                    label="Tiempo (años)"
                                    type='number'
                                    min={1}
                                    {...form.getInputProps('gynecologicalExamColposcopy.time')} />
                                <TextInput
                                    label="Resultado"
                                    disabled={!form.values.gynecologicalExamColposcopy.done}
                                    {...form.getInputProps('gynecologicalExamColposcopy.result')} />
                            </Group>
                        </Stack>
                        <Stack
                            w="100%"
                            justify='flex-start'
                            align='start'>
                            <Checkbox
                                label="Eco mamario"
                                checked={form.values.gynecologicalExamBreastEcho.done}
                                {...form.getInputProps('gynecologicalExamBreastEcho.done')}
                            />
                            <Group gap={rem(8)}>
                                <TextInput
                                    disabled={!form.values.gynecologicalExamBreastEcho.done}
                                    label="Tiempo (años)"
                                    type='number'
                                    min={1}
                                    {...form.getInputProps('gynecologicalExamBreastEcho.time')} />
                                <TextInput
                                    label="Resultado"
                                    disabled={!form.values.gynecologicalExamBreastEcho.done}
                                    {...form.getInputProps('gynecologicalExamBreastEcho.result')} />
                            </Group>
                        </Stack>
                        <Stack
                            w="100%"
                            justify='flex-start'
                            align='start'>
                            <Checkbox
                                label="Mamografía"
                                checked={form.values.gynecologicalExamMammography.done}
                                {...form.getInputProps('gynecologicalExamMammography.done')}
                            />
                            <Group gap={rem(8)}>
                                <TextInput
                                    disabled={!form.values.gynecologicalExamMammography.done}
                                    label="Tiempo (años)"
                                    type='number'
                                    min={1}
                                    {...form.getInputProps('gynecologicalExamMammography.time')} />
                                <TextInput
                                    label="Resultado"
                                    disabled={!form.values.gynecologicalExamMammography.done}
                                    {...form.getInputProps('gynecologicalExamMammography.result')} />
                            </Group>
                        </Stack>
                    </SimpleGrid>
                </Stack>
            </Box>
        </>
    )
});

InitialGynecologicalForm.displayName = 'InitialGynecologicalForm'

export default InitialGynecologicalForm
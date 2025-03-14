'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialGynecologicalSchema from '../_schemas/initial-gynecological.schema'
import { z } from 'zod';
import { Box, Checkbox, Group, rem, ScrollArea, SimpleGrid, Stack, TextInput } from '@mantine/core';
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
            gynecologicalDeeds: data?.gynecologicalDeeds || '',
            gynecologicalBirths: data?.gynecologicalBirths || '',
            gynecologicalCesarean: data?.gynecologicalCesarean || '',
            gynecologicalAbortions: data?.gynecologicalAbortions || '',
            gynecologicalDeadChildren: data?.gynecologicalDeadChildren || '',
            gynecologicalLivingChildren: data?.gynecologicalLivingChildren || '',
            gynecologicalSexualLife: data?.gynecologicalSexualLife || '',
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
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Stack gap={rem(16)}>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <TextInput
                        label="MENARQUIA"
                        {...form.getInputProps('gynecologicalMenarche')} />
                    <TextInput
                        label="CICLOS"
                        {...form.getInputProps('gynecologicalCycle')} />
                    <DateInput
                        label='FECHA DE ULTIMA MENSTRUACION'
                        {...form.getInputProps('gynecologicalLastMenstruationDate')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 4 }}>
                    <TextInput
                        label="GESTAS"
                        {...form.getInputProps('gynecologicalDeeds')} />
                    <TextInput
                        label="PARTOS"
                        {...form.getInputProps('gynecologicalBirths')} />
                    <TextInput
                        label='CESAREAS'
                        {...form.getInputProps('gynecologicalCesarean')} />
                    <TextInput
                        label='ABORTOS'
                        {...form.getInputProps('gynecologicalAbortions')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <TextInput
                        label="HIJOS VIVOS"
                        min={0}
                        type='number'
                        {...form.getInputProps('gynecologicalLivingChildren')} />
                    <TextInput
                        label="HIJOS MUERTOS"
                        min={0}
                        type='number'
                        {...form.getInputProps('gynecologicalDeadChildren')} />
                    <Stack h='100%' justify='center' align='center'>
                        <Checkbox
                            label="VIDA SEXUAL ACTIVA"
                            checked={form.values.gynecologicalSexualLife}
                            {...form.getInputProps('gynecologicalSexualLife')}
                        />
                    </Stack>
                </SimpleGrid>
                <TextInput
                    label="METODO DE PLANIFICACION FAMILIAR"
                    {...form.getInputProps('gynecologicalFamilyPlanningType')} />

                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <Group
                        gap={rem(32)}
                        h='100%'
                        justify='flex-start'
                        align='start'>
                        <Checkbox
                            label="PAPANICOULAU"
                            checked={form.values.gynecologicalExamPapanicolau.done}
                            {...form.getInputProps('gynecologicalExamPapanicolau.done')}
                        />
                        {form.values.gynecologicalExamPapanicolau.done && <Stack
                            gap={rem(8)}>
                            <TextInput
                                disabled={!form.values.gynecologicalExamPapanicolau.done}
                                label="TIEMPO (AÑOS)"
                                type='number'
                                min={1}
                                {...form.getInputProps('gynecologicalExamPapanicolau.time')} />
                            <TextInput
                                label="RESULTADO"
                                disabled={!form.values.gynecologicalExamPapanicolau.done}
                                {...form.getInputProps('gynecologicalExamPapanicolau.result')} />
                        </Stack>}
                    </Group>
                    <Group
                        gap={rem(32)}
                        h='100%'
                        justify='flex-start'
                        align='start'>
                        <Checkbox
                            label="COLPOSCOPIA"
                            checked={form.values.gynecologicalExamColposcopy.done}
                            {...form.getInputProps('gynecologicalExamColposcopy.done')}
                        />
                        {form.values.gynecologicalExamColposcopy.done && <Stack
                            gap={rem(8)}>
                            <TextInput
                                disabled={!form.values.gynecologicalExamColposcopy.done}
                                label="TIEMPO (AÑOS)"
                                type='number'
                                min={1}
                                {...form.getInputProps('gynecologicalExamColposcopy.time')} />
                            <TextInput
                                label="RESULTADO"
                                disabled={!form.values.gynecologicalExamColposcopy.done}
                                {...form.getInputProps('gynecologicalExamColposcopy.result')} />
                        </Stack>}
                    </Group>
                    <Group
                        gap={rem(32)}
                        h='100%'
                        justify='flex-start'
                        align='start'>
                        <Checkbox
                            label="ECO MAMARIO"
                            checked={form.values.gynecologicalExamBreastEcho.done}
                            {...form.getInputProps('gynecologicalExamBreastEcho.done')}
                        />
                        {form.values.gynecologicalExamBreastEcho.done && <Stack
                            gap={rem(8)}>
                            <TextInput
                                disabled={!form.values.gynecologicalExamBreastEcho.done}
                                label="TIEMPO (AÑOS)"
                                type='number'
                                min={1}
                                {...form.getInputProps('gynecologicalExamBreastEcho.time')} />
                            <TextInput
                                label="RESULTADO"
                                disabled={!form.values.gynecologicalExamBreastEcho.done}
                                {...form.getInputProps('gynecologicalExamBreastEcho.result')} />
                        </Stack>}
                    </Group>
                    <Group
                        gap={rem(32)}
                        h='100%'
                        justify='flex-start'
                        align='start'>
                        <Checkbox
                            label="MAMOGRAFIA"
                            checked={form.values.gynecologicalExamMammography.done}
                            {...form.getInputProps('gynecologicalExamMammography.done')}
                        />
                        {form.values.gynecologicalExamMammography.done && <Stack
                            gap={rem(8)}>
                            <TextInput
                                disabled={!form.values.gynecologicalExamMammography.done}
                                label="TIEMPO (AÑOS)"
                                type='number'
                                min={1}
                                {...form.getInputProps('gynecologicalExamMammography.time')} />
                            <TextInput
                                label="RESULTADO"
                                disabled={!form.values.gynecologicalExamMammography.done}
                                {...form.getInputProps('gynecologicalExamMammography.result')} />
                        </Stack>}
                    </Group>
                </SimpleGrid>
            </Stack>
        </Box >
    )
});

InitialGynecologicalForm.displayName = 'InitialGynecologicalForm'

export default InitialGynecologicalForm
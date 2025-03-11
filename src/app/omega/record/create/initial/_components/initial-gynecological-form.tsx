'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialGynecologicalSchema from '../_schemas/initial-gynecological.schema'
import { z } from 'zod';
import { Box, Checkbox, rem, ScrollArea, SimpleGrid, Stack, TextInput } from '@mantine/core';
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
            gynecologicalExamPapanicolau: { done: false, result: '', time: 0 },
            gynecologicalExamColposcopy: { done: false, result: '', time: 0 },
            gynecologicalExamBreastEcho: { done: false, result: '', time: 0 },
            gynecologicalExamMammography: { done: false, result: '', time: 0 },
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
                        label="CESAREAS"
                        {...form.getInputProps('gynecologicalBirths')} />
                    <TextInput
                        label='FECHA DE ULTIMA MENSTRUACION'
                        {...form.getInputProps('gynecologicalCesarean')} />
                    <TextInput
                        label='FECHA DE ULTIMA MENSTRUACION'
                        {...form.getInputProps('gynecologicalAbortions')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <TextInput
                        label="Hijos vivos"
                        min={0}
                        {...form.getInputProps('gynecologicalDeadChildren')} />
                    <TextInput
                        label="Hijos muertos"
                        min={0}
                        {...form.getInputProps('gynecologicalLivingChildren')} />
                    <TextInput
                        label="Hijos muertos"
                        min={0}
                        {...form.getInputProps('gynecologicalLivingChildren')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <Stack h='100%' justify='center' align='center'>
                        <Checkbox
                            label="VIDA SEXUAL ACTIVA"
                            {...form.getInputProps('gynecologicalSexualLife')}
                        />
                    </Stack>
                    <TextInput
                        label="METODO DE PLANIFICACION FAMILIAR"
                        {...form.getInputProps('gynecologicalFamilyPlanningType')} />
                </SimpleGrid>
            </Stack>
        </Box >
    )
});

InitialGynecologicalForm.displayName = 'InitialGynecologicalForm'

export default InitialGynecologicalForm
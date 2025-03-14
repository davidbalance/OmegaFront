'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import IntialMaleReproductionSchema from '../_schemas/initial-male-reproduction.schema'
import { z } from 'zod';
import { Box, Checkbox, Group, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';


type IntialMaleReproductionFormProps = {
    data?: Partial<z.infer<typeof IntialMaleReproductionSchema>>,
    onSubmit?: (value: z.infer<typeof IntialMaleReproductionSchema>) => void;
}
const IntialMaleReproductionForm = React.forwardRef<HTMLFormElement, IntialMaleReproductionFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof IntialMaleReproductionSchema>>({
        initialValues: {
            maleReproductiveFamilyPlanningType: data?.maleReproductiveFamilyPlanningType || '',
            maleReproductiveExamProstateAntigen: data?.maleReproductiveExamProstateAntigen ?? { done: false, result: '', time: 0 },
            maleReproductiveExamProstateEcho: data?.maleReproductiveExamProstateEcho ?? { done: false, result: '', time: 0 },
            maleReproductiveDeadChildren: 0,
            maleReproductiveLivingChildren: 0
        },
        validate: zodResolver(IntialMaleReproductionSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof IntialMaleReproductionSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ position: 'relative', width: '100%', height: '100%' }}>

            <Stack gap={rem(16)}>
                <TextInput
                    label="METODO DE PLANIFICACION FAMILIAR"
                    {...form.getInputProps('gynecologicalFamilyPlanningType')} />

                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput
                        label="HIJOS VIVOS"
                        min={0}
                        type='number'
                        {...form.getInputProps('maleReproductiveLivingChildren')} />
                    <TextInput
                        label="HIJOS MUERTOS"
                        min={0}
                        type='number'
                        {...form.getInputProps('maleReproductiveDeadChildren')} />
                </SimpleGrid>

                <Title order={5}>Examenes Realizados</Title>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <Group
                        gap={rem(32)}
                        h='100%'
                        justify='flex-start'
                        align='start'>
                        <Checkbox
                            label="ANTIGENO PROSTATICO"
                            checked={form.values.maleReproductiveExamProstateAntigen.done}
                            {...form.getInputProps('maleReproductiveExamProstateAntigen.done')}
                        />
                        {form.values.maleReproductiveExamProstateAntigen.done && <Stack gap={rem(8)}>
                            <TextInput
                                disabled={!form.values.maleReproductiveExamProstateAntigen.done}
                                label="TIEMPO (AÑOS)"
                                type='number'
                                min={1}
                                {...form.getInputProps('maleReproductiveExamProstateAntigen.time')} />
                            <TextInput
                                label="RESULTADO"
                                disabled={!form.values.maleReproductiveExamProstateAntigen.done}
                                {...form.getInputProps('maleReproductiveExamProstateAntigen.result')} />
                        </Stack>}
                    </Group>
                    <Group
                        gap={rem(32)}
                        h='100%'
                        justify='flex-start'
                        align='start'>
                        <Checkbox
                            label="ECO PROSTATICO"
                            checked={form.values.maleReproductiveExamProstateEcho.done}
                            {...form.getInputProps('maleReproductiveExamProstateEcho.done')}
                        />
                        {form.values.maleReproductiveExamProstateEcho.done && <Stack
                            gap={rem(8)}>
                            <TextInput
                                disabled={!form.values.maleReproductiveExamProstateEcho.done}
                                label="TIEMPO (AÑOS)"
                                type='number'
                                min={1}
                                {...form.getInputProps('maleReproductiveExamProstateEcho.time')} />
                            <TextInput
                                label="RESULTADO"
                                disabled={!form.values.maleReproductiveExamProstateEcho.done}
                                {...form.getInputProps('maleReproductiveExamProstateEcho.result')} />
                        </Stack>}
                    </Group>
                </SimpleGrid>
            </Stack>
        </Box>
    )
});

IntialMaleReproductionForm.displayName = 'IntialMaleReproductionForm'

export default IntialMaleReproductionForm
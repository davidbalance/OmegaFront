'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import IntialMaleReproductionSchema, { adjustInitialValues } from '../_schemas/initial-male-reproduction.schema'
import { z } from 'zod';
import { Box, Checkbox, Divider, Group, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';


type IntialMaleReproductionFormProps = {
    data?: Partial<z.infer<typeof IntialMaleReproductionSchema>>,
    onSubmit?: (value: z.infer<typeof IntialMaleReproductionSchema>) => void;
}
const IntialMaleReproductionForm = React.forwardRef<HTMLFormElement, IntialMaleReproductionFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof IntialMaleReproductionSchema>>({
        initialValues: adjustInitialValues(data),
        validate: zodResolver(IntialMaleReproductionSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof IntialMaleReproductionSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Antecedentes personales</Title>
            <Title order={5} c="dimmed">Antecedentes Reproductivos Masculinos</Title>
            <Box
                mt={rem(16)}
                ref={ref}
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>

                <Stack gap={rem(16)}>
                    <Stack mt={rem(12)} gap={rem(8)}>
                        <Divider label='Examenes Realizados' />
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            <Stack
                                w="100%"
                                justify='flex-start'
                                align='start'>
                                <Checkbox
                                    label="ANTIGENO PROSTATICO"
                                    checked={form.values.maleReproductiveExamProstateAntigen.done}
                                    {...form.getInputProps('maleReproductiveExamProstateAntigen.done')}
                                />
                                <Group gap={rem(8)}>
                                    <TextInput
                                        w="100%"
                                        disabled={!form.values.maleReproductiveExamProstateAntigen.done}
                                        label="TIEMPO (AÑOS)"
                                        type='number'
                                        min={1}
                                        {...form.getInputProps('maleReproductiveExamProstateAntigen.time')} />
                                    <TextInput
                                        w="100%"
                                        label="RESULTADO"
                                        disabled={!form.values.maleReproductiveExamProstateAntigen.done}
                                        {...form.getInputProps('maleReproductiveExamProstateAntigen.result')} />
                                </Group>
                            </Stack>

                            <Stack
                                w="100%"
                                justify='flex-start'
                                align='start'>
                                <Checkbox
                                    label="ECO PROSTATICO"
                                    checked={form.values.maleReproductiveExamProstateEcho.done}
                                    {...form.getInputProps('maleReproductiveExamProstateEcho.done')}
                                />
                                <Group gap={rem(8)}>
                                    <TextInput
                                        w="100%"
                                        disabled={!form.values.maleReproductiveExamProstateEcho.done}
                                        label="TIEMPO (AÑOS)"
                                        type='number'
                                        min={1}
                                        {...form.getInputProps('maleReproductiveExamProstateEcho.time')} />
                                    <TextInput
                                        w="100%"
                                        label="RESULTADO"
                                        disabled={!form.values.maleReproductiveExamProstateEcho.done}
                                        {...form.getInputProps('maleReproductiveExamProstateEcho.result')} />
                                </Group>
                            </Stack>
                        </SimpleGrid>
                    </Stack>

                    <Box>
                        <Divider label='Método de Planificacion Familiar' />
                        <TextInput
                            label="METODO DE PLANIFICACION FAMILIAR"
                            {...form.getInputProps('maleReproductiveFamilyPlanningType')} />
                    </Box>

                    <Box>
                        <Divider label='Hijos' />
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

                    </Box>
                </Stack >
            </Box >
        </>
    )
});

IntialMaleReproductionForm.displayName = 'IntialMaleReproductionForm'

export default IntialMaleReproductionForm
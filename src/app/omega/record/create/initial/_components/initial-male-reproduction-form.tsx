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
            <Title order={3}>Antecedentes Personales</Title>
            <Title order={5} c="dimmed">Antecedentes reproductivos masculinos</Title>
            <Box
                mt={rem(16)}
                ref={ref}
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>

                <Stack gap={rem(16)}>
                    <Stack mt={rem(12)} gap={rem(8)}>
                        <Divider label='Exámenes realizados' />
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            <Stack
                                w="100%"
                                justify='flex-start'
                                align='start'>
                                <Checkbox
                                    label="Antígeno prostático"
                                    checked={form.values.maleReproductiveExamProstateAntigen.done}
                                    {...form.getInputProps('maleReproductiveExamProstateAntigen.done')}
                                />
                                <Group gap={rem(8)}>
                                    <TextInput
                                        w="100%"
                                        disabled={!form.values.maleReproductiveExamProstateAntigen.done}
                                        label="Tiempo (años)"
                                        type='number'
                                        min={1}
                                        {...form.getInputProps('maleReproductiveExamProstateAntigen.time')} />
                                    <TextInput
                                        w="100%"
                                        label="Resultado"
                                        disabled={!form.values.maleReproductiveExamProstateAntigen.done}
                                        {...form.getInputProps('maleReproductiveExamProstateAntigen.result')} />
                                </Group>
                            </Stack>

                            <Stack
                                w="100%"
                                justify='flex-start'
                                align='start'>
                                <Checkbox
                                    label="Eco prostático"
                                    checked={form.values.maleReproductiveExamProstateEcho.done}
                                    {...form.getInputProps('maleReproductiveExamProstateEcho.done')}
                                />
                                <Group gap={rem(8)}>
                                    <TextInput
                                        w="100%"
                                        disabled={!form.values.maleReproductiveExamProstateEcho.done}
                                        label="Tiempo (años)"
                                        type='number'
                                        min={1}
                                        {...form.getInputProps('maleReproductiveExamProstateEcho.time')} />
                                    <TextInput
                                        w="100%"
                                        label="Resultado"
                                        disabled={!form.values.maleReproductiveExamProstateEcho.done}
                                        {...form.getInputProps('maleReproductiveExamProstateEcho.result')} />
                                </Group>
                            </Stack>
                        </SimpleGrid>
                    </Stack>

                    <Box>
                        <Divider label='Método de Planificacion Familiar' />
                        <TextInput
                            label="Método de planificación familiar"
                            {...form.getInputProps('maleReproductiveFamilyPlanningType')} />
                    </Box>

                    <Box>
                        <Divider label='Hijos' />
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                            <TextInput
                                label="Hijos vivos"
                                min={0}
                                type='number'
                                {...form.getInputProps('maleReproductiveLivingChildren')} />
                            <TextInput
                                label="Hijos muertos"
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
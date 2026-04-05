'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import { ActionIcon, Box, Checkbox, Divider, Flex, rem, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import EmploymentHistorySchema, { DEFAULT_JOB_HISTORY, EmploymentHistorySchemaType, adjustInitialValue } from '@/server/record/create-record/femo/employement-history.schema';
import { DateInput } from '@mantine/dates';

const MAX_JOB_HISTORY_LENGTH = 19

type FemoEmployementHistoryFormProps = {
    data?: Partial<EmploymentHistorySchemaType>;
    onSubmit?: (value: EmploymentHistorySchemaType) => void;
}
const FemoEmployementHistoryForm = React.forwardRef<HTMLFormElement, FemoEmployementHistoryFormProps>(({
    data,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, getInputProps, setValues, values: formValues } = useForm<EmploymentHistorySchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(EmploymentHistorySchema)
    });

    const employmentHistory = useMemo(() => formValues.employmentHistory ?? [], [formValues])

    const handleSubmit = useCallback((value: EmploymentHistorySchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = () => setValues(prev => (prev.employmentHistory?.length ?? 0) < MAX_JOB_HISTORY_LENGTH ? ({
        ...prev,
        employmentHistory: [...(prev.employmentHistory ?? []), DEFAULT_JOB_HISTORY]
    }) : prev);

    const handleRemove = (index: number) => setValues(prev => ({
        ...prev,
        employmentHistory: [...(prev.employmentHistory?.slice(0, index) ?? []), ...(prev.employmentHistory?.slice(index + 1) ?? [])]
    }));

    return (
        <>
            <Title order={3}>Actividad Laboral/Incidentes/Accidentes/Enfermedades Ocupacionales</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={formSubmit(handleSubmit)}>
                <Stack gap={rem(32)}>
                    {employmentHistory.map((e, i) => (
                        <Stack key={`root-${i}`} gap={rem(16)}>
                            <Flex gap={rem(8)}>
                                {employmentHistory.length - 1 === i && employmentHistory.length < MAX_JOB_HISTORY_LENGTH && (
                                    <ActionIcon
                                        w="100%"
                                        variant='light'
                                        onClick={handleAdd}>
                                        <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>)}
                                {employmentHistory.length > 1 && i < MAX_JOB_HISTORY_LENGTH && (
                                    <ActionIcon variant='light'
                                        w="100%"
                                        onClick={() => handleRemove(i)}>
                                        <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>)}
                            </Flex>
                            <Stack flex={1} style={{ minWidth: 0 }}>

                                <SimpleGrid cols={{ base: 1, md: 2 }}>
                                    <TextInput
                                        label='Centro de Trabajo'
                                        disabled={!data}
                                        {...getInputProps(`employmentHistory.${i}.workplace`)} />
                                    <TextInput
                                        label='Actividades que Desempeña'
                                        disabled={!data}
                                        {...getInputProps(`employmentHistory.${i}.activities`)} />
                                </SimpleGrid>
                                <Divider label="Trabajo" />
                                <SimpleGrid cols={{ base: 1, md: 3 }}>
                                    <TextInput
                                        label='Anterior'
                                        disabled={!data}
                                        {...getInputProps(`employmentHistory.${i}.lastWork`)} />
                                    <TextInput
                                        label='Actual'
                                        disabled={!data}
                                        {...getInputProps(`employmentHistory.${i}.currentWork`)} />
                                    <TextInput
                                        label='Tiempo de Trabajo'
                                        disabled={!data}
                                        min={0}
                                        type='number'
                                        {...getInputProps(`employmentHistory.${i}.duration`)} />
                                </SimpleGrid>

                                <Divider label="De los Accidentes de Trabajo y las Enfermedades Profesionales" />
                                <SimpleGrid cols={{ base: 1, md: 3 }}>
                                    <TextInput
                                        label='Incidente'
                                        disabled={!data}
                                        {...getInputProps(`employmentHistory.${i}.incident`)} />
                                    <TextInput
                                        label='Accidente'
                                        disabled={!data}
                                        {...getInputProps(`employmentHistory.${i}.accident`)} />
                                    <TextInput
                                        label='Enfermedad Profesional'
                                        disabled={!data}
                                        {...getInputProps(`employmentHistory.${i}.disease`)} />
                                </SimpleGrid>

                                <Divider label="Calificado por Insituto Ecuatoriano de Seguridad Social" />
                                <SimpleGrid cols={{ base: 1, md: 2 }} >
                                    <Flex align="center">
                                        <Checkbox
                                            label="Calificado por Insituto Ecuatoriano de Seguridad Social"
                                            {...getInputProps(`employmentHistory.${i}.qualified`, { type: 'checkbox' })} />
                                    </Flex>
                                    {employmentHistory[i].qualified && <>
                                        <DateInput
                                            placeholder="aaaa/mm/dd"
                                            label="Fecha"
                                            {...getInputProps(`employmentHistory.${i}.date`)} />
                                        <Textarea
                                            label="Especificar"
                                            placeholder='eg. Lorem Ipsum...'
                                            rows={5}
                                            {...getInputProps(`employmentHistory.${i}.specification`)} />
                                        <Textarea
                                            label="Observaciones"
                                            placeholder='eg. Lorem Ipsum...'
                                            rows={5}
                                            {...getInputProps(`employmentHistory.${i}.observations`)} />
                                    </>}
                                </SimpleGrid>
                                {(employmentHistory.length > 1 && i < employmentHistory.length - 1) && <Divider />}
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Box >
        </>
    )
});

FemoEmployementHistoryForm.displayName = 'FemoEmployementHistoryForm';

export default FemoEmployementHistoryForm
'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import { ActionIcon, Box, Divider, Flex, rem, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import ExamResultsSchema, { DEFAULT_EXAM_RESULT, ExamResultSchemaType, adjustInitialValue } from '@/server/record/create-record/femo/exam-results.schema';

const MAX_RESULT_LENGTH = 4

type FemoExamResultFormProps = {
    data?: Partial<ExamResultSchemaType>;
    onSubmit?: (value: ExamResultSchemaType) => void;
}
const FemoExamResultForm = React.forwardRef<HTMLFormElement, FemoExamResultFormProps>(({
    data,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, getInputProps, setValues, values: formValues } = useForm<ExamResultSchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(ExamResultsSchema)
    });

    const examResults = useMemo(() => formValues.examResults.exams ?? [], [formValues])

    const handleSubmit = useCallback((value: ExamResultSchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = () => setValues(prev => (prev.examResults?.exams.length ?? 0) < MAX_RESULT_LENGTH ? ({
        examResults: {
            ...prev,
            exams: [...(prev.examResults?.exams ?? []), DEFAULT_EXAM_RESULT]
        }
    }) : prev);

    const handleRemove = (index: number) => setValues(prev => ({
        examResults: {
            ...prev,
            exams: [...(prev.examResults?.exams?.slice(0, index) ?? []), ...(prev.examResults?.exams?.slice(index + 1) ?? [])]
        }
    }));

    return (
        <>
            <Title order={3}>Resultados de Exámenes Generales y Específicos de Acuerdo al Riesgo y Puesto de Trabajo</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={formSubmit(handleSubmit)}>
                <Stack gap={rem(32)}>
                    {examResults.map((e, i) => (
                        <Stack key={`root-${i}`} gap={rem(16)}>
                            <Flex gap={rem(8)}>
                                {examResults.length - 1 === i && examResults.length < MAX_RESULT_LENGTH && (
                                    <ActionIcon
                                        w="100%"
                                        variant='light'
                                        onClick={handleAdd}>
                                        <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>)}
                                {examResults.length > 1 && i < MAX_RESULT_LENGTH && (
                                    <ActionIcon variant='light'
                                        w="100%"
                                        onClick={() => handleRemove(i)}>
                                        <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>)}
                            </Flex>
                            <Stack flex={1} style={{ minWidth: 0 }}>

                                <SimpleGrid cols={{ base: 1, md: 3 }}>
                                    <TextInput
                                        label='Examen'
                                        {...getInputProps(`examResults.exams.${i}.name`)} />
                                    <DateInput
                                        placeholder="aaaa/mm/dd"
                                        label="Fecha"
                                        {...getInputProps(`examResults.exams.${i}.date`)} />
                                    <TextInput
                                        label='Resultados'
                                        {...getInputProps(`examResults.exams.${i}.result`)} />
                                </SimpleGrid>
                                {(examResults.length > 1 && i < examResults.length - 1) && <Divider />}
                            </Stack>
                        </Stack>
                    ))}
                    <Textarea
                        label="Observaciones"
                        placeholder='eg. Lore Ipsum...'
                        rows={10}
                        {...getInputProps('examResults.observations')} />
                </Stack>
            </Box >
        </>
    )
});

FemoExamResultForm.displayName = 'FemoExamResultForm';

export default FemoExamResultForm
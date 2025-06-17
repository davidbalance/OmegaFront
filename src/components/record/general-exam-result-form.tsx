'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import GeneralExamResultSchema from './schemas/general-exam-result.schema'
import { z } from 'zod';
import { ActionIcon, Box, Button, Divider, Grid, GridCol, Group, rem, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';

const defaultGeneralExam = {
    date: new Date(),
    exam: '',
    result: ''
}

type GeneralExamResultFormProps = {
    data?: Partial<z.infer<typeof GeneralExamResultSchema>>;
    onSubmit?: (value: z.infer<typeof GeneralExamResultSchema>) => void;
}
const GeneralExamResultForm = React.forwardRef<HTMLFormElement, GeneralExamResultFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof GeneralExamResultSchema>>({
        initialValues: {
            generalExamResults: data?.generalExamResults ?? [defaultGeneralExam],
            generalExamObservation: data?.generalExamObservation ?? ''
        },
        validate: zodResolver(GeneralExamResultSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof GeneralExamResultSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = useCallback(() => {
        form.setValues(prev => ({ ...prev, generalExamResults: [...(prev.generalExamResults ?? []), defaultGeneralExam] }));
    }, [form]);

    const handleRemove = useCallback((index: number) => {
        form.setValues(prev => ({ ...prev, generalExamResults: [...(prev.generalExamResults?.slice(0, index) ?? []), ...(prev.generalExamResults?.slice(index + 1) ?? [])] }));
    }, [form]);

    return (
        <>
            <Title order={3}>Resultados de Exámenes generales y específicos</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={rem(32)}>
                    {!form.values.generalExamResults.length
                        ? <Button
                            variant='light'
                            onClick={handleAdd}>
                            <IconPlus style={{ width: rem(16), height: rem(16) }} />
                        </Button>
                        : form.values.generalExamResults.map((e, i) =>
                            <div key={i}>
                                <Group
                                    mb={rem(16)}
                                    component='div'
                                    w='100%'>
                                    <Stack>
                                        {form.values.generalExamResults.length - 1 === i && <ActionIcon
                                            variant='light'
                                            onClick={handleAdd}>
                                            <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                        </ActionIcon>}
                                        <ActionIcon variant='light'
                                            onClick={() => handleRemove(i)}>
                                            <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                        </ActionIcon>
                                    </Stack>
                                    <Grid flex={1}>
                                        <GridCol span={{ base: 12, md: 3 }}>
                                            <TextInput
                                                label="Examen"
                                                {...form.getInputProps(`generalExamResults.${i}.exam`)} />
                                        </GridCol>
                                        <GridCol span={{ base: 12, md: 3 }}>
                                            <DateInput
                                                label='Fecha'
                                                {...form.getInputProps(`generalExamResults.${i}.date`)} />
                                        </GridCol>
                                        <GridCol span={{ base: 12, md: 6 }}>
                                            <TextInput
                                                label="Resultados"
                                                {...form.getInputProps(`generalExamResults.${i}.result`)} />
                                        </GridCol>
                                    </Grid>
                                </Group>
                                {form.values.generalExamResults.length > 1 && <Divider />}
                            </div>
                        )}
                    <Textarea
                        label="Observaciones"
                        rows={10}
                        {...form.getInputProps(`generalExamObservation`)} />
                </Stack>
            </Box>
        </>
    )
});

GeneralExamResultForm.displayName = 'GeneralExamResultForm';

export default GeneralExamResultForm
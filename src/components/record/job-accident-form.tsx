'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import JobAccidentSchema, { adjustInitialValue } from './schemas/job-accident.schema'
import { z } from 'zod';
import { Box, Checkbox, Grid, GridCol, rem, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';

type JobAccidentFormProps = {
    data?: Partial<z.infer<typeof JobAccidentSchema>>;
    onSubmit?: (value: z.infer<typeof JobAccidentSchema>) => void;
}
const JobAccidentForm = React.forwardRef<HTMLFormElement, JobAccidentFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof JobAccidentSchema>>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(JobAccidentSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof JobAccidentSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Antecedentes de Trabajo</Title>
            <Title order={5} c="dimmed">Accidentes de Trabajo</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Stack
                    gap={rem(16)}
                    align='start' w='100%'>
                    <Checkbox
                        label='FUE CALIFICADO POR EL INSTITUTO DE SEGURIDAD SOCIAL CORRESPONDIENTE'
                        labelPosition="left"
                        checked={form.values.jobAccidentHappened}
                        {...form.getInputProps(`jobAccidentHappened`)} />
                    {form.values.jobAccidentHappened &&
                        (
                            <Grid w='100%'>
                                <GridCol span={{ base: 12, sm: 6 }}>
                                    <DateInput
                                        label="FECHA"
                                        {...form.getInputProps('jobAccidentDate')} />
                                </GridCol>
                                <GridCol span={{ base: 12, sm: 6 }}>
                                    <TextInput
                                        label="ESPECIFICAR"
                                        placeholder="eg. Omega"
                                        {...form.getInputProps('jobAccidentDescription')} />
                                </GridCol>
                            </Grid>
                        )}
                    <Textarea
                        w="100%"
                        label="OBSERVACIONES"
                        placeholder="eg. Omega"
                        rows={10}
                        {...form.getInputProps('jobAccidentObservation')} />
                </Stack>
            </Box>
        </>
    )
});

JobAccidentForm.displayName = 'JobAccidentForm';

export default JobAccidentForm
'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import JobAccidentSchema from './schemas/job-accident.schema'
import { z } from 'zod';
import { Checkbox, Grid, GridCol, rem, Stack, Textarea, TextInput } from '@mantine/core';
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
        initialValues: {
            jobAccidentHappened: data?.jobAccidentHappened ?? false,
            jobAccidentDate: data?.jobAccidentDate ?? new Date(),
            jobAccidentDescription: data?.jobAccidentDescription ?? '',
            jobAccidentObservation: data?.jobAccidentObservation ?? ''
        },
        validate: zodResolver(JobAccidentSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof JobAccidentSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Stack
                gap={rem(32)}
                align='start' w='100%'>
                <Checkbox
                    label='FUE CALIFICADO POR EL INSTITUTO DE SEGURIDAD SOCIAL CORRESPONDIENTE'
                    labelPosition="left"
                    {...form.getInputProps(`jobAccidentHappened`)} />
                {
                    form.values.jobAccidentHappened &&
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
                        <GridCol span={12}>
                            <Textarea
                                label="OBSERVACIONES"
                                placeholder="eg. Omega"
                                rows={10}
                                {...form.getInputProps('jobAccidentObservation')} />
                        </GridCol>
                    </Grid>
                }
            </Stack>
        </form >
    )
});

JobAccidentForm.displayName = 'JobAccidentForm';

export default JobAccidentForm
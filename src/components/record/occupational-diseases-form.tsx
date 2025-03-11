'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import OccupationalDisease from './schemas/occupational-disease.schema'
import { z } from 'zod';
import { Checkbox, Grid, GridCol, rem, Stack, Textarea, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';

type OccupationalDiseaseFormProps = {
    data?: Partial<z.infer<typeof OccupationalDisease>>;
    onSubmit?: (value: z.infer<typeof OccupationalDisease>) => void;
}
const OccupationalDiseaseForm = React.forwardRef<HTMLFormElement, OccupationalDiseaseFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof OccupationalDisease>>({
        initialValues: {
            occupationalDiseaseHappened: data?.occupationalDiseaseHappened ?? false,
            occupationalDiseaseDate: data?.occupationalDiseaseDate ?? new Date(),
            occupationalDiseaseDescription: data?.occupationalDiseaseDescription ?? '',
            occupationalDiseaseObservation: data?.occupationalDiseaseObservation ?? ''
        },
        validate: zodResolver(OccupationalDisease)
    });

    const handleSubmit = useCallback((value: z.infer<typeof OccupationalDisease>) => {
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
                    {...form.getInputProps(`occupationalDiseaseHappened`)} />
                {
                    form.values.occupationalDiseaseHappened &&
                    <Grid w='100%'>
                        <GridCol span={{ base: 12, sm: 6 }}>
                            <DateInput
                                label="FECHA"
                                {...form.getInputProps('occupationalDiseaseDate')} />
                        </GridCol>
                        <GridCol span={{ base: 12, sm: 6 }}>
                            <TextInput
                                label="ESPECIFICAR"
                                placeholder="eg. Omega"
                                {...form.getInputProps('occupationalDiseaseDescription')} />
                        </GridCol>
                        <GridCol span={12}>
                            <Textarea
                                label="OBSERVACIONES"
                                placeholder="eg. Omega"
                                rows={10}
                                {...form.getInputProps('occupationalDiseaseObservation')} />
                        </GridCol>
                    </Grid>
                }
            </Stack>
        </form >
    )
});

OccupationalDiseaseForm.displayName = 'OccupationalDiseaseForm';

export default OccupationalDiseaseForm
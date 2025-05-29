'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import OccupationalDiseaseSchema, { adjustInitialValue } from './schemas/occupational-disease.schema'
import { z } from 'zod';
import { Box, Checkbox, Grid, GridCol, rem, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';

type OccupationalDiseaseFormProps = {
    data?: Partial<z.infer<typeof OccupationalDiseaseSchema>>;
    onSubmit?: (value: z.infer<typeof OccupationalDiseaseSchema>) => void;
}
const OccupationalDiseaseForm = React.forwardRef<HTMLFormElement, OccupationalDiseaseFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof OccupationalDiseaseSchema>>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(OccupationalDiseaseSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof OccupationalDiseaseSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Antecedentes de Trabajo</Title>
            <Title order={5} c="dimmed">Enfermedades Profesionales</Title>
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
                        checked={form.values.occupationalDiseaseHappened}
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
                        </Grid>
                    }
                    <Textarea
                        w="100%"
                        label="OBSERVACIONES"
                        placeholder="eg. Omega"
                        rows={10}
                        {...form.getInputProps('occupationalDiseaseObservation')} />
                </Stack>
            </Box>
        </>
    )
});

OccupationalDiseaseForm.displayName = 'OccupationalDiseaseForm';

export default OccupationalDiseaseForm
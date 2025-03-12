'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import MedicalFitnessForJobSchema from './schemas/medical-fitness-for-job.schema'
import { z } from 'zod';
import { Group, Radio, RadioGroup, rem, Stack, Textarea, TextInput } from '@mantine/core';

type MedicalFitnessForJobFormProps = {
    data?: Partial<z.infer<typeof MedicalFitnessForJobSchema>>;
    onSubmit?: (value: z.infer<typeof MedicalFitnessForJobSchema>) => void;
}
const MedicalFitnessForJobForm = React.forwardRef<HTMLFormElement, MedicalFitnessForJobFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof MedicalFitnessForJobSchema>>({
        initialValues: {
            medicalFitnessFit: data?.medicalFitnessFit ?? true,
            medicalFitnessFitObservation: data?.medicalFitnessFitObservation ?? false,
            medicalFitnessFitLimitation: data?.medicalFitnessFitLimitation ?? false,
            medicalFitnessNoFit: data?.medicalFitnessNoFit ?? false,
            medicalFitnessLimitation: data?.medicalFitnessLimitation ?? '',
            medicalFitnessObservation: data?.medicalFitnessObservation ?? ''
        },
        validate: zodResolver(MedicalFitnessForJobSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof MedicalFitnessForJobSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={rem(16)}>
                <RadioGroup>
                    <Group
                        gap={rem(32)}
                        justify='center'
                        align='center'>
                        <Radio
                            label='APTO'
                            {...form.getInputProps('medicalFitnessFit')} />
                        <Radio
                            label='APTO EN OBSERVACION'
                            {...form.getInputProps('medicalFitnessFitObservation')} />
                        <Radio
                            label='APTO CON LIMITACIONES'
                            {...form.getInputProps('medicalFitnessFitLimitation')} />
                        <Radio
                            label='NO APTO'
                            {...form.getInputProps('medicalFitnessNoFit')} />
                    </Group>
                </RadioGroup>
                <Textarea
                    label="Observacion"
                    rows={5}
                    {...form.getInputProps('medicalFitnessLimitation')} />
                <Textarea
                    label="Limitacion"
                    rows={5}
                    {...form.getInputProps('medicalFitnessObservation')} />
            </Stack>
        </form >
    )
});

MedicalFitnessForJobForm.displayName = 'MedicalFitnessForJobForm';

export default MedicalFitnessForJobForm
'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import MedicalFitnessForJobSchema from './schemas/medical-fitness-for-job.schema'
import { z } from 'zod';
import { Group, Radio, RadioGroup, rem, Stack, Textarea } from '@mantine/core';

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
            medicalFitnessType: data?.medicalFitnessType ?? 'fit',
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
                <RadioGroup {...form.getInputProps('medicalFitnessType')}>
                    <Group
                        gap={rem(32)}
                        justify='center'
                        align='center'>
                        <Radio value='fit' label='APTO' />
                        <Radio value='fit-observation' label='APTO EN OBSERVACION' />
                        <Radio value='fit-limitation' label='APTO CON LIMITACIONES' />
                        <Radio value='no-fit' label='NO APTO' />
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
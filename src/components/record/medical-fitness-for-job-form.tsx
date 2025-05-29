'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import MedicalFitnessForJobSchema, { adjustInitialValues } from './schemas/medical-fitness-for-job.schema'
import { z } from 'zod';
import { Box, Group, Radio, RadioGroup, rem, Stack, Textarea, Title } from '@mantine/core';

type MedicalFitnessForJobFormProps = {
    hideLimitation?: boolean;
    unhideObservation?: boolean;
    showReubication?: boolean;
    data?: Partial<z.infer<typeof MedicalFitnessForJobSchema>>;
    onSubmit?: (value: z.infer<typeof MedicalFitnessForJobSchema>) => void;
}
const MedicalFitnessForJobForm = React.forwardRef<HTMLFormElement, MedicalFitnessForJobFormProps>(({
    hideLimitation,
    unhideObservation,
    showReubication,
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof MedicalFitnessForJobSchema>>({
        initialValues: adjustInitialValues(data),
        validate: zodResolver(MedicalFitnessForJobSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof MedicalFitnessForJobSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleFitnessTypeSubmit = useCallback((value: string) => {
        form.setFieldValue('medicalFitnessType', value);
        form.setFieldValue('medicalFitnessObservation', '');
        form.setFieldValue('medicalFitnessLimitation', '');
    }, [form]);

    return (
        <>
            <Title order={3}>Aptitud Medical para el Trabajo</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={rem(16)}>
                    <RadioGroup
                        {...form.getInputProps('medicalFitnessType')}
                        onChange={handleFitnessTypeSubmit}>
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
                    {(unhideObservation || form.values.medicalFitnessType === 'fit-observation') && <Textarea
                        label="Observacion"
                        rows={5}
                        {...form.getInputProps('medicalFitnessObservation')} />}
                    {(!hideLimitation && form.values.medicalFitnessType === 'fit-limitation') && <Textarea
                        label="Limitacion"
                        rows={5}
                        {...form.getInputProps('medicalFitnessLimitation')} />}
                    {showReubication && <Textarea
                        label="Reubicacion"
                        rows={5}
                        {...form.getInputProps('medicalFitnessReubication')} />}
                </Stack>
            </Box>
        </>
    )
});

MedicalFitnessForJobForm.displayName = 'MedicalFitnessForJobForm';

export default MedicalFitnessForJobForm
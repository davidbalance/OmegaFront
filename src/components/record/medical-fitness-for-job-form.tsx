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
            <Title order={3}>Aptitud médica para el trabajo</Title>
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
                            <Radio value='fit' label='Apto' />
                            <Radio value='fit-observation' label='Apto en observación' />
                            <Radio value='fit-limitation' label='Apto con limitaciones' />
                            <Radio value='no-fit' label='No apto' />
                        </Group>
                    </RadioGroup>
                    {(unhideObservation || form.values.medicalFitnessType === 'fit-observation') && <Textarea
                        label="Observación"
                        rows={5}
                        {...form.getInputProps('medicalFitnessObservation')} />}
                    {(!hideLimitation && form.values.medicalFitnessType === 'fit-limitation') && <Textarea
                        label="Limitación"
                        rows={5}
                        {...form.getInputProps('medicalFitnessLimitation')} />}
                    {showReubication && <Textarea
                        label="Reubicación"
                        rows={5}
                        {...form.getInputProps('medicalFitnessReubication')} />}
                </Stack>
            </Box>
        </>
    )
});

MedicalFitnessForJobForm.displayName = 'MedicalFitnessForJobForm';

export default MedicalFitnessForJobForm
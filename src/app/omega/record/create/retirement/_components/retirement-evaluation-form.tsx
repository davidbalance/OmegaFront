'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import RetirementEvaluationSchema from '../_schemas/retirement-evaluation.schema'
import { z } from 'zod';
import { Box, Checkbox, Group, rem, Textarea, TextInput } from '@mantine/core';

type RetirementEvaluationFormProps = {
    data?: Partial<z.infer<typeof RetirementEvaluationSchema>>,
    onSubmit?: (value: z.infer<typeof RetirementEvaluationSchema>) => void;
}
const RetirementEvaluationForm = React.forwardRef<HTMLFormElement, RetirementEvaluationFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof RetirementEvaluationSchema>>({
        initialValues: {
            retirementDone: data?.retirementDone ?? false,
            retirementObservation: data?.retirementObservation ?? ''
        },
        validate: zodResolver(RetirementEvaluationSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof RetirementEvaluationSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Group gap={rem(36)}>
                <Checkbox
                    label="SE REALIZO AL EVALUACION"
                    {...form.getInputProps('retirementDone')} />
                <Textarea
                    flex={1}
                    label="Observaciones"
                    rows={5}
                    {...form.getInputProps('retirementObservation')} />
            </Group>
        </Box>
    )
});

RetirementEvaluationForm.displayName = 'RetirementEvaluationForm';

export default RetirementEvaluationForm
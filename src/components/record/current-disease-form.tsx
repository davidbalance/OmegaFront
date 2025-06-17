'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import CurrentDiseaseSchema from './schemas/current-disease.schema'
import { z } from 'zod';
import { Box, rem, Textarea, Title } from '@mantine/core';

type CurrentDiseaseFormProps = {
    data?: Partial<z.infer<typeof CurrentDiseaseSchema>>;
    onSubmit?: (value: z.infer<typeof CurrentDiseaseSchema>) => void;
}
const CurrentDiseaseForm = React.forwardRef<HTMLFormElement, CurrentDiseaseFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof CurrentDiseaseSchema>>({
        initialValues: {
            currentDiseaseDescription: data?.currentDiseaseDescription ?? ''
        },
        validate: zodResolver(CurrentDiseaseSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof CurrentDiseaseSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Enfermedad Actual</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Textarea
                    placeholder="eg. Desempeña..."
                    rows={10}
                    {...form.getInputProps(`currentDiseaseDescription`)} />
            </Box>
        </>
    )
});

CurrentDiseaseForm.displayName = 'CurrentDiseaseForm';

export default CurrentDiseaseForm
'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import { Box, rem, Stack, Textarea, Title } from '@mantine/core';
import CurrentDiseaseSchema, { CurrentDiseaseSchemaType, adjustInitialValue } from '@/server/record/create-record/femo/current-disease.schema';

type FemoCurrentDiseaseFormProps = {
    data?: Partial<CurrentDiseaseSchemaType>,
    onSubmit?: (value: CurrentDiseaseSchemaType) => void;
}
const FemoCurrentDiseaseForm = React.forwardRef<HTMLFormElement, FemoCurrentDiseaseFormProps>(({
    data,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, getInputProps } = useForm<CurrentDiseaseSchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(CurrentDiseaseSchema)
    });


    const handleSubmit = useCallback((value: CurrentDiseaseSchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Enfermedad o Problema Actual</Title>
            <Box
                ref={ref}
                component='form'
                onSubmit={formSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Stack gap={rem(16)}>
                    <Textarea
                        label="Descripción"
                        placeholder='eg. Lore Ipsum...'
                        rows={10}
                        {...getInputProps('currentDisease.description')} />
                </Stack>
            </Box>
        </>
    )
});

FemoCurrentDiseaseForm.displayName = 'FemoCurrentDiseaseForm';

export default FemoCurrentDiseaseForm
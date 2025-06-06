'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import { z } from 'zod';
import { Box, rem, Stack, TextInput, Title } from '@mantine/core';
import ProfessionalDataSchema, { adjustInitialValues } from './schemas/professional-data.schema';

type ProfessionalDataFormProps = {
    data?: Partial<z.infer<typeof ProfessionalDataSchema>>,
    onSubmit?: (value: z.infer<typeof ProfessionalDataSchema>) => void;
}
const ProfessionalDataForm = React.forwardRef<HTMLFormElement, ProfessionalDataFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof ProfessionalDataSchema>>({
        initialValues: adjustInitialValues(data),
        validate: zodResolver(ProfessionalDataSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof ProfessionalDataSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Datos del profesional</Title>
            <Box
                mt={rem(16)}
                ref={ref}
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Stack gap={rem(16)}>
                    <TextInput
                        label="Nombre del profesional"
                        {...form.getInputProps('authorFullname')}
                        description="Si el campo se deja vacío, se usarán los datos de su usuario." />
                    <TextInput
                        label="Cédula del profesional"
                        description="Si el campo se deja vacío, se usarán los datos de su usuario."
                        {...form.getInputProps('authorDni')} />
                </Stack>
            </Box>
        </>
    )
});

ProfessionalDataForm.displayName = 'ProfessionalDataForm'

export default ProfessionalDataForm
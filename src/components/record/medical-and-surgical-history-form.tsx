'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import MedicalAndSurgicalHistorySchema from './schemas/medical-and.surgical-history.schema'
import { z } from 'zod';
import { Box, rem, ScrollArea, Textarea } from '@mantine/core';


type MedicalAndSurgicalHistoryFormProps = {
    data?: Partial<z.infer<typeof MedicalAndSurgicalHistorySchema>>,
    onSubmit?: (value: z.infer<typeof MedicalAndSurgicalHistorySchema>) => void;
}
const MedicalAndSurgicalHistoryForm = React.forwardRef<HTMLFormElement, MedicalAndSurgicalHistoryFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof MedicalAndSurgicalHistorySchema>>({
        initialValues: {
            medicalAndSurgicalHistory: data?.medicalAndSurgicalHistory || '',
        },
        validate: zodResolver(MedicalAndSurgicalHistorySchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof MedicalAndSurgicalHistorySchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Textarea
                label="ANTECEDENTES CLINICOS Y QUIRURGICOS"
                placeholder='Description'
                rows={10}
                {...form.getInputProps('medicalAndSurgicalHistory')} />
        </Box >
    )
});

MedicalAndSurgicalHistoryForm.displayName = 'MedicalAndSurgicalHistoryForm'

export default MedicalAndSurgicalHistoryForm
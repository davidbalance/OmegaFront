'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import { Box, rem, Select, Stack, Textarea, Title } from '@mantine/core';
import MedicalFitnessForWorkSchema, { MEDICAL_APTITUDE_FIT, MEDICAL_APTITUDE_FIT_LIMITATION, MEDICAL_APTITUDE_FIT_OBSERVATION, MEDICAL_APTITUDE_NO_FIT, MedicalFitnessForWorkSchemaType, adjustInitialValue } from '@/server/record/create-record/femo/medical-fitness-for-work.schema';

const fitnessOptions: { value: string, label: string }[] = [
    { label: 'Apto', value: MEDICAL_APTITUDE_FIT },
    { label: 'Apto en observación', value: MEDICAL_APTITUDE_FIT_OBSERVATION },
    { label: 'Apto con limitaciones', value: MEDICAL_APTITUDE_FIT_LIMITATION },
    { label: 'No apto', value: MEDICAL_APTITUDE_NO_FIT },
]

type FemoMedicalFitnessForWorkFormProps = {
    data?: Partial<MedicalFitnessForWorkSchemaType>;
    onSubmit?: (value: MedicalFitnessForWorkSchemaType) => void;
}
const FemoMedicalFitnessForWorkForm = React.forwardRef<HTMLFormElement, FemoMedicalFitnessForWorkFormProps>(({
    data,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, getInputProps, setFieldValue } = useForm<MedicalFitnessForWorkSchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(MedicalFitnessForWorkSchema)
    });

    const handleSubmit = useCallback((value: MedicalFitnessForWorkSchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Aptitud médica para el trabajo</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={formSubmit(handleSubmit)}>
                <Stack gap={rem(16)}>
                    <Select
                        data={fitnessOptions}
                        checkIconPosition="left"
                        label="Aptitud para el Trabajo"
                        placeholder="eg. Diestro"
                        defaultDropdownOpened={false}
                        maxDropdownHeight={200}
                        allowDeselect={false}
                        {...getInputProps('medicalAptitude.type')} />
                    <Textarea
                        label="Observación"
                        rows={5}
                        {...getInputProps('medicalAptitude.observations')} />
                </Stack>
            </Box>
        </>
    )
});

FemoMedicalFitnessForWorkForm.displayName = 'FemoMedicalFitnessForWorkForm';

export default FemoMedicalFitnessForWorkForm
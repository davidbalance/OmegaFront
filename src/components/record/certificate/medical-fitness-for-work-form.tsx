'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import { Box, rem, Select, Stack, Textarea, Title } from '@mantine/core';
import MedicalFitnessForWorkSchema, { FITNESS_TYPE_FIT, FITNESS_TYPE_FIT_LIMITATION, FITNESS_TYPE_FIT_NO_FIT, FITNESS_TYPE_FIT_OBSERVATION, MedicalFitnessForWorkSchemaType, adjustInitialValue } from '@/server/record/create-record/certificate/medical-fitness-for-work.schema';

const fitnessValues: { value: string, label: string }[] = [
    { label: 'Apto', value: FITNESS_TYPE_FIT },
    { label: 'Apto en observación', value: FITNESS_TYPE_FIT_OBSERVATION },
    { label: 'Apto con limitaciones', value: FITNESS_TYPE_FIT_LIMITATION },
    { label: 'No apto', value: FITNESS_TYPE_FIT_NO_FIT },
]

type MedicalFitnessForWorkFormProps = {
    data?: Partial<MedicalFitnessForWorkSchemaType>;
    onSubmit?: (value: MedicalFitnessForWorkSchemaType) => void;
}
const MedicalFitnessForWorkForm = React.forwardRef<HTMLFormElement, MedicalFitnessForWorkFormProps>(({
    data,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, getInputProps } = useForm<MedicalFitnessForWorkSchemaType>({
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
                        data={fitnessValues}
                        checkIconPosition="left"
                        label="Aptitud para el trabajo"
                        placeholder="eg. Apto"
                        defaultDropdownOpened={false}
                        maxDropdownHeight={200}
                        allowDeselect={false}
                        {...getInputProps('fitness.type')} />

                    <Textarea
                        label="Observación"
                        rows={5}
                        {...getInputProps('fitness.observation')} />
                </Stack>
            </Box>
        </>
    )
});

MedicalFitnessForWorkForm.displayName = 'MedicalFitnessForWorkForm';

export default MedicalFitnessForWorkForm
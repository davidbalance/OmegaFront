'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import { Box, Divider, rem, Select, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import ConsultationSchema, { CONSULTATION_EVALUATION_TYPE_PERIODIC, CONSULTATION_EVALUATION_TYPE_RETIRE, CONSULTATION_EVALUATION_TYPE_RETURN, CONSULTATION_EVALUATION_TYPE_ENTRY, ConsultationSchemaType, adjustInitialValue } from '@/server/record/create-record/femo/consultation.schema';
import { Option } from '@/lib/types/option.type';
import { DateInput } from '@mantine/dates';

const EvaluationTypeOptions: Option[] = [
    { label: 'Ingreso', value: CONSULTATION_EVALUATION_TYPE_ENTRY },
    { label: 'Periódico', value: CONSULTATION_EVALUATION_TYPE_PERIODIC },
    { label: 'Reintegro', value: CONSULTATION_EVALUATION_TYPE_RETURN },
    { label: 'Retiro', value: CONSULTATION_EVALUATION_TYPE_RETIRE },
]

type FemoConsultationFormProps = {
    data?: Partial<ConsultationSchemaType>,
    onSubmit?: (value: ConsultationSchemaType) => void;
}
const FemoConsultationForm = React.forwardRef<HTMLFormElement, FemoConsultationFormProps>(({
    data,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, getInputProps } = useForm<ConsultationSchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(ConsultationSchema)
    });

    const handleSubmit = useCallback((value: ConsultationSchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Motivo de Consulta</Title>
            <Box
                mt={rem(16)}
                ref={ref}
                component='form'
                onSubmit={formSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>

                <Stack gap={rem(16)}>
                    <TextInput
                        label="Puesto de Trabajo CIUO"
                        placeholder='eg. Gerente'
                        {...getInputProps('consultation.jobPosition')} />

                    <SimpleGrid cols={{ base: 1, md: 3 }}>
                        <DateInput
                            placeholder="aaaa/mm/dd"
                            label="Fecha de Ingreso al Trabajo"
                            {...getInputProps('consultation.work.startDate')} />
                        <DateInput
                            placeholder="aaaa/mm/dd"
                            label="Fecha de Reintegro"
                            {...getInputProps('consultation.work.returnDate')} />
                        <DateInput
                            placeholder="aaaa/mm/dd"
                            label="Fecha de Último día laboral"
                            {...getInputProps('consultation.work.lastDate')} />
                    </SimpleGrid>

                    <Divider label='Tipo de Evaluación' />

                    <Select
                        data={EvaluationTypeOptions}
                        checkIconPosition="left"
                        label="Tipo de Evaluación"
                        defaultDropdownOpened={false}
                        maxDropdownHeight={200}
                        allowDeselect={false}
                        {...getInputProps('consultation.evaluationType')} />

                    <Textarea
                        label="Observación"
                        placeholder='eg. Lore Ipsum...'
                        rows={5}
                        {...getInputProps('consultation.observation')} />

                </Stack>
            </Box>
        </>
    )
});

FemoConsultationForm.displayName = 'FemoConsultationForm';

export default FemoConsultationForm
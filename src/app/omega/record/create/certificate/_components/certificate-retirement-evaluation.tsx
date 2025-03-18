'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import CertificateRetirementEvaluationSchema from '../_schemas/certificate-retirement-evaluation.schema'
import { z } from 'zod';
import { Box, Checkbox, rem, Select, Stack } from '@mantine/core';
import { Option } from '@/lib/types/option.type';

const evaluationCondition: Option[] = [
    { label: 'Presuntiva', value: 'presuntive' },
    { label: 'Definitiva', value: 'definitive' },
    { label: 'No aplica', value: 'no-apply' },
]

const evaluationConditionWithJob: Option[] = [
    { label: 'Si', value: 'yes' },
    { label: 'No', value: 'no' },
    { label: 'No aplica', value: 'no-apply' },
]

type CertificateRetirementEvaluationFormProps = {
    data?: Partial<z.infer<typeof CertificateRetirementEvaluationSchema>>,
    onSubmit?: (value: z.infer<typeof CertificateRetirementEvaluationSchema>) => void;
}
const CertificateRetirementEvaluationForm = React.forwardRef<HTMLFormElement, CertificateRetirementEvaluationFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof CertificateRetirementEvaluationSchema>>({
        initialValues: {
            retirementEvaluationDone: data?.retirementEvaluationDone ?? false,
            retirementEvaluationCondition: data?.retirementEvaluationCondition ?? 'presuntive',
            retirementEvaluationConditionWithJob: data?.retirementEvaluationConditionWithJob ?? 'yes',
        },
        validate: zodResolver(CertificateRetirementEvaluationSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof CertificateRetirementEvaluationSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);


    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Stack gap={rem(32)}>
                <Checkbox
                    checked={form.values.retirementEvaluationDone}
                    label='EL USUARIO SE REALIZO LA EVALUACION MEDICA DE RETIRO'
                    {...form.getInputProps('retirementEvaluationDone')} />

                <Select
                    data={evaluationCondition}
                    checkIconPosition="left"
                    label="CONDICION DEL DIAGNOSTICO"
                    placeholder="eg. Catologica"
                    defaultDropdownOpened={false}
                    maxDropdownHeight={200}
                    {...form.getInputProps('retirementEvaluationCondition')} />

                <Select
                    data={evaluationConditionWithJob}
                    checkIconPosition="left"
                    label="LA CONDICION DE SALUD ESTA RELACIONADA CON EL TRABAJO"
                    placeholder="eg. Catologica"
                    defaultDropdownOpened={false}
                    maxDropdownHeight={200}
                    {...form.getInputProps('retirementEvaluationConditionWithJob')} />
            </Stack>
        </Box>
    )
});

CertificateRetirementEvaluationForm.displayName = 'CertificateRetirementEvaluationForm';

export default CertificateRetirementEvaluationForm
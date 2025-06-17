'use client'

import PreviewRecordWrapper from '@/components/record/preview-record-wrapper';
import { RetirementRecordPayload } from '@/server/record/create-record/retirement-record';
import { Checkbox, rem, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useCallback } from 'react'
import PreviewRetirementRecordInstitution from './preview-retirement-record-institution';
import PreviewRecordMedicalAndSurgicalHistory from '@/components/record/preview-medical-and-surgical-history';
import PreviewJobAccident from '@/components/record/preview-record-job-accident';
import PreviewOccupationalDisease from '@/components/record/preview-record-occupational-disease';
import PreviewRecordVitalSignsAndAnthropometry from '@/components/record/preview-record-vital-signs-and-anthropometry';
import PreviewRecordPhysicalRegionalExam from '@/components/record/preview-record-physical-regional-exam';
import PreviewRecordGeneralExamResultAndSpecific from '@/components/record/preview-record-general-exam-result-and-specific';
import PreviewRecordDiagnostic from '@/components/record/preview-record-diagnostic';
import PreviewRecordRecommendation from '@/components/record/preview-record-recommendation';
import PreviewRetirementRecordEvaluation from './preview-retirement-record-evaluation';
import PreviewRecordProfessionalData from '@/components/record/preview-record-professional-data';

type PreviewRetirementRecordProps = {
    data?: RetirementRecordPayload;
    onSubmit?: (value: RetirementRecordPayload) => void;
}
const PreviewRetirementRecord = React.forwardRef<HTMLFormElement, PreviewRetirementRecordProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<RetirementRecordPayload>({
        initialValues: { ...data!, hideLogo: false }
    });

    const handleSubmit = useCallback((value: RetirementRecordPayload) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            {
                data ? (
                    <Stack gap={rem(32)}>
                        <Checkbox
                            label="Ocultar el logotipo de Omega."
                            {...form.getInputProps('hideLogo')}
                        />

                        <PreviewRecordProfessionalData {...data} />

                        <PreviewRecordWrapper title='Datos del Establecimiento - Empresa y Usuario'>
                            <PreviewRetirementRecordInstitution {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Antecedentes Personales'>
                            <PreviewRecordMedicalAndSurgicalHistory {...data} />
                            <PreviewJobAccident {...data} />
                            <PreviewOccupationalDisease {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Constantes Vitales y Antropometría'>
                            <PreviewRecordVitalSignsAndAnthropometry {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Examen Físico Regional'>
                            <PreviewRecordPhysicalRegionalExam {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Resultados de Exámenes generales y específicos'>
                            <PreviewRecordGeneralExamResultAndSpecific {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Diagnóstico'>
                            <PreviewRecordDiagnostic {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Evaluación Médica de Retiro'>
                            <PreviewRetirementRecordEvaluation {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Recomendaciones y/o Tratamiento'>
                            <PreviewRecordRecommendation {...data} />
                        </PreviewRecordWrapper>
                    </Stack>
                ) : (<>No hay datos disponibles.</>)
            }
        </form>
    )
});

PreviewRetirementRecord.displayName = 'PreviewRetirementRecord';

export default PreviewRetirementRecord
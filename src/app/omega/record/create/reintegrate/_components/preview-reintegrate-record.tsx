'use client'

import { useForm } from '@mantine/form';
import React, { useCallback } from 'react'
import PreviewReintegrateRecordInstitution from './preview-reintegrate-record-institution';
import PreviewRecordWrapper from '@/components/record/preview-record-wrapper';
import { Checkbox, rem, Stack } from '@mantine/core';
import PreviewRecordMedicalConsultation from '@/components/record/preview-record-medical-consultation';
import PreviewRecordCurrentDisease from '@/components/record/preview-record-current-disease';
import PreviewRecordVitalSignsAndAnthropometry from '@/components/record/preview-record-vital-signs-and-anthropometry';
import PreviewRecordPhysicalRegionalExam from '@/components/record/preview-record-physical-regional-exam';
import PreviewRecordGeneralExamResultAndSpecific from '@/components/record/preview-record-general-exam-result-and-specific';
import PreviewRecordDiagnostic from '@/components/record/preview-record-diagnostic';
import PreviewRecordMedicalFitnessForJob from '@/components/record/preview-record-medical-fitness-for-job';
import PreviewRecordRecommendation from '@/components/record/preview-record-recommendation';
import { ReintegrateRecordPayload } from '@/server/record/create-record/reintegrate-record';
import PreviewRecordProfessionalData from '@/components/record/preview-record-professional-data';

type PreviewReintegrateRecordProps = {
    data?: ReintegrateRecordPayload;
    onSubmit?: (value: ReintegrateRecordPayload) => void;
}
const PreviewReintegrateRecord = React.forwardRef<HTMLFormElement, PreviewReintegrateRecordProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<ReintegrateRecordPayload>({
        initialValues: { ...data!, hideLogo: false }
    });

    const handleSubmit = useCallback((value: any) => {
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
                            <PreviewReintegrateRecordInstitution {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Motivo de Consulta'>
                            <PreviewRecordMedicalConsultation {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Enfermedad Actual'>
                            <PreviewRecordCurrentDisease {...data} />
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

                        <PreviewRecordWrapper title='Aptitud médica para el trabajo'>
                            <PreviewRecordMedicalFitnessForJob {...data} showReubication />
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

PreviewReintegrateRecord.displayName = 'PreviewReintegrateRecord';

export default PreviewReintegrateRecord
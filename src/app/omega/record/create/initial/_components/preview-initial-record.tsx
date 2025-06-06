'use client'

import { InitialRecordPayload } from '@/server/record/create-record/initial-record';
import { Checkbox, rem, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useCallback } from 'react'
import PreviewInititalRecordInstitution from './preview-initial-record-institution';
import PreviewRecordWrapper from '@/components/record/preview-record-wrapper';
import PreviewRecordMedicalConsultation from '@/components/record/preview-record-medical-consultation';
import PreviewRecordMedicalAndSurgicalHistory from '@/components/record/preview-medical-and-surgical-history';
import PreviewInitialRecordGinecological from './preview-initial-record-gynecological';
import PreviewInitialRecordMaleReproduction from './preview-initial-record-male-reproduction';
import PreviewRecordToxicHabits from '@/components/record/preview-record-toxic-habits';
import PreviewRecordLifeStyle from '@/components/record/preview-record-life-style';
import PreviewInitialRecordJobHistory from './preview-inital-record-job-history';
import PreviewJobAccident from '@/components/record/preview-record-job-accident';
import PreviewOccupationalDisease from '@/components/record/preview-record-occupational-disease';
import PreviewRecordFamilyHistory from '@/components/record/preview-record-family-history';
import PreviewInitialRecordJobRisk from './preview-inital-record-job-risk';
import PreviewInitialRecordJobRiskPrevention from './preview-inital-record-job-risk-prevention';
import PreviewRecordExtraActivity from '@/components/record/preview-record-extra-activity';
import PreviewRecordCurrentDisease from '@/components/record/preview-record-current-disease';
import PreviewRecordReviewOfOrgansAndSystem from '@/components/record/preview-record-review-of-organs-and-system';
import PreviewRecordVitalSignsAndAnthropometry from '@/components/record/preview-record-vital-signs-and-anthropometry';
import PreviewRecordPhysicalRegionalExam from '@/components/record/preview-record-physical-regional-exam';
import PreviewRecordGeneralExamResultAndSpecific from '@/components/record/preview-record-general-exam-result-and-specific';
import PreviewRecordDiagnostic from '@/components/record/preview-record-diagnostic';
import PreviewRecordMedicalFitnessForJob from '@/components/record/preview-record-medical-fitness-for-job';
import PreviewRecordRecommendation from '@/components/record/preview-record-recommendation';
import PreviewRecordProfessionalData from '@/components/record/preview-record-professional-data';

type PreviewInitialRecordProps = {
    data?: InitialRecordPayload;
    onSubmit?: (value: InitialRecordPayload) => void;
}
const PreviewInitialRecord = React.forwardRef<HTMLFormElement, PreviewInitialRecordProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<InitialRecordPayload>({
        initialValues: { ...data!, hideLogo: false }
    });

    const handleSubmit = useCallback((value: InitialRecordPayload) => {
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
                            <PreviewInititalRecordInstitution {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Motivo de Consulta'>
                            <PreviewRecordMedicalConsultation {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Antecedentes Personales'>
                            <PreviewRecordMedicalAndSurgicalHistory {...data} />
                            {data.patientGender === 'female'
                                ? <PreviewInitialRecordGinecological {...data} />
                                : <PreviewInitialRecordMaleReproduction {...data} />}
                            <PreviewRecordToxicHabits habits={[
                                { name: 'Tabaco', ...data.toxicHabitTobacco },
                                { name: 'Alcohol', ...data.toxicHabitAlcohol },
                                { name: 'Otras drogas', ...data.toxicHabitOther },
                            ]} />
                            <PreviewRecordLifeStyle {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Antecedentes de Trabajo'>
                            <PreviewInitialRecordJobHistory {...data} />
                            <PreviewJobAccident {...data} />
                            <PreviewOccupationalDisease {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Antecedentes Familiares'>
                            <PreviewRecordFamilyHistory {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Factores de Riesgo del Puesto de Trabajo Actual'>
                            <PreviewInitialRecordJobRisk {...data} />
                            <PreviewInitialRecordJobRiskPrevention {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Actividades Extra Laborales'>
                            <PreviewRecordExtraActivity {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Enfermedad Actual'>
                            <PreviewRecordCurrentDisease {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Revisión Actual de Órganos y Sistemas'>
                            <PreviewRecordReviewOfOrgansAndSystem {...data} />
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
                            <PreviewRecordMedicalFitnessForJob {...data} />
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

PreviewInitialRecord.displayName = 'PreviewInitialRecord';

export default PreviewInitialRecord
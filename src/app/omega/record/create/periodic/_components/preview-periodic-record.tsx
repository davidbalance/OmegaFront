'use client'

import PreviewRecordWrapper from '@/components/record/preview-record-wrapper';
import { PeriodicRecordPayload } from '@/server/record/create-record/periodic-record';
import { rem, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useCallback } from 'react'
import PreviewPeriodicRecordInstitution from './preview-periodic-record-institution';
import PreviewRecordMedicalConsultation from '@/components/record/preview-record-medical-consultation';
import PreviewRecordMedicalAndSurgicalHistory from '@/components/record/preview-medical-and-surgical-history';
import PreviewRecordToxicHabits from '@/components/record/preview-record-toxic-habits';
import PreviewRecordLifeStyle from '@/components/record/preview-record-life-style';
import PreviewRecordIncident from '@/components/record/preview-record-incident';
import PreviewJobAccident from '@/components/record/preview-record-job-accident';
import PreviewOccupationalDisease from '@/components/record/preview-record-occupational-disease';
import PreviewRecordFamilyHistory from '@/components/record/preview-record-family-history';
import PreviewPeriodicRecordJobRisk from './preview-periodic-record-job-risk';
import PreviewPeriodicRecordJobRiskPrevention from './preview-periodic-record-job-risk-prevention';
import PreviewRecordCurrentDisease from '@/components/record/preview-record-current-disease';
import PreviewRecordReviewOfOrgansAndSystem from '@/components/record/preview-record-review-of-organs-and-system';
import PreviewRecordVitalSignsAndAnthropometry from '@/components/record/preview-record-vital-signs-and-anthropometry';
import PreviewRecordPhysicalRegionalExam from '@/components/record/preview-record-physical-regional-exam';
import PreviewRecordGeneralExamResultAndSpecific from '@/components/record/preview-record-general-exam-result-and-specific';
import PreviewRecordDiagnostic from '@/components/record/preview-record-diagnostic';
import PreviewRecordMedicalFitnessForJob from '@/components/record/preview-record-medical-fitness-for-job';
import PreviewRecordRecommendation from '@/components/record/preview-record-recommendation';

type PreviewPeriodicRecordProps = {
    data?: PeriodicRecordPayload;
    onSubmit?: (value: PeriodicRecordPayload) => void;
}
const PreviewPeriodicRecord = React.forwardRef<HTMLFormElement, PreviewPeriodicRecordProps>(({
    data,
    onSubmit
}, ref) => {

    console.log(data);

    const form = useForm<PeriodicRecordPayload>({
        initialValues: data
    });

    const handleSubmit = useCallback((value: PeriodicRecordPayload) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            {
                data ? (
                    <Stack gap={rem(32)}>
                        <PreviewRecordWrapper title='DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'>
                            <PreviewPeriodicRecordInstitution {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='MOTIVO DE CONSULTA'>
                            <PreviewRecordMedicalConsultation {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='ANTECEDENTES PERSONALES'>
                            <PreviewRecordMedicalAndSurgicalHistory {...data} />
                            <PreviewRecordToxicHabits habits={[
                                { habit: 'TABACO', ...data.toxicHabitTobacco },
                                { habit: 'ALCOHOL', ...data.toxicHabitAlcohol },
                                { habit: 'OTRAS DROGAS', ...data.toxicHabitOther },
                            ]} />
                            <PreviewRecordLifeStyle {...data} />
                            <PreviewRecordIncident {...data} />
                            <PreviewJobAccident {...data} />
                            <PreviewOccupationalDisease {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='ANTECEDENTES FAMILIARES'>
                            <PreviewRecordFamilyHistory {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='FACTORES DE RIESGOS DEL PUESTO DE TRABAJO ACTUAL'>
                            <PreviewPeriodicRecordJobRisk {...data} />
                            <PreviewPeriodicRecordJobRiskPrevention {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='ENFERMEDAD ACTUAL'>
                            <PreviewRecordCurrentDisease {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='REVISION ACTUAL DE ORGANOS Y SISTEMAS'>
                            <PreviewRecordReviewOfOrgansAndSystem {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='CONSTANTES VITALES Y ANTROPOMETRIA'>
                            <PreviewRecordVitalSignsAndAnthropometry {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='EXAMEN FISICO REGIONAL'>
                            <PreviewRecordPhysicalRegionalExam {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='RESULTADOS DE EXAMENES GENERALES Y ESPECIFICOS'>
                            <PreviewRecordGeneralExamResultAndSpecific {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='DIAGNOSTICO'>
                            <PreviewRecordDiagnostic {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='APTITUD MEDICA PARA EL TRABAJO'>
                            <PreviewRecordMedicalFitnessForJob {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='RECOMENDACIONES Y/O TRATAMIENTO'>
                            <PreviewRecordRecommendation {...data} />
                        </PreviewRecordWrapper>
                        
                    </Stack>
                ) : (<>No hay datos disponibles</>)
            }
        </form>
    )
});

export default PreviewPeriodicRecord
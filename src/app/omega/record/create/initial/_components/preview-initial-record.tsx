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
                            label="Ocultar el logo de Omega."
                            {...form.getInputProps('hideLogo')}
                        />

                        <PreviewRecordWrapper title='DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'>
                            <PreviewInititalRecordInstitution {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='MOTIVO DE CONSULTA'>
                            <PreviewRecordMedicalConsultation {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='ANTECEDENTES PERSONALES'>
                            <PreviewRecordMedicalAndSurgicalHistory {...data} />
                            {data.patientGender === 'female'
                                ? <PreviewInitialRecordGinecological {...data} />
                                : <PreviewInitialRecordMaleReproduction {...data} />}
                            <PreviewRecordToxicHabits habits={[
                                { name: 'TABACO', ...data.toxicHabitTobacco },
                                { name: 'ALCOHOL', ...data.toxicHabitAlcohol },
                                { name: 'OTRAS DROGAS', ...data.toxicHabitOther },
                            ]} />
                            <PreviewRecordLifeStyle {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='ANTECEDENTES DE TRABAJO'>
                            <PreviewInitialRecordJobHistory {...data} />
                            <PreviewJobAccident {...data} />
                            <PreviewOccupationalDisease {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='ANTECEDENTES FAMILIARES'>
                            <PreviewRecordFamilyHistory {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='FACTORES DE RIESGOS DEL PUESTO DE TRABAJO ACTUAL'>
                            <PreviewInitialRecordJobRisk {...data} />
                            <PreviewInitialRecordJobRiskPrevention {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='ACTIVIDADES EXTRA LABORALES'>
                            <PreviewRecordExtraActivity {...data} />
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

PreviewInitialRecord.displayName = 'PreviewInitialRecord';

export default PreviewInitialRecord
'use client'

import { Checkbox, rem, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useCallback } from 'react'
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';
import PreviewCertificateRecordInstitution from './preview-certificate-record-institution';
import PreviewRecordWrapper from '@/components/record/preview-record-wrapper';
import PreviewCertificateRecordEvaluation from './preview-certificate-record-evaluation';
import PreviewRecordMedicalFitnessForJob from '@/components/record/preview-record-medical-fitness-for-job';
import PreviewCertificateRecordRetirementEvaluation from './preview-certificate-record-retirement-evaluation';
import PreviewRecordRecommendation from '@/components/record/preview-record-recommendation';
import PreviewRecordProfessionalData from '@/components/record/preview-record-professional-data';

type PreviewCertificateRecordProps = {
    data?: CertificateRecordPayload;
    onSubmit?: (value: CertificateRecordPayload) => void;
}
const PreviewCertificateRecord = React.forwardRef<HTMLFormElement, PreviewCertificateRecordProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<CertificateRecordPayload>({
        initialValues: { ...data!, hideLogo: false }
    });

    const handleSubmit = useCallback((value: CertificateRecordPayload) => {
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
                            <PreviewCertificateRecordInstitution {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Datos generales'>
                            <PreviewCertificateRecordEvaluation {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Aptitud médica para el trabajo'>
                            <PreviewRecordMedicalFitnessForJob {...data} hideLimitation />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Evaluación Médica de Retiro'>
                            <PreviewCertificateRecordRetirementEvaluation {...data} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='Recomendaciones y/o Tratamiento'>
                            <PreviewRecordRecommendation {...data} />
                        </PreviewRecordWrapper>
                    </Stack>
                ) : (<>No hay datos disponibles..</>)
            }
        </form>
    )
});

PreviewCertificateRecord.displayName = 'PreviewCertificateRecord';

export default PreviewCertificateRecord
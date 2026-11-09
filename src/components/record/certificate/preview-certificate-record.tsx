'use client'

import { rem, Select, SimpleGrid, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useCallback } from 'react'
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';
import PreviewRecordWrapper from '@/components/record/preview-record-wrapper';
import { LOGO_NONE, LOGO_OMEGA } from '@/server/record/create-record/base/author.schema';
import PreviewRecordElement from '../preview-record-element';
import { GENERAL_DATA_EVALUATION_TYPE_ENTRY, GENERAL_DATA_EVALUATION_TYPE_PERIODIC, GENERAL_DATA_EVALUATION_TYPE_RETIREMENT, GENERAL_DATA_EVALUATION_TYPE_RETURN } from '@/server/record/create-record/certificate/general-data.schema';
import { MEDICAL_APTITUDE_FIT, MEDICAL_APTITUDE_FIT_LIMITATION, MEDICAL_APTITUDE_FIT_OBSERVATION, MEDICAL_APTITUDE_NO_FIT } from '@/server/record/create-record/femo/medical-fitness-for-work.schema';

const generalDataType: Record<string, string> = {
    [GENERAL_DATA_EVALUATION_TYPE_ENTRY]: "Ingreso",
    [GENERAL_DATA_EVALUATION_TYPE_PERIODIC]: "Periódica",
    [GENERAL_DATA_EVALUATION_TYPE_RETURN]: "Reintegro",
    [GENERAL_DATA_EVALUATION_TYPE_RETIREMENT]: "Retiro",
}

const fitnessType: Record<string, string> = {
    [MEDICAL_APTITUDE_FIT]: "Apto",
    [MEDICAL_APTITUDE_FIT_OBSERVATION]: "Apto en Observación",
    [MEDICAL_APTITUDE_FIT_LIMITATION]: "Apto con Limitaciones",
    [MEDICAL_APTITUDE_NO_FIT]: "No Apto",
}

const logoOption: { value: string, label: string }[] = [
    { label: 'Ninguno', value: LOGO_NONE },
    { label: 'Omega', value: LOGO_OMEGA },
]

type PreviewCertificateRecordProps = {
    data?: CertificateRecordPayload;
    onSubmit?: (value: CertificateRecordPayload) => void;
}
const PreviewCertificateRecord = React.forwardRef<HTMLFormElement, PreviewCertificateRecordProps>(({
    data,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, getInputProps } = useForm<CertificateRecordPayload>({
        initialValues: data
    });

    const handleSubmit = useCallback((value: CertificateRecordPayload) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={formSubmit(handleSubmit)}>
            {
                data ? (
                    <Stack gap={rem(32)}>
                        <Select
                            data={logoOption}
                            checkIconPosition="left"
                            label="¿Logo para la ficha?"
                            placeholder="eg. Apto"
                            defaultDropdownOpened={false}
                            maxDropdownHeight={200}
                            allowDeselect={false}
                            {...getInputProps('logo')} />

                        <PreviewRecordWrapper title='A. Datos del Establecimiento'>
                            <SimpleGrid cols={6}>
                                <Stack gap={rem(16)}>
                                    <PreviewRecordElement title='Institución del Sistema' text={data.establishment.institutionName} />
                                    <PreviewRecordElement title='RUC' text={data.establishment.ruc} />
                                    <PreviewRecordElement title='CIIU' text={data.establishment.ciiu ?? ""} />
                                    <PreviewRecordElement title='Establecimiento / Centro de Trabajo' text={data.establishment.healthFacility} />
                                </Stack>
                                <Stack gap={rem(16)}>
                                    <PreviewRecordElement title='Primer apellido' text={data.patient.lastName} />
                                    <PreviewRecordElement title='Segundo apellido' text={data.patient.secondLastName} />
                                    <PreviewRecordElement title='Primer nombre' text={data.patient.firstName} />
                                    <PreviewRecordElement title='Segundo nombre' text={data.patient.middleName} />
                                    <PreviewRecordElement title='Sexo' text={data.patient.gender === 'male' ? 'Hombre' : 'Mujer'} />
                                </Stack>
                            </SimpleGrid>
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='B. Datos del Generales'>
                            <PreviewRecordElement title='Evaluacion' text={data.generalDataEvaluation in generalDataType ? generalDataType[data.generalDataEvaluation] : ""} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='C. Aptitud Médica para el Trabajo'>
                            <PreviewRecordElement title='Aptitud' text={data.fitness.type in fitnessType ? fitnessType[data.fitness.type] : ''} />
                            <PreviewRecordElement title='Detalle de Obsevaciones' text={data.fitness.observation ?? ""} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='D. Recomendación/Observaciones'>
                            <PreviewRecordElement title='Descripción' text={data.recommendation.observation ?? ""} />
                        </PreviewRecordWrapper>
                    </Stack>
                ) : (<>No hay datos disponibles..</>)
            }
        </form>
    )
});

PreviewCertificateRecord.displayName = 'PreviewCertificateRecord';

export default PreviewCertificateRecord
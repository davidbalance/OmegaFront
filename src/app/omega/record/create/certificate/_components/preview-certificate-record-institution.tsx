'use client'

import PreviewRecordContent from '@/components/record/preview-record-content';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';
import { rem, SimpleGrid, Stack } from '@mantine/core';
import dayjs from 'dayjs';
import React, { useMemo } from 'react'

type PreviewCertificateRecordInstitutionProps = Pick<CertificateRecordPayload,
    'companyName'
    | 'companyRUC'
    | 'companyCIU'
    | 'institutionHealthFacility'
    | 'patientLastName'
    | 'patientSecondLastName'
    | 'patientFirstName'
    | 'patientMiddleName'
    | 'patientGender'
    | 'jobPosition'
>
const PreviewCertificateRecordInstitution: React.FC<PreviewCertificateRecordInstitutionProps> = ({
    companyName,
    companyRUC,
    companyCIU,
    institutionHealthFacility,
    patientLastName,
    patientSecondLastName,
    patientFirstName,
    patientMiddleName,
    patientGender,
    jobPosition
}) => {

    return (
        <PreviewRecordContent>
            <SimpleGrid cols={2}>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='NOMBRE DE LA EMPRESA' text={companyName} />
                    <PreviewRecordElement title='RUC' text={companyRUC} />
                    <PreviewRecordElement title='CIU' text={companyCIU} />
                    <PreviewRecordElement title='ESTABLECIMIENTO DE SALUD' text={institutionHealthFacility} />
                </Stack>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='PRIMER APELLIDO' text={patientLastName} />
                    <PreviewRecordElement title='SEGUNDO APELLIDO' text={patientSecondLastName} />
                    <PreviewRecordElement title='PRIMER NOMBRE' text={patientFirstName} />
                    <PreviewRecordElement title='SEGUNDO NOMBRE' text={patientMiddleName} />
                    <PreviewRecordElement title='SEXO' text={patientGender === 'male' ? 'MASCULINO' : 'FEMENINO'} />
                </Stack>
            </SimpleGrid>
            <PreviewRecordElement title='PUESTO DE TRABAJO (CUIO)' text={jobPosition} />
        </PreviewRecordContent>
    )
}

export default PreviewCertificateRecordInstitution
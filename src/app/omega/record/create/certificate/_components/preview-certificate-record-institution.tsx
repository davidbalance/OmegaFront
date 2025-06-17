'use client'

import PreviewRecordContent from '@/components/record/preview-record-content';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';
import { rem, SimpleGrid, Stack } from '@mantine/core';
import React from 'react'

type PreviewCertificateRecordInstitutionProps = Pick<CertificateRecordPayload,
    'companyName'
    | 'companyRUC'
    | 'companyCIIU'
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
    companyCIIU,
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
                    <PreviewRecordElement title='Nombre de la empresa' text={companyName} />
                    <PreviewRecordElement title='RUC' text={companyRUC} />
                    <PreviewRecordElement title='CIIU' text={companyCIIU ?? ''} />
                    <PreviewRecordElement title='Establecimiento de Salud' text={institutionHealthFacility} />
                </Stack>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='Primer apellido' text={patientLastName} />
                    <PreviewRecordElement title='Segundo apellido' text={patientSecondLastName} />
                    <PreviewRecordElement title='Primer nombre' text={patientFirstName} />
                    <PreviewRecordElement title='Segundo nombre' text={patientMiddleName} />
                    <PreviewRecordElement title='Sexo' text={patientGender === 'male' ? 'Masculino' : 'Femenino'} />
                </Stack>
            </SimpleGrid>
            <PreviewRecordElement title='Puesto de trabajo (CUIO)' text={jobPosition} />
        </PreviewRecordContent>
    )
}

export default PreviewCertificateRecordInstitution
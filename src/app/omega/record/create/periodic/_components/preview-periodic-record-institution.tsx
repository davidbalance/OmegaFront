'use client'

import PreviewRecordContent from '@/components/record/preview-record-content';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { PeriodicRecordPayload } from '@/server/record/create-record/periodic-record';
import { rem, SimpleGrid, Stack } from '@mantine/core';
import React from 'react'

type PreviewPeriodicRecordInstitutionProps = Pick<PeriodicRecordPayload,
    'patientFirstName'
    | 'patientMiddleName'
    | 'patientLastName'
    | 'patientSecondLastName'
    | 'patientGender'
    | 'companyName'
    | 'companyRUC'
    | 'companyCIIU'
    | 'institutionHealthFacility'
    | 'jobPosition'
>
const PreviewPeriodicRecordInstitution: React.FC<PreviewPeriodicRecordInstitutionProps> = ({
    companyName,
    companyRUC,
    companyCIIU,
    institutionHealthFacility,
    patientLastName,
    patientSecondLastName,
    patientFirstName,
    patientMiddleName,
    patientGender,
    jobPosition,
}) => {

    return (
        <PreviewRecordContent>
            <SimpleGrid cols={3}>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='NOMBRE DE LA EMPRESA' text={companyName} />
                    <PreviewRecordElement title='RUC' text={companyRUC} />
                    <PreviewRecordElement title='CIU' text={companyCIIU ?? ''} />
                    <PreviewRecordElement title='ESTABLECIMIENTO DE SALUD' text={institutionHealthFacility} />
                </Stack>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='PRIMER APELLIDO' text={patientLastName} />
                    <PreviewRecordElement title='SEGUNDO APELLIDO' text={patientSecondLastName} />
                    <PreviewRecordElement title='PRIMER NOMBRE' text={patientFirstName} />
                    <PreviewRecordElement title='SEGUNDO NOMBRE' text={patientMiddleName} />
                    <PreviewRecordElement title='SEXO' text={patientGender === 'male' ? 'MASCULINO' : 'FEMENINO'} />
                </Stack>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='PUESTO DE TRABAJO (CUIO)' text={jobPosition} />
                </Stack>
            </SimpleGrid>
        </PreviewRecordContent>
    )
}

export default PreviewPeriodicRecordInstitution
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
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='Puesto de trabajo (CUIO)' text={jobPosition} />
                </Stack>
            </SimpleGrid>
        </PreviewRecordContent>
    )
}

export default PreviewPeriodicRecordInstitution
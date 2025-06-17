'use client'

import PreviewRecordContent from '@/components/record/preview-record-content';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { ReintegrateRecordPayload } from '@/server/record/create-record/reintegrate-record';
import { rem, SimpleGrid, Stack } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react'

type PreviewReintegrateRecordInstitutionProps = Pick<ReintegrateRecordPayload,
    'patientFirstName'
    | 'patientMiddleName'
    | 'patientLastName'
    | 'patientSecondLastName'
    | 'patientGender'
    | 'patientAge'
    | 'companyName'
    | 'companyRUC'
    | 'companyCIIU'
    | 'institutionHealthFacility'
    | 'jobPosition'
    | 'workingEndDate'
    | 'workingReintegrationDate'
    | 'workingTime'
    | 'workingLeftCause'
>
const PreviewReintegrateRecordInstitution: React.FC<PreviewReintegrateRecordInstitutionProps> = ({
    patientFirstName,
    patientMiddleName,
    patientLastName,
    patientSecondLastName,
    patientGender,
    patientAge,
    companyName,
    companyRUC,
    companyCIIU,
    institutionHealthFacility,
    jobPosition,
    workingEndDate,
    workingReintegrationDate,
    workingTime,
    workingLeftCause
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
                    <PreviewRecordElement title='Edad (años)' text={patientAge.toString()} />
                </Stack>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='Puesto de trabajo (CUIO)' text={jobPosition} />
                    <PreviewRecordElement title='Fecha del último día laboral' text={dayjs(workingEndDate).format('YYYY-MM-DD')} />
                    <PreviewRecordElement title='Fecha DEL REINGRESO' text={dayjs(workingReintegrationDate).format('YYYY-MM-DD')} />
                    <PreviewRecordElement title='Total (días)' text={workingTime.toString()} />
                </Stack>
            </SimpleGrid>
            <PreviewRecordElement title='Causa de salida' text={workingLeftCause} />
        </PreviewRecordContent>
    )
}

export default PreviewReintegrateRecordInstitution
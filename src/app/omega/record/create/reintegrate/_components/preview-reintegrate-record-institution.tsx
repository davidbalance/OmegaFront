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
    | 'companyCIU'
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
    companyCIU,
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
                    <PreviewRecordElement title='EDAD (años)' text={patientAge.toString()} />
                </Stack>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='PUESTO DE TRABAJO (CUIO)' text={jobPosition} />
                    <PreviewRecordElement title='FECHA DEL ULTIMO DIA LABORAL' text={dayjs(workingEndDate).format('YYYY-MM-DD')} />
                    <PreviewRecordElement title='FECHA DEL REINGRESO' text={dayjs(workingReintegrationDate).format('YYYY-MM-DD')} />
                    <PreviewRecordElement title='TOTAL (DÍAS)' text={workingTime.toString()} />
                </Stack>
            </SimpleGrid>
            <PreviewRecordElement title='CAUSA DE SALIDA' text={workingLeftCause} />
        </PreviewRecordContent>
    )
}

export default PreviewReintegrateRecordInstitution
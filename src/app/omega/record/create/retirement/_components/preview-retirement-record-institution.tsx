'use client'

import PreviewRecordContent from '@/components/record/preview-record-content';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { RetirementRecordPayload } from '@/server/record/create-record/retirement-record';
import { Box, rem, SimpleGrid, Stack, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react'

type PreviewRetirementRecordInstitutionProps = Pick<RetirementRecordPayload,
    'patientFirstName'
    | 'patientMiddleName'
    | 'patientLastName'
    | 'patientSecondLastName'
    | 'patientGender'
    | 'companyName'
    | 'companyRUC'
    | 'companyCIU'
    | 'institutionHealthFacility'
    | 'workStartDate'
    | 'workingEndDate'
    | 'workingTime'
    | 'jobPosition'
    | 'institutionActivities'
>
const PreviewRetirementRecordInstitution: React.FC<PreviewRetirementRecordInstitutionProps> = ({
    patientFirstName,
    patientMiddleName,
    patientLastName,
    patientSecondLastName,
    patientGender,
    companyName,
    companyRUC,
    companyCIU,
    institutionHealthFacility,
    workStartDate,
    workingEndDate,
    workingTime,
    jobPosition,
    institutionActivities
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
                </Stack>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='FECHA DE INICIO DE LABORES' text={dayjs(workStartDate).format('YYYY-MM-DD')} />
                    <PreviewRecordElement title='FECHA DEL ULTIMO DIA LABORAL' text={dayjs(workingEndDate).format('YYYY-MM-DD')} />
                    <PreviewRecordElement title='TIEMPO (DÍAS)' text={workingTime.toString()} />
                    <PreviewRecordElement title='PUESTO DE TRABAJO (CUIO)' text={jobPosition} />
                </Stack>
            </SimpleGrid>
            <Box px={rem(8)}>
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>ACTIVIDADES</TableTh>
                            <TableTh>FACTORES DE RIESGO</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>{institutionActivities.map(e => <TableTr key={crypto.randomUUID()}>
                        <TableTd>{e.activity}</TableTd>
                        <TableTd>{e.risk}</TableTd>
                    </TableTr>)}</TableTbody>
                </Table>
            </Box>
        </PreviewRecordContent>
    )
}

export default PreviewRetirementRecordInstitution
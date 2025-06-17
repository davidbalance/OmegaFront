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
    | 'companyCIIU'
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
    companyCIIU,
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
                    <PreviewRecordElement title='Fecha de inicio de labores' text={dayjs(workStartDate).format('YYYY-MM-DD')} />
                    <PreviewRecordElement title='Fecha del último día laboral' text={dayjs(workingEndDate).format('YYYY-MM-DD')} />
                    <PreviewRecordElement title='Tiempo (días)' text={workingTime.toString()} />
                    <PreviewRecordElement title='Puesto de trabajo (CUIO)' text={jobPosition} />
                </Stack>
            </SimpleGrid>
            <Box px={rem(8)}>
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>Actividades</TableTh>
                            <TableTh>Factores de riesgo</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>{institutionActivities.map(e =>
                        <TableTr key={crypto.randomUUID()}>
                            <TableTd>{e.activity}</TableTd>
                            <TableTd>{e.risk}</TableTd>
                        </TableTr>)}</TableTbody>
                </Table>
            </Box>
        </PreviewRecordContent>
    )
}

export default PreviewRetirementRecordInstitution
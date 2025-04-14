'use client'

import PreviewRecordContent from '@/components/record/preview-record-content';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';
import { rem, SimpleGrid, Stack } from '@mantine/core';
import dayjs from 'dayjs';
import React, { useMemo } from 'react'

type PreviewInititalRecordInstitutionProps = Pick<InitialRecordPayload, 'companyName' | 'companyRUC' | 'companyCIU' | 'institutionHealthFacility'
    | 'patientReligion' | 'patientOtherReligion' | 'patientSexualOrientation' | 'patientGenderIdentity'
    | 'patientDisabilityType' | 'patientDisabilityPercent' | 'patientLastName' | 'patientSecondLastName'
    | 'patientFirstName' | 'patientMiddleName' | 'patientGender' | 'patientAge'
    | 'patientBloodType' | 'patientLaterality' | 'jobStartDate' | 'jobPosition' | 'jobArea' | 'jobActivity'>
const PreviewInititalRecordInstitution: React.FC<PreviewInititalRecordInstitutionProps> = ({
    companyName,
    companyRUC,
    companyCIU,
    institutionHealthFacility,
    patientReligion,
    patientOtherReligion,
    patientSexualOrientation,
    patientGenderIdentity,
    patientDisabilityType,
    patientDisabilityPercent,
    patientLastName,
    patientSecondLastName,
    patientFirstName,
    patientMiddleName,
    patientGender,
    patientAge,
    patientBloodType,
    patientLaterality,
    jobStartDate,
    jobPosition,
    jobArea,
    jobActivity
}) => {


    const previewReligion = useMemo(() => {
        switch (patientReligion) {
            case 'catholic': return 'Catálica';
            case 'evangelical': return 'Evangelica';
            case 'jehovah\'s witnesses': return 'Testigo de Jehová';
            case 'mormon': return 'Mormona';
            case 'other': return patientOtherReligion ?? '';
        }
    }, [patientReligion, patientOtherReligion]);

    const previewSexualOrientation = useMemo(() => {
        switch (patientSexualOrientation) {
            case 'lesbian': return 'Lesbiana';
            case 'gay': return 'Gay';
            case 'bisexual': return 'Bisexual';
            case 'heterosexual': return 'Heterosexual';
            case 'unknown': return 'No sabe / No responde';
        }
    }, [patientSexualOrientation]);

    const previewGenderIdentity = useMemo(() => {
        switch (patientGenderIdentity) {
            case 'male': return 'Masculino';
            case 'female': return 'Femenino';
            case 'trans-female': return 'Trans-femenino';
            case 'trans-male': return 'Trans-masculino';
            case 'unknown': return 'No sabe / No responde';
        }
    }, [patientGenderIdentity]);

    const previewDisability = useMemo(() => {
        return patientDisabilityType && patientDisabilityPercent ? `${patientDisabilityType} ${patientDisabilityPercent}%` : ''
    }, [patientDisabilityType, patientDisabilityPercent]);

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
                    <PreviewRecordElement title='RELIGION' text={previewReligion} />
                    <PreviewRecordElement title='GRUPO SANGUINEO' text={patientBloodType} />
                    <PreviewRecordElement title='LATERALIDAD' text={patientLaterality} />
                </Stack>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='ORIENTACION SEXUAL' text={previewSexualOrientation} />
                    <PreviewRecordElement title='IDENTIDAD DE GÉNERO' text={previewGenderIdentity} />
                    <PreviewRecordElement title='DISCAPACIDAD' text={previewDisability} />
                    <PreviewRecordElement title='FECHA DE INGRESO AL TRABAJO' text={dayjs(jobStartDate).format('YYYY/MM/DD')} />
                    <PreviewRecordElement title='PUESTO DE TRABAJO (CUIO)' text={jobPosition} />
                    <PreviewRecordElement title='ÁREA DE TRABAJO' text={jobArea} />
                    <PreviewRecordElement title='ACTIVIDADES RELEVANTES AL PUESTO DE TRABAJO A OCUPAR' text={jobActivity} />
                </Stack>
            </SimpleGrid>
        </PreviewRecordContent>
    )
}

export default PreviewInititalRecordInstitution
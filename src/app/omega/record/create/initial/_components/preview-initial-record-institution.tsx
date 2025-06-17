'use client'

import PreviewRecordContent from '@/components/record/preview-record-content';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';
import { rem, SimpleGrid, Stack } from '@mantine/core';
import dayjs from 'dayjs';
import React, { useMemo } from 'react'

type PreviewInititalRecordInstitutionProps = Pick<InitialRecordPayload,
    'companyName' | 'companyRUC' | 'companyCIIU' | 'institutionHealthFacility'
    | 'patientReligion' | 'patientSexualOrientation' | 'patientGenderIdentity'
    | 'patientDisabilityType' | 'patientDisabilityPercent' | 'patientLastName' | 'patientSecondLastName'
    | 'patientFirstName' | 'patientMiddleName' | 'patientGender' | 'patientAge'
    | 'patientBloodType' | 'patientLaterality' | 'institutionJobStartDate' | 'institutionJobPosition' | 'institutionJobArea' | 'institutionJobActivities'>
const PreviewInititalRecordInstitution: React.FC<PreviewInititalRecordInstitutionProps> = ({
    companyName,
    companyRUC,
    companyCIIU,
    institutionHealthFacility,
    patientReligion,
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
    institutionJobStartDate,
    institutionJobPosition,
    institutionJobArea,
    institutionJobActivities
}) => {


    const previewReligion = useMemo(() => {
        switch (patientReligion) {
            case 'catholic': return 'Católica';
            case 'evangelical': return 'Evangélica';
            case 'jehovah\'s witnesses': return 'Testigo de Jehová';
            case 'mormon': return 'Mormona';
            case 'other': return 'Otra'
        }
    }, [patientReligion]);

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
                    <PreviewRecordElement title='Sexo' text={patientGender === 'male' ? 'HOMBRE (H)' : 'MUJER (M)'} />
                    <PreviewRecordElement title='Edad (años)' text={patientAge.toString()} />
                    <PreviewRecordElement title='Religión' text={previewReligion} />
                    <PreviewRecordElement title='Grupo sanguíneo' text={patientBloodType} />
                    <PreviewRecordElement title='Lateralidad' text={patientLaterality === 'right' ? 'Diestro' : 'Zurdo'} />
                </Stack>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='Orientación sexual' text={previewSexualOrientation} />
                    <PreviewRecordElement title='Identidad de género' text={previewGenderIdentity} />
                    <PreviewRecordElement title='Discapacidad' text={previewDisability} />
                    <PreviewRecordElement title='Fecha DE Ingreso al trabajo' text={dayjs(institutionJobStartDate).format('YYYY/MM/DD')} />
                    <PreviewRecordElement title='Puesto de trabajo (CUIO)' text={institutionJobPosition} />
                    <PreviewRecordElement title='Área de trabajo' text={institutionJobArea} />
                    <PreviewRecordElement title='Actividades relevantes al puesto de trabajo a ocupar' text={institutionJobActivities} />
                </Stack>
            </SimpleGrid>
        </PreviewRecordContent>
    )
}

export default PreviewInititalRecordInstitution
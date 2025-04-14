import { OccupationalDisease } from '@/server/record/create-record/_base'
import React from 'react'
import { SimpleGrid, Text, Title } from '@mantine/core'
import PreviewRecordContent from './preview-record-content'
import dayjs from 'dayjs';
import PreviewRecordElement from './preview-record-element';

type PreviewOccupationalDiseaseProps = OccupationalDisease;
const PreviewOccupationalDisease: React.FC<PreviewOccupationalDiseaseProps> = ({
    occupationalDiseaseHappened,
    occupationalDiseaseDate,
    occupationalDiseaseDescription,
    occupationalDiseaseObservation
}) => {

    return (
        <>
            <Title component='span' order={6} fw='bolder'>ENFERMEDADES PROFESIONALES</Title>
            <PreviewRecordContent>
                <Text component='span'>FUE CALIFICADA POR EL INSTITUTO DE SEGURIDAD SOCIAL CORRESPONDIENTE: <Text component='span' fw='bold'>{occupationalDiseaseHappened ? 'Si' : 'No'}</Text></Text>
                <SimpleGrid cols={2}>
                    <Text component='span'><Text fw='bold'>ESPECIFICAR</Text> {occupationalDiseaseDescription}</Text>
                    <Text component='span'><Text fw='bold'>FECHA</Text> {dayjs(occupationalDiseaseDate).format('YYYY-MM-DD')}</Text>
                </SimpleGrid>
                <PreviewRecordElement title={'Observaciones'} text={occupationalDiseaseObservation ?? ''} />
            </PreviewRecordContent>
        </>
    )
}

export default PreviewOccupationalDisease
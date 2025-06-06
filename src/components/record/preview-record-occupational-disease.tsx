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
            <Title component='span' order={6} fw='bolder'>Enfermedades profesionales</Title>
            <PreviewRecordContent>
                <Text component='span'>¿Fue calificada por el instituto de seguridad social correspondiente? <Text component='span' fw='bold'>{occupationalDiseaseHappened ? 'Si' : 'No'}</Text></Text>
                <SimpleGrid cols={2}>
                    <Text component='span'><Text fw='bold'>Especificar</Text> {occupationalDiseaseDescription}</Text>
                    <Text component='span'><Text fw='bold'>Fecha</Text> {dayjs(occupationalDiseaseDate).format('YYYY-MM-DD')}</Text>
                </SimpleGrid>
                <PreviewRecordElement title={'Observaciones'} text={occupationalDiseaseObservation ?? ''} />
            </PreviewRecordContent>
        </>
    )
}

export default PreviewOccupationalDisease
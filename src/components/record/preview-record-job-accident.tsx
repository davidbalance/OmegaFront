import { JobAccident } from '@/server/record/create-record/_base'
import React from 'react'
import { SimpleGrid, Text, Title } from '@mantine/core'
import PreviewRecordContent from './preview-record-content'
import dayjs from 'dayjs';
import PreviewRecordElement from './preview-record-element';

type PreviewJobAccidentProps = JobAccident;
const PreviewJobAccident: React.FC<PreviewJobAccidentProps> = ({
    jobAccidentHappened,
    jobAccidentDate,
    jobAccidentDescription,
    jobAccidentObservation
}) => {

    return (
        <>
            <Title component='span' order={6} fw='bolder'>Accidentes de trabajo</Title>
            <PreviewRecordContent>
                <Text component='span'>¿Fue calificado por el instituto de seguridad social correspondiente?: <Text component='span' fw='bold'>{jobAccidentHappened ? 'Si' : 'No'}</Text></Text>
                <SimpleGrid cols={2}>
                    <Text component='span'><Text fw='bold'>Especificar</Text> {jobAccidentDescription}</Text>
                    <Text component='span'><Text fw='bold'>Fecha</Text> {dayjs(jobAccidentDate).format('YYYY-MM-DD')}</Text>
                </SimpleGrid>
                <PreviewRecordElement title={'Observaciones'} text={jobAccidentObservation ?? ''} />
            </PreviewRecordContent>
        </>
    )
}

export default PreviewJobAccident
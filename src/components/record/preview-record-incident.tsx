import { IncidentRecord } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'
import Title from '../_base/mantine/title'

type PreviewRecordIncidentProps = IncidentRecord
const PreviewRecordIncident: React.FC<PreviewRecordIncidentProps> = ({
    incidentDescription
}) => {
    return (
        <>
            <Title component='span' order={6} fw='bolder'>Incidentes</Title>
            <PreviewRecordContent>
                <PreviewRecordElement title='Descripción' text={incidentDescription} />
            </PreviewRecordContent>
        </>
    )
}

export default PreviewRecordIncident
import { CurrentDisease } from '@/server/record/create-record/base/author.schema'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'

type PreviewRecordCurrentDiseaseProps = CurrentDisease
const PreviewRecordCurrentDisease: React.FC<PreviewRecordCurrentDiseaseProps> = ({
    currentDiseaseDescription
}) => {
    return (
        <PreviewRecordContent>
            <PreviewRecordElement title='Descripción' text={currentDiseaseDescription ?? ''} />
        </PreviewRecordContent>
    )
}

export default PreviewRecordCurrentDisease
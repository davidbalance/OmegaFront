import { RecordRecommendation } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'

type PreviewRecordRecommendationProps = RecordRecommendation
const PreviewRecordRecommendation: React.FC<PreviewRecordRecommendationProps> = ({
    recommendationDescription
}) => {
    return (
        <PreviewRecordContent>
            <PreviewRecordElement title='Descripcion' text={recommendationDescription} />
        </PreviewRecordContent>
    )
}

export default PreviewRecordRecommendation
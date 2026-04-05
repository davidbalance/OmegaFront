import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'
import { RecommendationSchemaType } from '@/server/record/create-record/certificate/recommendation.schema'

type PreviewRecordRecommendationProps = RecommendationSchemaType
const PreviewRecordRecommendation: React.FC<PreviewRecordRecommendationProps> = ({
    recommendationDescription,
    recommendationObservation
}) => {
    return (
        <PreviewRecordContent>
            <PreviewRecordElement title='Descripción' text={recommendationDescription ?? ""} />
            <PreviewRecordElement title='Observación' text={recommendationObservation ?? ""} />
        </PreviewRecordContent>
    )
}

export default PreviewRecordRecommendation
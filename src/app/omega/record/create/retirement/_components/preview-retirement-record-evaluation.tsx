'use client'

import PreviewRecordContent from '@/components/record/preview-record-content';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { RetirementRecordPayload } from '@/server/record/create-record/retirement-record';
import React from 'react'

type PreviewRetirementRecordEvaluationProps = Pick<RetirementRecordPayload,
    'retirementEvaluationDone'
    | 'retirementEvaluationObservation'
>
const PreviewRetirementRecordEvaluation: React.FC<PreviewRetirementRecordEvaluationProps> = ({
    retirementEvaluationDone,
    retirementEvaluationObservation
}) => {

    return (
        <PreviewRecordContent>
            <PreviewRecordElement title='SE REALIZO LA EVALUACION' text={retirementEvaluationDone ? 'Si' : 'No'} />
            <PreviewRecordElement title='Observaciones' text={retirementEvaluationObservation ?? ''} />
        </PreviewRecordContent>
    )
}

export default PreviewRetirementRecordEvaluation
'use client'

import PreviewRecordContent from '@/components/record/preview-record-content';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { RetirementRecordPayload } from '@/server/record/create-record/retirement-record';
import React from 'react'

type PreviewRetirementRecordEvaluationProps = Pick<RetirementRecordPayload,
    'retirementDone'
    | 'retirementObservation'
>
const PreviewRetirementRecordEvaluation: React.FC<PreviewRetirementRecordEvaluationProps> = ({
    retirementDone,
    retirementObservation
}) => {

    return (
        <PreviewRecordContent>
            <PreviewRecordElement title='SE REALIZO LA EVALUACION' text={retirementDone ? 'Si' : 'No'} />
            <PreviewRecordElement title='Observaciones' text={retirementObservation} />
        </PreviewRecordContent>
    )
}

export default PreviewRetirementRecordEvaluation
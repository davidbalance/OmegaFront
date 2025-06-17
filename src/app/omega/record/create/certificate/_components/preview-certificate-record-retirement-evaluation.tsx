'use client'

import PreviewRecordContent from '@/components/record/preview-record-content';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';
import React from 'react'

type PreviewCertificateRecordRetirementEvaluationProps = Pick<CertificateRecordPayload,
    'retirementEvaluationDone'
    | 'retirementEvaluationCondition'
    | 'retirementEvaluationConditionWithJob'
>
const PreviewCertificateRecordRetirementEvaluation: React.FC<PreviewCertificateRecordRetirementEvaluationProps> = ({
    retirementEvaluationDone,
    retirementEvaluationCondition,
    retirementEvaluationConditionWithJob
}) => {

    return (
        <PreviewRecordContent>
            <PreviewRecordElement title='El usuario se realizó la evaluación médica de retiro' text={retirementEvaluationDone ? 'Si' : 'No'} />
            <PreviewRecordElement title='Condición del diagnóstico' text={retirementEvaluationCondition === 'presuntive'
                ? 'Presuntiva'
                : (retirementEvaluationCondition === 'definitive'
                    ? 'Definitiva'
                    : 'No aplica')} />
            <PreviewRecordElement title='La condición de salud está relacionada con el trabajo' text={retirementEvaluationConditionWithJob === 'yes'
                ? 'Sí'
                : (retirementEvaluationConditionWithJob === 'no'
                    ? 'No'
                    : 'No aplica')} />

        </PreviewRecordContent>
    )
}

export default PreviewCertificateRecordRetirementEvaluation
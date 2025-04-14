'use client'

import Title from '@/components/_base/mantine/title';
import PreviewRecordContent from '@/components/record/preview-record-content';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';
import { Group, rem, Text } from '@mantine/core';
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
            <PreviewRecordElement title='EL USUARIO SE REALIZO LA EVALUACION MEDICA DE RETIRO' text={retirementEvaluationDone ? 'Si' : 'No'} />
            <PreviewRecordElement title='CONDICION DEL DIAGNOSTICO' text={retirementEvaluationCondition === 'presuntive'
                ? 'Presuntiva'
                : (retirementEvaluationCondition === 'definitive'
                    ? 'Definitiva'
                    : 'No aplica')} />
            <PreviewRecordElement title='LA CONDICION DE SALUD ESTA RELACIONADA CON EL TRABAJO' text={retirementEvaluationConditionWithJob === 'yes'
                ? 'Si'
                : (retirementEvaluationConditionWithJob === 'no'
                    ? 'No'
                    : 'No aplica')} />

        </PreviewRecordContent>
    )
}

export default PreviewCertificateRecordRetirementEvaluation
'use client'

import Title from '@/components/_base/mantine/title';
import PreviewRecordContent from '@/components/record/preview-record-content';
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';
import { Group, rem, Text } from '@mantine/core';
import React from 'react'

type PreviewCertificateRecordEvaluationProps = Pick<CertificateRecordPayload,
    'generalData'
>
const PreviewCertificateRecordEvaluation: React.FC<PreviewCertificateRecordEvaluationProps> = ({
    generalData
}) => {

    return (
        <PreviewRecordContent>
            <Title component='span' order={6} fw='bolder'>EVALUACION</Title>
            <PreviewRecordContent>
                <Group gap={rem(8)}>
                    <Text component='span' fw='bolder'>INGRESO</Text>
                    <Text component='span'>{generalData === 'entry' ? 'X' : ''}</Text>
                </Group>
                <Group gap={rem(8)}>
                    <Text component='span' fw='bolder'>PERIODICO</Text>
                    <Text component='span'>{generalData === 'periodic' ? 'X' : ''}</Text>
                </Group>
                <Group gap={rem(8)}>
                    <Text component='span' fw='bolder'>REINTEGRO</Text>
                    <Text component='span'>{generalData === 'reintegrate' ? 'X' : ''}</Text>
                </Group>
                <Group gap={rem(8)}>
                    <Text component='span' fw='bolder'>RETIRO</Text>
                    <Text component='span'>{generalData === 'retirement' ? 'X' : ''}</Text>
                </Group>
            </PreviewRecordContent>

        </PreviewRecordContent>
    )
}

export default PreviewCertificateRecordEvaluation
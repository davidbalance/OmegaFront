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
            <Title component='span' order={6} fw='bolder'>Evaluación</Title>
            <PreviewRecordContent>
                <Group gap={rem(8)}>
                    <Text component='span' fw='bolder'>Ingreso</Text>
                    <Text component='span'>{generalData === 'entry' ? 'X' : ''}</Text>
                </Group>
                <Group gap={rem(8)}>
                    <Text component='span' fw='bolder'>Periódico</Text>
                    <Text component='span'>{generalData === 'periodic' ? 'X' : ''}</Text>
                </Group>
                <Group gap={rem(8)}>
                    <Text component='span' fw='bolder'>Reintegro</Text>
                    <Text component='span'>{generalData === 'reintegrate' ? 'X' : ''}</Text>
                </Group>
                <Group gap={rem(8)}>
                    <Text component='span' fw='bolder'>Retiro</Text>
                    <Text component='span'>{generalData === 'retirement' ? 'X' : ''}</Text>
                </Group>
            </PreviewRecordContent>

        </PreviewRecordContent>
    )
}

export default PreviewCertificateRecordEvaluation
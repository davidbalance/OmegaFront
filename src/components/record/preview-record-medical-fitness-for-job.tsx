import { MedicalFitnessForJob } from '@/server/record/create-record/_base'
import React from 'react'
import { Group, SimpleGrid, Text } from '@mantine/core'
import PreviewRecordContent from './preview-record-content'

type PreviewRecordMedicalFitnessForJobProps = MedicalFitnessForJob & {
    hideLimitation?: boolean;
    showReubication?: boolean;
}
const PreviewRecordMedicalFitnessForJob: React.FC<PreviewRecordMedicalFitnessForJobProps> = ({
    medicalFitnessLimitation,
    medicalFitnessObservation,
    medicalFitnessReubication,
    medicalFitnessType,
    showReubication,
    hideLimitation
}) => {

    return (
        <PreviewRecordContent>
            <SimpleGrid cols={4}>
                <Group>
                    <Text component='span' fw='bold'>Apto</Text>
                    <Text component='span'>{medicalFitnessType === 'fit' ? 'X' : ''}</Text>
                </Group>
                <Group>
                    <Text component='span' fw='bold'>Apto en observación</Text>
                    <Text component='span'>{medicalFitnessType === 'fit-observation' ? 'X' : ''}</Text>
                </Group>
                <Group>
                    <Text component='span' fw='bold'>Apto con limitaciones</Text>
                    <Text component='span'>{medicalFitnessType === 'fit-limitation' ? 'X' : ''}</Text>
                </Group>
                <Group>
                    <Text component='span' fw='bold'>No apto</Text>
                    <Text component='span'>{medicalFitnessType === 'no-fit' ? 'X' : ''}</Text>
                </Group>
            </SimpleGrid>
            <Group>
                <Text component='span' fw='bold'>Observación</Text>
                <Text component='span'>{medicalFitnessObservation}</Text>
            </Group>
            {!hideLimitation && <Group>
                <Text component='span' fw='bold'>Limitación</Text>
                <Text component='span'>{medicalFitnessLimitation}</Text>
            </Group>}
            {showReubication && <Group>
                <Text component='span' fw='bold'>Reubicación</Text>
                <Text component='span'>{medicalFitnessReubication}</Text>
            </Group>}
        </PreviewRecordContent>
    )
}

export default PreviewRecordMedicalFitnessForJob
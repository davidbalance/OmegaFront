import { MedicalFitnessForJob } from '@/server/record/create-record/_base'
import React from 'react'
import { Group, SimpleGrid, Text } from '@mantine/core'
import PreviewRecordContent from './preview-record-content'

type PreviewRecordMedicalFitnessForJobProps = MedicalFitnessForJob
const PreviewRecordMedicalFitnessForJob: React.FC<PreviewRecordMedicalFitnessForJobProps> = ({
    medicalFitnessLimitation,
    medicalFitnessObservation,
    medicalFitnessType
}) => {

    return (
        <PreviewRecordContent>
            <SimpleGrid cols={4}>
                <Group>
                    <Text component='span' fw='bold'>APTO</Text>
                    <Text component='span'>{medicalFitnessType === 'fit' ? 'X' : ''}</Text>
                </Group>
                <Group>
                    <Text component='span' fw='bold'>APTO EN OBSERVACION</Text>
                    <Text component='span'>{medicalFitnessType === 'fit-observation' ? 'X' : ''}</Text>
                </Group>
                <Group>
                    <Text component='span' fw='bold'>APTO CON LIMITACIONES</Text>
                    <Text component='span'>{medicalFitnessType === 'fit-limitation' ? 'X' : ''}</Text>
                </Group>
                <Group>
                    <Text component='span' fw='bold'>NO APTO</Text>
                    <Text component='span'>{medicalFitnessType === 'no-fit' ? 'X' : ''}</Text>
                </Group>
            </SimpleGrid>
            <Group>
                <Text component='span' fw='bold'>Observacion</Text>
                <Text component='span'>{medicalFitnessObservation}</Text>
            </Group>
            <Group>
                <Text component='span' fw='bold'>Limitacion</Text>
                <Text component='span'>{medicalFitnessLimitation}</Text>
            </Group>
        </PreviewRecordContent>
    )
}

export default PreviewRecordMedicalFitnessForJob
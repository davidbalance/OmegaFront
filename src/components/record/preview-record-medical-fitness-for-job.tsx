import React from 'react'
import { Group, SimpleGrid, Text } from '@mantine/core'
import PreviewRecordContent from './preview-record-content'
import { MedicalFitnessForWorkSchemaType } from '@/server/record/create-record/certificate/medical-fitness-for-work.schema'

type PreviewRecordMedicalFitnessForJobProps = MedicalFitnessForWorkSchemaType
const PreviewRecordMedicalFitnessForJob: React.FC<PreviewRecordMedicalFitnessForJobProps> = ({
    fitnessType,
    fitnessObservation
}) => {

    return (
        <PreviewRecordContent>
            <SimpleGrid cols={4}>
                <Group>
                    <Text component='span' fw='bold'>Apto</Text>
                    <Text component='span'>{fitnessType === 'fit' ? 'X' : ''}</Text>
                </Group>
                <Group>
                    <Text component='span' fw='bold'>Apto en observación</Text>
                    <Text component='span'>{fitnessType === 'fit-observation' ? 'X' : ''}</Text>
                </Group>
                <Group>
                    <Text component='span' fw='bold'>Apto con limitaciones</Text>
                    <Text component='span'>{fitnessType === 'fit-limitation' ? 'X' : ''}</Text>
                </Group>
                <Group>
                    <Text component='span' fw='bold'>No apto</Text>
                    <Text component='span'>{fitnessType === 'no-fit' ? 'X' : ''}</Text>
                </Group>
            </SimpleGrid>
            <Group>
                <Text component='span' fw='bold'>Observación</Text>
                <Text component='span'>{fitnessObservation}</Text>
            </Group>
        </PreviewRecordContent>
    )
}

export default PreviewRecordMedicalFitnessForJob
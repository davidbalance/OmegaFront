import { FamilyHistory } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'
import { Grid, GridCol, Text } from '@mantine/core'

const options: Record<keyof FamilyHistory, string> = {
    familyHistoryCardioVascular: 'ENFERMEDAD CARDIO-VASCULAR',
    familyHistoryMetabolic: 'ENFERMEDAD METABOLICA',
    familyHistoryNeurologic: 'ENFERMEDAD NEUROLOGICA',
    familyHistoryOncologic: 'ENFERMEDAD ONCOLOGICA',
    familyHistoryInfectious: 'ENFERMEDAD INFECCIOSA',
    familyHistoryHereditary: 'ENFERMEDAD HEREDITARIA / CONGENITA',
    familyHistoryDisability: 'ENFERMEDAD DISCAPACIDADES',
    familyHistoryOther: 'OTROS',
}

type PreviewRecordFamilyHistoryProps = FamilyHistory;
const PreviewRecordFamilyHistory: React.FC<PreviewRecordFamilyHistoryProps> = ({ ...props }) => {
    return (
        <PreviewRecordContent>
            {Object.entries(options).map(([key, values]) =>
                props[key as keyof FamilyHistory] && (
                    <Grid key={key}>
                        <GridCol span={3}>
                            <Text fw='bold'>{values}</Text>
                        </GridCol>
                        <GridCol span={9}>
                            <PreviewRecordElement title='Descripcion' text={props[key as keyof FamilyHistory] ?? ''} />
                        </GridCol>
                    </Grid>
                )
            )}
        </PreviewRecordContent>
    )
}

export default PreviewRecordFamilyHistory
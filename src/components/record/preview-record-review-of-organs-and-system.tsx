import { ReviewOfOrgansAndSystem } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'
import { Grid, GridCol, Text } from '@mantine/core'

const options: Record<keyof ReviewOfOrgansAndSystem, string> = {
    reviewOfOrgansSkin: 'PIEL - ANEXOS',
    reviewOfOrgansSenseOrgans: 'ÓRGANOS DE LOS SENTIDOS',
    reviewOfOrgansBreath: 'RESPIRATORIO',
    reviewOfOrgansCardiovascular: 'CARDIO-VASCULAR',
    reviewOfOrgansDigestive: 'DIGESTIVO',
    reviewOfOrgansUrinary: 'GENITO - URINARIO',
    reviewOfOrgansSkeletalMuscle: 'MUSCULO ESQUELÉTICO',
    reviewOfOrgansEndocrinic: 'ENDOCRINO',
    reviewOfOrgansHemoLymphatic: 'HEMO LINFÁTICO',
    reviewOfOrgansHighlyStrung: 'NERVIOSO',
}

type PreviewRecordReviewOfOrgansAndSystemProps = ReviewOfOrgansAndSystem
const PreviewRecordReviewOfOrgansAndSystem: React.FC<PreviewRecordReviewOfOrgansAndSystemProps> = ({ ...props }) => {
    return (
        <PreviewRecordContent>
            {!Object.values(props).filter(Boolean) ? 'SIN PATOLOGIA APARENTE' : ''}
            {Object.entries(options).map(([key, values]) =>
                props[key as keyof ReviewOfOrgansAndSystem] && (
                    <Grid>
                        <GridCol span={3}>
                            <Text fw='bold'>{values}</Text>
                        </GridCol>
                        <GridCol span={9}>
                            <PreviewRecordElement title='Descripcion' text={props[key as keyof ReviewOfOrgansAndSystem] ?? ''} />
                        </GridCol>
                    </Grid>
                )
            )}
        </PreviewRecordContent>
    )
}

export default PreviewRecordReviewOfOrgansAndSystem
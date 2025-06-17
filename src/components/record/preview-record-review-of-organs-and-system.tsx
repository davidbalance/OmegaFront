import { ReviewOfOrgansAndSystem } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'
import { Grid, GridCol, Text } from '@mantine/core'

const options: Record<keyof ReviewOfOrgansAndSystem, string> = {
    reviewOfOrgansSkin: 'Piel y anexos',
    reviewOfOrgansSenseOrgans: 'Órganos de los sentidos',
    reviewOfOrgansBreath: 'Respiratorio',
    reviewOfOrgansCardiovascular: 'cardiovascular',
    reviewOfOrgansDigestive: 'Digestivo',
    reviewOfOrgansUrinary: 'Genitourinario',
    reviewOfOrgansSkeletalMuscle: 'Músculo-esquelético',
    reviewOfOrgansEndocrinic: 'Endocrino',
    reviewOfOrgansHemoLymphatic: 'Hemo-linfático',
    reviewOfOrgansHighlyStrung: 'Nervioso',
}

type PreviewRecordReviewOfOrgansAndSystemProps = ReviewOfOrgansAndSystem
const PreviewRecordReviewOfOrgansAndSystem: React.FC<PreviewRecordReviewOfOrgansAndSystemProps> = ({ ...props }) => {
    return (
        <PreviewRecordContent>
            {!Object.values(props).filter(Boolean) ? 'Sin patología aparente' : ''}
            {Object.entries(options).map(([key, values]) =>
                props[key as keyof ReviewOfOrgansAndSystem] && (
                    <Grid key={key}>
                        <GridCol span={3}>
                            <Text fw='bold'>{values}</Text>
                        </GridCol>
                        <GridCol span={9}>
                            <PreviewRecordElement title='Descripción' text={props[key as keyof ReviewOfOrgansAndSystem] ?? ''} />
                        </GridCol>
                    </Grid>
                )
            )}
        </PreviewRecordContent>
    )
}

export default PreviewRecordReviewOfOrgansAndSystem
import { ReviewOfOrgansAndSystem } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'
import { Grid, GridCol, Text } from '@mantine/core'

type PreviewRecordReviewOfOrgansAndSystemProps = ReviewOfOrgansAndSystem
const PreviewRecordReviewOfOrgansAndSystem: React.FC<PreviewRecordReviewOfOrgansAndSystemProps> = ({
    reviewOfOrgansSkin,
    reviewOfOrgansSenseOrgans,
    reviewOfOrgansBreath,
    reviewOfOrgansCardiovascular,
    reviewOfOrgansDigestive,
    reviewOfOrgansUrinary,
    reviewOfOrgansSkeletalMuscle,
    reviewOfOrgansEndocrinic,
    reviewOfOrgansHemoLymphatic,
    reviewOfOrgansHighlyStrung,
}) => {
    return (
        <PreviewRecordContent>
            {reviewOfOrgansSkin &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD CARDIO-VASCULAR</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={reviewOfOrgansSkin} />
                    </GridCol>
                </Grid>)}
            {reviewOfOrgansSenseOrgans &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD METABOLICA</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={reviewOfOrgansSenseOrgans} />
                    </GridCol>
                </Grid>)}
            {reviewOfOrgansBreath &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD NEUROLOGICA</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={reviewOfOrgansBreath} />
                    </GridCol>
                </Grid>)}
            {reviewOfOrgansCardiovascular &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD ONCOLOGICA</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={reviewOfOrgansCardiovascular} />
                    </GridCol>
                </Grid>)}
            {reviewOfOrgansDigestive &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD INFECCIOSA</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={reviewOfOrgansDigestive} />
                    </GridCol>
                </Grid>)}
            {reviewOfOrgansUrinary &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD HEREDITARIA / CONGENITA</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={reviewOfOrgansUrinary} />
                    </GridCol>
                </Grid>)}
            {reviewOfOrgansSkeletalMuscle &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD DISCAPACIDADES</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={reviewOfOrgansSkeletalMuscle} />
                    </GridCol>
                </Grid>)}
            {reviewOfOrgansEndocrinic &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD DISCAPACIDADES</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={reviewOfOrgansEndocrinic} />
                    </GridCol>
                </Grid>)}
            {reviewOfOrgansHemoLymphatic &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>OTROS</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={reviewOfOrgansHemoLymphatic} />
                    </GridCol>
                </Grid>)}
            {reviewOfOrgansHighlyStrung &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>OTROS</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={reviewOfOrgansHighlyStrung} />
                    </GridCol>
                </Grid>)}
        </PreviewRecordContent>
    )
}

export default PreviewRecordReviewOfOrgansAndSystem
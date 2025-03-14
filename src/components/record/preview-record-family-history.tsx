import { FamilyHistory } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'
import { Grid, GridCol, Text } from '@mantine/core'

type PreviewRecordFamilyHistoryProps = FamilyHistory
const PreviewRecordFamilyHistory: React.FC<PreviewRecordFamilyHistoryProps> = ({
    familyHistoryCardioVascular,
    familyHistoryDisability,
    familyHistoryHereditary,
    familyHistoryInfectious,
    familyHistoryMetabolic,
    familyHistoryNeurologic,
    familyHistoryOncologic,
    familyHistoryOther
}) => {
    return (
        <PreviewRecordContent>
            {familyHistoryCardioVascular &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD CARDIO-VASCULAR</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={familyHistoryCardioVascular} />
                    </GridCol>
                </Grid>)}
            {familyHistoryMetabolic &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD METABOLICA</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={familyHistoryMetabolic} />
                    </GridCol>
                </Grid>)}
            {familyHistoryNeurologic &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD NEUROLOGICA</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={familyHistoryNeurologic} />
                    </GridCol>
                </Grid>)}
            {familyHistoryOncologic &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD ONCOLOGICA</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={familyHistoryOncologic} />
                    </GridCol>
                </Grid>)}
            {familyHistoryInfectious &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD INFECCIOSA</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={familyHistoryInfectious} />
                    </GridCol>
                </Grid>)}
            {familyHistoryHereditary &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD HEREDITARIA / CONGENITA</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={familyHistoryHereditary} />
                    </GridCol>
                </Grid>)}
            {familyHistoryDisability &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>ENFERMEDAD DISCAPACIDADES</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={familyHistoryDisability} />
                    </GridCol>
                </Grid>)}
            {familyHistoryOther &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>OTROS</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Descripcion' text={familyHistoryOther} />
                    </GridCol>
                </Grid>)}
        </PreviewRecordContent>
    )
}

export default PreviewRecordFamilyHistory
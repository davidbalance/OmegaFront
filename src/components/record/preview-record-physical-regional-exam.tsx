import { PhysicalRegionalExam } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'
import { Grid, GridCol, Text } from '@mantine/core'

type PreviewRecordPhysicalRegionalExamProps = PhysicalRegionalExam
const PreviewRecordPhysicalRegionalExam: React.FC<PreviewRecordPhysicalRegionalExamProps> = ({
    examSkinScar,
    examSkinTattoo,
    examSkinLesions,
    examEyeEyelids,
    examEyeConjunctiva,
    examEyePupils,
    examEyeCorneas,
    examEyeMotility,
    examEarAuditoryExternal,
    examEarAuricle,
    examEarEardrum,
    examPharynxLips,
    examPharynxTongue,
    examPharynxPharynx,
    examPharynxTonsils,
    examPharynxTeeth,
    examNosePartition,
    examNoseTurbinates,
    examNoseMucousMembranes,
    examNoseParanasalSinuses,
    examNeckThyroid,
    examNeckMobility,
    examChestBreast,
    examChestHeart,
    examChestLungs,
    examChestRibCage,
    examAbdomenViscera,
    examAbdomenAbdominalWall,
    examColumnFlexibility,
    examColumnDeviation,
    examColumnPain,
    examPelvis,
    examPelvisGenitals,
    examLimbVascular,
    examLimbUpper,
    examLimbLower,
    examNeurologicForce,
    examNeurologicSensitivity,
    examNeurologicGait,
    examNeurologicReflex
}) => {
    return (
        <PreviewRecordContent>
            {examSkinScar &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Cicatrices</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examSkinScar} />
                    </GridCol>
                </Grid>)}

            {examSkinTattoo &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Tatuajes</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examSkinTattoo} />
                    </GridCol>
                </Grid>)}
            {examSkinLesions &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Piel y Faneras</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examSkinLesions} />
                    </GridCol>
                </Grid>)}
            {examEyeEyelids &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Párpados</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examEyeEyelids} />
                    </GridCol>
                </Grid>)}
            {examEyeConjunctiva &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Conjuntivas</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examEyeConjunctiva} />
                    </GridCol>
                </Grid>)}
            {examEyePupils &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Pupilas</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examEyePupils} />
                    </GridCol>
                </Grid>)}
            {examEyeCorneas &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Córnea</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examEyeCorneas} />
                    </GridCol>
                </Grid>)}
            {examEyeMotility &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Motilidad</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examEyeMotility} />
                    </GridCol>
                </Grid>)}
            {examEarAuditoryExternal &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>C. auditivo externo</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examEarAuditoryExternal} />
                    </GridCol>
                </Grid>)}
            {examEarAuricle &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Pabellón</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examEarAuricle} />
                    </GridCol>
                </Grid>)}
            {examEarEardrum &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Tímpanos</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examEarEardrum} />
                    </GridCol>
                </Grid>)}
            {examPharynxLips &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Labios</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examPharynxLips} />
                    </GridCol>
                </Grid>)}
            {examPharynxTongue &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Lengua</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examPharynxTongue} />
                    </GridCol>
                </Grid>)}
            {examPharynxPharynx &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Faringe</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examPharynxPharynx} />
                    </GridCol>
                </Grid>)}
            {examPharynxTonsils &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Amígdalas</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examPharynxTonsils} />
                    </GridCol>
                </Grid>)}
            {examPharynxTeeth &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Dentadura</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examPharynxTeeth} />
                    </GridCol>
                </Grid>)}
            {examNosePartition &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Tabique</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examNosePartition} />
                    </GridCol>
                </Grid>)}
            {examNoseTurbinates &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Cornetes</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examNoseTurbinates} />
                    </GridCol>
                </Grid>)}
            {examNoseMucousMembranes &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Mucosas</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examNoseMucousMembranes} />
                    </GridCol>
                </Grid>)}
            {examNoseParanasalSinuses &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Senos paranasales</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examNoseParanasalSinuses} />
                    </GridCol>
                </Grid>)}
            {examNeckThyroid &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Tiroides / masas</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examNeckThyroid} />
                    </GridCol>
                </Grid>)}
            {examNeckMobility &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Movilidad</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examNeckMobility} />
                    </GridCol>
                </Grid>)}
            {examChestBreast &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Mamas</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examChestBreast} />
                    </GridCol>
                </Grid>)}
            {examChestHeart &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Corazón</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examChestHeart} />
                    </GridCol>
                </Grid>)}
            {examChestLungs &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Pulmones</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examChestLungs} />
                    </GridCol>
                </Grid>)}
            {examChestRibCage &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Parrilla Costal</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examChestRibCage} />
                    </GridCol>
                </Grid>)}
            {examAbdomenViscera &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Vísceras</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examAbdomenViscera} />
                    </GridCol>
                </Grid>)}
            {examAbdomenAbdominalWall &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Pared abdominal</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examAbdomenAbdominalWall} />
                    </GridCol>
                </Grid>)}
            {examColumnFlexibility &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Flexibilidad</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examColumnFlexibility} />
                    </GridCol>
                </Grid>)}
            {examColumnDeviation &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Desviación</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examColumnDeviation} />
                    </GridCol>
                </Grid>)}
            {examColumnPain &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Dolor</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examColumnPain} />
                    </GridCol>
                </Grid>)}
            {examPelvis &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Pelvis</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examPelvis} />
                    </GridCol>
                </Grid>)}
            {examPelvisGenitals &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Genitales</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examPelvisGenitals} />
                    </GridCol>
                </Grid>)}
            {examLimbVascular &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Vascular</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examLimbVascular} />
                    </GridCol>
                </Grid>)}
            {examLimbUpper &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Miembros superiores</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examLimbUpper} />
                    </GridCol>
                </Grid>)}
            {examLimbLower &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Miembros inferiores</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examLimbLower} />
                    </GridCol>
                </Grid>)}
            {examNeurologicForce &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Fuerza </Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examNeurologicForce} />
                    </GridCol>
                </Grid>)}
            {examNeurologicSensitivity &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Sensibilidad</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examNeurologicSensitivity} />
                    </GridCol>
                </Grid>)}
            {examNeurologicGait &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Marcha</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examNeurologicGait} />
                    </GridCol>
                </Grid>)}
            {examNeurologicReflex &&
                (<Grid>
                    <GridCol span={3}>
                        <Text fw='bold'>Reflejos</Text>
                    </GridCol>
                    <GridCol span={9}>
                        <PreviewRecordElement title='Observaciones' text={examNeurologicReflex} />
                    </GridCol>
                </Grid>)}
        </PreviewRecordContent>
    )
}

export default PreviewRecordPhysicalRegionalExam
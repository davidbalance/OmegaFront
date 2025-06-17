import { PhysicalRegionalExam } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'
import { Grid, GridCol, Text } from '@mantine/core'

const options: Record<keyof PhysicalRegionalExam, string> = {
    examSkinScar: 'Cicatrices',
    examSkinTattoo: 'Tatuajes',
    examSkinLesions: 'Piel y Faneras',
    examEyeEyelids: 'Párpados',
    examEyeConjunctiva: 'Conjuntivas',
    examEyePupils: 'Pupilas',
    examEyeCorneas: 'Córnea',
    examEyeMotility: 'Motilidad',
    examEarAuditoryExternal: 'C. auditivo externo',
    examEarAuricle: 'Pabellón',
    examEarEardrum: 'Tímpanos',
    examPharynxLips: 'Labios',
    examPharynxTongue: 'Lengua',
    examPharynxPharynx: 'Faringe',
    examPharynxTonsils: 'Amígdalas',
    examPharynxTeeth: 'Dentadura',
    examNosePartition: 'Tabique',
    examNoseTurbinates: 'Cornetes',
    examNoseMucousMembranes: 'Mucosas',
    examNoseParanasalSinuses: 'Senos paranasales',
    examNeckThyroid: 'Tiroides / masas',
    examNeckMobility: 'Movilidad',
    examChestBreast: 'Mamas',
    examChestHeart: 'Corazón',
    examChestLungs: 'Pulmones',
    examChestRibCage: 'Parrilla Costal',
    examAbdomenViscera: 'Vísceras',
    examAbdomenAbdominalWall: 'Pared abdominal',
    examColumnFlexibility: 'Flexibilidad',
    examColumnDeviation: 'Desviación',
    examColumnPain: 'Dolor',
    examPelvis: 'Pelvis',
    examPelvisGenitals: 'Genitales',
    examLimbVascular: 'Vascular',
    examLimbUpper: 'Miembros superiores',
    examLimbLower: 'Miembros inferiores',
    examNeurologicForce: 'Fuerza ',
    examNeurologicSensitivity: 'Sensibilidad',
    examNeurologicGait: 'Marcha',
    examNeurologicReflex: 'Reflejos'
}

type PreviewRecordPhysicalRegionalExamProps = PhysicalRegionalExam
const PreviewRecordPhysicalRegionalExam: React.FC<PreviewRecordPhysicalRegionalExamProps> = ({ ...props }) => {
    return (
        <PreviewRecordContent>
            {Object.entries(options).map(([key, values]) =>
                props[key as keyof PhysicalRegionalExam] && (
                    <Grid key={key}>
                        <GridCol span={3}>
                            <Text fw='bold'>{values}</Text>
                        </GridCol>
                        <GridCol span={9}>
                            <PreviewRecordElement title='Descripción' text={props[key as keyof PhysicalRegionalExam] ?? ''} />
                        </GridCol>
                    </Grid>
                )
            )}
        </PreviewRecordContent>
    )
}

export default PreviewRecordPhysicalRegionalExam
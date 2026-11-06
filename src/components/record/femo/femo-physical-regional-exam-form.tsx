'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useState } from 'react'
import { Box, Divider, Grid, GridCol, rem, Stack, Switch, Textarea, Title } from '@mantine/core';
import PhysicalRegionalExamSchema, { PhysicalRegionalExamSchemaType, adjustInitialValue } from '@/server/record/create-record/femo/physical-regional-exam.schema';

const skinExams: (`physicalExam.region.skin.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["skin"]}`)[] = ["physicalExam.region.skin.scars", "physicalExam.region.skin.appendages"];
const eyeExams: (`physicalExam.region.eye.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["eye"]}`)[] = ["physicalExam.region.eye.conjunctiva", "physicalExam.region.eye.cornea", "physicalExam.region.eye.eyelids", "physicalExam.region.eye.motility", "physicalExam.region.eye.pupils"];
const earExams: (`physicalExam.region.ear.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["ear"]}`)[] = ["physicalExam.region.ear.auricle", "physicalExam.region.ear.eardrums", "physicalExam.region.ear.externalAuditoryCanal"];
const pharynxExams: (`physicalExam.region.oropharynx.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["oropharynx"]}`)[] = ["physicalExam.region.oropharynx.lips", "physicalExam.region.oropharynx.pharynx", "physicalExam.region.oropharynx.teeth", "physicalExam.region.oropharynx.tongue", "physicalExam.region.oropharynx.tonsils"];
const noseExams: (`physicalExam.region.nose.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["nose"]}`)[] = ["physicalExam.region.nose.mucosa", "physicalExam.region.nose.paranasalSinuses", "physicalExam.region.nose.septum", "physicalExam.region.nose.turbinates"];
const neckExams: (`physicalExam.region.neck.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["neck"]}`)[] = ["physicalExam.region.neck.mobility", "physicalExam.region.neck.thyroid"];
const chestExams: (`physicalExam.region.thorax.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["thorax"]}`)[] = ["physicalExam.region.thorax.breasts", "physicalExam.region.thorax.heart", "physicalExam.region.thorax.lungs", "physicalExam.region.thorax.ribCage"];
const abdomenExams: (`physicalExam.region.abdomen.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["abdomen"]}`)[] = ["physicalExam.region.abdomen.abdominalWall", "physicalExam.region.abdomen.viscera"];
const columnExams: (`physicalExam.region.spine.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["spine"]}`)[] = ["physicalExam.region.spine.deviation", "physicalExam.region.spine.flexibility", "physicalExam.region.spine.pain"];
const pelvisExams: (`physicalExam.region.pelvis.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["pelvis"]}`)[] = ["physicalExam.region.pelvis.genitals", "physicalExam.region.pelvis.pelvis"];
const limbExams: (`physicalExam.region.extremities.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["extremities"]}`)[] = ["physicalExam.region.extremities.lowerLimbs", "physicalExam.region.extremities.upperLimbs", "physicalExam.region.extremities.vascular"];
const neurologicExams: (`physicalExam.region.neurological.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["neurological"]}`)[] = ["physicalExam.region.neurological.gait", "physicalExam.region.neurological.reflexes", "physicalExam.region.neurological.sensation", "physicalExam.region.neurological.strength"];

type RegionalExamType = `physicalExam.region.skin.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["skin"]}` |
    `physicalExam.region.eye.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["eye"]}` |
    `physicalExam.region.ear.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["ear"]}` |
    `physicalExam.region.oropharynx.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["oropharynx"]}` |
    `physicalExam.region.nose.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["nose"]}` |
    `physicalExam.region.neck.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["neck"]}` |
    `physicalExam.region.thorax.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["thorax"]}` |
    `physicalExam.region.abdomen.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["abdomen"]}` |
    `physicalExam.region.spine.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["spine"]}` |
    `physicalExam.region.pelvis.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["pelvis"]}` |
    `physicalExam.region.extremities.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["extremities"]}` |
    `physicalExam.region.neurological.${keyof PhysicalRegionalExamSchemaType["physicalExam"]["region"]["neurological"]}`

const physicalRegionalExamSections: { label: string, exams: RegionalExamType[] }[] = [
    {
        label: "Piel",
        exams: skinExams
    },
    {
        label: "Ojos",
        exams: eyeExams
    },
    {
        label: "Oídos",
        exams: earExams
    },
    {
        label: "Oro Faringe",
        exams: pharynxExams
    },
    {
        label: "Naríz",
        exams: noseExams
    },
    {
        label: "Cuello",
        exams: neckExams
    },
    {
        label: "Tórax",
        exams: chestExams
    },
    {
        label: "Abdomen",
        exams: abdomenExams
    },
    {
        label: "Columna",
        exams: columnExams
    },
    {
        label: "Pelvis",
        exams: pelvisExams
    },
    {
        label: "Extremidades",
        exams: limbExams
    },
    {
        label: "Neurológico",
        exams: neurologicExams
    },
]

const initialSwitch: Record<RegionalExamType, boolean> = {
    'physicalExam.region.skin.scars': false,
    'physicalExam.region.skin.appendages': false,
    'physicalExam.region.eye.conjunctiva': false,
    'physicalExam.region.eye.cornea': false,
    'physicalExam.region.eye.eyelids': false,
    'physicalExam.region.eye.motility': false,
    'physicalExam.region.eye.pupils': false,
    'physicalExam.region.ear.auricle': false,
    'physicalExam.region.ear.eardrums': false,
    'physicalExam.region.ear.externalAuditoryCanal': false,
    'physicalExam.region.oropharynx.lips': false,
    'physicalExam.region.oropharynx.pharynx': false,
    'physicalExam.region.oropharynx.teeth': false,
    'physicalExam.region.oropharynx.tongue': false,
    'physicalExam.region.oropharynx.tonsils': false,
    'physicalExam.region.nose.mucosa': false,
    'physicalExam.region.nose.paranasalSinuses': false,
    'physicalExam.region.nose.septum': false,
    'physicalExam.region.nose.turbinates': false,
    'physicalExam.region.neck.mobility': false,
    'physicalExam.region.neck.thyroid': false,
    'physicalExam.region.thorax.breasts': false,
    'physicalExam.region.thorax.heart': false,
    'physicalExam.region.thorax.lungs': false,
    'physicalExam.region.thorax.ribCage': false,
    'physicalExam.region.abdomen.abdominalWall': false,
    'physicalExam.region.abdomen.viscera': false,
    'physicalExam.region.spine.deviation': false,
    'physicalExam.region.spine.flexibility': false,
    'physicalExam.region.spine.pain': false,
    'physicalExam.region.pelvis.genitals': false,
    'physicalExam.region.pelvis.pelvis': false,
    'physicalExam.region.extremities.lowerLimbs': false,
    'physicalExam.region.extremities.upperLimbs': false,
    'physicalExam.region.extremities.vascular': false,
    'physicalExam.region.neurological.gait': false,
    'physicalExam.region.neurological.reflexes': false,
    'physicalExam.region.neurological.sensation': false,
    'physicalExam.region.neurological.strength': false
}

const initSwitch = (value?: Partial<PhysicalRegionalExamSchemaType["physicalExam"]["region"]>): Record<RegionalExamType, boolean> => value ? ({
    'physicalExam.region.neck.thyroid': !!value.neck?.thyroid,
    'physicalExam.region.neck.mobility': !!value.neck?.mobility,
    'physicalExam.region.skin.scars': !!value.skin?.scars,
    'physicalExam.region.skin.appendages': !!value.skin?.appendages,
    'physicalExam.region.eye.eyelids': !!value.eye?.eyelids,
    'physicalExam.region.eye.conjunctiva': !!value.eye?.conjunctiva,
    'physicalExam.region.eye.pupils': !!value.eye?.pupils,
    'physicalExam.region.eye.cornea': !!value.eye?.cornea,
    'physicalExam.region.eye.motility': !!value.eye?.motility,
    'physicalExam.region.ear.externalAuditoryCanal': !!value.ear?.externalAuditoryCanal,
    'physicalExam.region.ear.auricle': !!value.ear?.auricle,
    'physicalExam.region.ear.eardrums': !!value.ear?.eardrums,
    'physicalExam.region.oropharynx.lips': !!value.oropharynx?.lips,
    'physicalExam.region.oropharynx.tongue': !!value.oropharynx?.tongue,
    'physicalExam.region.oropharynx.pharynx': !!value.oropharynx?.pharynx,
    'physicalExam.region.oropharynx.tonsils': !!value.oropharynx?.tonsils,
    'physicalExam.region.oropharynx.teeth': !!value.oropharynx?.teeth,
    'physicalExam.region.nose.septum': !!value.nose?.septum,
    'physicalExam.region.nose.turbinates': !!value.nose?.turbinates,
    'physicalExam.region.nose.mucosa': !!value.nose?.mucosa,
    'physicalExam.region.nose.paranasalSinuses': !!value.nose?.paranasalSinuses,
    'physicalExam.region.thorax.breasts': !!value.thorax?.breasts,
    'physicalExam.region.thorax.lungs': !!value.thorax?.lungs,
    'physicalExam.region.thorax.heart': !!value.thorax?.heart,
    'physicalExam.region.thorax.ribCage': !!value.thorax?.ribCage,
    'physicalExam.region.abdomen.viscera': !!value.abdomen?.viscera,
    'physicalExam.region.abdomen.abdominalWall': !!value.abdomen?.abdominalWall,
    'physicalExam.region.spine.flexibility': !!value.spine?.flexibility,
    'physicalExam.region.spine.deviation': !!value.spine?.deviation,
    'physicalExam.region.spine.pain': !!value.spine?.pain,
    'physicalExam.region.pelvis.pelvis': !!value.pelvis?.pelvis,
    'physicalExam.region.pelvis.genitals': !!value.pelvis?.genitals,
    'physicalExam.region.extremities.vascular': !!value.extremities?.vascular,
    'physicalExam.region.extremities.upperLimbs': !!value.extremities?.upperLimbs,
    'physicalExam.region.extremities.lowerLimbs': !!value.extremities?.lowerLimbs,
    'physicalExam.region.neurological.strength': !!value.neurological?.strength,
    'physicalExam.region.neurological.sensation': !!value.neurological?.sensation,
    'physicalExam.region.neurological.gait': !!value.neurological?.gait,
    'physicalExam.region.neurological.reflexes': !!value.neurological?.reflexes,
}) : initialSwitch

const physicalRegionalExamLabels: Record<RegionalExamType, string> = {
    'physicalExam.region.skin.scars': "Cicatrices",
    'physicalExam.region.skin.appendages': "Piel y Faneras",
    'physicalExam.region.eye.conjunctiva': "Conjuntivas",
    'physicalExam.region.eye.cornea': "Córneas",
    'physicalExam.region.eye.eyelids': "Párpados",
    'physicalExam.region.eye.motility': "Motilidad",
    'physicalExam.region.eye.pupils': "Pupilas",
    'physicalExam.region.ear.auricle': "Pabellón",
    'physicalExam.region.ear.eardrums': "Tímpanos",
    'physicalExam.region.ear.externalAuditoryCanal': "C. Auditivo Externo",
    'physicalExam.region.oropharynx.lips': "Labios",
    'physicalExam.region.oropharynx.pharynx': "Faringe",
    'physicalExam.region.oropharynx.teeth': "Dentadura",
    'physicalExam.region.oropharynx.tongue': "Lengua",
    'physicalExam.region.oropharynx.tonsils': "Amígdalas",
    'physicalExam.region.nose.mucosa': "Mucosas",
    'physicalExam.region.nose.paranasalSinuses': "Senos Paranasales",
    'physicalExam.region.nose.septum': "Cornetes",
    'physicalExam.region.nose.turbinates': "Tabique",
    'physicalExam.region.neck.mobility': "Movilidad",
    'physicalExam.region.neck.thyroid': "Toroides / Masas",
    'physicalExam.region.thorax.breasts': "Mamas",
    'physicalExam.region.thorax.heart': "Corazón",
    'physicalExam.region.thorax.lungs': "Pulmones",
    'physicalExam.region.thorax.ribCage': "Parrilla Costal",
    'physicalExam.region.abdomen.abdominalWall': "Pared Abdominal",
    'physicalExam.region.abdomen.viscera': "Vísceras",
    'physicalExam.region.spine.deviation': "Desviación",
    'physicalExam.region.spine.flexibility': "Flexibilidad",
    'physicalExam.region.spine.pain': "Dolor",
    'physicalExam.region.pelvis.genitals': "Genitales",
    'physicalExam.region.pelvis.pelvis': "Pelvis",
    'physicalExam.region.extremities.lowerLimbs': "Miembros inferioresx",
    'physicalExam.region.extremities.upperLimbs': "Miembros superiores",
    'physicalExam.region.extremities.vascular': "Miembros inferiores",
    'physicalExam.region.neurological.gait': "Sensibilidad",
    'physicalExam.region.neurological.reflexes': "Reflejos",
    'physicalExam.region.neurological.sensation': "Sensibilidadx",
    'physicalExam.region.neurological.strength': "Fuerza"
}

type PhysicalRegionalExamFormProps = {
    data?: Partial<PhysicalRegionalExamSchemaType>;
    onSubmit?: (value: PhysicalRegionalExamSchemaType) => void;
}
const FemoPhysicalRegionalExamForm = React.forwardRef<HTMLFormElement, PhysicalRegionalExamFormProps>(({
    data,
    onSubmit
}, ref) => {

    const [switches, setSwitches] = useState<Record<RegionalExamType, boolean>>(initSwitch(data?.physicalExam?.region));

    const { onSubmit: formSubmit, setFieldValue, getInputProps } = useForm<PhysicalRegionalExamSchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(PhysicalRegionalExamSchema)
    });

    const handleSubmit = useCallback((value: PhysicalRegionalExamSchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleSwitchChange = (key: RegionalExamType, value: boolean) => {
        setSwitches(prev => ({ ...prev, [key]: value }));
        if (!value) setFieldValue(key, '');
    }

    return (
        <>
            <Title order={3}>Examen Físico Regional</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={formSubmit(handleSubmit)}>
                <Stack gap={rem(16)}>
                    <Textarea
                        label="Observación"
                        placeholder='eg. Lore Ipsum...'
                        rows={10}
                        {...getInputProps('physicalExam.examObservation')} />

                    {physicalRegionalExamSections.map(e => (
                        <React.Fragment key={`${e.label.split(" ").join("-").toLocaleLowerCase()}`}>
                            <Divider label={e.label} />
                            <Grid align='center'>
                                {e.exams.map((key) => (
                                    <React.Fragment key={key}>
                                        <GridCol span={4}>
                                            <Switch
                                                label={physicalRegionalExamLabels[key]}
                                                checked={switches[key]}
                                                onChange={e => handleSwitchChange(key, e.target.checked)} />
                                        </GridCol>
                                        <GridCol span={8}>
                                            {switches[key] && (
                                                <Textarea
                                                    w='100%'
                                                    label={physicalRegionalExamLabels[key]}
                                                    placeholder="Escriba la observación aquí"
                                                    {...getInputProps(key)} />)}
                                        </GridCol>
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </React.Fragment>
                    ))}
                </Stack>
            </Box>
        </>
    )
});

FemoPhysicalRegionalExamForm.displayName = 'FemoPhysicalRegionalExamForm';

export default FemoPhysicalRegionalExamForm
'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useState } from 'react'
import PhysicalRegionalExamSchema, { adjustInitialValues } from './schemas/physical-regional-exam.schema'
import { z } from 'zod';
import { Box, Divider, Flex, Grid, GridCol, rem, Stack, Switch, Textarea, TextInput, Title } from '@mantine/core';

const skinExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examSkinScar', 'examSkinTattoo', 'examSkinLesions'];
const eyeExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examEyeEyelids', 'examEyeConjunctiva', 'examEyePupils', 'examEyeCorneas', 'examEyeMotility'];
const earExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examEarAuditoryExternal', 'examEarAuricle', 'examEarEardrum'];
const pharynxExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examPharynxLips', 'examPharynxTongue', 'examPharynxPharynx', 'examPharynxTonsils', 'examPharynxTeeth'];
const noseExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examNosePartition', 'examNoseTurbinates', 'examNoseMucousMembranes', 'examNoseParanasalSinuses'];
const neckExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examNeckThyroid', 'examNeckMobility'];
const chestExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examChestBreast', 'examChestHeart', 'examChestLungs', 'examChestRibCage'];
const abdomenExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examAbdomenViscera', 'examAbdomenAbdominalWall'];
const columnExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examColumnFlexibility', 'examColumnDeviation', 'examColumnPain'];
const pelvisExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examPelvis', 'examPelvisGenitals'];
const limbExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examLimbVascular', 'examLimbUpper', 'examLimbLower'];
const neurologicExams: (keyof z.infer<typeof PhysicalRegionalExamSchema>)[] = ['examNeurologicForce', 'examNeurologicSensitivity', 'examNeurologicGait', 'examNeurologicReflex'];

const options: z.infer<typeof PhysicalRegionalExamSchema> = {
    examSkinScar: "Cicatrices",
    examSkinTattoo: "Tatuajes",
    examSkinLesions: "Fácies",
    examEyeEyelids: "Párpados",
    examEyeConjunctiva: "Conjuntivas",
    examEyePupils: "Pupilas",
    examEyeCorneas: "Córnea",
    examEyeMotility: "Motilidad",
    examEarAuditoryExternal: "Externo",
    examEarAuricle: "Pabellón",
    examEarEardrum: "Tímpanos",
    examPharynxLips: "Labios",
    examPharynxTongue: "Lengua",
    examPharynxPharynx: "Faringe",
    examPharynxTonsils: "Amígdalas",
    examPharynxTeeth: "Dentadura",
    examNosePartition: "Tabique",
    examNoseTurbinates: "Cornetes",
    examNoseMucousMembranes: "Mucosas",
    examNoseParanasalSinuses: "Paranasales",
    examNeckThyroid: "Masas",
    examNeckMobility: "Movilidad",
    examChestBreast: "Mamas",
    examChestHeart: "Corazón",
    examChestLungs: "Pulmones",
    examChestRibCage: "Costal",
    examAbdomenViscera: "Vísceras",
    examAbdomenAbdominalWall: "Abdominal",
    examColumnFlexibility: "Flexibilidad",
    examColumnDeviation: "Desviación",
    examColumnPain: "Dolor",
    examPelvis: "Pelvis",
    examPelvisGenitals: "Genitales",
    examLimbVascular: "Vascular",
    examLimbUpper: "Superiores",
    examLimbLower: "Inferiores",
    examNeurologicForce: "Fuerza",
    examNeurologicSensitivity: "Sensibilidad",
    examNeurologicGait: "Marcha",
    examNeurologicReflex: "Reflejos",
}

type PhysicalRegionalExamFormProps = {
    data?: Partial<z.infer<typeof PhysicalRegionalExamSchema>>;
    onSubmit?: (value: z.infer<typeof PhysicalRegionalExamSchema>) => void;
}
const PhysicalRegionalExamForm = React.forwardRef<HTMLFormElement, PhysicalRegionalExamFormProps>(({
    data,
    onSubmit
}, ref) => {

    const [switches, setSwitches] = useState<Record<keyof z.infer<typeof PhysicalRegionalExamSchema>, boolean>>({
        examSkinScar: !!data?.examSkinScar,
        examSkinTattoo: !!data?.examSkinTattoo,
        examSkinLesions: !!data?.examSkinLesions,
        examEyeEyelids: !!data?.examEyeEyelids,
        examEyeConjunctiva: !!data?.examEyeConjunctiva,
        examEyePupils: !!data?.examEyePupils,
        examEyeCorneas: !!data?.examEyeCorneas,
        examEyeMotility: !!data?.examEyeMotility,
        examEarAuditoryExternal: !!data?.examEarAuditoryExternal,
        examEarAuricle: !!data?.examEarAuricle,
        examEarEardrum: !!data?.examEarEardrum,
        examPharynxLips: !!data?.examPharynxLips,
        examPharynxTongue: !!data?.examPharynxTongue,
        examPharynxPharynx: !!data?.examPharynxPharynx,
        examPharynxTonsils: !!data?.examPharynxTonsils,
        examPharynxTeeth: !!data?.examPharynxTeeth,
        examNosePartition: !!data?.examNosePartition,
        examNoseTurbinates: !!data?.examNoseTurbinates,
        examNoseMucousMembranes: !!data?.examNoseMucousMembranes,
        examNoseParanasalSinuses: !!data?.examNoseParanasalSinuses,
        examNeckThyroid: !!data?.examNeckThyroid,
        examNeckMobility: !!data?.examNeckMobility,
        examChestBreast: !!data?.examChestBreast,
        examChestHeart: !!data?.examChestHeart,
        examChestLungs: !!data?.examChestLungs,
        examChestRibCage: !!data?.examChestRibCage,
        examAbdomenViscera: !!data?.examAbdomenViscera,
        examAbdomenAbdominalWall: !!data?.examAbdomenAbdominalWall,
        examColumnFlexibility: !!data?.examColumnFlexibility,
        examColumnDeviation: !!data?.examColumnDeviation,
        examColumnPain: !!data?.examColumnPain,
        examPelvis: !!data?.examPelvis,
        examPelvisGenitals: !!data?.examPelvisGenitals,
        examLimbVascular: !!data?.examLimbVascular,
        examLimbUpper: !!data?.examLimbUpper,
        examLimbLower: !!data?.examLimbLower,
        examNeurologicForce: !!data?.examNeurologicForce,
        examNeurologicSensitivity: !!data?.examNeurologicSensitivity,
        examNeurologicGait: !!data?.examNeurologicGait,
        examNeurologicReflex: !!data?.examNeurologicReflex,
    });

    const form = useForm<z.infer<typeof PhysicalRegionalExamSchema>>({
        initialValues: adjustInitialValues(data),
        validate: zodResolver(PhysicalRegionalExamSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof PhysicalRegionalExamSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleSwitchChange = useCallback((key: keyof z.infer<typeof PhysicalRegionalExamSchema>, value: boolean) => {
        setSwitches(prev => ({ ...prev, [key]: value }));
        if (!value) form.setFieldValue(key, '');
    }, [form]);

    return (
        <>
            <Title order={3}>Examen Físico Regional</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={rem(16)}>
                    <Divider label='Piel' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => skinExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => skinExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                    <Divider label='Ojos' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => eyeExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => eyeExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                    <Divider label='Oido' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => earExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => earExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                    <Divider label='Oro Faringe' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => pharynxExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => pharynxExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                    <Divider label='Nariz' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => noseExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => noseExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                    <Divider label='Cuello' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => neckExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => neckExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                    <Divider label='Torax' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => chestExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => chestExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                    <Divider label='Abdomen' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => abdomenExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => abdomenExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                    <Divider label='Columna' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => columnExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => columnExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                    <Divider label='Pelvis' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => pelvisExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => pelvisExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                    <Divider label='Extremidades' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => limbExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => limbExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                    <Divider label='Neurologico' />
                    <Grid>
                        <GridCol span={4}>
                            <Stack gap={rem(16)}>
                                {Object.entries(options).filter(([key]) => neurologicExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    <Switch
                                        key={key}
                                        label={value}
                                        checked={switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>]}
                                        onChange={e => handleSwitchChange(key as keyof z.infer<typeof PhysicalRegionalExamSchema>, e.target.checked)} />
                                ))}
                            </Stack>
                        </GridCol>
                        <GridCol span={8}>
                            <Stack
                                gap={rem(32)}
                                align='start' w='100%'>
                                {Object.entries(options).filter(([key]) => neurologicExams.includes(key as keyof z.infer<typeof PhysicalRegionalExamSchema>)).map(([key, value]) => (
                                    switches[key as keyof z.infer<typeof PhysicalRegionalExamSchema>] &&
                                    <Textarea
                                        key={key}
                                        w='100%'
                                        rows={5}
                                        label={value}
                                        placeholder="Escriba la observación aquí"
                                        {...form.getInputProps(key)} />
                                ))}
                            </Stack>
                        </GridCol>
                    </Grid>

                </Stack>
            </Box>
        </>
    )
});

PhysicalRegionalExamForm.displayName = 'PhysicalRegionalExamForm';

export default PhysicalRegionalExamForm
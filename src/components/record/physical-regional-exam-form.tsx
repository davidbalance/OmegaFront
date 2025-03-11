'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useState } from 'react'
import PhysicalRegionalExamSchema from './schemas/physical-regional-exam.schema'
import { z } from 'zod';
import { Divider, Flex, Grid, GridCol, rem, Stack, Switch, Textarea, TextInput } from '@mantine/core';

type PhysicalRegionalExamFormProps = {
    data?: Partial<z.infer<typeof PhysicalRegionalExamSchema>>;
    onSubmit?: (value: z.infer<typeof PhysicalRegionalExamSchema>) => void;
}
const PhysicalRegionalExamForm = React.forwardRef<HTMLFormElement, PhysicalRegionalExamFormProps>(({
    data,
    onSubmit
}, ref) => {

    const [examSkinScar, setExamSkinScar] = useState(!!data?.examSkinScar);
    const [examSkinTattoo, setExamSkinTattoo] = useState(!!data?.examSkinTattoo);
    const [examSkinLesions, setExamSkinLesions] = useState(!!data?.examSkinLesions);
    const [examEyeEyelids, setExamEyeEyelids] = useState(!!data?.examEyeEyelids);
    const [examEyeConjunctiva, setExamEyeConjunctiva] = useState(!!data?.examEyeConjunctiva);
    const [examEyePupils, setExamEyePupils] = useState(!!data?.examEyePupils);
    const [examEyeCorneas, setExamEyeCorneas] = useState(!!data?.examEyeCorneas);
    const [examEyeMotility, setExamEyeMotility] = useState(!!data?.examEyeMotility);
    const [examEarAuditoryExternal, setExamEarAuditoryExternal] = useState(!!data?.examEarAuditoryExternal);
    const [examEarAuricle, setExamEarAuricle] = useState(!!data?.examEarAuricle);
    const [examEarEardrum, setExamEarEardrum] = useState(!!data?.examEarEardrum);
    const [examPharynxLips, setExamPharynxLips] = useState(!!data?.examPharynxLips);
    const [examPharynxTongue, setExamPharynxTongue] = useState(!!data?.examPharynxTongue);
    const [examPharynxPharynx, setExamPharynxPharynx] = useState(!!data?.examPharynxPharynx);
    const [examPharynxTonsils, setExamPharynxTonsils] = useState(!!data?.examPharynxTonsils);
    const [examPharynxTeeth, setExamPharynxTeeth] = useState(!!data?.examPharynxTeeth);
    const [examNosePartition, setExamNosePartition] = useState(!!data?.examNosePartition);
    const [examNoseTurbinates, setExamNoseTurbinates] = useState(!!data?.examNoseTurbinates);
    const [examNoseMucousMembranes, setExamNoseMucousMembranes] = useState(!!data?.examNoseMucousMembranes);
    const [examNoseParanasalSinuses, setExamNoseParanasalSinuses] = useState(!!data?.examNoseParanasalSinuses);
    const [examNeckThyroid, setExamNeckThyroid] = useState(!!data?.examNeckThyroid);
    const [examNeckMobility, setExamNeckMobility] = useState(!!data?.examNeckMobility);
    const [examChestBreast, setExamChestBreast] = useState(!!data?.examChestBreast);
    const [examChestHeart, setExamChestHeart] = useState(!!data?.examChestHeart);
    const [examChestLungs, setExamChestLungs] = useState(!!data?.examChestLungs);
    const [examChestRibCage, setExamChestRibCage] = useState(!!data?.examChestRibCage);
    const [examAbdomenViscera, setExamAbdomenViscera] = useState(!!data?.examAbdomenViscera);
    const [examAbdomenAbdominalWall, setExamAbdomenAbdominalWall] = useState(!!data?.examAbdomenAbdominalWall);
    const [examColumnFlexibility, setExamColumnFlexibility] = useState(!!data?.examColumnFlexibility);
    const [examColumnDeviation, setExamColumnDeviation] = useState(!!data?.examColumnDeviation);
    const [examColumnPain, setExamColumnPain] = useState(!!data?.examColumnPain);
    const [examPelvis, setExamPelvis] = useState(!!data?.examPelvis);
    const [examPelvisGenitals, setExamPelvisGenitals] = useState(!!data?.examPelvisGenitals);
    const [examLimbVascular, setExamLimbVascular] = useState(!!data?.examLimbVascular);
    const [examLimbUpper, setExamLimbUpper] = useState(!!data?.examLimbUpper);
    const [examLimbLower, setExamLimbLower] = useState(!!data?.examLimbLower);
    const [examNeurologicForce, setExamNeurologicForce] = useState(!!data?.examNeurologicForce);
    const [examNeurologicSensitivity, setExamNeurologicSensitivity] = useState(!!data?.examNeurologicSensitivity);
    const [examNeurologicGait, setExamNeurologicGait] = useState(!!data?.examNeurologicGait);
    const [examNeurologicReflex, setExamNeurologicReflex] = useState(!!data?.examNeurologicReflex);

    const form = useForm<z.infer<typeof PhysicalRegionalExamSchema>>({
        initialValues: {
            examSkinScar: data?.examSkinScar ?? '',
            examSkinTattoo: data?.examSkinTattoo ?? '',
            examSkinLesions: data?.examSkinLesions ?? '',
            examEyeEyelids: data?.examEyeEyelids ?? '',
            examEyeConjunctiva: data?.examEyeConjunctiva ?? '',
            examEyePupils: data?.examEyePupils ?? '',
            examEyeCorneas: data?.examEyeCorneas ?? '',
            examEyeMotility: data?.examEyeMotility ?? '',
            examEarAuditoryExternal: data?.examEarAuditoryExternal ?? '',
            examEarAuricle: data?.examEarAuricle ?? '',
            examEarEardrum: data?.examEarEardrum ?? '',
            examPharynxLips: data?.examPharynxLips ?? '',
            examPharynxTongue: data?.examPharynxTongue ?? '',
            examPharynxPharynx: data?.examPharynxPharynx ?? '',
            examPharynxTonsils: data?.examPharynxTonsils ?? '',
            examPharynxTeeth: data?.examPharynxTeeth ?? '',
            examNosePartition: data?.examNosePartition ?? '',
            examNoseTurbinates: data?.examNoseTurbinates ?? '',
            examNoseMucousMembranes: data?.examNoseMucousMembranes ?? '',
            examNoseParanasalSinuses: data?.examNoseParanasalSinuses ?? '',
            examNeckThyroid: data?.examNeckThyroid ?? '',
            examNeckMobility: data?.examNeckMobility ?? '',
            examChestBreast: data?.examChestBreast ?? '',
            examChestHeart: data?.examChestHeart ?? '',
            examChestLungs: data?.examChestLungs ?? '',
            examChestRibCage: data?.examChestRibCage ?? '',
            examAbdomenViscera: data?.examAbdomenViscera ?? '',
            examAbdomenAbdominalWall: data?.examAbdomenAbdominalWall ?? '',
            examColumnFlexibility: data?.examColumnFlexibility ?? '',
            examColumnDeviation: data?.examColumnDeviation ?? '',
            examColumnPain: data?.examColumnPain ?? '',
            examPelvis: data?.examPelvis ?? '',
            examPelvisGenitals: data?.examPelvisGenitals ?? '',
            examLimbVascular: data?.examLimbVascular ?? '',
            examLimbUpper: data?.examLimbUpper ?? '',
            examLimbLower: data?.examLimbLower ?? '',
            examNeurologicForce: data?.examNeurologicForce ?? '',
            examNeurologicSensitivity: data?.examNeurologicSensitivity ?? '',
            examNeurologicGait: data?.examNeurologicGait ?? '',
            examNeurologicReflex: data?.examNeurologicReflex ?? '',
        },
        validate: zodResolver(PhysicalRegionalExamSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof PhysicalRegionalExamSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={rem(16)}>
                <Divider label='Piel' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="CICATRICES" onChange={e => setExamSkinScar(e.target.checked)} />
                            <Switch label="TATUAJES" onChange={e => setExamSkinTattoo(e.target.checked)} />
                            <Switch label="PIEN Y FANACEAS" onChange={e => setExamSkinLesions(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examSkinScar && <TextInput
                                w='100%'
                                label="CICATRICES"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examSkinScar')} />}
                            {examSkinTattoo && <TextInput
                                w='100%'
                                label="TATUAJES"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examSkinTattoo')} />}
                            {examSkinLesions && <TextInput
                                w='100%'
                                label="PIEN Y FANACEAS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examSkinLesions')} />}
                        </Stack>
                    </GridCol>
                </Grid>

                <Divider label='Ojos' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="PARPADOS" onChange={e => setExamEyeEyelids(e.target.checked)} />
                            <Switch label="CONJUNTIVAS" onChange={e => setExamEyeConjunctiva(e.target.checked)} />
                            <Switch label="PUPILAS" onChange={e => setExamEyePupils(e.target.checked)} />
                            <Switch label="CORNEA" onChange={e => setExamEyeCorneas(e.target.checked)} />
                            <Switch label="MOTILIDAD" onChange={e => setExamEyeMotility(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examEyeEyelids && <TextInput
                                w='100%'
                                label="PARPADOS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examEyeEyelids')} />}
                            {examEyeConjunctiva && <TextInput
                                w='100%'
                                label="CONJUNTIVAS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examEyeConjunctiva')} />}
                            {examEyePupils && <TextInput
                                w='100%'
                                label="PUPILAS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examEyePupils')} />}
                            {examEyeCorneas && <TextInput
                                w='100%'
                                label="CORNEA"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examEyeCorneas')} />}
                            {examEyeMotility && <TextInput
                                w='100%'
                                label="MOTILIDAD"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examEyeMotility')} />}
                        </Stack>
                    </GridCol>
                </Grid>

                <Divider label='Oido' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="C. AUDITIVO EXTERNO" onChange={e => setExamEarAuditoryExternal(e.target.checked)} />
                            <Switch label="PABELLON" onChange={e => setExamEarAuricle(e.target.checked)} />
                            <Switch label="TIMPANOS" onChange={e => setExamEarEardrum(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examEarAuditoryExternal && <TextInput
                                w='100%'
                                label="C. AUDITIVO EXTERNO"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examEarAuditoryExternal')} />}
                            {examEarAuricle && <TextInput
                                w='100%'
                                label="PABELLON"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examEarAuricle')} />}
                            {examEarEardrum && <TextInput
                                w='100%'
                                label="TIMPANOS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examEarEardrum')} />}
                        </Stack>
                    </GridCol>
                </Grid>

                <Divider label='Oro Faringe' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="LABIOS" onChange={e => setExamPharynxLips(e.target.checked)} />
                            <Switch label="LENGUA" onChange={e => setExamPharynxTongue(e.target.checked)} />
                            <Switch label="FARINGE" onChange={e => setExamPharynxPharynx(e.target.checked)} />
                            <Switch label="AMIGDALAS" onChange={e => setExamPharynxTonsils(e.target.checked)} />
                            <Switch label="DENTADURA" onChange={e => setExamPharynxTeeth(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examPharynxLips && <TextInput
                                w='100%'
                                label="LABIOS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examPharynxLips')} />}
                            {examPharynxTongue && <TextInput
                                w='100%'
                                label="LENGUA"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examPharynxTongue')} />}
                            {examPharynxPharynx && <TextInput
                                w='100%'
                                label="FARINGE"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examPharynxPharynx')} />}
                            {examPharynxTonsils && <TextInput
                                w='100%'
                                label="AMIGDALAS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examPharynxTonsils')} />}
                            {examPharynxTeeth && <TextInput
                                w='100%'
                                label="DENTADURA"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examPharynxTeeth')} />}
                        </Stack>
                    </GridCol>
                </Grid>

                <Divider label='Nariz' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="TABIQUE" onChange={e => setExamNosePartition(e.target.checked)} />
                            <Switch label="CORNETES" onChange={e => setExamNoseTurbinates(e.target.checked)} />
                            <Switch label="MUCOSAS" onChange={e => setExamNoseMucousMembranes(e.target.checked)} />
                            <Switch label="SENOS PARANASALES" onChange={e => setExamNoseParanasalSinuses(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examNosePartition && <TextInput
                                w='100%'
                                label="TABIQUE"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examNosePartition')} />}
                            {examNoseTurbinates && <TextInput
                                w='100%'
                                label="CORNETES"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examNoseTurbinates')} />}
                            {examNoseMucousMembranes && <TextInput
                                w='100%'
                                label="MUCOSAS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examNoseMucousMembranes')} />}
                            {examNoseParanasalSinuses && <TextInput
                                w='100%'
                                label="SENOS PARANASALES"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examNoseParanasalSinuses')} />}
                        </Stack>
                    </GridCol>
                </Grid>

                <Divider label='Cuello' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="TIROIDES / MASAS" onChange={e => setExamNeckThyroid(e.target.checked)} />
                            <Switch label="MOVILIDAD" onChange={e => setExamNeckMobility(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examNeckThyroid && <TextInput
                                w='100%'
                                label="TIROIDES / MASAS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examNeckThyroid')} />}
                            {examNeckMobility && <TextInput
                                w='100%'
                                label="MOVILIDAD"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examNeckMobility')} />}
                        </Stack>
                    </GridCol>
                </Grid>

                <Divider label='Torax' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="MAMAS" onChange={e => setExamChestBreast(e.target.checked)} />
                            <Switch label="CORAZON" onChange={e => setExamChestHeart(e.target.checked)} />
                            <Switch label="PULMONES" onChange={e => setExamChestLungs(e.target.checked)} />
                            <Switch label="PARILLA COSTAL" onChange={e => setExamChestRibCage(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examChestBreast && <TextInput
                                w='100%'
                                label="MAMAS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examChestBreast')} />}
                            {examChestHeart && <TextInput
                                w='100%'
                                label="CORAZON"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examChestHeart')} />}
                            {examChestLungs && <TextInput
                                w='100%'
                                label="PULMONES"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examChestLungs')} />}
                            {examChestRibCage && <TextInput
                                w='100%'
                                label="PARILLA COSTAL"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examChestRibCage')} />}
                        </Stack>
                    </GridCol>
                </Grid>

                <Divider label='Abdomen' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="VISCERAS" onChange={e => setExamAbdomenViscera(e.target.checked)} />
                            <Switch label="PARED ABDOMINAL" onChange={e => setExamAbdomenAbdominalWall(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examAbdomenViscera && <TextInput
                                w='100%'
                                label="VISCERAS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examAbdomenViscera')} />}
                            {examAbdomenAbdominalWall && <TextInput
                                w='100%'
                                label="PARED ABDOMINAL"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examAbdomenAbdominalWall')} />}
                        </Stack>
                    </GridCol>
                </Grid>

                <Divider label='Columna' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="FLEXIBILIDAD" onChange={e => setExamColumnFlexibility(e.target.checked)} />
                            <Switch label="DESVIACION" onChange={e => setExamColumnDeviation(e.target.checked)} />
                            <Switch label="DOLOR" onChange={e => setExamColumnPain(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examColumnFlexibility && <TextInput
                                w='100%'
                                label="FLEXIBILIDAD"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examColumnFlexibility')} />}
                            {examColumnDeviation && <TextInput
                                w='100%'
                                label="DESVIACION"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examColumnDeviation')} />}
                            {examColumnPain && <TextInput
                                w='100%'
                                label="DOLOR"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examColumnPain')} />}
                        </Stack>
                    </GridCol>
                </Grid>

                <Divider label='Pelvis' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="PELVIS" onChange={e => setExamPelvis(e.target.checked)} />
                            <Switch label="GENITALES" onChange={e => setExamPelvisGenitals(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examPelvis && <TextInput
                                w='100%'
                                label="PELVIS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examPelvis')} />}
                            {examPelvisGenitals && <TextInput
                                w='100%'
                                label="GENITALES"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examPelvisGenitals')} />}
                        </Stack>
                    </GridCol>
                </Grid>

                <Divider label='Extremidades' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="VASCULAR" onChange={e => setExamLimbVascular(e.target.checked)} />
                            <Switch label="MIEMBROS SUPERIORES" onChange={e => setExamLimbUpper(e.target.checked)} />
                            <Switch label="MIEMBROS INFERIORES" onChange={e => setExamLimbLower(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examLimbVascular && <TextInput
                                w='100%'
                                label="VASCULAR"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examLimbVascular')} />}
                            {examLimbUpper && <TextInput
                                w='100%'
                                label="MIEMBROS SUPERIORES"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examLimbUpper')} />}
                            {examLimbLower && <TextInput
                                w='100%'
                                label="MIEMBROS INFERIORES"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examLimbLower')} />}
                        </Stack>
                    </GridCol>
                </Grid>

                <Divider label='Neurologico' />
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            <Switch label="FUERZA" onChange={e => setExamNeurologicForce(e.target.checked)} />
                            <Switch label="SENSIBILIDAD" onChange={e => setExamNeurologicSensitivity(e.target.checked)} />
                            <Switch label="MARCHA" onChange={e => setExamNeurologicGait(e.target.checked)} />
                            <Switch label="REFLEJOS" onChange={e => setExamNeurologicReflex(e.target.checked)} />
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(16)}
                            align='start' w='100%'>
                            {examNeurologicForce && <TextInput
                                w='100%'
                                label="FUERZA"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examNeurologicForce')} />}
                            {examNeurologicSensitivity && <TextInput
                                w='100%'
                                label="SENSIBILIDAD"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examNeurologicSensitivity')} />}
                            {examNeurologicGait && <TextInput
                                w='100%'
                                label="MARCHA"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examNeurologicGait')} />}
                            {examNeurologicReflex && <TextInput
                                w='100%'
                                label="REFLEJOS"
                                placeholder="Escriba la observacion aqui"
                                {...form.getInputProps('examNeurologicReflex')} />}
                        </Stack>
                    </GridCol>
                </Grid>

            </Stack>
        </form>
    )
});

PhysicalRegionalExamForm.displayName = 'PhysicalRegionalExamForm';

export default PhysicalRegionalExamForm
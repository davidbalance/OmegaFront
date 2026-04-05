'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import { ActionIcon, Box, Checkbox, Divider, Flex, rem, Stack, Table, TableScrollContainer, TableTbody, TableTd, TableTh, TableThead, TableTr, Textarea, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import RiskFactorsSchema, { DEFAULT_RISK_FACTOR, RiskFactorsSchemaType, adjustInitialValue, RiskFactorSchemaType, BiologicalFormType, ChemicalFormType, ErgonomicFormType, PhysicalFormType, PsychosocialFormType, SafetyElectricalFormType, SafetyLocativeFormType, SafetyMechanicalFormType } from '@/server/record/create-record/femo/risk-factor.schema';

const physicals: PhysicalFormType[] = ["physical.highTemperature", "physical.lowTemperature", "physical.ionizingRadiation", "physical.nonIonizingRadiation", "physical.noise", "physical.vibration", "physical.lighting", "physical.ventilation", "physical.electricCurrent"];
const locatives: SafetyLocativeFormType[] = ["safety.locative.missingSignageCleaningDisorder"];
const mechanicals: SafetyMechanicalFormType[] = ["safety.mechanical.machineOrSurfaceEntrapment", "safety.mechanical.objectEntrapment", "safety.mechanical.fallingObjects", "safety.mechanical.fallsSameLevel", "safety.mechanical.fallsDifferentLevel", "safety.mechanical.punctures", "safety.mechanical.cuts", "safety.mechanical.vehicleCollision", "safety.mechanical.vehicleRunOver", "safety.mechanical.fluidProjection", "safety.mechanical.particleProjection", "safety.mechanical.contactWithWorkSurfaces"];
const electricals: SafetyElectricalFormType[] = ["safety.electrical.electricalContact"];
const chemicals: ChemicalFormType[] = ["chemical.dust", "chemical.solids", "chemical.smoke", "chemical.liquids", "chemical.vapors", "chemical.aerosols", "chemical.mists", "chemical.gases"];
const biologicals: BiologicalFormType[] = ["biological.virus", "biological.fungi", "biological.bacteria", "biological.parasites", "biological.vectorExposure", "biological.wildAnimalExposure"];
const ergonomics: ErgonomicFormType[] = ["ergonomic.manualHandling", "ergonomic.repetitiveMovements", "ergonomic.forcedPostures", "ergonomic.pvdWork", "ergonomic.poorWorkstationDesign"];
const psychosocials: PsychosocialFormType[] = ["psychosocial.monotony", "psychosocial.workOverload", "psychosocial.taskDetail", "psychosocial.highResponsibility", "psychosocial.decisionAutonomy", "psychosocial.poorSupervision", "psychosocial.roleConflict", "psychosocial.unclearResponsibilities", "psychosocial.poorTaskDistribution", "psychosocial.rotatingShifts", "psychosocial.interpersonalRelations", "psychosocial.jobInstability", "psychosocial.criminalThreat"];

const riskFactorOptions = [physicals, locatives, mechanicals, electricals, chemicals, biologicals, ergonomics, psychosocials]
const riskFactorOptionsMaxLength = riskFactorOptions.reduce((acc, prev) => prev.length > acc ? prev.length : acc, 0)

const MAX_JOB_RISKS_LENGTH: number = 7;

const riskFactorsFormLabels: Record<PhysicalFormType | SafetyLocativeFormType | SafetyMechanicalFormType | SafetyElectricalFormType | ChemicalFormType | BiologicalFormType | ErgonomicFormType | PsychosocialFormType, string> = {
    'physical.highTemperature': 'Temperaturas altas',
    'physical.lowTemperature': 'Temperaturas bajas',
    'physical.ionizingRadiation': 'Radiación Ionizante',
    'physical.nonIonizingRadiation': 'Radiación No Ionizante',
    'physical.noise': 'Ruido',
    'physical.vibration': 'Vibración',
    'physical.lighting': 'Iluminación',
    'physical.ventilation': 'Ventilación',
    'physical.electricCurrent': 'Fluido eléctrico',
    'safety.locative.missingSignageCleaningDisorder': 'Falta de señalización, aseo, desorden',
    'safety.mechanical.machineOrSurfaceEntrapment': 'Atrapamiento entre Máquinas y o superficies',
    'safety.mechanical.objectEntrapment': 'Atrapamiento entre objetos',
    'safety.mechanical.fallingObjects': 'Caída de objetos',
    'safety.mechanical.fallsSameLevel': 'Caídas al mismo nivel',
    'safety.mechanical.fallsDifferentLevel': 'Caídas a diferente nivel',
    'safety.mechanical.punctures': 'Pinchazos',
    'safety.mechanical.cuts': 'Cortes',
    'safety.mechanical.vehicleCollision': 'Choques /colisión vehicular',
    'safety.mechanical.vehicleRunOver': 'Atropellamientos por vehículos',
    'safety.mechanical.fluidProjection': 'Proyección de fluidos',
    'safety.mechanical.particleProjection': 'Proyección de partículas - fragmentos',
    'safety.mechanical.contactWithWorkSurfaces': 'Contacto con superficies de trabajos',
    'safety.electrical.electricalContact': 'Contacto eléctrico',
    'chemical.dust': 'Polvos',
    'chemical.solids': 'Sólidos',
    'chemical.smoke': 'Humos',
    'chemical.liquids': 'Líquidos',
    'chemical.vapors': 'Vapores',
    'chemical.aerosols': 'Aerosoles',
    'chemical.mists': 'Neblinas',
    'chemical.gases': 'Gaseosos',
    'biological.virus': 'Virus',
    'biological.fungi': 'Hongos',
    'biological.bacteria': 'Bacterias',
    'biological.parasites': 'Parásitos',
    'biological.vectorExposure': 'Exposición a vectores',
    'biological.wildAnimalExposure': 'Exposición a animales selváticos',
    'ergonomic.manualHandling': 'Manejo manual de cargas',
    'ergonomic.repetitiveMovements': 'Movimiento repetitivos',
    'ergonomic.forcedPostures': 'Posturas forzadas',
    'ergonomic.pvdWork': 'Trabajos con PVD',
    'ergonomic.poorWorkstationDesign': 'Diseño Inadecuado del puesto',
    'psychosocial.monotony': 'Monotonía del trabajo',
    'psychosocial.workOverload': 'Sobrecarga laboral',
    'psychosocial.taskDetail': 'Minuciosidad de la tarea ',
    'psychosocial.highResponsibility': 'Alta responsabilidad',
    'psychosocial.decisionAutonomy': 'Autonomía en la toma de decisiones',
    'psychosocial.poorSupervision': 'Supervisión y estilos de dirección deficiente',
    'psychosocial.roleConflict': 'Conflicto de rol',
    'psychosocial.unclearResponsibilities': 'Falta de Claridad en las funciones',
    'psychosocial.poorTaskDistribution': 'Incorrecta distribución del trabajo ',
    'psychosocial.rotatingShifts': 'Turnos rotativos',
    'psychosocial.interpersonalRelations': 'Relaciones interpersonales ',
    'psychosocial.jobInstability': 'Inestabilidad laboral',
    'psychosocial.criminalThreat': 'Amenaza Delincuencial'
}

type FemoJobRiskFactorFormProps = {
    data?: Partial<RiskFactorsSchemaType>;
    onSubmit?: (value: RiskFactorsSchemaType) => void;
}
const FemoJobRiskFactorForm = React.forwardRef<HTMLFormElement, FemoJobRiskFactorFormProps>(({
    data,
    onSubmit
}, ref) => {
    const { onSubmit: formSubmit, getInputProps, setValues, values: formValues } = useForm<RiskFactorsSchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(RiskFactorsSchema)
    });

    const riskFactors: RiskFactorSchemaType[] = useMemo(() => formValues.riskFactors ?? [], [formValues]);

    const handleSubmit = useCallback((value: RiskFactorsSchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = () => setValues(prev => (prev.riskFactors?.length ?? 0) < MAX_JOB_RISKS_LENGTH ? ({
        ...prev,
        riskFactors: [...(prev.riskFactors ?? []), DEFAULT_RISK_FACTOR]
    }) : prev);

    const handleRemove = (index: number) => setValues(prev => ({
        ...prev,
        riskFactors: [...(prev.riskFactors?.slice(0, index) ?? []), ...(prev.riskFactors?.slice(index + 1) ?? [])]
    }));

    return (
        <>
            <Title order={3}>Factores de riesgo del trabajo actual</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={formSubmit(handleSubmit)}>
                <Stack gap={rem(32)}>
                    {riskFactors.map((e, i) => (

                        <Stack key={`root-${i}`} gap={rem(16)}>
                            <Flex gap={rem(8)}>
                                {riskFactors.length - 1 === i && riskFactors.length < MAX_JOB_RISKS_LENGTH && (
                                    <ActionIcon
                                        w="100%"
                                        variant='light'
                                        onClick={handleAdd}>
                                        <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>)}
                                {riskFactors.length > 1
                                    && <ActionIcon variant='light'
                                        w="100%"
                                        onClick={() => handleRemove(i)}>
                                        <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>}
                            </Flex>
                            <Stack flex={1} style={{ minWidth: 0 }}>
                                <Box
                                    style={{ width: '100%', height: rem(600) }}
                                    pos="relative">
                                    <TableScrollContainer minWidth={0} pos="absolute" style={{ left: 0, right: 0, bottom: 0, top: 0 }}>
                                        <Table
                                            withColumnBorders
                                            withRowBorders={false}
                                            style={{ minWidth: 300, width: 'max-content' }}>
                                            <TableThead>
                                                <TableTr>
                                                    <TableTh rowSpan={2}>Físico</TableTh>
                                                    <TableTh colSpan={3}>De Seguridad</TableTh>
                                                    <TableTh rowSpan={2}>Químico</TableTh>
                                                    <TableTh rowSpan={2}>Biológico</TableTh>
                                                    <TableTh rowSpan={2}>Ergonómico</TableTh>
                                                    <TableTh rowSpan={2}>PsicoSocial</TableTh>
                                                </TableTr>
                                                <TableTr>
                                                    <TableTh>Locativos</TableTh>
                                                    <TableTh>Mecánicos</TableTh>
                                                    <TableTh>Electricos</TableTh>
                                                </TableTr>
                                            </TableThead>
                                            <TableTbody>
                                                {Array.from({ length: riskFactorOptionsMaxLength }).map((_, subIndex) => (
                                                    <TableTr key={`form - key - ${i} -${subIndex}`}>
                                                        {riskFactorOptions.map((e, jobRisk) => {
                                                            const key = e[subIndex];
                                                            if (key) {
                                                                return (
                                                                    <TableTd key={`${i}-${subIndex}-${jobRisk}-${key}`}>
                                                                        <Checkbox
                                                                            label={riskFactorsFormLabels[key]}
                                                                            {...getInputProps(`riskFactors.${i}.${key}`, { type: 'checkbox' })} />
                                                                    </TableTd>
                                                                )
                                                            } else {
                                                                return (
                                                                    <TableTd key={`${i}-${subIndex}-${jobRisk}-empty`}></TableTd>
                                                                )
                                                            }
                                                        })}
                                                    </TableTr>
                                                ))}
                                                <TableTr>
                                                    <TableTd>
                                                        <TextInput
                                                            label="Otros"
                                                            {...getInputProps(`riskFactors.${i}.physical.other`)} />
                                                    </TableTd>
                                                    <TableTd colSpan={3}>
                                                        <TextInput
                                                            label="Otros"
                                                            {...getInputProps(`riskFactors.${i}.safety.other`)} />
                                                    </TableTd>
                                                    <TableTd>
                                                        <TextInput
                                                            label="Otros"
                                                            {...getInputProps(`riskFactors.${i}.chemical.other`)} />
                                                    </TableTd>
                                                    <TableTd>
                                                        <TextInput
                                                            label="Otros"
                                                            {...getInputProps(`riskFactors.${i}.biological.other`)} />
                                                    </TableTd>
                                                    <TableTd>
                                                        <TextInput
                                                            label="Otros"
                                                            {...getInputProps(`riskFactors.${i}.ergonomic.other`)} />
                                                    </TableTd>
                                                    <TableTd>
                                                        <TextInput
                                                            label="Otros"
                                                            {...getInputProps(`riskFactors.${i}.psychosocial.other`)} />
                                                    </TableTd>
                                                </TableTr>
                                            </TableTbody>
                                        </Table>
                                    </TableScrollContainer>
                                </Box>
                                <Textarea
                                    label="Medidas Preventivas"
                                    placeholder='eg. Lorem Ipsum...'
                                    rows={5}
                                    {...getInputProps(`riskFactors.${i}.preventiveMeasure`)} />
                                {(riskFactors.length > 1 && i < riskFactors.length - 1) && <Divider />}
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Box >
        </>
    )
});

FemoJobRiskFactorForm.displayName = 'FemoJobRiskFactorForm';

export default FemoJobRiskFactorForm
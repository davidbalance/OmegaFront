'use client'

import { Box, Checkbox, Divider, Group, rem, Select, SimpleGrid, Stack, Table, TableScrollContainer, TableTbody, TableTd, TableTh, TableThead, TableTr, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import { LOGO_NONE, LOGO_OMEGA } from '@/server/record/create-record/base/author.schema';
import PreviewRecordElement from '../preview-record-element';
import PreviewRecordWrapper from '../preview-record-wrapper';
import { FemoRecordPayload } from '@/server/record/create-record/femo-record';
import { PATIENT_BLOOD_GROUP_ARh_PLUS, PRIORITY_GROUP_CATASTROFIC_ILLNESS, PRIORITY_GROUP_DISABILITY, PRIORITY_GROUP_ELDERLY, PRIORITY_GROUP_PREGNANT } from '@/server/record/create-record/femo/institution.schema';
import dayjs from 'dayjs';
import { CONSULTATION_EVALUATION_TYPE_ENTRY, CONSULTATION_EVALUATION_TYPE_PERIODIC, CONSULTATION_EVALUATION_TYPE_RETURN, CONSULTATION_EVALUATION_TYPE_RETIRE } from '@/server/record/create-record/femo/consultation.schema';
import { FAMILY_PLANNING_STATUS_DO_NOT_ANSWER, FAMILY_PLANNING_STATUS_NO, FAMILY_PLANNING_STATUS_YES, SPECIAL_CONDITIONS_STATUS_DO_NOT_ANSWER, SPECIAL_CONDITIONS_STATUS_NO, SPECIAL_CONDITIONS_STATUS_YES, SUBSTANCE_CONSUMER_FORMER_USER, SUBSTANCE_CONSUMER_NON_USER } from '@/server/record/create-record/femo/personal-history.schema';
import { PhysicalRegionalExamSchemaType } from '@/server/record/create-record/femo/physical-regional-exam.schema';
import { PhysicalFormType, SafetyLocativeFormType, SafetyMechanicalFormType, SafetyElectricalFormType, ChemicalFormType, BiologicalFormType, ErgonomicFormType, PsychosocialFormType } from '@/server/record/create-record/femo/risk-factor.schema';
import { MEDICAL_APTITUDE_FIT, MEDICAL_APTITUDE_FIT_OBSERVATION, MEDICAL_APTITUDE_FIT_LIMITATION, MEDICAL_APTITUDE_NO_FIT } from '@/server/record/create-record/femo/medical-fitness-for-work.schema';

const priorityGroup: Record<string, string> = {
    [PRIORITY_GROUP_PREGNANT]: "Embarazada",
    [PRIORITY_GROUP_DISABILITY]: "Persona con discapacidad",
    [PRIORITY_GROUP_CATASTROFIC_ILLNESS]: "Enfermedad Catastrofica",
    [PRIORITY_GROUP_ELDERLY]: "Adulto Mayor",
}

const evaluationType: Record<string, string> = {
    [CONSULTATION_EVALUATION_TYPE_ENTRY]: "Ingreso",
    [CONSULTATION_EVALUATION_TYPE_PERIODIC]: "Periódica",
    [CONSULTATION_EVALUATION_TYPE_RETURN]: "Reintegro",
    [CONSULTATION_EVALUATION_TYPE_RETIRE]: "Retiro",
}

const specialConditionStatus: Record<string, string> = {
    [SPECIAL_CONDITIONS_STATUS_YES]: "Sí",
    [SPECIAL_CONDITIONS_STATUS_NO]: "No",
    [SPECIAL_CONDITIONS_STATUS_DO_NOT_ANSWER]: "No Responde"
}

const familyPlanningStatus: Record<string, string> = {
    [FAMILY_PLANNING_STATUS_YES]: "Sí",
    [FAMILY_PLANNING_STATUS_NO]: "No",
    [FAMILY_PLANNING_STATUS_DO_NOT_ANSWER]: "No Responde"
}

const logoOption: { value: string, label: string }[] = [
    { label: 'Ninguno', value: LOGO_NONE },
    { label: 'Omega', value: LOGO_OMEGA },
]

const FORMAT_DATE = "YYYY/MM/DD"

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

const physicalExamLabels: Record<RegionalExamType, string> = {
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

const fitnessType: Record<string, string> = {
    [MEDICAL_APTITUDE_FIT]: "Apto",
    [MEDICAL_APTITUDE_FIT_OBSERVATION]: "Apto en Observación",
    [MEDICAL_APTITUDE_FIT_LIMITATION]: "Apto con Limitaciones",
    [MEDICAL_APTITUDE_NO_FIT]: "No Apto",
}

type PreviewFemoRecordProps = {
    data?: FemoRecordPayload;
    onSubmit?: (value: FemoRecordPayload) => void;
}
const PreviewFemoRecord = React.forwardRef<HTMLFormElement, PreviewFemoRecordProps>(({
    data,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, getInputProps } = useForm<FemoRecordPayload>({
        initialValues: data
    });

    const handleSubmit = useCallback((value: FemoRecordPayload) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={formSubmit(handleSubmit)}>
            {
                data ? (
                    <Stack gap={rem(32)}>

                        <Select
                            data={logoOption}
                            checkIconPosition="left"
                            label="¿Logo para la ficha?"
                            placeholder="eg. Apto"
                            defaultDropdownOpened={false}
                            maxDropdownHeight={200}
                            allowDeselect={false}
                            {...getInputProps('logo')} />

                        <PreviewRecordWrapper title='A. Datos del Establecimiento'>
                            <SimpleGrid cols={3}>
                                <Stack gap={rem(16)}>
                                    <PreviewRecordElement title='Institución del Sistema' text={data.establishment.institutionName} />
                                    <PreviewRecordElement title='RUC' text={data.establishment.ruc} />
                                    <PreviewRecordElement title='CIIU' text={data.establishment.ciiu ?? ""} />
                                    <PreviewRecordElement title='Establecimiento / Centro de Trabajo' text={data.establishment.healthFacility} />
                                </Stack>
                                <Stack gap={rem(16)}>
                                    <PreviewRecordElement title='Primer apellido' text={data.patient.lastName} />
                                    <PreviewRecordElement title='Segundo apellido' text={data.patient.secondLastName} />
                                    <PreviewRecordElement title='Primer nombre' text={data.patient.firstName} />
                                    <PreviewRecordElement title='Segundo nombre' text={data.patient.middleName} />
                                </Stack>
                                <Stack gap={rem(16)}>
                                    <PreviewRecordElement title='Grupo de Atención Prioritaria' text={data.patient.priorityGroup.filter(e => e in priorityGroup).map(e => priorityGroup[e]).join(", ")} />
                                    <PreviewRecordElement title='Sexo' text={data.patient.gender === 'male' ? 'Hombre' : 'Mujer'} />
                                    <PreviewRecordElement title='Fecha de Nacimiento' text={dayjs(data.patient.birthDate).format("YYYY/MM/DD")} />
                                    <PreviewRecordElement title='Edad' text={dayjs().diff(data.patient.birthDate).toString()} />
                                    <PreviewRecordElement title='Grupo sanguíneo' text={data.patient.bloodGroup ?? PATIENT_BLOOD_GROUP_ARh_PLUS} />
                                    <PreviewRecordElement title='Lateralidad' text={data.patient.laterality === 'right' ? 'Diestro' : 'Zurdo'} />
                                </Stack>
                            </SimpleGrid>
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='B. Motivo de Consulta'>
                            <Stack gap={rem(16)}>
                                <SimpleGrid cols={2}>
                                    <Stack gap={rem(16)}>
                                        <PreviewRecordElement title='Fecha de Atención' text={dayjs(data.consultation.serviceDate).format(FORMAT_DATE)} />
                                        <PreviewRecordElement title='Fecha de Ingreso al Trabajo' text={data.consultation.work.startDate ? dayjs(data.consultation.work.startDate).format(FORMAT_DATE) : ""} />
                                        <PreviewRecordElement title='Fecha de Ingreso al Reintegro' text={data.consultation.work.returnDate ? dayjs(data.consultation.work.returnDate).format(FORMAT_DATE) : ""} />
                                        <PreviewRecordElement title='Fecha del Útilmo día Laboral/Salida' text={data.consultation.work.lastDate ? dayjs(data.consultation.work.lastDate).format(FORMAT_DATE) : ""} />
                                    </Stack>
                                    <Stack gap={rem(16)}>
                                        <PreviewRecordElement title='Puesto de Trabajo' text={data.consultation.jobPosition} />
                                        <PreviewRecordElement title='Tipo de Evaluación' text={(data.consultation.evaluationType in evaluationType) ? evaluationType[data.consultation.evaluationType] : ""} />
                                    </Stack>
                                </SimpleGrid>
                                <PreviewRecordElement title='Observación' text={data.consultation.observation ?? ""} />
                            </Stack>
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='C. Antecedentes Personales'>
                            <Stack gap={rem(16)}>
                                <PreviewRecordElement title='Antecedentes Clinicos y Quirurgicos' text={data.personalHistory.clinicalAndSurgical ?? ""} />
                                <PreviewRecordElement title='Antecedentes Familiares' text={data.personalHistory.familyHistory ?? ""} />

                                <Text fs="italic">Condición especial para las atenciones de urgencia,emergencia,y tratamiento médico (referido por el paciente).</Text>

                                <SimpleGrid cols={2}>
                                    <PreviewRecordElement title='En caso de requerir transfusiones autoriza' text={data.personalHistory.specialConditions.allowsTransfusions ? "Sí" : "No"} />
                                    <Stack gap={rem(16)}>
                                        <PreviewRecordElement title='En caso de requerir transfusiones autoriza' text={(data.personalHistory.specialConditions.hormoneTherapyStatus in specialConditionStatus) ? specialConditionStatus[data.personalHistory.specialConditions.hormoneTherapyStatus] : ""} />
                                        {data.personalHistory.specialConditions.hormoneTherapyStatus === SPECIAL_CONDITIONS_STATUS_YES && <PreviewRecordElement title='¿Cual?' text={data.personalHistory.familyHistory ?? ""} />}
                                    </Stack>
                                </SimpleGrid>

                                {data.patient.gender !== "male" ? (<>
                                    <Text fw="bold">Antecedentes Ginecologicos</Text>

                                    <SimpleGrid cols={2}>
                                        <Stack gap={rem(16)}>
                                            <PreviewRecordElement title='Fecha Úlitma Menstruación' text={data.personalHistory.gynecological?.lastMenstruationDate ? dayjs(data.personalHistory.gynecological?.lastMenstruationDate).format(FORMAT_DATE) : ""} />
                                            <PreviewRecordElement title='Embarazos' text={data.personalHistory.gynecological?.pregnancies.toString() ?? "0"} />
                                            <PreviewRecordElement title='Partos' text={data.personalHistory.gynecological?.births.toString() ?? "0"} />
                                            <PreviewRecordElement title='Cesáreas' text={data.personalHistory.gynecological?.cesareans.toString() ?? "0"} />
                                            <PreviewRecordElement title='Abortos' text={data.personalHistory.gynecological?.abortions.toString() ?? "0"} />
                                        </Stack>
                                        <Stack gap={rem(16)}>
                                            <PreviewRecordElement title='Planificación Familiar' text={(data.personalHistory.familyPlanning.status in familyPlanningStatus) ? familyPlanningStatus[data.personalHistory.familyPlanning.status] : ""} />
                                            {data.personalHistory.familyPlanning.status === FAMILY_PLANNING_STATUS_YES && <PreviewRecordElement title='¿Cual?' text={data.personalHistory.familyPlanning.detail ?? ""} />}
                                        </Stack>
                                    </SimpleGrid>

                                    <Table
                                        withColumnBorders
                                        style={{ width: '100%' }}>
                                        <TableThead>
                                            <TableTr>
                                                <TableTh rowSpan={4}>Examenes Realizados ¿Cuál?</TableTh>
                                                <TableTh colSpan={2}>Tiempo (años)</TableTh>
                                                <TableTh rowSpan={6}>Registrar resultado únicamente si interfiere con la actividad laboral y previa autorización del titular</TableTh>
                                            </TableTr>
                                        </TableThead>
                                        <TableTbody>
                                            {data.personalHistory.exams.map((e, i) => (
                                                <TableTr key={`${e.exam}-${i}`}>
                                                    <TableTd>{e.exam}</TableTd>
                                                    <TableTd>{e.time}</TableTd>
                                                    <TableTd>{e.resultRecorded ?? ""}</TableTd>
                                                </TableTr>
                                            ))}
                                        </TableTbody>
                                    </Table>
                                </>) : (<>
                                    <Text fw="bold">Antecedentes Reproductivos Masculinos</Text>
                                    <Table
                                        withColumnBorders
                                        style={{ width: '100%' }}>
                                        <TableThead>
                                            <TableTr>
                                                <TableTh rowSpan={4}>Examenes Realizados ¿Cuál?</TableTh>
                                                <TableTh colSpan={2}>Tiempo (años)</TableTh>
                                                <TableTh rowSpan={6}>Registrar resultado únicamente si interfiere con la actividad laboral y previa autorización del titular</TableTh>
                                            </TableTr>
                                        </TableThead>
                                        <TableTbody>
                                            {data.personalHistory.exams.map((e, i) => (
                                                <TableTr key={`${e.exam}-${i}`}>
                                                    <TableTd>{e.exam}</TableTd>
                                                    <TableTd colSpan={2}>{e.time}</TableTd>
                                                    <TableTd>{e.resultRecorded ?? ""}</TableTd>
                                                </TableTr>
                                            ))}
                                        </TableTbody>
                                    </Table>
                                </>)}

                                <Text fw="bold">Consumo de Sustancias</Text>
                                <Table
                                    withColumnBorders
                                    style={{ width: '100%' }}>
                                    <TableThead>
                                        <TableTr>
                                            <TableTh colSpan={4}></TableTh>
                                            <TableTh colSpan={2}>Tiempo de Consumo</TableTh>
                                            <TableTh colSpan={2}>Ex Consumidor</TableTh>
                                            <TableTh colSpan={2}>Tiempo de Absticencia (meses)</TableTh>
                                            <TableTh colSpan={2}>No Consume</TableTh>
                                        </TableTr>
                                    </TableThead>
                                    <TableTbody>
                                        {Object.values(data.personalHistory.toxicHabits).map((e, i) => (
                                            <TableTr key={`${e.name}-${i}`}>
                                                <TableTd colSpan={4}>{e.name}</TableTd>
                                                <TableTd colSpan={2}>{e.substanceUseDuration ?? ""}</TableTd>
                                                <TableTd colSpan={2}>{e.status === SUBSTANCE_CONSUMER_FORMER_USER ? "x" : ""}</TableTd>
                                                <TableTd colSpan={2}>{e.abstinenceDuration ?? ""}</TableTd>
                                                <TableTd colSpan={2}>{e.status === SUBSTANCE_CONSUMER_NON_USER ? "x" : ""}</TableTd>
                                            </TableTr>
                                        ))}
                                    </TableTbody>
                                </Table>

                                <Text fw="bold">Estilo de Vida</Text>
                                <Table
                                    withColumnBorders
                                    withRowBorders={false}
                                    style={{ minWidth: 300, width: 'max-content' }}>
                                    <TableThead>
                                        <TableTr>
                                            <TableTh>¿Cual?</TableTh>
                                            <TableTh>Duración</TableTh>
                                        </TableTr>
                                    </TableThead>
                                    <TableTbody>
                                        {data.personalHistory.lifeStyles.map((e, i) => (
                                            <TableTr key={`${e.type}-${i}`}>
                                                <TableTd>{e.type}</TableTd>
                                                <TableTd>{e.duration}</TableTd>
                                            </TableTr>
                                        ))}
                                    </TableTbody>
                                </Table>

                                <Text fw="bold">Condición Preexistente</Text>
                                <Table
                                    withColumnBorders
                                    style={{ width: '100%' }}>
                                    <TableThead>
                                        <TableTr>
                                            <TableTh>¿Cual?</TableTh>
                                            <TableTh>Cantidad</TableTh>
                                        </TableTr>
                                    </TableThead>
                                    <TableTbody>
                                        {data.personalHistory.preexistingConditions.map((e, i) => (
                                            <TableTr key={`${e.type}-${i}`}>
                                                <TableTd>{e.type}</TableTd>
                                                <TableTd>{e.quantity}</TableTd>
                                            </TableTr>
                                        ))}
                                    </TableTbody>
                                </Table>
                                <PreviewRecordElement title='Observación' text={data.personalHistory.observations ?? ""} />
                            </Stack>
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='D. Enfermedad o Problema Actual'>
                            <PreviewRecordElement title='Descripción' text={data.currentDisease.description ?? ""} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='E. Constantes Vitales y Antropometría'>
                            <Box
                                style={{ width: '100%', height: rem(100) }}
                                pos="relative">
                                <TableScrollContainer minWidth={0} pos="absolute" style={{ left: 0, right: 0, bottom: 0, top: 0 }}>
                                    <Table
                                        withColumnBorders
                                        withRowBorders={false}
                                        style={{ minWidth: 300, width: 'max-content' }}>
                                        <TableThead>
                                            <TableTr>
                                                <TableTh>Frecuencia Cardíaca (lpm)</TableTh>
                                                <TableTh>Presión Arterial (mmHg)</TableTh>
                                                <TableTh>Frecuencia</TableTh>
                                                <TableTh>Respiratoria (rpm)</TableTh>
                                                <TableTh>Saturación de Oxígeno (%)</TableTh>
                                                <TableTh>Peso (kg)</TableTh>
                                                <TableTh>Talla (m)</TableTh>
                                                <TableTh>IMC</TableTh>
                                                <TableTh>Perímetro Abdominal (cm)</TableTh>
                                            </TableTr>
                                        </TableThead>
                                        <TableTbody>
                                            <TableTr>
                                                <TableTd>{data.vitalSigns.temperature}</TableTd>
                                                <TableTd>{data.vitalSigns.bloodPressure}</TableTd>
                                                <TableTd>{data.vitalSigns.heartRate}</TableTd>
                                                <TableTd>{data.vitalSigns.respiratoryRate}</TableTd>
                                                <TableTd>{data.vitalSigns.oxygenSaturation}</TableTd>
                                                <TableTd>{data.vitalSigns.weight}</TableTd>
                                                <TableTd>{data.vitalSigns.height}</TableTd>
                                                <TableTd>{data.vitalSigns.bmi}</TableTd>
                                                <TableTd>{data.vitalSigns.abdominalPerimeter}</TableTd>
                                            </TableTr>
                                        </TableTbody>
                                    </Table>
                                </TableScrollContainer>
                            </Box>
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='F. Examen Físico Regional'>
                            <SimpleGrid cols={3}>
                                {Object.entries(data.physicalExam.region).map(([region, value]) => {
                                    return Object.entries(value).filter(([_, e]) => !!e).map(([diasease, description]) => {
                                        const key = `physicalExam.region.${region}.${diasease}`;
                                        if (!(key in physicalExamLabels)) return null;

                                        return (
                                            <Group key={key}>
                                                <Text fw="bold">{physicalExamLabels[key as RegionalExamType]}</Text>
                                                <Text>{description}</Text>
                                            </Group>)
                                    })
                                })}
                            </SimpleGrid>
                            <PreviewRecordElement title='Observación' text={data.physicalExam.examObservation ?? ""} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='G. Factores de Riesgo del Trabajo Actual'>
                            <Stack gap={rem(32)}>
                                {data.riskFactors.map((e, i) => (
                                    <Stack key={i} flex={1} style={{ minWidth: 0 }}>
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
                                                            <TableTr key={`form-key-${i}-${subIndex}`}>
                                                                {riskFactorOptions.map((e, jobRisk) => {
                                                                    const key = e[subIndex];
                                                                    if (key) {
                                                                        return (
                                                                            <TableTd key={`${i}-${subIndex}-${jobRisk}-${key}`}>
                                                                                <Checkbox
                                                                                    label={riskFactorsFormLabels[key]}
                                                                                    {...getInputProps(`riskFactors.${i}.${key}`, { type: 'checkbox' })}
                                                                                    disabled />
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
                                                                <PreviewRecordElement title='Otros' text={e.physical.other ?? ""} />
                                                            </TableTd>
                                                            <TableTd colSpan={3}>
                                                                <PreviewRecordElement title='Otros' text={e.safety.other ?? ""} />
                                                            </TableTd>
                                                            <TableTd>
                                                                <PreviewRecordElement title='Otros' text={e.chemical.other ?? ""} />
                                                            </TableTd>
                                                            <TableTd>
                                                                <PreviewRecordElement title='Otros' text={e.biological.other ?? ""} />
                                                            </TableTd>
                                                            <TableTd>
                                                                <PreviewRecordElement title='Otros' text={e.ergonomic.other ?? ""} />
                                                            </TableTd>
                                                            <TableTd>
                                                                <PreviewRecordElement title='Otros' text={e.psychosocial.other ?? ""} />
                                                            </TableTd>
                                                        </TableTr>
                                                    </TableTbody>
                                                </Table>
                                            </TableScrollContainer>
                                        </Box>
                                        <PreviewRecordElement title='Medidas Preventivas' text={e.preventiveMeasure ?? ""} />
                                        {(data.riskFactors.length > 1 && i < data.riskFactors.length - 1) && <Divider />}
                                    </Stack>
                                ))}
                            </Stack>
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='H. Activivdad Laboral/Incidentes/Accidentes/Enfermedades Ocupacionales'>
                            <Text fw="bold">Antecedentes de Empleos Anteriores y/o Trabajo Actual</Text>
                            <Box
                                style={{ width: '100%', height: rem(300) }}
                                pos="relative">
                                <TableScrollContainer minWidth={0} pos="absolute" style={{ left: 0, right: 0, bottom: 0, top: 0 }}>
                                    <Table
                                        withColumnBorders
                                        style={{ minWidth: 300, width: '100%' }}>
                                        <TableThead>
                                            <TableTr>
                                                <TableTh rowSpan={2} colSpan={2}>Centro de Trabajo</TableTh>
                                                <TableTh rowSpan={2} colSpan={2}>Actividades que Desempeñaba</TableTh>
                                                <TableTh colSpan={3}>Trabajo</TableTh>
                                                <TableTh colSpan={3}>De los Accidentes y Enfermedades</TableTh>
                                                <TableTh colSpan={5}>Calificado por el IEES</TableTh>
                                            </TableTr>
                                            <TableTr>
                                                <TableTh>Anterior</TableTh>
                                                <TableTh>Actual</TableTh>
                                                <TableTh>Tiempo</TableTh>
                                                <TableTh>Incidente</TableTh>
                                                <TableTh>Accidente</TableTh>
                                                <TableTh>Enf. Prof.</TableTh>
                                                <TableTh>Si</TableTh>
                                                <TableTh>No</TableTh>
                                                <TableTh>Fecha</TableTh>
                                                <TableTh>Especificar</TableTh>
                                                <TableTh>Observaciónes</TableTh>
                                            </TableTr>
                                        </TableThead>
                                        <TableTbody>
                                            {data.employmentHistory.map((e, i) => (
                                                <TableTr key={`${e.workplace}-${i}`}>
                                                    <TableTd colSpan={2}>{e.workplace}</TableTd>
                                                    <TableTd colSpan={2}>{e.activities}</TableTd>
                                                    <TableTd>{e.lastWork}</TableTd>
                                                    <TableTd>{e.currentWork}</TableTd>
                                                    <TableTd>{e.duration}</TableTd>
                                                    <TableTd>{e.incident}</TableTd>
                                                    <TableTd>{e.accident}</TableTd>
                                                    <TableTd>{e.disease}</TableTd>
                                                    <TableTd>{e.qualified ? "x" : ""}</TableTd>
                                                    <TableTd>{!e.qualified ? "x" : ""}</TableTd>
                                                    <TableTd>{e.date ? dayjs(e.date).format(FORMAT_DATE) : ""}</TableTd>
                                                    <TableTd>{e.specification}</TableTd>
                                                    <TableTd>{e.observations}</TableTd>
                                                </TableTr>
                                            ))}
                                        </TableTbody>
                                    </Table>
                                </TableScrollContainer>
                            </Box>
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='I. Actividades Extra Laborales'>
                            <Table
                                withColumnBorders
                                style={{ width: '100%' }}>
                                <TableThead>
                                    <TableTr>
                                        <TableTh colSpan={4}>Tipo de Actividad</TableTh>
                                        <TableTh>Fecha</TableTh>
                                    </TableTr>
                                </TableThead>
                                <TableTbody>
                                    {data.extraLaboralActivities.map((e, i) => (
                                        <TableTr key={`extra-activity-${i}`}>
                                            <TableTd colSpan={4}>{e.description}</TableTd>
                                            <TableTd>{e.date ? dayjs(e.date).format(FORMAT_DATE) : ""}</TableTd>
                                        </TableTr>
                                    ))}
                                </TableTbody>
                            </Table>
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='J. Resultados de Exámenes Generales y Específicos de Acuerdo al Riegso y Puesto de Trabajo (Imagen, Laboratorio y Otros)'>
                            <Table
                                withColumnBorders
                                style={{ width: '100%' }}>
                                <TableThead>
                                    <TableTr>
                                        <TableTh colSpan={2}>Tipo de Actividad</TableTh>
                                        <TableTh>Fecha</TableTh>
                                        <TableTh colSpan={3}>Resultados</TableTh>
                                    </TableTr>
                                </TableThead>
                                <TableTbody>
                                    {data.examResults.exams.map((e, i) => (
                                        <TableTr key={`${e.name}-${i}`}>
                                            <TableTd colSpan={2}>{e.name}</TableTd>
                                            <TableTd>{e.date ? dayjs(e.date).format(FORMAT_DATE) : ""}</TableTd>
                                            <TableTd colSpan={3}>{e.result}</TableTd>
                                        </TableTr>
                                    ))}
                                </TableTbody>
                            </Table>
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='K. Diagnostico'>
                            <Table
                                withColumnBorders
                                style={{ width: '100%' }}>
                                <TableThead>
                                    <TableTr>
                                        <TableTh colSpan={2}>Tipo de Actividad</TableTh>
                                        <TableTh colSpan={3}>Fecha</TableTh>
                                        <TableTh>Pre/Def</TableTh>
                                    </TableTr>
                                </TableThead>
                                <TableTbody>
                                    {data.diagnoses.map((e,i) => (
                                        <TableTr key={`${e.cie}-i${i}`}>
                                            <TableTd colSpan={2}>{e.cie}</TableTd>
                                            <TableTd>{e.description}</TableTd>
                                            <TableTd colSpan={3}>{e.diagnosis}</TableTd>
                                        </TableTr>
                                    ))}
                                </TableTbody>
                            </Table>
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='L. Aptitud Médica para el Trabajo'>
                            <SimpleGrid cols={2}>
                                <PreviewRecordElement title='Aptitud' text={data.medicalAptitude.type in fitnessType ? fitnessType[data.medicalAptitude.type] : ""} />
                                <PreviewRecordElement title='Observaciones' text={data.medicalAptitude.observations ?? ""} />
                            </SimpleGrid>
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='M. Recomendaciones y/o Tratamiento'>
                            <PreviewRecordElement title='Descripción' text={data.recommendation.description ?? ""} />
                        </PreviewRecordWrapper>

                        <PreviewRecordWrapper title='N. Retiro (Evaluación)'>
                            <SimpleGrid cols={2}>
                                <PreviewRecordElement title='Se realiza la evaluación' text={data.retirementEvaluation.performed ? "Sí" : "No"} />
                                <PreviewRecordElement title='La condición de salud está relacionada con el trabajo' text={data.retirementEvaluation.workRelated ? "Sí" : "No"} />
                            </SimpleGrid>
                            <PreviewRecordElement title='Observación' text={data.retirementEvaluation.observation ?? ""} />
                        </PreviewRecordWrapper>

                    </Stack>
                ) : (<>No hay datos disponibles..</>)
            }
        </form>
    )
});

PreviewFemoRecord.displayName = 'PreviewFemoRecord';

export default PreviewFemoRecord
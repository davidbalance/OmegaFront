import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import StepperInitialRecordForm from './_components/stepper-inital-record-form';
import PreviewInitialRecord from './_components/preview-initial-record';
import InitialInstitutionForm from './_components/initial-institution-form';
import { retriveCorporativesOptions } from '@/server';
import { CorporativeOption } from '@/server/corporative/server-types';
import { retriveClientByDni } from '@/server';
import dayjs from 'dayjs';
import MedicalAndSurgicalHistoryForm from '@/components/record/medical-and-surgical-history-form';
import InitialGynecologicalForm from './_components/initial-gynecological-form';
import IntialMaleReproductionForm from './_components/initial-male-reproduction-form';
import InitialJobHistoryForm from './_components/initial-job-history-form';
import JobAccidentForm from '@/components/record/job-accident-form';
import OccupationalDiseaseForm from '@/components/record/occupational-diseases-form';
import FamilyHistoryForm from '@/components/record/family-history-form';
import InitialJobRiskForm from './_components/initial-job-risk-form';
import InitialExtraJobActivityForm from './_components/initial-extra-job-activity-form';
import CurrentDiseaseForm from '@/components/record/current-disease-form';
import ReviewOfOrgansAndSystemForm from '@/components/record/review-of-organs-and-system-form';
import VitalSignsAndAnthropometryForm from '@/components/record/vital-signs-and-anthropometry-form';
import PhysicalRegionalExamForm from '@/components/record/physical-regional-exam-form';
import GeneralExamResultForm from '@/components/record/general-exam-result-form';
import MedicalDiagnosticForm from '@/components/record/medical-diagnostic-form';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import RecommendationForm from '@/components/record/recommendation-form';
import ToxicHabitsForm from '@/components/record/toxic-habits-form';
import LifestyleForm from '@/components/record/lifestyle-form';
import { INITIAL_MEDICAL_CONSULTATION } from './_libs/constants';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';

const defaultValues: Partial<InitialRecordPayload> = {
    "patientDni": "0602777658",
    "patientFirstName": "MARIO",
    "patientMiddleName": "ALFONSO",
    "patientLastName": "NOBOA",
    "patientSecondLastName": "CORONEL",
    "patientAge": 45,
    "medicalConsultationDescription": "EVALUACIÓN MEDICA OCUPACIONAL PARA EL INGRESO AL PUESTO DE TRABAJO",
    "companyName": "ENVAGRIF",
    "companyRUC": "1724317191001",
    "companyCIIU": "",
    "institutionHealthFacility": "Omega Salud Ocupacional",
    "patientReligion": "catholic",
    "patientBloodType": "A+",
    "patientLaterality": "right",
    "patientSexualOrientation": "heterosexual",
    "patientGenderIdentity": "male",
    "patientDisabilityType": "",
    "patientDisabilityPercent": 1,
    "institutionJobStartDate": new Date("2025-05-29T19:16:56.907Z"),
    "institutionJobPosition": "DOCENTE",
    "institutionJobArea": "LENGUAJE",
    "institutionJobActivities": "PREPARAR Y DICTAR CLASES",
    "medicalAndSurgicalHistory": "APP: NINGUNO\n\nAPQ: HERNIORRAFIA UMBILICAL HACE 6 AÑOS, CESAREA HACE 7 AÑOS\n\nALERGIAS: NINGUNA\n",
    "maleReproductiveFamilyPlanningType": "IMPLANTE",
    "maleReproductiveExamProstateAntigen": {
        "done": true,
        "result": "NORMAL",
        "time": 1
    },
    "maleReproductiveExamProstateEcho": {
        "done": true,
        "result": "NORMAL",
        "time": 1
    },
    "maleReproductiveDeadChildren": 0,
    "maleReproductiveLivingChildren": 1,
    "toxicHabitTobacco": {
        "haveConsume": false,
        "name": "Tobacco",
        "consumptionTime": 0,
        "quantity": 0,
        "isExConsumer": false,
        "timeOfAbstinence": 0
    },
    "toxicHabitAlcohol": {
        "haveConsume": false,
        "name": "Alcohol",
        "consumptionTime": 0,
        "quantity": 0,
        "isExConsumer": false,
        "timeOfAbstinence": 0
    },
    "toxicHabitOther": {
        "haveConsume": false,
        "name": "",
        "consumptionTime": 0,
        "quantity": 0,
        "isExConsumer": false,
        "timeOfAbstinence": 0
    },
    "lifestylePhysicalActivity": true,
    "lifestylePhysicalActivityType": "FUTBOL",
    "lifestylePhysicalActivityTimeQty": "1H 1V/SEM",
    "lifestyleMedication": true,
    "lifestyleMedicationName": "ZOPLICONA",
    "lifestyleMedicationTimeQty": "HS QD",
    "jobHistory": [
        {
            "jobHistoryActivity": "ESCUELA FISCAL CALDERON",
            "jobHistoryCompany": "DOCENTE",
            "jobHistoryPosition": "DICTAR CLASES",
            "jobHistoryTime": 108,
            "jobHistoryRiskPhysical": false,
            "jobHistoryRiskMechanical": false,
            "jobHistoryRiskChemical": false,
            "jobHistoryRiskBiological": false,
            "jobHistoryRiskErgonomic": true,
            "jobHistoryRiskPsychosocial": false,
            "jobHistoryObservation": ""
        },
        {
            "jobHistoryActivity": "ESCUELA PARTICULAR",
            "jobHistoryCompany": "DOCENTE",
            "jobHistoryPosition": "DICTAR CLASES",
            "jobHistoryTime": 28,
            "jobHistoryRiskPhysical": false,
            "jobHistoryRiskMechanical": false,
            "jobHistoryRiskChemical": false,
            "jobHistoryRiskBiological": false,
            "jobHistoryRiskErgonomic": true,
            "jobHistoryRiskPsychosocial": false,
            "jobHistoryObservation": ""
        }
    ],
    "jobAccidentHappened": false,
    "jobAccidentDate": new Date("2025-05-29T19:19:31.481Z"),
    "jobAccidentDescription": "",
    "jobAccidentObservation": "",
    "occupationalDiseaseHappened": false,
    "occupationalDiseaseDescription": "",
    "occupationalDiseaseDate": new Date("2025-05-29T19:19:34.466Z"),
    "occupationalDiseaseObservation": "",
    "familyHistoryCardioVascular": "",
    "familyHistoryMetabolic": "",
    "familyHistoryNeurologic": "",
    "familyHistoryOncologic": "",
    "familyHistoryInfectious": "",
    "familyHistoryHereditary": "",
    "familyHistoryDisability": "",
    "familyHistoryOther": "",
    "jobRisks": [
        {
            "name": "DOCENTE",
            "activity": "PREPARAR Y DICTAR CLASES",
            "preventiveMeasure": "HIGIENE POSTURAL Y PAUSAS ACTIVAS",
            "physicalRiskHighTemperature": false,
            "physicalRiskLowTemperature": false,
            "physicalRiskIonicRadiation": false,
            "physicalRiskNonIonicRadiation": false,
            "physicalRiskNoise": false,
            "physicalRiskVibration": false,
            "physicalRiskIllumination": false,
            "physicalRiskVentilation": false,
            "physicalRiskElectricFluid": false,
            "physicalRiskOther": false,
            "mechanicRiskEntrapmentBetweenMachines": false,
            "mechanicRiskTrappingBetweenSurfaces": false,
            "mechanicRiskEntrapmentBetweenObjects": false,
            "mechanicRiskObjectFalling": false,
            "mechanicRiskSameLevelFalling": false,
            "mechanicRiskDifferentLevelFalling": false,
            "mechanicRiskElectricContact": false,
            "mechanicRiskSurfacesContact": false,
            "mechanicRiskParticlesProjection": false,
            "mechanicRiskFluidProjection": false,
            "mechanicRiskJab": false,
            "mechanicRiskCut": false,
            "mechanicRiskHitByVehicles": false,
            "mechanicRiskVehicleCollision": false,
            "mechanicRiskOther": false,
            "chemicalRiskSolid": false,
            "chemicalRiskDust": false,
            "chemicalRiskSmoke": false,
            "chemicalRiskLiquid": false,
            "chemicalRiskSteam": false,
            "chemicalRiskAerosol": false,
            "chemicalRiskMist": false,
            "chemicalRiskGas": false,
            "chemicalRiskOther": false,
            "biologicalRiskVirus": false,
            "biologicalRiskFungus": false,
            "biologicalRiskBacteria": false,
            "biologicalRiskParasites": false,
            "biologicalRiskExposureToVectors": false,
            "biologicalRiskExposureToWildlifeAnimals": false,
            "biologicalRiskOther": false,
            "ergonomicRiskManualHandlingLoads": false,
            "ergonomicRiskRepetitiveMoves": true,
            "ergonomicRiskForcedPostures": true,
            "ergonomicRiskWorkWithPvd": true,
            "ergonomicRiskOther": false,
            "psychosocialRiskMonotony": false,
            "psychosocialRiskWorkOverload": false,
            "psychosocialRiskThoroughnessOfTheTask": false,
            "psychosocialRiskHighResponsibility": false,
            "psychosocialRiskTakingResponsibilityAutonomy": false,
            "psychosocialRiskSupervision": false,
            "psychosocialRiskRoleConflict": false,
            "psychosocialRiskNonFunctionClarify": false,
            "psychosocialRiskBadWorkDistribution": false,
            "psychosocialRiskRotativeShift": false,
            "psychosocialRiskIntrapersonalRelations": false,
            "psychosocialRiskJobInstability": false,
            "psychosocialRiskOther": false
        }
    ],
    "extraActivityDescription": "",
    "currentDiseaseDescription": "",
    "reviewOfOrgansSkin": "",
    "reviewOfOrgansSenseOrgans": "",
    "reviewOfOrgansBreath": "",
    "reviewOfOrgansCardiovascular": "",
    "reviewOfOrgansDigestive": "",
    "reviewOfOrgansUrinary": "",
    "reviewOfOrgansSkeletalMuscle": "",
    "reviewOfOrgansEndocrinic": "",
    "reviewOfOrgansHemoLymphatic": "",
    "reviewOfOrgansHighlyStrung": "",
    "vitalSignsBloodPressure": "120/75",
    "vitalSignsTemperature": "37.1",
    "vitalSignsHeartRate": "81",
    "vitalSignsOxygenSaturation": "96",
    "vitalSignsRespiratoryRate": "15",
    "vitalSignsWeight": "56.8",
    "vitalSignsSize": "160",
    "vitalSignsMassIndex": "22.18",
    "vitalSignsAbdominalPerimeter": "88",
    "examSkinScar": "",
    "examSkinTattoo": "",
    "examSkinLesions": "",
    "examEyeEyelids": "",
    "examEyeConjunctiva": "",
    "examEyePupils": "",
    "examEyeCorneas": "",
    "examEyeMotility": "",
    "examEarAuditoryExternal": "",
    "examEarAuricle": "",
    "examEarEardrum": "",
    "examPharynxLips": "",
    "examPharynxTongue": "",
    "examPharynxPharynx": "",
    "examPharynxTonsils": "",
    "examPharynxTeeth": "",
    "examNosePartition": "",
    "examNoseTurbinates": "",
    "examNoseMucousMembranes": "",
    "examNoseParanasalSinuses": "",
    "examNeckThyroid": "",
    "examNeckMobility": "",
    "examChestBreast": "",
    "examChestHeart": "",
    "examChestLungs": "",
    "examChestRibCage": "",
    "examAbdomenViscera": "",
    "examAbdomenAbdominalWall": "",
    "examColumnFlexibility": "",
    "examColumnDeviation": "",
    "examColumnPain": "",
    "examPelvis": "",
    "examPelvisGenitals": "",
    "examLimbVascular": "",
    "examLimbUpper": "",
    "examLimbLower": "",
    "examNeurologicForce": "",
    "examNeurologicSensitivity": "",
    "examNeurologicGait": "",
    "examNeurologicReflex": "",
    "generalExamResults": [
        {
            "date": new Date("2024-08-15T19:09:54.898Z"),
            "exam": "LABORATORIO",
            "result": "BIOMETRIA HEMATICA ERITROCITOS 5.8,  CREATININA 1.1 MG/DL, GLUCOSA Y COLESTEROLNORMAL, TRIGLICERIDOS 184 MG/DL , EMO Y COPROPARASITARIO NORMALES"
        },
        {
            "date": new Date("2024-08-16T05:00:00.000Z"),
            "exam": "COMPLEMENTARIOS",
            "result": "RX CERVICAL RECTIFICACION LORDOSIS CERVICAL, RX LUMBAR : INCREMENTO DE LA LORDOSIS LUMBAR, DISMINUCION ESPACIOS INTERCORPALES L5-S1"
        }
    ],
    "generalExamObservation": "",
    "diagnostics": [
        {
            "description": "HIPERLIPIDEMIA",
            "cie": "E78.5",
            "flag": "def"
        },
        {
            "description": "INCREMENTO DEL A LORDOSIS LUMBAR / DISMINUCION ESPACIOS INTERCORPALES L5-S1",
            "cie": "M40.56",
            "flag": "def"
        },
        {
            "description": "RECTIFICACION LORDOSIS CERVICAL",
            "cie": "M40.56",
            "flag": "def"
        },
        {
            "description": "ASTIGMATISMO",
            "cie": "H52.2",
            "flag": "def"
        }
    ],
    "medicalFitnessType": "fit",
    "medicalFitnessLimitation": "",
    "medicalFitnessObservation": "",
    "medicalFitnessReubication": "",
    "recommendationDescription": "1. HIGIENE POSTURAL Y PAUSAS ACTIVAS\n2. ALIMENTACIÓN BAJA EN AZUCARES SIMPLES"
}

interface RecordInitialPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordInitialPage: React.FC<RecordInitialPageProps> = async ({
    searchParams
}) => {
    const patientDni = typeof searchParams.patientDni === 'string' ? searchParams.patientDni : undefined;

    if (!patientDni) return <>Patient not specified</>

    const corporativeBaseOptions = await retriveCorporativesOptions();
    const corporativeOptions = corporativeBaseOptions.map<CorporativeOption>((e) => ({
        ...e,
        children: e.children.map(x => ({
            ...x,
            label: x.label.split('-')[1],
            value: x.label.split('-')[0],
        }))
    }));

    const patient = await retriveClientByDni(patientDni);
    const patientFirstName = patient.patientName.split(' ')[0] ?? ' ';
    const patientMiddleName = patient.patientName.split(' ')[1] ?? ' ';
    const patientLastName = patient.patientLastname.split(' ')[0] ?? ' ';
    const patientSecondLastName = patient.patientLastname.split(' ')[1] ?? ' ';
    let patientAge = dayjs().diff(patient.patientBirthday, 'year');
    patientAge = patientAge <= 0 ? 1 : patientAge;

    return (
        <>
            <ReturnableHeader title='Ficha inicial' />
            <StepperInitialRecordForm
                headers={[
                    { title: 'Datos del establecimiento', description: 'Empresa y Usuario', icon: 'building' },
                    { title: 'Antecedentes personales', description: 'Antecedentes Clinicos y Quirúrgicos', icon: 'user-check' },
                    (patient.patientGender === 'female'
                        ? { title: 'Antecedentes personales', description: 'Antecedentes Gineco Obstreicos', icon: 'user-check' }
                        : { title: 'Antecedentes personales', description: 'Antecedentes Reproductivos Masculinos', icon: 'user-check' }),
                    { title: 'Antecedentes personales', description: 'Habitos Toxicos', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Estilo de vida', icon: 'user-check' },
                    { title: 'Antecedentes de Trabajo', description: 'Antecedentes de Empleos Anteriores', icon: 'briefcase' },
                    { title: 'Antecedentes de Trabajo', description: 'Accidentes de Trabajo', icon: 'briefcase' },
                    { title: 'Antecedentes de Trabajo', description: 'Enfermedades Profesionales', icon: 'briefcase' },
                    { title: 'Antecedentes Familiares', icon: 'tree' },
                    { title: 'Factores de Riesgos del Trabajo Actual', description: 'Riesgos', icon: 'risk' },
                    { title: 'Actividades Extra Laborales', icon: 'activity' },
                    { title: 'Enfermedad Actual', icon: 'disease' },
                    { title: 'Revision Actual de Organos y Sistemas', icon: 'heart' },
                    { title: 'Constantes Vitales y Antropometria', icon: 'heart' },
                    { title: 'Examen Fisico Regional', description: 'Regiones', icon: 'heart' },
                    { title: 'Resultados de Examenes Generales y Especificos', description: 'Regiones', icon: 'notebook' },
                    { title: 'Diagnostico', icon: 'notebook' },
                    { title: 'Aptitud Medical para el Trabajo', icon: 'notebook' },
                    { title: 'Recomendaciones y/o Tratamientos', icon: 'notebook' },
                    { title: 'Vista anticipada de la ficha', icon: 'check' },
                ]}
                patientDni={patientDni}
                initialData={{
                    patientDni: patientDni,
                    patientFirstName: patientFirstName,
                    patientMiddleName: patientMiddleName,
                    patientLastName: patientLastName,
                    patientSecondLastName: patientSecondLastName,
                    patientGender: patient.patientGender,
                    patientAge: patientAge,
                    medicalConsultationDescription: INITIAL_MEDICAL_CONSULTATION,
                    ...defaultValues
                }}>
                <InitialInstitutionForm options={corporativeOptions} />
                <MedicalAndSurgicalHistoryForm />
                {patient.patientGender === 'female'
                    ? <InitialGynecologicalForm />
                    : <IntialMaleReproductionForm />}
                <ToxicHabitsForm />
                <LifestyleForm />
                <InitialJobHistoryForm />
                <JobAccidentForm />
                <OccupationalDiseaseForm />
                <FamilyHistoryForm />
                <InitialJobRiskForm />
                <InitialExtraJobActivityForm />
                <CurrentDiseaseForm />
                <ReviewOfOrgansAndSystemForm />
                <VitalSignsAndAnthropometryForm />
                <PhysicalRegionalExamForm />
                <GeneralExamResultForm />
                <MedicalDiagnosticForm />
                <MedicalFitnessForJobForm />
                <RecommendationForm />
                <PreviewInitialRecord />
            </StepperInitialRecordForm >
        </>
    )
}

export default RecordInitialPage
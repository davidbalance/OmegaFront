import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import StepperPeriodicRecordForm from './_components/stepper-periodic-record-form';
import { retriveCorporativesOptions } from '@/server/corporative/actions';
import { CorporativeOption } from '@/server/corporative/server_types';
import { retriveClientByDni } from '@/server/medical_client/actions';
import PeriodicInstitutionForm from './_components/periodic-institution-form';
import PreviewPeriodicRecord from './_components/preview-periodic-record';
import MedicalConsultationForm from '@/components/record/medical-consultation-form';
import MedicalAndSurgicalHistoryForm from '@/components/record/medical-and-surgical-history-form';
import ToxicHabitsForm from '@/components/record/toxic-habits-form';
import LifestyleForm from '@/components/record/lifestyle-form';
import IncidentForm from '@/components/record/incident-form';
import JobAccidentForm from '@/components/record/job-accident-form';
import OccupationalDiseaseForm from '@/components/record/occupational-diseases-form';
import FamilyHistoryForm from '@/components/record/family-history-form';
import PeriodicJobRiskForm from './_components/periodic-job-risk-form';
import PeriodicJobRiskPreventiveForm from './_components/periodic-job-risk-preventive-form';
import CurrentDiseaseForm from '@/components/record/current-disease-form';
import ReviewOfOrgansAndSystemForm from '@/components/record/review-of-organs-and-system-form';
import VitalSignsAndAnthropometryForm from '@/components/record/vital-signs-and-anthropometry-form';
import PhysicalRegionalExamForm from '@/components/record/physical-regional-exam-form';
import GeneralExamResultForm from '@/components/record/general-exam-result-form';
import MedicalDiagnosticForm from '@/components/record/medical-diagnostic-form';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import RecommendationForm from '@/components/record/recommendation-form';
import { PeriodicRecordPayload } from '@/server/record/create-record/periodic-record';

const testData: PeriodicRecordPayload = {
    "patientFirstName": "sample",
    "patientMiddleName": " ",
    "patientLastName": "sample",
    "patientSecondLastName": " ",
    "patientGender": "male",
    "companyName": "COLEGIO MENOR",
    "companyRUC": "1791754794001",
    "companyCIU": "CIU",
    "institutionHealthFacility": "Omega Salud Ocupacional",
    "jobPosition": "SAMPLE",
    "medicalConsultationDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "medicalAndSurgicalHistory": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "toxicHabitTobacco": {
        "consumer": true,
        "consumed": true,
        "consumptionTime": 45,
        "other": "",
        "quantity": 45,
        "timeOfAbstinence": 45
    },
    "toxicHabitAlcohol": {
        "consumer": false,
        "consumed": false,
        "consumptionTime": 0,
        "other": "",
        "quantity": 1,
        "timeOfAbstinence": 0
    },
    "toxicHabitOther": {
        "consumer": true,
        "consumed": false,
        "consumptionTime": 45,
        "other": "SAMPLE",
        "quantity": 45,
        "timeOfAbstinence": 45
    },
    "lifestylePhysicalActivityActive": true,
    "lifestylePhysicalActivityType": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "lifestylePhysicalActivityDuration": 45,
    "lifestyleMedicationTaking": true,
    "lifestyleMedicationName": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "lifestyleMedicationQuantity": 45,
    "incidentDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "jobAccidentHappened": true,
    "jobAccidentDate": new Date("2025-03-24T19:56:47.314Z"),
    "jobAccidentDescription": "SAMPLE",
    "jobAccidentObservation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "occupationalDiseaseHappened": true,
    "occupationalDiseaseDate": new Date("2025-03-24T19:56:52.512Z"),
    "occupationalDiseaseDescription": "SAMPLE",
    "occupationalDiseaseObservation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "familyHistoryCardioVascular": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "familyHistoryMetabolic": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "familyHistoryNeurologic": "",
    "familyHistoryOncologic": "",
    "familyHistoryInfectious": "",
    "familyHistoryHereditary": "",
    "familyHistoryDisability": "",
    "familyHistoryOther": "",
    "jobRisks": [
        {
            "name": "SAMPLE",
            "activity": "SAMPLE",
            "months": 45,
            "physicalRiskHighTemperature": true,
            "physicalRiskLowTemperature": true,
            "physicalRiskIonicRadiation": true,
            "physicalRiskNonIonicRadiation": false,
            "physicalRiskNoise": false,
            "physicalRiskVibration": true,
            "physicalRiskIllumination": false,
            "physicalRiskVentilation": true,
            "physicalRiskElectricFluid": true,
            "physicalRiskOther": "SAMPLE",
            "mechanicRiskEntrapmentBetweenMachines": true,
            "mechanicRiskTrappingBetweenSurfaces": true,
            "mechanicRiskEntrapmentBetweenObjects": false,
            "mechanicRiskObjectFalling": false,
            "mechanicRiskSameLevelFalling": false,
            "mechanicRiskDifferentLevelFalling": false,
            "mechanicRiskElectricContact": false,
            "mechanicRiskSurfacesContact": false,
            "mechanicRiskParticlesProjection": false,
            "mechanicRiskFluidProjection": false,
            "mechanicRiskJab": true,
            "mechanicRiskCut": false,
            "mechanicRiskHitByVehicles": true,
            "mechanicRiskVehicleCollision": true,
            "mechanicRiskOther": "SAMPLE",
            "chemicalRiskSolid": true,
            "chemicalRiskDust": true,
            "chemicalRiskSmoke": false,
            "chemicalRiskLiquid": true,
            "chemicalRiskSteam": false,
            "chemicalRiskAerosol": false,
            "chemicalRiskMist": true,
            "chemicalRiskGas": false,
            "chemicalRiskOther": "SAMPLE",
            "biologicalRiskVirus": true,
            "biologicalRiskFungus": true,
            "biologicalRiskBacteria": false,
            "biologicalRiskParasites": true,
            "biologicalRiskExposureToVectors": false,
            "biologicalRiskExposureToWildlifeAnimals": false,
            "biologicalRiskOther": "SAMPLE",
            "ergonomicRiskManualHandlingLoads": true,
            "ergonomicRiskRepetitiveMoves": true,
            "ergonomicRiskForcedPostures": false,
            "ergonomicRiskWorkWithPvd": true,
            "ergonomicRiskOther": "SAMPLE"
        }
    ],
    "jobRiskWithPreventiveMeasure": [
        {
            "name": "SAMPLE",
            "activity": "SAMPLE",
            "months": 45,
            "preventiveMeasure": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
            "psychosocialRiskMonotony": true,
            "psychosocialRiskWorkOverload": false,
            "psychosocialRiskThoroughnessOfTheTask": true,
            "psychosocialRiskHighResponsibility": false,
            "psychosocialRiskTakingResponsibilityAutonomy": true,
            "psychosocialRiskSupervision": false,
            "psychosocialRiskRoleConflict": true,
            "psychosocialRiskNonFunctionClarify": true,
            "psychosocialRiskBadWorkDistribution": true,
            "psychosocialRiskRotativeShift": false,
            "psychosocialRiskIntrapersonalRelations": false,
            "psychosocialRiskJobInstability": false,
            "psychosocialRiskOther": "SAMPLE"
        }
    ],
    "currentDiseaseDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "reviewOfOrgansSkin": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "reviewOfOrgansSenseOrgans": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "reviewOfOrgansBreath": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "reviewOfOrgansCardiovascular": "",
    "reviewOfOrgansDigestive": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "reviewOfOrgansUrinary": "",
    "reviewOfOrgansSkeletalMuscle": "",
    "reviewOfOrgansEndocrinic": "",
    "reviewOfOrgansHemoLymphatic": "",
    "reviewOfOrgansHighlyStrung": "",
    "vitalSignsBloodPressure": 45,
    "vitalSignsTemperature": 0,
    "vitalSignsHeartRate": 45,
    "vitalSignsOxygenSaturation": 0,
    "vitalSignsRespiratoryRate": 0,
    "vitalSignsWeight": 45,
    "vitalSignsSize": 45,
    "vitalSignsMassIndex": 45,
    "vitalSignsAbdominalPerimeter": 0,
    "examSkinScar": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examSkinTattoo": "",
    "examSkinLesions": "",
    "examEyeEyelids": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examEyeConjunctiva": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examEyePupils": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examEyeCorneas": "",
    "examEyeMotility": "",
    "examEarAuditoryExternal": "",
    "examEarAuricle": "",
    "examEarEardrum": "",
    "examPharynxLips": "",
    "examPharynxTongue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examPharynxPharynx": "",
    "examPharynxTonsils": "",
    "examPharynxTeeth": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examNosePartition": "",
    "examNoseTurbinates": "",
    "examNoseMucousMembranes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examNoseParanasalSinuses": "",
    "examNeckThyroid": "",
    "examNeckMobility": "",
    "examChestBreast": "",
    "examChestHeart": "",
    "examChestLungs": "",
    "examChestRibCage": "",
    "examAbdomenViscera": "",
    "examAbdomenAbdominalWall": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examColumnFlexibility": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examColumnDeviation": "",
    "examColumnPain": "",
    "examPelvis": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examPelvisGenitals": "",
    "examLimbVascular": "",
    "examLimbUpper": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "examLimbLower": "",
    "examNeurologicForce": "",
    "examNeurologicSensitivity": "",
    "examNeurologicGait": "",
    "examNeurologicReflex": "",
    "generalExamResults": [
        {
            "date": new Date("2025-03-24T19:55:10.170Z"),
            "exam": "sample",
            "result": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            "date": new Date("2025-03-24T20:01:13.231Z"),
            "exam": "SAMPLE",
            "result": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ],
    "generalExamObservation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "diagnostics": [
        {
            "description": "SAMPLE",
            "cie": "CIE",
            "pre": true,
            "def": true
        },
        {
            "description": "SAMPLE",
            "cie": "CIE",
            "pre": true,
            "def": false
        },
        {
            "description": "SAMPLE",
            "cie": "CIE",
            "pre": false,
            "def": true
        },
        {
            "description": "SAMPLE",
            "cie": "CIE",
            "pre": false,
            "def": false
        }
    ],
    "medicalFitnessType": "fit-limitation",
    "medicalFitnessLimitation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "medicalFitnessObservation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna.",
    "recommendationDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lectus lacinia accumsan convallis. Proin faucibus lacinia dapibus. Nullam quis volutpat purus. Praesent in consequat ex, et porttitor ante. Vestibulum ut blandit est. In tincidunt velit et lorem sodales, nec elementum lectus congue. Vestibulum sollicitudin rhoncus ipsum, in lobortis sem tempor sed. Pellentesque nulla justo, dictum vel erat pellentesque, placerat placerat nisi. Mauris et scelerisque urna."
}

type RecordPeriodicPageProps = {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordPeriodicPage: React.FC<RecordPeriodicPageProps> = async ({
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

    return (
        <>
            <ReturnableHeader title='Ficha periodica' />
            <StepperPeriodicRecordForm
                headers={[
                    { title: 'Datos del establecimiento', description: 'Empresa y Usuario', icon: 'building' },
                    { title: 'Motivo de la consulta', icon: 'license' },
                    { title: 'Antecedentes personales', description: 'Antecedentes Clinicos y Quirúrgicos', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Habitos Toxicos', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Estilo de vida', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Incidentes', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Antecedentes de Empleos Anteriores', icon: 'briefcase' },
                    { title: 'Antecedentes personales', description: 'Accidentes de Trabajo', icon: 'briefcase' },
                    { title: 'Antecedentes Familiares', icon: 'tree' },
                    { title: 'Factores de Riesgos del Trabajo Actual', description: 'Riesgos', icon: 'risk' },
                    { title: 'Factores de Riesgos del Trabajo Actual', description: 'Riesgos con medidas preventivas', icon: 'risk' },
                    { title: 'Enfermedad Actual', icon: 'disease' },
                    { title: 'Revision Actual de Organos y Sistemas', icon: 'heart' },
                    { title: 'Constantes Vitales y Antropometria', icon: 'heart' },
                    { title: 'Examen Fisico Regional', description: 'Regiones', icon: 'heart' },
                    { title: 'Resultados de Examenes Generales y Especificos', description: 'Regiones', icon: 'notebook' },
                    { title: 'M. Diagnostico', icon: 'notebook' },
                    { title: 'N. Aptitud Medical para el Trabajo', icon: 'notebook' },
                    { title: 'Recomendacionesy/o Tratamientos', icon: 'notebook' },

                    { title: 'Vista anticipada de la ficha', icon: 'check' },
                ]}
                patientDni={patientDni}
                initialData={{
                    ...testData,
                    patientFirstName: patientFirstName,
                    patientMiddleName: patientMiddleName,
                    patientLastName: patientLastName,
                    patientSecondLastName: patientSecondLastName,
                    patientGender: patient.patientGender,
                }}>
                <PeriodicInstitutionForm options={corporativeOptions} />
                <MedicalConsultationForm />
                <MedicalAndSurgicalHistoryForm />
                <ToxicHabitsForm />
                <LifestyleForm />
                <IncidentForm />
                <JobAccidentForm />
                <OccupationalDiseaseForm />
                <FamilyHistoryForm />
                <PeriodicJobRiskForm />
                <PeriodicJobRiskPreventiveForm />
                <CurrentDiseaseForm />
                <ReviewOfOrgansAndSystemForm />
                <VitalSignsAndAnthropometryForm />
                <PhysicalRegionalExamForm />
                <GeneralExamResultForm />
                <MedicalDiagnosticForm />
                <MedicalFitnessForJobForm />
                <RecommendationForm />
                <PreviewPeriodicRecord />

            </StepperPeriodicRecordForm >
        </>
    )
}

export default RecordPeriodicPage
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
import GeneralExamResultForm from '@/components/record/general-exam-result';
import MedicalDiagnosticForm from '@/components/record/medical-diagnostic-form';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import RecommendationForm from '@/components/record/recommendation-form';
import { PeriodicRecordPayload } from '@/server/record/create-record/periodic-record';

const testData: PeriodicRecordPayload = {
    patientFirstName: "WILLAN",
    patientMiddleName: "HERNAN",
    patientLastName: "FERNANDEZ",
    patientSecondLastName: "FLORES",
    patientGender: "male",
    companyName: "COLEGIO MENOR",
    companyRUC: "1791754794001",
    companyCIU: "CIU",
    institutionHealthFacility: "Omega Salud Ocupacional",
    jobPosition: "SAMPLE",
    medicalConsultationDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    medicalAndSurgicalHistory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    toxicHabitTobacco: {
        consumer: false,
        consumed: false,
        consumptionTime: 0,
        other: "",
        quantity: 1,
        timeOfAbstinence: 0
    },
    toxicHabitAlcohol: {
        consumer: true,
        consumed: false,
        consumptionTime: 45,
        other: "",
        quantity: 45,
        timeOfAbstinence: 45
    },
    toxicHabitOther: {
        consumer: true,
        consumed: true,
        consumptionTime: 45,
        other: "SAMPLE",
        quantity: 45,
        timeOfAbstinence: 45
    },
    lifestylePhysicalActivityActive: true,
    lifestylePhysicalActivityType: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    lifestylePhysicalActivityDuration: 45,
    lifestyleMedicationTaking: true,
    lifestyleMedicationName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    lifestyleMedicationQuantity: 45,
    incidentDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    jobAccidentHappened: true,
    jobAccidentDate: new Date("2025-03-18T15:39:19.470Z"),
    jobAccidentDescription: "SAMPLE",
    jobAccidentObservation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    occupationalDiseaseHappened: true,
    occupationalDiseaseDate: new Date("2025-03-18T15:39:26.241Z"),
    occupationalDiseaseDescription: "SAMPLE",
    occupationalDiseaseObservation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    familyHistoryCardioVascular: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    familyHistoryMetabolic: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    familyHistoryNeurologic: "",
    familyHistoryOncologic: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    familyHistoryInfectious: "",
    familyHistoryHereditary: "",
    familyHistoryDisability: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    familyHistoryOther: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    jobRisks: [
        {
            name: "SAMPLE",
            activity: "SAMPLE",
            months: 45,
            physicalRiskHighTemperature: false,
            physicalRiskLowTemperature: false,
            physicalRiskIonicRadiation: true,
            physicalRiskNonIonicRadiation: false,
            physicalRiskNoise: false,
            physicalRiskVibration: true,
            physicalRiskIllumination: false,
            physicalRiskVentilation: false,
            physicalRiskElectricFluid: false,
            physicalRiskOther: "SAMPLE",
            mechanicRiskEntrapmentBetweenMachines: false,
            mechanicRiskTrappingBetweenSurfaces: false,
            mechanicRiskEntrapmentBetweenObjects: false,
            mechanicRiskObjectFalling: false,
            mechanicRiskSameLevelFalling: false,
            mechanicRiskDifferentLevelFalling: false,
            mechanicRiskElectricContact: false,
            mechanicRiskSurfacesContact: false,
            mechanicRiskParticlesProjection: false,
            mechanicRiskFluidProjection: false,
            mechanicRiskJab: false,
            mechanicRiskCut: false,
            mechanicRiskHitByVehicles: false,
            mechanicRiskVehicleCollision: false,
            mechanicRiskOther: "",
            chemicalRiskSolid: false,
            chemicalRiskDust: false,
            chemicalRiskSmoke: false,
            chemicalRiskLiquid: false,
            chemicalRiskSteam: true,
            chemicalRiskAerosol: false,
            chemicalRiskMist: true,
            chemicalRiskGas: false,
            chemicalRiskOther: "SAMPLE",
            biologicalRiskVirus: false,
            biologicalRiskFungus: false,
            biologicalRiskBacteria: false,
            biologicalRiskParasites: false,
            biologicalRiskExposureToVectors: false,
            biologicalRiskExposureToWildlifeAnimals: false,
            biologicalRiskOther: "",
            ergonomicRiskManualHandlingLoads: false,
            ergonomicRiskRepetitiveMoves: false,
            ergonomicRiskForcedPostures: false,
            ergonomicRiskWorkWithPvd: false,
            ergonomicRiskOther: ""
        },
        {
            name: "SAMPLE",
            activity: "SAMPLE",
            months: 45,
            physicalRiskHighTemperature: false,
            physicalRiskLowTemperature: true,
            physicalRiskIonicRadiation: false,
            physicalRiskNonIonicRadiation: false,
            physicalRiskNoise: false,
            physicalRiskVibration: false,
            physicalRiskIllumination: false,
            physicalRiskVentilation: false,
            physicalRiskElectricFluid: false,
            physicalRiskOther: "",
            mechanicRiskEntrapmentBetweenMachines: true,
            mechanicRiskTrappingBetweenSurfaces: true,
            mechanicRiskEntrapmentBetweenObjects: false,
            mechanicRiskObjectFalling: false,
            mechanicRiskSameLevelFalling: false,
            mechanicRiskDifferentLevelFalling: false,
            mechanicRiskElectricContact: false,
            mechanicRiskSurfacesContact: false,
            mechanicRiskParticlesProjection: false,
            mechanicRiskFluidProjection: true,
            mechanicRiskJab: false,
            mechanicRiskCut: false,
            mechanicRiskHitByVehicles: false,
            mechanicRiskVehicleCollision: false,
            mechanicRiskOther: "SAMPLE",
            chemicalRiskSolid: false,
            chemicalRiskDust: false,
            chemicalRiskSmoke: false,
            chemicalRiskLiquid: true,
            chemicalRiskSteam: true,
            chemicalRiskAerosol: false,
            chemicalRiskMist: false,
            chemicalRiskGas: false,
            chemicalRiskOther: "SAMPLE",
            biologicalRiskVirus: false,
            biologicalRiskFungus: false,
            biologicalRiskBacteria: false,
            biologicalRiskParasites: false,
            biologicalRiskExposureToVectors: false,
            biologicalRiskExposureToWildlifeAnimals: false,
            biologicalRiskOther: "",
            ergonomicRiskManualHandlingLoads: false,
            ergonomicRiskRepetitiveMoves: false,
            ergonomicRiskForcedPostures: false,
            ergonomicRiskWorkWithPvd: false,
            ergonomicRiskOther: ""
        }
    ],
    jobRiskWithPreventiveMeasure: [
        {
            name: "SAMPLE",
            activity: "SAMPLE",
            months: 45,
            preventiveMeasure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            psychosocialRiskMonotony: false,
            psychosocialRiskWorkOverload: false,
            psychosocialRiskThoroughnessOfTheTask: true,
            psychosocialRiskHighResponsibility: true,
            psychosocialRiskTakingResponsibilityAutonomy: false,
            psychosocialRiskSupervision: false,
            psychosocialRiskRoleConflict: false,
            psychosocialRiskNonFunctionClarify: true,
            psychosocialRiskBadWorkDistribution: true,
            psychosocialRiskRotativeShift: false,
            psychosocialRiskIntrapersonalRelations: false,
            psychosocialRiskJobInstability: false,
            psychosocialRiskOther: "SAMPLE"
        }
    ],
    currentDiseaseDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    reviewOfOrgansSkin: "",
    reviewOfOrgansSenseOrgans: "",
    reviewOfOrgansBreath: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    reviewOfOrgansCardiovascular: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    reviewOfOrgansDigestive: "",
    reviewOfOrgansUrinary: "",
    reviewOfOrgansSkeletalMuscle: "",
    reviewOfOrgansEndocrinic: "",
    reviewOfOrgansHemoLymphatic: "",
    reviewOfOrgansHighlyStrung: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    vitalSignsBloodPressure: 45,
    vitalSignsTemperature: 45,
    vitalSignsHeartRate: 0,
    vitalSignsOxygenSaturation: 45,
    vitalSignsRespiratoryRate: 45,
    vitalSignsWeight: 45,
    vitalSignsSize: 45,
    vitalSignsMassIndex: 0,
    vitalSignsAbdominalPerimeter: 45,
    examSkinScar: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examSkinTattoo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examSkinLesions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examEyeEyelids: "",
    examEyeConjunctiva: "",
    examEyePupils: "",
    examEyeCorneas: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examEyeMotility: "",
    examEarAuditoryExternal: "",
    examEarAuricle: "",
    examEarEardrum: "",
    examPharynxLips: "",
    examPharynxTongue: "",
    examPharynxPharynx: "",
    examPharynxTonsils: "",
    examPharynxTeeth: "",
    examNosePartition: "",
    examNoseTurbinates: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examNoseMucousMembranes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examNoseParanasalSinuses: "",
    examNeckThyroid: "",
    examNeckMobility: "",
    examChestBreast: "",
    examChestHeart: "",
    examChestLungs: "",
    examChestRibCage: "",
    examAbdomenViscera: "",
    examAbdomenAbdominalWall: "",
    examColumnFlexibility: "",
    examColumnDeviation: "",
    examColumnPain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examPelvis: "",
    examPelvisGenitals: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examLimbVascular: "",
    examLimbUpper: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examLimbLower: "",
    examNeurologicForce: "",
    examNeurologicSensitivity: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examNeurologicGait: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examNeurologicReflex: "",
    generalExamResults: [
        {
            date: new Date("2025-03-18T15:37:41.822Z"),
            exam: "SAMPLE",
            result: "SAMPLE"
        }
    ],
    generalExamObservation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    diagnostics: [
        {
            description: "SAMPLE",
            cie: "CIE",
            pre: true,
            def: true
        },
        {
            description: "SAMPLE",
            cie: "CIE",
            pre: true,
            def: false
        },
        {
            description: "SAMPLE",
            cie: "CIE",
            pre: false,
            def: true
        },
        {
            description: "SAMPLE",
            cie: "CIE",
            pre: false,
            def: false
        }
    ],
    medicalFitnessType: "fit-limitation",
    medicalFitnessLimitation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    medicalFitnessObservation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida.",
    recommendationDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed ultricies erat. Mauris consectetur pulvinar quam, et tincidunt orci. Curabitur ac lobortis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eleifend condimentum tempor. Nullam pretium imperdiet nisl, ut faucibus orci aliquet suscipit. Fusce rutrum lacus id nisi faucibus mattis eget et sapien. Duis sit amet nisi in mi elementum malesuada. Praesent sollicitudin eget dolor ac dignissim. In laoreet ac massa at gravida."
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
    const patientFirstName = patient.patientName.split(' ')[0] ?? '';
    const patientMiddleName = patient.patientName.split(' ')[1] ?? '';
    const patientLastName = patient.patientLastname.split(' ')[0] ?? '';
    const patientSecondLastName = patient.patientLastname.split(' ')[1] ?? '';

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
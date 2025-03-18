import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import StepperInitialRecordForm from './_components/stepper-inital-record-form';
import PreviewInitialRecord from './_components/preview-initial-record';
import InitialInstitutionForm from './_components/initial-institution-form';
import { retriveCorporativesOptions } from '@/server/corporative/actions';
import { CorporativeOption } from '@/server/corporative/server_types';
import { retriveClientByDni } from '@/server/medical_client/actions';
import dayjs from 'dayjs';
import MedicalConsultationForm from '@/components/record/medical-consultation-form';
import MedicalAndSurgicalHistoryForm from '@/components/record/medical-and-surgical-history-form';
import InitialGynecologicalForm from './_components/initial-gynecological-form';
import IntialMaleReproductionForm from './_components/initial-male-reproduction-form';
import InitialJobHistoryForm from './_components/initial-job-history-form';
import JobAccidentForm from '@/components/record/job-accident-form';
import OccupationalDiseaseForm from '@/components/record/occupational-diseases-form';
import FamilyHistoryForm from '@/components/record/family-history-form';
import InitialJobRiskForm from './_components/initial-job-risk-form';
import InitialJobRiskPreventiveForm from './_components/initial-job-risk-preventive-form';
import InitialExtraJobActivityForm from './_components/initial-extra-job-activity-form';
import CurrentDiseaseForm from '@/components/record/current-disease-form';
import ReviewOfOrgansAndSystemForm from '@/components/record/review-of-organs-and-system-form';
import VitalSignsAndAnthropometryForm from '@/components/record/vital-signs-and-anthropometry-form';
import PhysicalRegionalExamForm from '@/components/record/physical-regional-exam-form';
import GeneralExamResultForm from '@/components/record/general-exam-result';
import MedicalDiagnosticForm from '@/components/record/medical-diagnostic-form';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import RecommendationForm from '@/components/record/recommendation-form';
import ToxicHabitsForm from '@/components/record/toxic-habits-form';
import LifestyleForm from '@/components/record/lifestyle-form';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';

const testData: InitialRecordPayload = {
    patientFirstName: 'WILLAN',
    patientMiddleName: 'HERNAN',
    patientLastName: 'FERNANDEZ',
    patientSecondLastName: 'FLORES',
    patientGender: 'male',
    patientAge: 39,
    companyName: 'COLEGIO MENOR',
    companyRUC: '1791754794001',
    companyCIU: 'CIU',
    institutionHealthFacility: 'Omega Salud Ocupacional',
    patientReligion: 'catholic',
    patientOtherReligion: '',
    patientBloodType: 'A+',
    patientLaterality: 'SAMPLE',
    patientSexualOrientation: 'lesbian',
    patientGenderIdentity: 'male',
    patientDisabilityType: 'SAMPLE',
    patientDisabilityPercent: 0.01,
    jobStartDate: new Date("2025-03-15T19:46:43.759Z"),
    jobPosition: 'SAMPLE',
    jobArea: 'SAMPLE',
    jobActivity: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare.',
    medicalConsultationDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare. Vivamus felis nisi, fermentum placerat felis quis, vestibulum varius neque. Vivamus ullamcorper, ante a pellentesque lacinia, nibh velit sagittis ex, quis rhoncus sem leo ac est. Praesent pulvinar, mi nec tempor tempus, nisl purus luctus enim, in ullamcorper sem arcu nec metus. Sed vulputate nibh sem, eu commodo tortor placerat id. Donec semper lacus id purus posuere, ac efficitur metus molestie. In luctus odio vel ipsum elementum vestibulum. Nunc eleifend elit in tempor cursus. In ut tortor dui. Duis euismod velit vestibulum, feugiat leo ac, tristique arcu. Suspendisse sit amet pellentesque erat, in lobortis purus. Vivamus metus diam, dapibus sodales velit eu, convallis cursus dolor.',
    medicalAndSurgicalHistory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare. Vivamus felis nisi, fermentum placerat felis quis, vestibulum varius neque. Vivamus ullamcorper, ante a pellentesque lacinia, nibh velit sagittis ex, quis rhoncus sem leo ac est. Praesent pulvinar, mi nec tempor tempus, nisl purus luctus enim, in ullamcorper sem arcu nec metus. Sed vulputate nibh sem, eu commodo tortor placerat id. Donec semper lacus id purus posuere, ac efficitur metus molestie. In luctus odio vel ipsum elementum vestibulum. Nunc eleifend elit in tempor cursus. In ut tortor dui. Duis euismod velit vestibulum, feugiat leo ac, tristique arcu. Suspendisse sit amet pellentesque erat, in lobortis purus. Vivamus metus diam, dapibus sodales velit eu, convallis cursus dolor.',
    gynecologicalMenarche: 'SAMPLE',
    gynecologicalCycle: 'SAMPLE',
    gynecologicalLastMenstruationDate: new Date("2025-03-15T19:48:25.349Z"),
    gynecologicalDeeds: 45,
    gynecologicalBirths: 45,
    gynecologicalCesarean: 45,
    gynecologicalAbortions: 45,
    gynecologicalDeadChildren: 45,
    gynecologicalLivingChildren: 45,
    gynecologicalSexualLife: true,
    gynecologicalFamilyPlanningType: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    gynecologicalExamPapanicolau: {
        done: true, result: 'SAMPLE', time: 45
    },
    gynecologicalExamColposcopy: {
        done: false, result: '', time: 0
    },
    gynecologicalExamBreastEcho: {
        done: false, result: '', time: 0
    },
    gynecologicalExamMammography: {
        done: true, result: 'SAMPLE', time: 45
    },
    maleReproductiveFamilyPlanningType: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    maleReproductiveExamProstateAntigen: {
        done: false, result: '', time: 0
    },
    maleReproductiveExamProstateEcho: {
        done: true, result: 'SAMPLE', time: 45
    },
    maleReproductiveDeadChildren: 45,
    maleReproductiveLivingChildren: 45,
    toxicHabitTobacco: {
        consumer: true,
        consumed: true,
        consumptionTime: 45,
        other: '',
        quantity: 45,
        timeOfAbstinence: 45
    },
    toxicHabitAlcohol: {
        consumer: false,
        consumed: false,
        consumptionTime: 0,
        other: '',
        quantity: 1,
        timeOfAbstinence: 0
    },
    toxicHabitOther: {
        consumer: true,
        consumed: false,
        consumptionTime: 45,
        other: 'SAMPLE',
        quantity: 45,
        timeOfAbstinence: 45
    },
    lifestylePhysicalActivityActive: true,
    lifestylePhysicalActivityType: 'SAMPLE',
    lifestylePhysicalActivityDuration: 45,
    lifestyleMedicationTaking: true,
    lifestyleMedicationName: 'SAMPLE',
    lifestyleMedicationQuantity: 45,
    jobHistory: [
        {
            lastJobActivity: 'SAMPLE',
            lastJobCompany: 'SAMPLE',
            lastJobPosition: 'SAMPLE',
            lastJobTime: 45,
            lastJobRiskPhysical: false,
            lastJobRiskMechanical: true,
            lastJobRiskChemical: false,
            lastJobRiskBiological: true,
            lastJobRiskErgonomic: false,
            lastJobRiskPsychosocial: true,
            lastJobObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ],
    jobAccidentHappened: true,
    jobAccidentDate: new Date("2025-03-15T19:51:17.575Z"),
    jobAccidentDescription: 'SAMPLE',
    jobAccidentObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare. Vivamus felis nisi, fermentum placerat felis quis, vestibulum varius neque. Vivamus ullamcorper, ante a pellentesque lacinia, nibh velit sagittis ex, quis rhoncus sem leo ac est. Praesent pulvinar, mi nec tempor tempus, nisl purus luctus enim, in ullamcorper sem arcu nec metus. Sed vulputate nibh sem, eu commodo tortor placerat id. Donec semper lacus id purus posuere, ac efficitur metus molestie. In luctus odio vel ipsum elementum vestibulum. Nunc eleifend elit in tempor cursus. In ut tortor dui. Duis euismod velit vestibulum, feugiat leo ac, tristique arcu. Suspendisse sit amet pellentesque erat, in lobortis purus. Vivamus metus diam, dapibus sodales velit eu, convallis cursus dolor.\n' +
        '\n',
    occupationalDiseaseHappened: true,
    occupationalDiseaseDate: new Date("2025-03-15T19:51:29.934Z"),
    occupationalDiseaseDescription: 'SAMPLE',
    occupationalDiseaseObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare. Vivamus felis nisi, fermentum placerat felis quis, vestibulum varius neque. Vivamus ullamcorper, ante a pellentesque lacinia, nibh velit sagittis ex, quis rhoncus sem leo ac est. Praesent pulvinar, mi nec tempor tempus, nisl purus luctus enim, in ullamcorper sem arcu nec metus. Sed vulputate nibh sem, eu commodo tortor placerat id. Donec semper lacus id purus posuere, ac efficitur metus molestie. In luctus odio vel ipsum elementum vestibulum. Nunc eleifend elit in tempor cursus. In ut tortor dui. Duis euismod velit vestibulum, feugiat leo ac, tristique arcu. Suspendisse sit amet pellentesque erat, in lobortis purus. Vivamus metus diam, dapibus sodales velit eu, convallis cursus dolor.',
    familyHistoryCardioVascular: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    familyHistoryMetabolic: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    familyHistoryNeurologic: '',
    familyHistoryOncologic: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    familyHistoryInfectious: '',
    familyHistoryHereditary: '',
    familyHistoryDisability: '',
    familyHistoryOther: '',
    jobRisks: [
        {
            name: 'SAMPLE',
            activity: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare. ',
            physicalRiskHighTemperature: false,
            physicalRiskLowTemperature: false,
            physicalRiskIonicRadiation: true,
            physicalRiskNonIonicRadiation: false,
            physicalRiskNoise: false,
            physicalRiskVibration: false,
            physicalRiskIllumination: false,
            physicalRiskVentilation: false,
            physicalRiskElectricFluid: true,
            physicalRiskOther: 'SAMPLE',
            mechanicRiskEntrapmentBetweenMachines: false,
            mechanicRiskTrappingBetweenSurfaces: false,
            mechanicRiskEntrapmentBetweenObjects: false,
            mechanicRiskObjectFalling: false,
            mechanicRiskSameLevelFalling: false,
            mechanicRiskDifferentLevelFalling: true,
            mechanicRiskElectricContact: false,
            mechanicRiskSurfacesContact: false,
            mechanicRiskParticlesProjection: false,
            mechanicRiskFluidProjection: true,
            mechanicRiskJab: false,
            mechanicRiskCut: false,
            mechanicRiskHitByVehicles: false,
            mechanicRiskVehicleCollision: false,
            mechanicRiskOther: 'SAMPLE',
            chemicalRiskSolid: false,
            chemicalRiskDust: false,
            chemicalRiskSmoke: true,
            chemicalRiskLiquid: false,
            chemicalRiskSteam: false,
            chemicalRiskAerosol: true,
            chemicalRiskMist: false,
            chemicalRiskGas: false,
            chemicalRiskOther: 'SAMPLE'
        },
        {
            name: 'SAMPLE',
            activity: 'SAMPLE',
            physicalRiskHighTemperature: false,
            physicalRiskLowTemperature: false,
            physicalRiskIonicRadiation: false,
            physicalRiskNonIonicRadiation: true,
            physicalRiskNoise: true,
            physicalRiskVibration: false,
            physicalRiskIllumination: false,
            physicalRiskVentilation: false,
            physicalRiskElectricFluid: false,
            physicalRiskOther: 'SAMPLE',
            mechanicRiskEntrapmentBetweenMachines: false,
            mechanicRiskTrappingBetweenSurfaces: true,
            mechanicRiskEntrapmentBetweenObjects: false,
            mechanicRiskObjectFalling: false,
            mechanicRiskSameLevelFalling: false,
            mechanicRiskDifferentLevelFalling: true,
            mechanicRiskElectricContact: true,
            mechanicRiskSurfacesContact: false,
            mechanicRiskParticlesProjection: false,
            mechanicRiskFluidProjection: false,
            mechanicRiskJab: false,
            mechanicRiskCut: false,
            mechanicRiskHitByVehicles: false,
            mechanicRiskVehicleCollision: false,
            mechanicRiskOther: 'SAMPLE',
            chemicalRiskSolid: false,
            chemicalRiskDust: false,
            chemicalRiskSmoke: false,
            chemicalRiskLiquid: true,
            chemicalRiskSteam: false,
            chemicalRiskAerosol: false,
            chemicalRiskMist: false,
            chemicalRiskGas: false,
            chemicalRiskOther: 'SAMPLE'
        }
    ],
    jobRiskWithPreventiveMeasure: [
        {
            name: 'SAMPLE',
            activity: 'SAMPLE',
            preventiveMeasure: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            biologicalRiskVirus: false,
            biologicalRiskFungus: false,
            biologicalRiskBacteria: true,
            biologicalRiskParasites: false,
            biologicalRiskExposureToVectors: false,
            biologicalRiskExposureToWildlifeAnimals: true,
            biologicalRiskOther: 'SAMPLE',
            ergonomicRiskManualHandlingLoads: true,
            ergonomicRiskRepetitiveMoves: false,
            ergonomicRiskForcedPostures: true,
            ergonomicRiskWorkWithPvd: false,
            ergonomicRiskOther: 'SAMPLE',
            psychosocialRiskMonotony: false,
            psychosocialRiskWorkOverload: true,
            psychosocialRiskThoroughnessOfTheTask: false,
            psychosocialRiskHighResponsibility: false,
            psychosocialRiskTakingResponsibilityAutonomy: false,
            psychosocialRiskSupervision: true,
            psychosocialRiskRoleConflict: false,
            psychosocialRiskNonFunctionClarify: true,
            psychosocialRiskBadWorkDistribution: false,
            psychosocialRiskRotativeShift: true,
            psychosocialRiskIntrapersonalRelations: true,
            psychosocialRiskJobInstability: false,
            psychosocialRiskOther: 'SAMPLE'
        },
        {
            name: 'SAMPLE',
            activity: 'SAMPLE',
            preventiveMeasure: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            biologicalRiskVirus: true,
            biologicalRiskFungus: true,
            biologicalRiskBacteria: false,
            biologicalRiskParasites: false,
            biologicalRiskExposureToVectors: true,
            biologicalRiskExposureToWildlifeAnimals: false,
            biologicalRiskOther: '',
            ergonomicRiskManualHandlingLoads: true,
            ergonomicRiskRepetitiveMoves: false,
            ergonomicRiskForcedPostures: false,
            ergonomicRiskWorkWithPvd: false,
            ergonomicRiskOther: '',
            psychosocialRiskMonotony: true,
            psychosocialRiskWorkOverload: false,
            psychosocialRiskThoroughnessOfTheTask: true,
            psychosocialRiskHighResponsibility: true,
            psychosocialRiskTakingResponsibilityAutonomy: true,
            psychosocialRiskSupervision: false,
            psychosocialRiskRoleConflict: false,
            psychosocialRiskNonFunctionClarify: false,
            psychosocialRiskBadWorkDistribution: false,
            psychosocialRiskRotativeShift: true,
            psychosocialRiskIntrapersonalRelations: true,
            psychosocialRiskJobInstability: true,
            psychosocialRiskOther: ''
        }
    ],
    extraActivityDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare. Vivamus felis nisi, fermentum placerat felis quis, vestibulum varius neque. Vivamus ullamcorper, ante a pellentesque lacinia, nibh velit sagittis ex, quis rhoncus sem leo ac est. Praesent pulvinar, mi nec tempor tempus, nisl purus luctus enim, in ullamcorper sem arcu nec metus. Sed vulputate nibh sem, eu commodo tortor placerat id. Donec semper lacus id purus posuere, ac efficitur metus molestie. In luctus odio vel ipsum elementum vestibulum. Nunc eleifend elit in tempor cursus. In ut tortor dui. Duis euismod velit vestibulum, feugiat leo ac, tristique arcu. Suspendisse sit amet pellentesque erat, in lobortis purus. Vivamus metus diam, dapibus sodales velit eu, convallis cursus dolor.',
    currentDiseaseDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare. Vivamus felis nisi, fermentum placerat felis quis, vestibulum varius neque. Vivamus ullamcorper, ante a pellentesque lacinia, nibh velit sagittis ex, quis rhoncus sem leo ac est. Praesent pulvinar, mi nec tempor tempus, nisl purus luctus enim, in ullamcorper sem arcu nec metus. Sed vulputate nibh sem, eu commodo tortor placerat id. Donec semper lacus id purus posuere, ac efficitur metus molestie. In luctus odio vel ipsum elementum vestibulum. Nunc eleifend elit in tempor cursus. In ut tortor dui. Duis euismod velit vestibulum, feugiat leo ac, tristique arcu. Suspendisse sit amet pellentesque erat, in lobortis purus. Vivamus metus diam, dapibus sodales velit eu, convallis cursus dolor.',
    reviewOfOrgansSkin: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    reviewOfOrgansSenseOrgans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    reviewOfOrgansBreath: '',
    reviewOfOrgansCardiovascular: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    reviewOfOrgansDigestive: '',
    reviewOfOrgansUrinary: '',
    reviewOfOrgansSkeletalMuscle: '',
    reviewOfOrgansEndocrinic: '',
    reviewOfOrgansHemoLymphatic: '',
    reviewOfOrgansHighlyStrung: '',
    vitalSignsBloodPressure: 0,
    vitalSignsTemperature: 45,
    vitalSignsHeartRate: 45,
    vitalSignsOxygenSaturation: 0,
    vitalSignsRespiratoryRate: 0,
    vitalSignsWeight: 45,
    vitalSignsSize: 0,
    vitalSignsMassIndex: 45,
    vitalSignsAbdominalPerimeter: 45,
    examSkinScar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examSkinTattoo: '',
    examSkinLesions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyeEyelids: '',
    examEyeConjunctiva: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyePupils: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyeCorneas: '',
    examEyeMotility: '',
    examEarAuditoryExternal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEarAuricle: '',
    examEarEardrum: '',
    examPharynxLips: '',
    examPharynxTongue: '',
    examPharynxPharynx: '',
    examPharynxTonsils: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examPharynxTeeth: '',
    examNosePartition: '',
    examNoseTurbinates: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNoseMucousMembranes: '',
    examNoseParanasalSinuses: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNeckThyroid: '',
    examNeckMobility: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examChestBreast: '',
    examChestHeart: '',
    examChestLungs: '',
    examChestRibCage: '',
    examAbdomenViscera: '',
    examAbdomenAbdominalWall: '',
    examColumnFlexibility: '',
    examColumnDeviation: '',
    examColumnPain: '',
    examPelvis: '',
    examPelvisGenitals: '',
    examLimbVascular: '',
    examLimbUpper: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examLimbLower: '',
    examNeurologicForce: '',
    examNeurologicSensitivity: '',
    examNeurologicGait: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNeurologicReflex: '',
    generalExamResults: [
        {
            date: new Date("2025-03-15T19:46:43.719Z"),
            exam: 'SAMPLE',
            result: 'SAMPLE'
        },
        {
            date: new Date("2025-03-15T19:46:43.719Z"),
            exam: 'SAMPLE',
            result: 'SAMPLE'
        }
    ],
    generalExamObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare. Vivamus felis nisi, fermentum placerat felis quis, vestibulum varius neque. Vivamus ullamcorper, ante a pellentesque lacinia, nibh velit sagittis ex, quis rhoncus sem leo ac est. Praesent pulvinar, mi nec tempor tempus, nisl purus luctus enim, in ullamcorper sem arcu nec metus. Sed vulputate nibh sem, eu commodo tortor placerat id. Donec semper lacus id purus posuere, ac efficitur metus molestie. In luctus odio vel ipsum elementum vestibulum. Nunc eleifend elit in tempor cursus. In ut tortor dui. Duis euismod velit vestibulum, feugiat leo ac, tristique arcu. Suspendisse sit amet pellentesque erat, in lobortis purus. Vivamus metus diam, dapibus sodales velit eu, convallis cursus dolor',
    diagnostics: [
        {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cie: 'CIE',
            pre: true,
            def: true
        },
        {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cie: 'CIE',
            pre: false,
            def: true
        },
        {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cie: 'CIE',
            pre: true,
            def: false
        },
        {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            cie: 'CIE',
            pre: false,
            def: false
        }
    ],
    medicalFitnessType: 'fit',
    medicalFitnessLimitation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare. Vivamus felis nisi, fermentum placerat felis quis, vestibulum varius neque. Vivamus ullamcorper, ante a pellentesque lacinia, nibh velit sagittis ex, quis rhoncus sem leo ac est. Praesent pulvinar, mi nec tempor tempus, nisl purus luctus enim, in ullamcorper sem arcu nec metus. Sed vulputate nibh sem, eu commodo tortor placerat id. Donec semper lacus id purus posuere, ac efficitur metus molestie. In luctus odio vel ipsum elementum vestibulum. Nunc eleifend elit in tempor cursus. In ut tortor dui. Duis euismod velit vestibulum, feugiat leo ac, tristique arcu. Suspendisse sit amet pellentesque erat, in lobortis purus. Vivamus metus diam, dapibus sodales velit eu, convallis cursus dolor.',
    medicalFitnessObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare. Vivamus felis nisi, fermentum placerat felis quis, vestibulum varius neque. Vivamus ullamcorper, ante a pellentesque lacinia, nibh velit sagittis ex, quis rhoncus sem leo ac est. Praesent pulvinar, mi nec tempor tempus, nisl purus luctus enim, in ullamcorper sem arcu nec metus. Sed vulputate nibh sem, eu commodo tortor placerat id. Donec semper lacus id purus posuere, ac efficitur metus molestie. In luctus odio vel ipsum elementum vestibulum. Nunc eleifend elit in tempor cursus. In ut tortor dui. Duis euismod velit vestibulum, feugiat leo ac, tristique arcu. Suspendisse sit amet pellentesque erat, in lobortis purus. Vivamus metus diam, dapibus sodales velit eu, convallis cursus dolor.',
    recommendationDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel dolor id diam pretium ornare. Vivamus felis nisi, fermentum placerat felis quis, vestibulum varius neque. Vivamus ullamcorper, ante a pellentesque lacinia, nibh velit sagittis ex, quis rhoncus sem leo ac est. Praesent pulvinar, mi nec tempor tempus, nisl purus luctus enim, in ullamcorper sem arcu nec metus. Sed vulputate nibh sem, eu commodo tortor placerat id. Donec semper lacus id purus posuere, ac efficitur metus molestie. In luctus odio vel ipsum elementum vestibulum. Nunc eleifend elit in tempor cursus. In ut tortor dui. Duis euismod velit vestibulum, feugiat leo ac, tristique arcu. Suspendisse sit amet pellentesque erat, in lobortis purus. Vivamus metus diam, dapibus sodales velit eu, convallis cursus dolor.',
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
    const patientFirstName = patient.patientName.split(' ')[0] ?? '';
    const patientMiddleName = patient.patientName.split(' ')[1] ?? '';
    const patientLastName = patient.patientLastname.split(' ')[0] ?? '';
    const patientSecondLastName = patient.patientLastname.split(' ')[1] ?? '';
    const patientAge = dayjs().diff(patient.patientBirthday, 'year');

    return (
        <>
            <ReturnableHeader title='Ficha inicial' />
            <StepperInitialRecordForm
                headers={[
                    { title: 'Datos del establecimiento', description: 'Empresa y Usuario', icon: 'building' },
                    { title: 'Motivo de la consulta', icon: 'license' },
                    { title: 'Antecedentes personales', description: 'Antecedentes Clinicos y Quirúrgicos', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Antecedentes Gineco Obstreicos', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Antecedentes Reproductivos Masculinos', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Habitos Toxicos', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Estilo de vida', icon: 'user-check' },
                    { title: 'Antecedentes de Trabajo', description: 'Antecedentes de Empleos Anteriores', icon: 'briefcase' },
                    { title: 'Antecedentes de Trabajo', description: 'Accidentes de Trabajo', icon: 'briefcase' },
                    { title: 'Antecedentes de Trabajo', description: 'Enfermedades Profesionales', icon: 'briefcase' },
                    { title: 'Antecedentes Familiares', icon: 'tree' },
                    { title: 'Factores de Riesgos del Trabajo Actual', description: 'Riesgos', icon: 'risk' },
                    { title: 'Factores de Riesgos del Trabajo Actual', description: 'Riesgos con medidas preventivas', icon: 'risk' },
                    { title: 'Actividades Extra Laborales', icon: 'activity' },
                    { title: 'Enfermedad Actual', icon: 'disease' },
                    { title: 'Revision Actual de Organos y Sistemas', icon: 'heart' },
                    { title: 'Constantes Vitales y Antropometria', icon: 'heart' },
                    { title: 'Examen Fisico Regional', description: 'Regiones', icon: 'heart' },
                    { title: 'Resultados de Examenes Generales y Especificos', description: 'Regiones', icon: 'notebook' },
                    { title: 'Diagnostico', icon: 'notebook' },
                    { title: 'Aptitud Medical para el Trabajo', icon: 'notebook' },
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
                    patientAge: patientAge
                }}>
                <InitialInstitutionForm options={corporativeOptions} />
                <MedicalConsultationForm />
                <MedicalAndSurgicalHistoryForm />
                <InitialGynecologicalForm />
                <IntialMaleReproductionForm />
                <ToxicHabitsForm />
                <LifestyleForm />
                <InitialJobHistoryForm />
                <JobAccidentForm />
                <OccupationalDiseaseForm />
                <FamilyHistoryForm />
                <InitialJobRiskForm />
                <InitialJobRiskPreventiveForm />
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
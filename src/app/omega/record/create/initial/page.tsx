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
import GeneralExamResultForm from '@/components/record/general-exam-result-form';
import MedicalDiagnosticForm from '@/components/record/medical-diagnostic-form';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import RecommendationForm from '@/components/record/recommendation-form';
import ToxicHabitsForm from '@/components/record/toxic-habits-form';
import LifestyleForm from '@/components/record/lifestyle-form';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';

const testData: InitialRecordPayload = {
    patientFirstName: "sample",
    patientMiddleName: " ",
    patientLastName: "sample",
    patientSecondLastName: " ",
    patientGender: "male",
    patientAge: 1,
    companyName: "COLEGIO MENOR",
    companyRUC: "1791754794001",
    companyCIU: "CIU",
    institutionHealthFacility: "Omega Salud Ocupacional",
    patientReligion: "catholic",
    patientOtherReligion: "",
    patientBloodType: "A+",
    patientLaterality: "SAMPLE",
    patientSexualOrientation: "lesbian",
    patientGenderIdentity: "male",
    patientDisabilityType: "SAMPLE",
    patientDisabilityPercent: 0.01,
    jobStartDate: new Date("2025-03-21T13:27:30.500Z"),
    jobPosition: "SAMPLE",
    jobArea: "SAMPLE",
    jobActivity: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    medicalConsultationDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    medicalAndSurgicalHistory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    gynecologicalMenarche: "SAMPLE",
    gynecologicalCycle: "SAMPLE",
    gynecologicalLastMenstruationDate: new Date("2025-03-21T13:28:02.296Z"),
    gynecologicalDeeds: 0,
    gynecologicalBirths: 45,
    gynecologicalCesarean: 45,
    gynecologicalAbortions: 45,
    gynecologicalDeadChildren: 45,
    gynecologicalLivingChildren: 45,
    gynecologicalSexualLife: true,
    gynecologicalFamilyPlanningType: "SAMPLE",
    gynecologicalExamPapanicolau: {
        done: true,
        result: "SAMPLE",
        time: 45
    },
    gynecologicalExamColposcopy: {
        done: true,
        result: "SAMPLE",
        time: 45
    },
    gynecologicalExamBreastEcho: {
        done: false,
        result: "",
        time: 0
    },
    gynecologicalExamMammography: {
        done: false,
        result: "",
        time: 0
    },
    maleReproductiveFamilyPlanningType: "SAMPLE",
    maleReproductiveExamProstateAntigen: {
        done: false,
        result: "",
        time: 0
    },
    maleReproductiveExamProstateEcho: {
        done: true,
        result: "SAMPLE",
        time: 45
    },
    maleReproductiveDeadChildren: 45,
    maleReproductiveLivingChildren: 45,
    toxicHabitTobacco: {
        consumer: true,
        consumed: true,
        consumptionTime: 45,
        other: "",
        quantity: 45,
        timeOfAbstinence: 45
    },
    toxicHabitAlcohol: {
        consumer: false,
        consumed: false,
        consumptionTime: 0,
        other: "",
        quantity: 1,
        timeOfAbstinence: 0
    },
    toxicHabitOther: {
        consumer: true,
        consumed: false,
        consumptionTime: 45,
        other: "SAMPLE",
        quantity: 45,
        timeOfAbstinence: 45
    },
    lifestylePhysicalActivityActive: true,
    lifestylePhysicalActivityType: "SAMPLE",
    lifestylePhysicalActivityDuration: 45,
    lifestyleMedicationTaking: true,
    lifestyleMedicationName: "SAMPLE",
    lifestyleMedicationQuantity: 45,
    jobHistory: [
        {
            lastJobActivity: "SAMPLE",
            lastJobCompany: "SAMPLE",
            lastJobPosition: "SAMPLE",
            lastJobTime: 45,
            lastJobRiskPhysical: true,
            lastJobRiskMechanical: true,
            lastJobRiskChemical: true,
            lastJobRiskBiological: false,
            lastJobRiskErgonomic: true,
            lastJobRiskPsychosocial: false,
            lastJobObservation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ],
    jobAccidentHappened: true,
    jobAccidentDate: new Date("2025-03-21T13:29:27.890Z"),
    jobAccidentDescription: "SAMPLE",
    jobAccidentObservation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    occupationalDiseaseHappened: true,
    occupationalDiseaseDate: new Date("2025-03-21T13:29:45.474Z"),
    occupationalDiseaseDescription: "SAMPLE",
    occupationalDiseaseObservation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    familyHistoryCardioVascular: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    familyHistoryMetabolic: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    familyHistoryNeurologic: "",
    familyHistoryOncologic: "",
    familyHistoryInfectious: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    familyHistoryHereditary: "",
    familyHistoryDisability: "",
    familyHistoryOther: "",
    jobRisks: [
        {
            name: "SAMPLE",
            activity: "SAMPLE",
            physicalRiskHighTemperature: true,
            physicalRiskLowTemperature: true,
            physicalRiskIonicRadiation: false,
            physicalRiskNonIonicRadiation: true,
            physicalRiskNoise: false,
            physicalRiskVibration: false,
            physicalRiskIllumination: true,
            physicalRiskVentilation: true,
            physicalRiskElectricFluid: true,
            physicalRiskOther: "SAMPLE",
            mechanicRiskEntrapmentBetweenMachines: true,
            mechanicRiskTrappingBetweenSurfaces: true,
            mechanicRiskEntrapmentBetweenObjects: true,
            mechanicRiskObjectFalling: false,
            mechanicRiskSameLevelFalling: false,
            mechanicRiskDifferentLevelFalling: false,
            mechanicRiskElectricContact: false,
            mechanicRiskSurfacesContact: true,
            mechanicRiskParticlesProjection: false,
            mechanicRiskFluidProjection: true,
            mechanicRiskJab: true,
            mechanicRiskCut: false,
            mechanicRiskHitByVehicles: false,
            mechanicRiskVehicleCollision: false,
            mechanicRiskOther: "SAMPLE",
            chemicalRiskSolid: true,
            chemicalRiskDust: true,
            chemicalRiskSmoke: false,
            chemicalRiskLiquid: false,
            chemicalRiskSteam: true,
            chemicalRiskAerosol: true,
            chemicalRiskMist: false,
            chemicalRiskGas: false,
            chemicalRiskOther: "SAMPLE"
        }
    ],
    jobRiskWithPreventiveMeasure: [
        {
            name: "SAMPLE",
            activity: "SAMPLE",
            preventiveMeasure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
            biologicalRiskVirus: true,
            biologicalRiskFungus: false,
            biologicalRiskBacteria: true,
            biologicalRiskParasites: true,
            biologicalRiskExposureToVectors: true,
            biologicalRiskExposureToWildlifeAnimals: true,
            biologicalRiskOther: "SAMPLE",
            ergonomicRiskManualHandlingLoads: true,
            ergonomicRiskRepetitiveMoves: true,
            ergonomicRiskForcedPostures: false,
            ergonomicRiskWorkWithPvd: true,
            ergonomicRiskOther: "SAMPLE",
            psychosocialRiskMonotony: false,
            psychosocialRiskWorkOverload: false,
            psychosocialRiskThoroughnessOfTheTask: true,
            psychosocialRiskHighResponsibility: false,
            psychosocialRiskTakingResponsibilityAutonomy: true,
            psychosocialRiskSupervision: true,
            psychosocialRiskRoleConflict: false,
            psychosocialRiskNonFunctionClarify: true,
            psychosocialRiskBadWorkDistribution: true,
            psychosocialRiskRotativeShift: false,
            psychosocialRiskIntrapersonalRelations: true,
            psychosocialRiskJobInstability: true,
            psychosocialRiskOther: "SAMPLE"
        }
    ],
    extraActivityDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    currentDiseaseDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    reviewOfOrgansSkin: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    reviewOfOrgansSenseOrgans: "",
    reviewOfOrgansBreath: "",
    reviewOfOrgansCardiovascular: "",
    reviewOfOrgansDigestive: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    reviewOfOrgansUrinary: "",
    reviewOfOrgansSkeletalMuscle: "",
    reviewOfOrgansEndocrinic: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    reviewOfOrgansHemoLymphatic: "",
    reviewOfOrgansHighlyStrung: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    vitalSignsBloodPressure: 45,
    vitalSignsTemperature: 0,
    vitalSignsHeartRate: 45,
    vitalSignsOxygenSaturation: 0,
    vitalSignsRespiratoryRate: 0,
    vitalSignsWeight: 45,
    vitalSignsSize: 45,
    vitalSignsMassIndex: 0,
    vitalSignsAbdominalPerimeter: 45,
    examSkinScar: "",
    examSkinTattoo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examSkinLesions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examEyeEyelids: "",
    examEyeConjunctiva: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examEyePupils: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examEyeCorneas: "",
    examEyeMotility: "",
    examEarAuditoryExternal: "",
    examEarAuricle: "",
    examEarEardrum: "",
    examPharynxLips: "",
    examPharynxTongue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examPharynxPharynx: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examPharynxTonsils: "",
    examPharynxTeeth: "",
    examNosePartition: "",
    examNoseTurbinates: "",
    examNoseMucousMembranes: "",
    examNoseParanasalSinuses: "",
    examNeckThyroid: "",
    examNeckMobility: "",
    examChestBreast: "",
    examChestHeart: "",
    examChestLungs: "",
    examChestRibCage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examAbdomenViscera: "",
    examAbdomenAbdominalWall: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examColumnFlexibility: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examColumnDeviation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examColumnPain: "",
    examPelvis: "",
    examPelvisGenitals: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examLimbVascular: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examLimbUpper: "",
    examLimbLower: "",
    examNeurologicForce: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examNeurologicSensitivity: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    examNeurologicGait: "",
    examNeurologicReflex: "",
    generalExamResults: [
        {
            date: new Date("2025-03-21T13:27:30.175Z"),
            exam: "SAMPLE",
            result: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ],
    generalExamObservation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
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
    medicalFitnessType: "fit",
    medicalFitnessLimitation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    medicalFitnessObservation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam.",
    recommendationDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nisi, bibendum sed ornare nec, sodales sed elit. Pellentesque ac enim non purus blandit volutpat sed id sapien. Nunc vehicula nunc nisl, ac tincidunt dui congue non. Proin auctor nibh et sem feugiat ultrices. Morbi porta, ligula nec euismod tincidunt, velit ipsum venenatis ex, molestie molestie velit magna vitae libero. Mauris aliquet finibus nibh quis tincidunt. Etiam vitae neque diam. Donec sit amet quam gravida, laoreet nisl quis, posuere elit. Quisque commodo ut massa sit amet posuere. Ut gravida sollicitudin massa id fringilla. Fusce vel cursus est, vitae varius risus. Nunc vitae pellentesque quam."
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
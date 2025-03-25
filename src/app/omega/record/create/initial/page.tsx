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
    patientFirstName: 'sample',
    patientMiddleName: ' ',
    patientLastName: 'sample',
    patientSecondLastName: ' ',
    patientGender: 'male',
    patientAge: 1,
    companyName: 'FABRICABLES S.A.',
    companyRUC: '1790312518001',
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
    jobStartDate: new Date("2025-03-25T19:20:26.002Z"),
    jobPosition: 'SAMPLE',
    jobArea: 'SAMPLE',
    jobActivity: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    medicalConsultationDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    medicalAndSurgicalHistory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    gynecologicalMenarche: 'SAMPLE',
    gynecologicalCycle: 'SAMPLE',
    gynecologicalLastMenstruationDate: new Date("2025-03-25T19:21:05.128Z"),
    gynecologicalDeeds: 0,
    gynecologicalBirths: 45,
    gynecologicalCesarean: 45,
    gynecologicalAbortions: 45,
    gynecologicalDeadChildren: 45,
    gynecologicalLivingChildren: 0,
    gynecologicalSexualLife: true,
    gynecologicalFamilyPlanningType: 'SAMPLE',
    gynecologicalExamPapanicolau: { done: true, result: 'SAMPLE', time: 45 },
    gynecologicalExamColposcopy: { done: false, result: '', time: 0 },
    gynecologicalExamBreastEcho: { done: false, result: '', time: 0 },
    gynecologicalExamMammography: { done: true, result: 'SAMPLE', time: 45 },
    maleReproductiveFamilyPlanningType: 'SAMPLE',
    maleReproductiveExamProstateAntigen: { done: true, result: 'SAMPLE', time: 45 },
    maleReproductiveExamProstateEcho: { done: true, result: 'SAMPLE', time: 45 },
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
        consumed: true,
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
            lastJobRiskPhysical: true,
            lastJobRiskMechanical: false,
            lastJobRiskChemical: true,
            lastJobRiskBiological: true,
            lastJobRiskErgonomic: false,
            lastJobRiskPsychosocial: true,
            lastJobObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            lastJobActivity: 'SAMPLE',
            lastJobCompany: 'SAMPLE',
            lastJobPosition: 'SAMPLE',
            lastJobTime: 45,
            lastJobRiskPhysical: true,
            lastJobRiskMechanical: true,
            lastJobRiskChemical: true,
            lastJobRiskBiological: true,
            lastJobRiskErgonomic: false,
            lastJobRiskPsychosocial: false,
            lastJobObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ],
    jobAccidentHappened: true,
    jobAccidentDate: new Date("2025-03-25T19:23:08.745Z"),
    jobAccidentDescription: 'SAMPLE',
    jobAccidentObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.\n' +
        '\n',
    occupationalDiseaseHappened: true,
    occupationalDiseaseDate: new Date("2025-03-25T19:23:18.014Z"),
    occupationalDiseaseDescription: 'SAMPLE',
    occupationalDiseaseObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.\n',
    familyHistoryCardioVascular: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    familyHistoryMetabolic: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    familyHistoryNeurologic: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    familyHistoryOncologic: '',
    familyHistoryInfectious: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    familyHistoryHereditary: '',
    familyHistoryDisability: '',
    familyHistoryOther: '',
    jobRisks: [
        {
            name: 'SAMPLE',
            activity: 'SAMPLE',
            physicalRiskHighTemperature: true,
            physicalRiskLowTemperature: true,
            physicalRiskIonicRadiation: true,
            physicalRiskNonIonicRadiation: true,
            physicalRiskNoise: false,
            physicalRiskVibration: false,
            physicalRiskIllumination: false,
            physicalRiskVentilation: false,
            physicalRiskElectricFluid: false,
            physicalRiskOther: 'SAMPLE',
            mechanicRiskEntrapmentBetweenMachines: false,
            mechanicRiskTrappingBetweenSurfaces: false,
            mechanicRiskEntrapmentBetweenObjects: true,
            mechanicRiskObjectFalling: true,
            mechanicRiskSameLevelFalling: true,
            mechanicRiskDifferentLevelFalling: true,
            mechanicRiskElectricContact: true,
            mechanicRiskSurfacesContact: true,
            mechanicRiskParticlesProjection: false,
            mechanicRiskFluidProjection: false,
            mechanicRiskJab: false,
            mechanicRiskCut: true,
            mechanicRiskHitByVehicles: true,
            mechanicRiskVehicleCollision: true,
            mechanicRiskOther: 'SAMPLE',
            chemicalRiskSolid: true,
            chemicalRiskDust: true,
            chemicalRiskSmoke: false,
            chemicalRiskLiquid: false,
            chemicalRiskSteam: true,
            chemicalRiskAerosol: true,
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
            biologicalRiskVirus: true,
            biologicalRiskFungus: true,
            biologicalRiskBacteria: true,
            biologicalRiskParasites: true,
            biologicalRiskExposureToVectors: false,
            biologicalRiskExposureToWildlifeAnimals: false,
            biologicalRiskOther: 'SAMPLE',
            ergonomicRiskManualHandlingLoads: false,
            ergonomicRiskRepetitiveMoves: true,
            ergonomicRiskForcedPostures: true,
            ergonomicRiskWorkWithPvd: true,
            ergonomicRiskOther: 'SAMPLE',
            psychosocialRiskMonotony: false,
            psychosocialRiskWorkOverload: false,
            psychosocialRiskThoroughnessOfTheTask: false,
            psychosocialRiskHighResponsibility: false,
            psychosocialRiskTakingResponsibilityAutonomy: false,
            psychosocialRiskSupervision: true,
            psychosocialRiskRoleConflict: true,
            psychosocialRiskNonFunctionClarify: true,
            psychosocialRiskBadWorkDistribution: true,
            psychosocialRiskRotativeShift: true,
            psychosocialRiskIntrapersonalRelations: true,
            psychosocialRiskJobInstability: true,
            psychosocialRiskOther: 'SAMPLE'
        }
    ],
    extraActivityDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    currentDiseaseDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    reviewOfOrgansSkin: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    reviewOfOrgansSenseOrgans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    reviewOfOrgansBreath: '',
    reviewOfOrgansCardiovascular: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    reviewOfOrgansDigestive: '',
    reviewOfOrgansUrinary: '',
    reviewOfOrgansSkeletalMuscle: '',
    reviewOfOrgansEndocrinic: '',
    reviewOfOrgansHemoLymphatic: '',
    reviewOfOrgansHighlyStrung: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    vitalSignsBloodPressure: 45,
    vitalSignsTemperature: 45,
    vitalSignsHeartRate: 45,
    vitalSignsOxygenSaturation: 45,
    vitalSignsRespiratoryRate: 45,
    vitalSignsWeight: 45,
    vitalSignsSize: 45,
    vitalSignsMassIndex: 45,
    vitalSignsAbdominalPerimeter: 45,
    examSkinScar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examSkinTattoo: '',
    examSkinLesions: '',
    examEyeEyelids: '',
    examEyeConjunctiva: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyePupils: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyeCorneas: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyeMotility: '',
    examEarAuditoryExternal: '',
    examEarAuricle: '',
    examEarEardrum: '',
    examPharynxLips: '',
    examPharynxTongue: '',
    examPharynxPharynx: '',
    examPharynxTonsils: '',
    examPharynxTeeth: '',
    examNosePartition: '',
    examNoseTurbinates: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNoseMucousMembranes: '',
    examNoseParanasalSinuses: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNeckThyroid: '',
    examNeckMobility: '',
    examChestBreast: '',
    examChestHeart: '',
    examChestLungs: '',
    examChestRibCage: '',
    examAbdomenViscera: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examAbdomenAbdominalWall: '',
    examColumnFlexibility: '',
    examColumnDeviation: '',
    examColumnPain: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examPelvis: '',
    examPelvisGenitals: '',
    examLimbVascular: '',
    examLimbUpper: '',
    examLimbLower: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNeurologicForce: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNeurologicSensitivity: '',
    examNeurologicGait: '',
    examNeurologicReflex: '',
    generalExamResults: [
        {
            date: new Date("2025-03-25T19:20:25.792Z"),
            exam: 'SAMPLE',
            result: 'SAMPLE'
        }
    ],
    generalExamObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
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
            pre: true,
            def: false
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
            pre: false,
            def: false
        }
    ],
    medicalFitnessType: 'fit',
    medicalFitnessLimitation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    medicalFitnessObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    recommendationDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
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
import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import StepperPeriodicRecordForm from './_components/stepper-periodic-record-form';
import { retriveCorporativesOptions } from '@/server';
import { CorporativeOption } from '@/server/corporative/server-types';
import { retriveClientByDni } from '@/server';
import PeriodicInstitutionForm from './_components/periodic-institution-form';
import PreviewPeriodicRecord from './_components/preview-periodic-record';
import MedicalAndSurgicalHistoryForm from '@/components/record/medical-and-surgical-history-form';
import ToxicHabitsForm from '@/components/record/toxic-habits-form';
import LifestyleForm from '@/components/record/lifestyle-form';
import IncidentForm from '@/components/record/incident-form';
import JobAccidentForm from '@/components/record/job-accident-form';
import OccupationalDiseaseForm from '@/components/record/occupational-diseases-form';
import FamilyHistoryForm from '@/components/record/family-history-form';
import PeriodicJobRiskForm from './_components/periodic-job-risk-form';
import CurrentDiseaseForm from '@/components/record/current-disease-form';
import ReviewOfOrgansAndSystemForm from '@/components/record/review-of-organs-and-system-form';
import VitalSignsAndAnthropometryForm from '@/components/record/vital-signs-and-anthropometry-form';
import PhysicalRegionalExamForm from '@/components/record/physical-regional-exam-form';
import GeneralExamResultForm from '@/components/record/general-exam-result-form';
import MedicalDiagnosticForm from '@/components/record/medical-diagnostic-form';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import RecommendationForm from '@/components/record/recommendation-form';
import { PeriodicRecordPayload } from '@/server/record/create-record/periodic-record';
import { PERIODIC_MEDICAL_CONSULTATION } from './_libs/constants';

const defaultValues: Partial<PeriodicRecordPayload> = {
    companyName: "ENVAGRIF",
    companyRUC: "1724317191001",
    companyCIIU: "",
    institutionHealthFacility: "Omega Salud Ocupacional",
    patientFirstName: "MARIO",
    patientMiddleName: "ALFONSO",
    patientLastName: "NOBOA",
    patientSecondLastName: "CORONEL",
    patientGender: "male",
    jobPosition: "SAMPLE",
    medicalAndSurgicalHistory: "APP:\n\nAPQ:\n\nALERGIAS:",
    toxicHabitTobacco: {
        haveConsume: false,
        name: "Tobacco",
        consumptionTime: 0,
        quantity: 0,
        isExConsumer: false,
        timeOfAbstinence: 0
    },
    toxicHabitAlcohol: {
        haveConsume: false,
        name: "Alcohol",
        consumptionTime: 0,
        quantity: 0,
        isExConsumer: false,
        timeOfAbstinence: 0
    },
    toxicHabitOther: {
        haveConsume: true,
        name: "SAMPLE",
        consumptionTime: 1213,
        quantity: 1213,
        isExConsumer: true,
        timeOfAbstinence: 1
    },
    lifestylePhysicalActivity: true,
    lifestylePhysicalActivityType: "SAMPLE",
    lifestylePhysicalActivityTimeQty: "SAMPLE",
    lifestyleMedication: false,
    lifestyleMedicationName: "",
    lifestyleMedicationTimeQty: "",
    incidentDescription: "SAMPLE",
    jobAccidentHappened: false,
    jobAccidentDate: new Date("2025-05-28T22:36:35.831Z"),
    jobAccidentDescription: "",
    jobAccidentObservation: "SAMPLE",
    occupationalDiseaseHappened: true,
    occupationalDiseaseDescription: "OMEGA",
    occupationalDiseaseDate: new Date("2025-05-28T22:37:34.592Z"),
    occupationalDiseaseObservation: "SAMPLE",
    familyHistoryCardioVascular: "SAMPLE 1",
    familyHistoryMetabolic: "",
    familyHistoryNeurologic: "",
    familyHistoryOncologic: "",
    familyHistoryInfectious: "SAMPLE 2",
    familyHistoryHereditary: "",
    familyHistoryDisability: "SAMPLE 3",
    familyHistoryOther: "",
    jobRisks: [
        {
            name: "SAMPLE",
            activity: "SAMPLE",
            months: 1,
            preventiveMeasure: "SAMPLE",
            physicalRiskHighTemperature: false,
            physicalRiskLowTemperature: false,
            physicalRiskIonicRadiation: false,
            physicalRiskNonIonicRadiation: false,
            physicalRiskNoise: false,
            physicalRiskVibration: false,
            physicalRiskIllumination: false,
            physicalRiskVentilation: false,
            physicalRiskElectricFluid: false,
            physicalRiskOther: false,
            mechanicRiskEntrapmentBetweenMachines: false,
            mechanicRiskTrappingBetweenSurfaces: true,
            mechanicRiskEntrapmentBetweenObjects: true,
            mechanicRiskObjectFalling: true,
            mechanicRiskSameLevelFalling: true,
            mechanicRiskDifferentLevelFalling: false,
            mechanicRiskElectricContact: false,
            mechanicRiskSurfacesContact: false,
            mechanicRiskParticlesProjection: false,
            mechanicRiskFluidProjection: false,
            mechanicRiskJab: false,
            mechanicRiskCut: false,
            mechanicRiskHitByVehicles: false,
            mechanicRiskVehicleCollision: false,
            mechanicRiskOther: false,
            chemicalRiskSolid: false,
            chemicalRiskDust: false,
            chemicalRiskSmoke: false,
            chemicalRiskLiquid: false,
            chemicalRiskSteam: false,
            chemicalRiskAerosol: false,
            chemicalRiskMist: false,
            chemicalRiskGas: false,
            chemicalRiskOther: false,
            biologicalRiskVirus: false,
            biologicalRiskFungus: true,
            biologicalRiskBacteria: false,
            biologicalRiskParasites: false,
            biologicalRiskExposureToVectors: false,
            biologicalRiskExposureToWildlifeAnimals: false,
            biologicalRiskOther: false,
            ergonomicRiskManualHandlingLoads: true,
            ergonomicRiskRepetitiveMoves: false,
            ergonomicRiskForcedPostures: false,
            ergonomicRiskWorkWithPvd: false,
            ergonomicRiskOther: false,
            psychosocialRiskMonotony: false,
            psychosocialRiskWorkOverload: false,
            psychosocialRiskThoroughnessOfTheTask: false,
            psychosocialRiskHighResponsibility: true,
            psychosocialRiskTakingResponsibilityAutonomy: false,
            psychosocialRiskSupervision: false,
            psychosocialRiskRoleConflict: false,
            psychosocialRiskNonFunctionClarify: false,
            psychosocialRiskBadWorkDistribution: false,
            psychosocialRiskRotativeShift: false,
            psychosocialRiskIntrapersonalRelations: false,
            psychosocialRiskJobInstability: false,
            psychosocialRiskOther: false
        }
    ],
    currentDiseaseDescription: "",
    reviewOfOrgansSkin: "SAMPLE",
    reviewOfOrgansSenseOrgans: "SAMPLE",
    reviewOfOrgansBreath: "",
    reviewOfOrgansCardiovascular: "",
    reviewOfOrgansDigestive: "",
    reviewOfOrgansUrinary: "",
    reviewOfOrgansSkeletalMuscle: "",
    reviewOfOrgansEndocrinic: "",
    reviewOfOrgansHemoLymphatic: "",
    reviewOfOrgansHighlyStrung: "",
    vitalSignsBloodPressure: "10",
    vitalSignsTemperature: "10",
    vitalSignsHeartRate: "10",
    vitalSignsOxygenSaturation: "10",
    vitalSignsRespiratoryRate: "10",
    vitalSignsWeight: "10",
    vitalSignsSize: "10",
    vitalSignsMassIndex: "10",
    vitalSignsAbdominalPerimeter: "10",
    examSkinScar: "",
    examSkinTattoo: "SAMPLE",
    examSkinLesions: "",
    examEyeEyelids: "",
    examEyeConjunctiva: "",
    examEyePupils: "",
    examEyeCorneas: "",
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
    examNoseTurbinates: "",
    examNoseMucousMembranes: "",
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
    examColumnPain: "",
    examPelvis: "",
    examPelvisGenitals: "",
    examLimbVascular: "",
    examLimbUpper: "",
    examLimbLower: "",
    examNeurologicForce: "",
    examNeurologicSensitivity: "",
    examNeurologicGait: "",
    examNeurologicReflex: "",
    generalExamResults: [
        {
            date: new Date("2025-05-28T22:46:58.805Z"),
            exam: "SAMPLE",
            result: "SAMPLE"
        }
    ],
    generalExamObservation: "SAMPLE",
    diagnostics: [
        {
            description: "SAMPLE",
            cie: "CIE",
            flag: "pre"
        }
    ],
    medicalFitnessType: "fit",
    medicalFitnessLimitation: "",
    medicalFitnessObservation: "",
    recommendationDescription: "SAMPLE"
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
                    { title: 'Antecedentes personales', description: 'Antecedentes Clinicos y Quirúrgicos', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Habitos Toxicos', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Estilo de vida', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Incidentes', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Antecedentes de Empleos Anteriores', icon: 'briefcase' },
                    { title: 'Antecedentes personales', description: 'Accidentes de Trabajo', icon: 'briefcase' },
                    { title: 'Antecedentes Familiares', icon: 'tree' },
                    { title: 'Factores de Riesgos del Trabajo Actual', description: 'Riesgos', icon: 'risk' },
                    { title: 'Enfermedad Actual', icon: 'disease' },
                    { title: 'Revision Actual de Organos y Sistemas', icon: 'heart' },
                    { title: 'Constantes Vitales y Antropometria', icon: 'heart' },
                    { title: 'Examen Fisico Regional', description: 'Regiones', icon: 'heart' },
                    { title: 'Resultados de Examenes Generales y Especificos', description: 'Regiones', icon: 'notebook' },
                    { title: 'M. Diagnostico', icon: 'notebook' },
                    { title: 'N. Aptitud Medical para el Trabajo', icon: 'notebook' },
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
                    medicalConsultationDescription: PERIODIC_MEDICAL_CONSULTATION,
                    ...defaultValues
                }}>
                <PeriodicInstitutionForm options={corporativeOptions} />
                <MedicalAndSurgicalHistoryForm />
                <ToxicHabitsForm />
                <LifestyleForm />
                <IncidentForm />
                <JobAccidentForm />
                <OccupationalDiseaseForm />
                <FamilyHistoryForm />
                <PeriodicJobRiskForm />
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
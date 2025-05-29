import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import StepperInitialRecordForm from './_components/stepper-inital-record-form';
import PreviewInitialRecord from './_components/preview-initial-record';
import InitialInstitutionForm from './_components/initial-institution-form';
import { retriveCorporativesOptions } from '@/server';
import { CorporativeOption } from '@/server/corporative/server-types';
import { retriveClientByDni } from '@/server';
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
    companyName: "ENVAGRIF",
    companyRUC: "1724317191001",
    companyCIIU: "",
    institutionHealthFacility: "Omega Salud Ocupacional",
    patientFirstName: "MARIO",
    patientMiddleName: "ALFONSO",
    patientLastName: "NOBOA",
    patientSecondLastName: "CORONEL",
    patientGender: "male",
    patientAge: 45,
    patientReligion: "catholic",
    patientBloodType: "A+",
    patientLaterality: "right",
    patientSexualOrientation: "lesbian",
    patientGenderIdentity: "male",
    patientDisabilityType: "",
    patientDisabilityPercent: 1,
    institutionJobStartDate: new Date("2025-05-28T15:23:06.727Z"),
    institutionJobPosition: "SAMPLE",
    institutionJobArea: "SAMPLE",
    institutionJobActivities: "SAMPLE",
    medicalAndSurgicalHistory: "APP: SAMPLE\nAPQ: SAMPLE\nALERGIAS: SAMPLE",
    maleReproductiveFamilyPlanningType: "SAMPLE",
    maleReproductiveExamProstateAntigen: {
        done: true,
        result: "2",
        time: 1
    },
    maleReproductiveExamProstateEcho: {
        done: true,
        result: "A",
        time: 1
    },
    maleReproductiveDeadChildren: 1,
    maleReproductiveLivingChildren: 1,
    toxicHabitTobacco: {
        haveConsume: true,
        name: "Tobacco",
        consumptionTime: 1,
        quantity: 1,
        isExConsumer: false,
        timeOfAbstinence: 0
    },
    toxicHabitAlcohol: {
        haveConsume: false,
        name: "Alcohol",
        consumptionTime: 0,
        quantity: 1,
        isExConsumer: false,
        timeOfAbstinence: 0
    },
    toxicHabitOther: {
        haveConsume: true,
        name: "Sample",
        consumptionTime: 1,
        quantity: 1,
        isExConsumer: true,
        timeOfAbstinence: 1
    },
    lifestylePhysicalActivity: true,
    lifestylePhysicalActivityType: "SAMPLE",
    lifestylePhysicalActivityTimeQty: "SAMPLE",
    lifestyleMedication: true,
    lifestyleMedicationName: "SAMPLE",
    lifestyleMedicationTimeQty: "SAMPLE",
    jobHistory: [
        {
            jobHistoryActivity: "SAMPLE",
            jobHistoryCompany: "SAMPLE",
            jobHistoryPosition: "SAMPLE",
            jobHistoryTime: 1,
            jobHistoryRiskPhysical: true,
            jobHistoryRiskMechanical: false,
            jobHistoryRiskChemical: true,
            jobHistoryRiskBiological: false,
            jobHistoryRiskErgonomic: false,
            jobHistoryRiskPsychosocial: false,
            jobHistoryObservation: "SAMPLE"
        }
    ],
    jobAccidentHappened: true,
    jobAccidentDate: new Date("2025-05-28T16:52:19.024Z"),
    jobAccidentDescription: "OMEGA",
    jobAccidentObservation: "SAMPLE",
    occupationalDiseaseHappened: true,
    occupationalDiseaseDescription: "OMEGA",
    occupationalDiseaseDate: new Date("2025-05-28T16:53:32.863Z"),
    occupationalDiseaseObservation: "",
    familyHistoryCardioVascular: "",
    familyHistoryMetabolic: "SAMPLE 1",
    familyHistoryNeurologic: "",
    familyHistoryOncologic: "SAMPLE 2",
    familyHistoryInfectious: "",
    familyHistoryHereditary: "SAMPLE 3",
    familyHistoryDisability: "",
    familyHistoryOther: "",
    jobRisks: [
        {
            name: "Sample",
            activity: "Sample",
            preventiveMeasure: "Sample",
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
            mechanicRiskOther: false,
            chemicalRiskSolid: false,
            chemicalRiskDust: false,
            chemicalRiskSmoke: false,
            chemicalRiskLiquid: false,
            chemicalRiskSteam: true,
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
            ergonomicRiskForcedPostures: true,
            ergonomicRiskWorkWithPvd: false,
            ergonomicRiskOther: false,
            psychosocialRiskMonotony: false,
            psychosocialRiskWorkOverload: false,
            psychosocialRiskThoroughnessOfTheTask: true,
            psychosocialRiskHighResponsibility: false,
            psychosocialRiskTakingResponsibilityAutonomy: true,
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
    extraActivityDescription: "",
    currentDiseaseDescription: "",
    reviewOfOrgansSkin: "SAMPLE",
    reviewOfOrgansSenseOrgans: "",
    reviewOfOrgansBreath: "",
    reviewOfOrgansCardiovascular: "",
    reviewOfOrgansDigestive: "",
    reviewOfOrgansUrinary: "",
    reviewOfOrgansSkeletalMuscle: "",
    reviewOfOrgansEndocrinic: "",
    reviewOfOrgansHemoLymphatic: "",
    reviewOfOrgansHighlyStrung: "",
    vitalSignsBloodPressure: "10 mmhg",
    vitalSignsTemperature: "1",
    vitalSignsHeartRate: "10",
    vitalSignsOxygenSaturation: "10",
    vitalSignsRespiratoryRate: "10",
    vitalSignsWeight: "10",
    vitalSignsSize: "10",
    vitalSignsMassIndex: "10",
    vitalSignsAbdominalPerimeter: "10",
    examSkinScar: "SAMPLE",
    examSkinTattoo: "",
    examSkinLesions: "",
    examEyeEyelids: "SAMPLE",
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
    examColumnDeviation: "SAMPLE",
    examColumnPain: "",
    examPelvis: "SAMPLE",
    examPelvisGenitals: "SAMPLE",
    examLimbVascular: "",
    examLimbUpper: "SAMPLE",
    examLimbLower: "",
    examNeurologicForce: "SAMPLE",
    examNeurologicSensitivity: "",
    examNeurologicGait: "",
    examNeurologicReflex: "",
    generalExamResults: [
        {
            date: new Date("2025-05-28T19:09:55.841Z"),
            exam: "SAMPLE",
            result: "SAMPLE"
        }
    ],
    generalExamObservation: "",
    diagnostics: [
        {
            description: "SAMPLE",
            cie: "SAMPLE",
            flag: "def"
        }
    ],
    medicalFitnessType: "fit-observation",
    medicalFitnessLimitation: "",
    medicalFitnessObservation: "SAMPLE",
    recommendationDescription: "Sample"
};

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
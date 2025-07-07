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
import { retriveFromTmpStore } from '@/lib/tmp-store/tmp-store.utils';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';
import { parsedInitial } from './_libs/parsed-initial';
import ProfessionalDataForm from '@/components/record/professional-data-form';

const testData: Partial<InitialRecordPayload> = {
    "patientDni": "0602777658",
    "patientFirstName": "MARIO",
    "patientMiddleName": "ALFONSO",
    "patientLastName": "NOBOA",
    "patientSecondLastName": "CORONEL",
    "patientGender": "male",
    "patientAge": 45,
    "medicalConsultationDescription": "Evaluación médica ocupacional para el ingreso al puesto de trabajo",
    "authorDni": "",
    "authorFullname": "",
    "companyName": "EMPRESA ELECTRICA QUITO E.E.Q S.A.",
    "companyRUC": "1790053881001",
    "companyCIIU": "",
    "institutionHealthFacility": "Omega Salud Ocupacional",
    "patientReligion": "catholic",
    "patientBloodType": "ARh+",
    "patientLaterality": "right",
    "patientSexualOrientation": "heterosexual",
    "patientGenderIdentity": "male",
    "patientDisabilityType": "Sample",
    "patientDisabilityPercent": 1,
    "institutionJobStartDate": new Date("2025-07-07T20:31:43.219Z"),
    "institutionJobPosition": "SAMPLE",
    "institutionJobArea": "SAMPLE",
    "institutionJobActivities": "SAMPLE",
    "medicalAndSurgicalHistory": "APP:\n\nAPQ:\n\nALERGIAS:",
    "maleReproductiveFamilyPlanningType": "",
    "maleReproductiveExamProstateAntigen": {
        "done": false,
        "result": "",
        "time": 0
    },
    "maleReproductiveExamProstateEcho": {
        "done": false,
        "result": "",
        "time": 0
    },
    "maleReproductiveDeadChildren": 0,
    "maleReproductiveLivingChildren": 0,
    "toxicHabitTobacco": {
        "haveConsume": false,
    },
    "toxicHabitAlcohol": {
        "haveConsume": false,
    },
    "toxicHabitOther": {
        "haveConsume": false,
    },
    "lifestylePhysicalActivity": false,
    "lifestylePhysicalActivityType": "",
    "lifestylePhysicalActivityTimeQty": "",
    "lifestyleMedication": true,
    "lifestyleMedicationName": "SAMPLE\nSAMPLE\nSAMPLE",
    "lifestyleMedicationTimeQty": "SAMPLE\nSAMPLE\nSAMPLE",
    "jobHistory": [],
    "jobAccidentHappened": false,
    "jobAccidentDate": new Date("2025-07-07T21:21:16.087Z"),
    "jobAccidentDescription": "",
    "jobAccidentObservation": "",
    "occupationalDiseaseHappened": false,
    "occupationalDiseaseDescription": "",
    "occupationalDiseaseDate": new Date("2025-07-07T21:21:17.485Z"),
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
            "name": "SAMPLE",
            "activity": "SAMPLE",
            "preventiveMeasure": "SAMPLE",
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
            "ergonomicRiskRepetitiveMoves": false,
            "ergonomicRiskForcedPostures": false,
            "ergonomicRiskWorkWithPvd": false,
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
    "vitalSignsBloodPressure": "SAMPLE",
    "vitalSignsTemperature": "SAMPLE",
    "vitalSignsHeartRate": "SAMPLE",
    "vitalSignsOxygenSaturation": "SAMPLE",
    "vitalSignsRespiratoryRate": "SAMPLE",
    "vitalSignsWeight": "1",
    "vitalSignsSize": "1",
    "vitalSignsMassIndex": "10000",
    "vitalSignsAbdominalPerimeter": "SAMPLE",
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
    "generalExamResults": [],
    "generalExamObservation": "",
    "diagnostics": [
        {
            "description": "SAMPLE",
            "cie": "SAMPLE",
            "flag": "pre"
        }
    ],
    "medicalFitnessType": "fit",
    "medicalFitnessLimitation": "",
    "medicalFitnessObservation": "",
    "medicalFitnessReubication": "",
    "recommendationDescription": "SAMPLE"
}

interface RecordInitialPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordInitialPage: React.FC<RecordInitialPageProps> = async ({
    searchParams
}) => {
    const patientDni = typeof searchParams.patientDni === 'string' ? searchParams.patientDni : undefined;

    if (!patientDni) return <>Paciente no especificado</>

    const stepperCookieKey: string = `record-initial-${patientDni}`;
    const tmpResult = await retriveFromTmpStore<Partial<InitialRecordPayload>>(stepperCookieKey);
    const initialData: Partial<InitialRecordPayload> = tmpResult.isSuccess ? parsedInitial(tmpResult.value) : {};

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
                    { title: 'Datos del profesional', icon: 'medicine' },
                    { title: 'Datos del establecimiento', description: 'Empresa y usuario', icon: 'building' },
                    { title: 'Antecedentes Personales', description: 'Antecedentes clínicos y quirúrgicos', icon: 'user-check' },
                    (patient.patientGender === 'female'
                        ? { title: 'Antecedentes Personales', description: 'Antecedentes gineco-obstétricos', icon: 'user-check' }
                        : { title: 'Antecedentes Personales', description: 'Antecedentes reproductivos masculinos', icon: 'user-check' }),
                    { title: 'Antecedentes Personales', description: 'Hábitos tóxicos', icon: 'user-check' },
                    { title: 'Antecedentes Personales', description: 'Estilo de vida', icon: 'user-check' },
                    { title: 'Antecedentes de Trabajo', description: 'Antecedentes de empleos anteriores', icon: 'briefcase' },
                    { title: 'Antecedentes de Trabajo', description: 'Accidentes de trabajo', icon: 'briefcase' },
                    { title: 'Antecedentes de Trabajo', description: 'Enfermedades profesionales', icon: 'briefcase' },
                    { title: 'Antecedentes Familiares', icon: 'tree' },
                    { title: 'Factores de riesgo del trabajo actual', icon: 'risk' },
                    { title: 'Actividades Extra Laborales', icon: 'activity' },
                    { title: 'Enfermedad Actual', icon: 'disease' },
                    { title: 'Revisión Actual de Órganos y Sistemas', icon: 'heart' },
                    { title: 'Constantes Vitales y Antropometría', icon: 'heart' },
                    { title: 'Examen Físico Regional', icon: 'heart' },
                    { title: 'Resultados de Exámenes generales y específicos', icon: 'notebook' },
                    { title: 'Diagnóstico', icon: 'notebook' },
                    { title: 'Aptitud médica para el trabajo', icon: 'notebook' },
                    { title: 'Recomendaciones y/o tratamientos', icon: 'notebook' },
                    { title: 'Vista anticipada de la ficha', icon: 'check' },
                ]}
                patientDni={patientDni}
                tmpStoreKey={stepperCookieKey}
                initialData={{
                    ...testData,
                    patientDni: patientDni,
                    patientFirstName: patientFirstName,
                    patientMiddleName: patientMiddleName,
                    patientLastName: patientLastName,
                    patientSecondLastName: patientSecondLastName,
                    patientGender: patient.patientGender,
                    patientAge: patientAge,
                    medicalConsultationDescription: INITIAL_MEDICAL_CONSULTATION,
                    ...initialData
                }}>
                <ProfessionalDataForm />
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
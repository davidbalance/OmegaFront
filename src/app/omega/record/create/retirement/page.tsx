import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveCorporativesOptions } from '@/server/corporative/actions';
import { CorporativeOption } from '@/server/corporative/server_types';
import { retriveClientByDni } from '@/server/medical_client/actions';
import React from 'react'
import StepperRetirementRecordForm from './_components/stepper-retirement-record-form';
import RetirementInstitutionForm from './_components/retirement-institution-form';
import RetirementActivityAndRiskForm from './_components/retirement-activity-and-risk-form';
import MedicalAndSurgicalHistoryForm from '@/components/record/medical-and-surgical-history-form';
import JobAccidentForm from '@/components/record/job-accident-form';
import OccupationalDiseaseForm from '@/components/record/occupational-diseases-form';
import VitalSignsAndAnthropometryForm from '@/components/record/vital-signs-and-anthropometry-form';
import PhysicalRegionalExamForm from '@/components/record/physical-regional-exam-form';
import GeneralExamResultForm from '@/components/record/general-exam-result-form';
import MedicalDiagnosticForm from '@/components/record/medical-diagnostic-form';
import RetirementEvaluationForm from './_components/retirement-evaluation-form';
import RecommendationForm from '@/components/record/recommendation-form';
import PreviewRetirementRecord from './_components/preview-retirement-record';
import { RetirementRecordPayload } from '@/server/record/create-record/retirement-record';

const testData: RetirementRecordPayload = {
    patientFirstName: 'sample',
    patientMiddleName: ' ',
    patientLastName: 'sample',
    patientSecondLastName: ' ',
    patientGender: 'male',
    companyName: 'FABRICABLES S.A.',
    companyRUC: '1790312518001',
    companyCIU: 'CIU',
    institutionHealthFacility: 'Omega Salud Ocupacional',
    workStartDate: new Date("2025-03-25T19:53:49.435Z"),
    workingTime: 0,
    workingEndDate: new Date("2025-03-25T19:53:49.435Z"),
    jobPosition: 'SAMPLE',
    institutionActivities: [
        {
            activity: 'SAMPLE',
            risk: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            activity: 'SAMPLE',
            risk: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            activity: 'SAMPLE',
            risk: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            activity: 'SAMPLE',
            risk: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ],
    medicalAndSurgicalHistory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    jobAccidentHappened: true,
    jobAccidentDate: new Date("2025-03-25T19:54:28.355Z"),
    jobAccidentDescription: 'SAMPLE',
    jobAccidentObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    occupationalDiseaseHappened: true,
    occupationalDiseaseDate: new Date("2025-03-25T19:54:33.598Z"),
    occupationalDiseaseDescription: 'SAMPLE',
    occupationalDiseaseObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    vitalSignsBloodPressure: 45,
    vitalSignsTemperature: 45,
    vitalSignsHeartRate: 0,
    vitalSignsOxygenSaturation: 0,
    vitalSignsRespiratoryRate: 45,
    vitalSignsWeight: 45,
    vitalSignsSize: 45,
    vitalSignsMassIndex: 0,
    vitalSignsAbdominalPerimeter: 45,
    examSkinScar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examSkinTattoo: '',
    examSkinLesions: '',
    examEyeEyelids: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyeConjunctiva: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyePupils: '',
    examEyeCorneas: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyeMotility: '',
    examEarAuditoryExternal: '',
    examEarAuricle: '',
    examEarEardrum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examPharynxLips: '',
    examPharynxTongue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examPharynxPharynx: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examPharynxTonsils: '',
    examPharynxTeeth: '',
    examNosePartition: '',
    examNoseTurbinates: '',
    examNoseMucousMembranes: '',
    examNoseParanasalSinuses: '',
    examNeckThyroid: '',
    examNeckMobility: '',
    examChestBreast: '',
    examChestHeart: '',
    examChestLungs: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examChestRibCage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examAbdomenViscera: '',
    examAbdomenAbdominalWall: '',
    examColumnFlexibility: '',
    examColumnDeviation: '',
    examColumnPain: '',
    examPelvis: '',
    examPelvisGenitals: '',
    examLimbVascular: '',
    examLimbUpper: '',
    examLimbLower: '',
    examNeurologicForce: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNeurologicSensitivity: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNeurologicGait: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNeurologicReflex: '',
    generalExamResults: [
        {
            date: new Date("2025-03-25T19:53:49.161Z"),
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
    retirementDone: true,
    retirementObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    recommendationDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
}

type RecordRetirementPageProps = {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordRetirementPage: React.FC<RecordRetirementPageProps> = async ({
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
            <ReturnableHeader title='Ficha de retiro' />
            <StepperRetirementRecordForm
                headers={[
                    { title: 'Datos del establecimiento', description: 'Empresa y Usuario', icon: 'building' },
                    { title: 'Datos del establecimiento', description: 'Actividades y Factores de Riesgo', icon: 'building' },
                    { title: 'Antecedentes personales', description: 'Antecedentes Clinicos y Quirúrgicos', icon: 'user-check' },
                    { title: 'Antecedentes personales', description: 'Accidentes de Trabajo', icon: 'briefcase' },
                    { title: 'Antecedentes personales', description: 'Enfermedades Profesionales', icon: 'briefcase' },
                    { title: 'Constantes Vitales y Antropometria', icon: 'heart' },
                    { title: 'Examen Fisico Regional', description: 'Regiones', icon: 'heart' },
                    { title: 'Resultados de Examenes Generales y Especificos', description: 'Regiones', icon: 'notebook' },
                    { title: 'F. Diagnostico', icon: 'notebook' },
                    { title: 'G. Evaluacion Medica de Retiro', icon: 'notebook' },
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
                <RetirementInstitutionForm options={corporativeOptions} />
                <RetirementActivityAndRiskForm />
                <MedicalAndSurgicalHistoryForm />
                <JobAccidentForm />
                <OccupationalDiseaseForm />
                <VitalSignsAndAnthropometryForm />
                <PhysicalRegionalExamForm />
                <GeneralExamResultForm />
                <MedicalDiagnosticForm />
                <RetirementEvaluationForm />
                <RecommendationForm />

                <PreviewRetirementRecord />
            </StepperRetirementRecordForm >
        </>
    )
}
export default RecordRetirementPage
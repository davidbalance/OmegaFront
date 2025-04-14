import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveCorporativesOptions } from '@/server';
import { CorporativeOption } from '@/server/corporative/server-types';
import { retriveClientByDni } from '@/server';
import dayjs from 'dayjs';
import React from 'react'
import PreviewReintegrateRecord from './_components/preview-reintegrate-record';
import StepperReintegrateForm from './_components/stepper-reintegrate-record-form';
import ReintegrateInstitutionForm from './_components/reintegrate-institution-form';
import MedicalConsultationForm from '@/components/record/medical-consultation-form';
import CurrentDiseaseForm from '@/components/record/current-disease-form';
import VitalSignsAndAnthropometryForm from '@/components/record/vital-signs-and-anthropometry-form';
import PhysicalRegionalExamForm from '@/components/record/physical-regional-exam-form';
import GeneralExamResultForm from '@/components/record/general-exam-result-form';
import MedicalDiagnosticForm from '@/components/record/medical-diagnostic-form';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import RecommendationForm from '@/components/record/recommendation-form';
import { ReintegrateRecordPayload } from '@/server/record/create-record/reintegrate-record';

const testData: ReintegrateRecordPayload = {
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
    jobPosition: 'SAMPLE',
    workingEndDate: new Date("2025-03-25T20:16:49.740Z"),
    workingReintegrationDate: new Date("2025-03-25T20:16:49.740Z"),
    workingTime: 45,
    workingLeftCause: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam al                                                                                                                                                                                      liquam augue vel consectetur congue.Donec congue mi vel quam tempus, eget venenatis dolor rhoncus.Sed at accumsan nibh.Curabitur eget lacinia quam, a finibus erat.Nulla blandit finibus arcu eget laoreet.Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus.Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi.Praesent feugiat nulla lorem, eget dignissim dolor porta eu.Aliquam a magna a metus consequat pellentesque in nec nulla.Praesent pulvinar arcu pretium mattis hendrerit.Duis nibh sem, consequat vel consequat vel, laoreet quis nulla.Ut eget venenatis eros, quis ornare leo.In leo diam, convallis at libero eget, posuere condimentum orci.',
    medicalConsultationDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    currentDiseaseDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc eget arcu rhoncus pretium sit amet sed lacus. Curabitur non dui venenatis, finibus arcu non, vestibulum risus. Nam aliquam augue vel consectetur congue. Donec congue mi vel quam tempus, eget venenatis dolor rhoncus. Sed at accumsan nibh. Curabitur eget lacinia quam, a finibus erat. Nulla blandit finibus arcu eget laoreet. Suspendisse nunc eros, sollicitudin id pellentesque eget, dictum vel purus. Vestibulum est risus, dignissim laoreet nibh eu, luctus vulputate mi. Praesent feugiat nulla lorem, eget dignissim dolor porta eu. Aliquam a magna a metus consequat pellentesque in nec nulla. Praesent pulvinar arcu pretium mattis hendrerit. Duis nibh sem, consequat vel consequat vel, laoreet quis nulla. Ut eget venenatis eros, quis ornare leo. In leo diam, convallis at libero eget, posuere condimentum orci.',
    vitalSignsBloodPressure: 45,
    vitalSignsTemperature: 0,
    vitalSignsHeartRate: 45,
    vitalSignsOxygenSaturation: 0,
    vitalSignsRespiratoryRate: 45,
    vitalSignsWeight: 45,
    vitalSignsSize: 45,
    vitalSignsMassIndex: 0,
    vitalSignsAbdominalPerimeter: 45,
    examSkinScar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examSkinTattoo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examSkinLesions: '',
    examEyeEyelids: '',
    examEyeConjunctiva: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyePupils: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyeCorneas: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examEyeMotility: '',
    examEarAuditoryExternal: '',
    examEarAuricle: '',
    examEarEardrum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examPharynxLips: '',
    examPharynxTongue: '',
    examPharynxPharynx: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examPharynxTonsils: '',
    examPharynxTeeth: '',
    examNosePartition: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNoseTurbinates: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNoseMucousMembranes: '',
    examNoseParanasalSinuses: '',
    examNeckThyroid: '',
    examNeckMobility: '',
    examChestBreast: '',
    examChestHeart: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examChestLungs: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examChestRibCage: '',
    examAbdomenViscera: '',
    examAbdomenAbdominalWall: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examColumnFlexibility: '',
    examColumnDeviation: '',
    examColumnPain: '',
    examPelvis: '',
    examPelvisGenitals: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examLimbVascular: '',
    examLimbUpper: '',
    examLimbLower: '',
    examNeurologicForce: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNeurologicSensitivity: '',
    examNeurologicGait: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNeurologicReflex: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    generalExamResults: [
        {
            date: new Date("2025-03-25T20:16:49.007Z"),
            exam: 'SAMPLE',
            result: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            date: new Date("2025-03-25T20:16:49.007Z"),
            exam: 'SAMPLE',
            result: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            date: new Date("2025-03-25T20:16:49.007Z"),
            exam: 'SAMPLE',
            result: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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

interface RecordReintegratePageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordReintegratePage: React.FC<RecordReintegratePageProps> = async ({
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
    const patientAge = dayjs().diff(patient.patientBirthday, 'year');

    return (
        <>
            <ReturnableHeader title='Ficha inicial' />
            <StepperReintegrateForm
                headers={[
                    { title: 'Datos del establecimiento', description: 'Empresa y Usuario', icon: 'building' },
                    { title: 'Motivo de la consulta / Condicion de Reintegro', icon: 'license' },
                    { title: 'Enfermedad Actual', icon: 'disease' },
                    { title: 'Constantes Vitales y Antropometria', icon: 'heart' },
                    { title: 'Examen Fisico Regional', description: 'Regiones', icon: 'heart' },
                    { title: 'Resultados de Examenes', icon: 'notebook' },
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
                    patientAge: patientAge,
                }}>
                <ReintegrateInstitutionForm options={corporativeOptions} />
                <MedicalConsultationForm />
                <CurrentDiseaseForm />
                <VitalSignsAndAnthropometryForm />
                <PhysicalRegionalExamForm />
                <GeneralExamResultForm />
                <MedicalDiagnosticForm />
                <MedicalFitnessForJobForm />
                <RecommendationForm />
                <PreviewReintegrateRecord />

            </StepperReintegrateForm>
        </>
    )
}

export default RecordReintegratePage
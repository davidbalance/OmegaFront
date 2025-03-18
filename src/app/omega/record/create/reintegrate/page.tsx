import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveCorporativesOptions } from '@/server/corporative/actions';
import { CorporativeOption } from '@/server/corporative/server_types';
import { retriveClientByDni } from '@/server/medical_client/actions';
import dayjs from 'dayjs';
import React from 'react'
import PreviewReintegrateRecord from './_components/preview-reintegrate-record';
import StepperReintegrateForm from './_components/stepper-reintegrate-record-form';
import ReintegrateInstitutionForm from './_components/reintegrate-institution-form';
import MedicalConsultationForm from '@/components/record/medical-consultation-form';
import CurrentDiseaseForm from '@/components/record/current-disease-form';
import VitalSignsAndAnthropometryForm from '@/components/record/vital-signs-and-anthropometry-form';
import PhysicalRegionalExamForm from '@/components/record/physical-regional-exam-form';
import GeneralExamResultForm from '@/components/record/general-exam-result';
import MedicalDiagnosticForm from '@/components/record/medical-diagnostic-form';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import RecommendationForm from '@/components/record/recommendation-form';
import { ReintegrateRecordPayload } from '@/server/record/create-record/reintegrate-record';

const testData: ReintegrateRecordPayload = {
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
    jobPosition: 'SAMPLE',
    workingEndDate: new Date("2025-03-18T19:23:26.200Z"),
    workingReintegrationDate: new Date("2025-03-18T19:23:26.200Z"),
    workingTime: 45,
    workingLeftCause: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis tincidunt orci, at vestibulum nunc aliquet et. Nulla finibus tincidunt posuere. Nullam posuere leo eget lacinia ultricies. Pellentesque vitae imperdiet justo, in malesuada ipsum. Phasellus sed neque eget elit pharetra cursus vitae vel velit. Nullam varius felis id risus dictum scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et augue enim. Phasellus ut porta nisi.',
    medicalConsultationDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis tincidunt orci, at vestibulum nunc aliquet et. Nulla finibus tincidunt posuere. Nullam posuere leo eget lacinia ultricies. Pellentesque vitae imperdiet justo, in malesuada ipsum. Phasellus sed neque eget elit pharetra cursus vitae vel velit. Nullam varius felis id risus dictum scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et augue enim. Phasellus ut porta nisi.',
    currentDiseaseDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis tincidunt orci, at vestibulum nunc aliquet et. Nulla finibus tincidunt posuere. Nullam posuere leo eget lacinia ultricies. Pellentesque vitae imperdiet justo, in malesuada ipsum. Phasellus sed neque eget elit pharetra cursus vitae vel velit. Nullam varius felis id risus dictum scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et augue enim. Phasellus ut porta nisi.',
    vitalSignsBloodPressure: 0,
    vitalSignsTemperature: 45,
    vitalSignsHeartRate: 0,
    vitalSignsOxygenSaturation: 0,
    vitalSignsRespiratoryRate: 45,
    vitalSignsWeight: 45,
    vitalSignsSize: 0,
    vitalSignsMassIndex: 0,
    vitalSignsAbdominalPerimeter: 45,
    examSkinScar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examSkinTattoo: '',
    examSkinLesions: '',
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
    examLimbVascular: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examLimbUpper: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examLimbLower: '',
    examNeurologicForce: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    examNeurologicSensitivity: '',
    examNeurologicGait: '',
    examNeurologicReflex: '',
    generalExamResults: [
        {
            date: new Date("2025-03-18T19:19:25.672Z"),
            exam: 'SAMPLE',
            result: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            date: new Date("2025-03-18T19:19:25.672Z"),
            exam: 'SAMPLE',
            result: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ],
    generalExamObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis tincidunt orci, at vestibulum nunc aliquet et. Nulla finibus tincidunt posuere. Nullam posuere leo eget lacinia ultricies. Pellentesque vitae imperdiet justo, in malesuada ipsum. Phasellus sed neque eget elit pharetra cursus vitae vel velit. Nullam varius felis id risus dictum scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et augue enim. Phasellus ut porta nisi.',
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
    medicalFitnessType: 'fit-observation',
    medicalFitnessLimitation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis tincidunt orci, at vestibulum nunc aliquet et. Nulla finibus tincidunt posuere. Nullam posuere leo eget lacinia ultricies. Pellentesque vitae imperdiet justo, in malesuada ipsum. Phasellus sed neque eget elit pharetra cursus vitae vel velit. Nullam varius felis id risus dictum scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et augue enim. Phasellus ut porta nisi.',
    medicalFitnessObservation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis tincidunt orci, at vestibulum nunc aliquet et. Nulla finibus tincidunt posuere. Nullam posuere leo eget lacinia ultricies. Pellentesque vitae imperdiet justo, in malesuada ipsum. Phasellus sed neque eget elit pharetra cursus vitae vel velit. Nullam varius felis id risus dictum scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et augue enim. Phasellus ut porta nisi.',
    recommendationDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis tincidunt orci, at vestibulum nunc aliquet et. Nulla finibus tincidunt posuere. Nullam posuere leo eget lacinia ultricies. Pellentesque vitae imperdiet justo, in malesuada ipsum. Phasellus sed neque eget elit pharetra cursus vitae vel velit. Nullam varius felis id risus dictum scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et augue enim. Phasellus ut porta nisi.',
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
    const patientFirstName = patient.patientName.split(' ')[0] ?? '';
    const patientMiddleName = patient.patientName.split(' ')[1] ?? '';
    const patientLastName = patient.patientLastname.split(' ')[0] ?? '';
    const patientSecondLastName = patient.patientLastname.split(' ')[1] ?? '';
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
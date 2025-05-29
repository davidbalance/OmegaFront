import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveCorporativesOptions } from '@/server';
import { CorporativeOption } from '@/server/corporative/server-types';
import { retriveClientByDni } from '@/server';
import dayjs from 'dayjs';
import React from 'react'
import PreviewReintegrateRecord from './_components/preview-reintegrate-record';
import StepperReintegrateForm from './_components/stepper-reintegrate-record-form';
import ReintegrateInstitutionForm from './_components/reintegrate-institution-form';
import CurrentDiseaseForm from '@/components/record/current-disease-form';
import VitalSignsAndAnthropometryForm from '@/components/record/vital-signs-and-anthropometry-form';
import PhysicalRegionalExamForm from '@/components/record/physical-regional-exam-form';
import GeneralExamResultForm from '@/components/record/general-exam-result-form';
import MedicalDiagnosticForm from '@/components/record/medical-diagnostic-form';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import RecommendationForm from '@/components/record/recommendation-form';
import { REINTEGRATION_MEDICAL_CONSULTATION } from './_libs/constants';
import { ReintegrateRecordPayload } from '@/server/record/create-record/reintegrate-record';

const defaultValues: Partial<ReintegrateRecordPayload> = {
    companyName: "EMPRESA ELECTRICA QUITO E.E.Q S.A.",
    companyRUC: "1790053881001",
    companyCIIU: "",
    institutionHealthFacility: "Omega Salud Ocupacional",
    patientFirstName: "MARIO",
    patientMiddleName: "ALFONSO",
    patientLastName: "NOBOA",
    patientSecondLastName: "CORONEL",
    patientGender: "male",
    patientAge: 45,
    jobPosition: "SAMPLE",
    workingEndDate: new Date("2025-05-29T13:18:00.817Z"),
    workingReintegrationDate: new Date("2025-05-29T13:18:00.817Z"),
    workingTime: 1,
    workingLeftCause: "SAMPLE",
    currentDiseaseDescription: "",
    vitalSignsBloodPressure: "10",
    vitalSignsTemperature: "10",
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
    generalExamResults: [],
    generalExamObservation: "SAMPLE",
    diagnostics: [
        {
            description: "SAMPLE",
            cie: "SAMPLE",
            flag: "def"
        },
        {
            description: "SAMPLE",
            cie: "SAMPLE",
            flag: "pre"
        }
    ],
    medicalFitnessType: "no-fit",
    medicalFitnessLimitation: "",
    medicalFitnessObservation: "",
    medicalFitnessReubication: "SAMPLE",
    recommendationDescription: "SAMPLE"
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
                    { title: 'Enfermedad Actual', icon: 'disease' },
                    { title: 'Constantes Vitales y Antropometria', icon: 'heart' },
                    { title: 'Examen Fisico Regional', description: 'Regiones', icon: 'heart' },
                    { title: 'Resultados de Examenes', icon: 'notebook' },
                    { title: 'Diagnostico', icon: 'notebook' },
                    { title: 'Aptitud Medical para el Trabajo', icon: 'notebook' },
                    { title: 'Recomendaciones y/o Tratamientos', icon: 'notebook' },
                    { title: 'Vista anticipada de la ficha', icon: 'check' },
                ]}
                patientDni={patientDni}
                initialData={{
                    patientFirstName: patientFirstName,
                    patientMiddleName: patientMiddleName,
                    patientLastName: patientLastName,
                    patientSecondLastName: patientSecondLastName,
                    patientGender: patient.patientGender,
                    patientAge: patientAge,
                    medicalConsultationDescription: REINTEGRATION_MEDICAL_CONSULTATION,
                    ...defaultValues
                }}>
                <ReintegrateInstitutionForm options={corporativeOptions} />
                <CurrentDiseaseForm />
                <VitalSignsAndAnthropometryForm />
                <PhysicalRegionalExamForm />
                <GeneralExamResultForm />
                <MedicalDiagnosticForm />
                <MedicalFitnessForJobForm showReubication />
                <RecommendationForm />
                <PreviewReintegrateRecord />

            </StepperReintegrateForm>
        </>
    )
}

export default RecordReintegratePage
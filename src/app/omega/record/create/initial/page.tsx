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
    const patientMiddleName = patient.patientName.split(' ').slice(1).join(" ") ?? ' ';
    const patientLastName = patient.patientLastname.split(' ')[0] ?? ' ';
    const patientSecondLastName = patient.patientLastname.split(' ').slice(1).join(" ") ?? ' ';
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
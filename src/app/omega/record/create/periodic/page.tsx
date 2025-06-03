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
import { PERIODIC_MEDICAL_CONSULTATION } from './_libs/constants';
import { retriveFromTmpStore } from '@/lib/tmp-store/tmp-store.utils';
import { PeriodicRecordPayload } from '@/server/record/create-record/periodic-record';
import { parsedPeriodic } from './_libs/parsed-periodic';

type RecordPeriodicPageProps = {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordPeriodicPage: React.FC<RecordPeriodicPageProps> = async ({
    searchParams
}) => {
    const patientDni = typeof searchParams.patientDni === 'string' ? searchParams.patientDni : undefined;

    if (!patientDni) return <>Patient not specified</>

    const stepperCookieKey: string = `record-periodic-${patientDni}`;
    const tmpResult = await retriveFromTmpStore<Partial<PeriodicRecordPayload>>(stepperCookieKey);
    const initialData: Partial<PeriodicRecordPayload> = tmpResult.isSuccess ? parsedPeriodic(tmpResult.value) : {};

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
                tmpStoreKey={stepperCookieKey}
                initialData={{
                    patientDni: patientDni,
                    patientFirstName: patientFirstName,
                    patientMiddleName: patientMiddleName,
                    patientLastName: patientLastName,
                    patientSecondLastName: patientSecondLastName,
                    patientGender: patient.patientGender,
                    medicalConsultationDescription: PERIODIC_MEDICAL_CONSULTATION,
                    ...initialData
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
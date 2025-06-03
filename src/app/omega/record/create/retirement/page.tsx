import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveCorporativesOptions } from '@/server';
import { CorporativeOption } from '@/server/corporative/server-types';
import { retriveClientByDni } from '@/server';
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
import { retriveFromTmpStore } from '@/lib/tmp-store/tmp-store.utils';
import { parsedRetirement } from './_libs/parsed-retirement';

type RecordRetirementPageProps = {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordRetirementPage: React.FC<RecordRetirementPageProps> = async ({
    searchParams
}) => {
    const patientDni = typeof searchParams.patientDni === 'string' ? searchParams.patientDni : undefined;

    if (!patientDni) return <>Patient not specified</>

    const stepperCookieKey: string = `record-retirement-${patientDni}`;
    const tmpResult = await retriveFromTmpStore<Partial<RetirementRecordPayload>>(stepperCookieKey);
    const initialData: Partial<RetirementRecordPayload> = tmpResult.isSuccess ? parsedRetirement(tmpResult.value) : {};

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
                    { title: 'Recomendaciones y/o Tratamientos', icon: 'notebook' },

                    { title: 'Vista anticipada de la ficha', icon: 'check' },
                ]}
                tmpStoreKey={stepperCookieKey}
                patientDni={patientDni}
                initialData={{
                    patientDni: patientDni,
                    patientFirstName: patientFirstName,
                    patientMiddleName: patientMiddleName,
                    patientLastName: patientLastName,
                    patientSecondLastName: patientSecondLastName,
                    patientGender: patient.patientGender,
                    ...initialData
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
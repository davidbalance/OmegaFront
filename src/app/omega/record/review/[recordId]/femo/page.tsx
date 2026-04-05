import React from 'react'
import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveClientRecordMetadata, retriveCorporativesOptions } from '@/server';
import StepperCompleteRecordForm from '../../../../../../components/record/stepper-complete-record-form';
import { CorporativeOption } from '@/server/corporative/server-types';
import InitialInstitutionForm from '../../../../../../components/record/femo/femo-institution-form';
import FemoConsultationForm from '../../../../../../components/record/femo/femo-consultation-form';
import FemoPatientHistoryForm from '../../../../../../components/record/femo/femo-personal-history-form';
import { PATIENT_GENDER_FEMALE } from '@/server/record/create-record/femo/institution.schema';
import FemoCurrentDiseaseForm from '../../../../../../components/record/femo/femo-current-disease-form';
import FemoVitalSignsForm from '../../../../../../components/record/femo/femo-vital-signs-form';
import FemoPhysicalRegionalExamForm from '../../../../../../components/record/femo/femo-physical-regional-exam-form';
import FemoRiskFactorForm from '../../../../../../components/record/femo/femo-risk-factor-form';
import FemoEmployementHistoryForm from '../../../../../../components/record/femo/femo-employement-history-form';
import FemoExtraLaboralActivityForm from '../../../../../../components/record/femo/femo-extra-laboral-activity-form';
import FemoExamResultForm from '../../../../../../components/record/femo/femo-exam-result-form';
import FemoDiagnosesForm from '../../../../../../components/record/femo/femo-diagnoses-form';
import FemoMedicalFitnessForWorkForm from '../../../../../../components/record/femo/femo-medical-fitness-for-work-form';
import FemoRecommendationForm from '../../../../../../components/record/femo/femo-recommendation-form';
import FemoRetirementForm from '../../../../../../components/record/femo/femo-retirement-form';
import { metadataResponseValidator } from '@/lib/utils/validator';
import PreviewFemoRecord from '@/components/record/femo/preview-femo-record';

interface RecordFemoPageProps {
    params: {
        recordId: string;
    }
}
const RecordFemoPage: React.FC<RecordFemoPageProps> = async ({
    params
}) => {

    const record = await retriveClientRecordMetadata(params.recordId);

    const corporativeBaseOptions = await retriveCorporativesOptions();
    const corporativeOptions = corporativeBaseOptions.map<CorporativeOption>((e) => ({
        ...e,
        children: e.children.map(x => ({
            ...x,
            label: x.label.split('-')[1],
            value: x.label.split('-')[0],
        }))
    }));

    const isFemale = record.metadata.patient?.gender === PATIENT_GENDER_FEMALE

    let { metadata } = record;
    if ("femo" in metadataResponseValidator) {
        metadata = metadataResponseValidator["femo"](metadata);
    }

    return (
        <>
            <ReturnableHeader title='Formulario de Evaluación Médica Ocupacional' />
            <StepperCompleteRecordForm
                headers={[
                    { title: 'Datos del profesional', icon: 'medicine' },
                    { title: 'Datos del establecimiento', description: 'Empresa y usuario', icon: 'building' },
                    { title: 'Motivo de Consulta', icon: "notebook" },
                    { title: 'Enfermedad o Problema Actual', icon: "disease" },
                    { title: 'Constantes Vitales y Antropometría', icon: "briefcase" },
                    { title: 'Examen Físico Regional', icon: "heart" },
                    { title: 'Factores de riesgo', icon: "risk" },
                    { title: 'Actividad', description: 'Laboral/Incidentes/Accidentes/Enfermedades Ocupacionales', icon: "briefcase" },
                    { title: 'Actividad', description: 'Actividades Laborales Extras', icon: "activity" },
                    { title: 'Resultados de Exámenes', description: 'Generales y Específicos de Acuerdo al Riesgo y Puesto de Trabajo', icon: "tree" },
                    { title: 'Diagnóstico', icon: "medicine" },
                    { title: 'Recomendacion y/o Tratamiento', icon: "notebook" },
                    { title: 'Aptitud médica para el trabajo', icon: "activity" },
                    { title: 'Retiro (Evaluación)', icon: "briefcase" },
                    { title: 'Vista anticipada del certificado', icon: 'check' },
                ]}
                initialData={metadata}
                patientDni={record.patientDni}
                recordId={params.recordId}
                recordType="femo">
                <InitialInstitutionForm options={corporativeOptions} />
                <FemoConsultationForm />
                <FemoPatientHistoryForm isFemale={isFemale} />
                <FemoCurrentDiseaseForm />
                <FemoVitalSignsForm />
                <FemoPhysicalRegionalExamForm />
                <FemoRiskFactorForm />
                <FemoEmployementHistoryForm />
                <FemoExtraLaboralActivityForm />
                <FemoExamResultForm />
                <FemoDiagnosesForm />
                <FemoRecommendationForm />
                <FemoMedicalFitnessForWorkForm />
                <FemoRetirementForm />
                <PreviewFemoRecord />
            </StepperCompleteRecordForm>
        </>
    )
}

export default RecordFemoPage
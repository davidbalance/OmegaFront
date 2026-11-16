import React from 'react'
import ReturnableHeader from '@/components/_base/returnable-header';
import UpdateRecordForm from '@/components/record/update-record-form';
import CertificateGeneralDataForm from '@/components/record/certificate/certificate-general-data-form';
import MedicalFitnessForJobForm from '@/components/record/certificate/medical-fitness-for-work-form';
import RecommendationForm from '@/components/record/certificate/recommendation-form';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { retriveClientRecordMetadata } from '@/server';
import { UpdateCertificateKey, UpdateFemoKey } from '@/types/update-record.type';
import FemoConsultationForm from '@/components/record/femo/femo-consultation-form';
import FemoCurrentDiseaseForm from '@/components/record/femo/femo-current-disease-form';
import FemoEmployementHistoryForm from '@/components/record/femo/femo-employement-history-form';
import FemoExamResultForm from '@/components/record/femo/femo-exam-result-form';
import FemoExtraLaboralActivityForm from '@/components/record/femo/femo-extra-laboral-activity-form';
import FemoMedicalFitnessForWorkForm from '@/components/record/femo/femo-medical-fitness-for-work-form';
import FemoPhysicalRegionalExamForm from '@/components/record/femo/femo-physical-regional-exam-form';
import FemoRecommendationForm from '@/components/record/femo/femo-recommendation-form';
import FemoRetirementForm from '@/components/record/femo/femo-retirement-form';
import FemoVitalSignsForm from '@/components/record/femo/femo-vital-signs-form';
import FemoRiskFactorForm from '@/components/record/femo/femo-risk-factor-form';
import FemoDiagnosesForm from '@/components/record/femo/femo-diagnoses-form';
import { metadataResponseValidator } from '@/lib/utils/validator';

const updateForm: Record<string,
    Record<UpdateCertificateKey, React.ComponentType> |
    Record<UpdateFemoKey, React.ComponentType>
> = {
    "certificado": {
        "general-form": CertificateGeneralDataForm,
        "fitness": MedicalFitnessForJobForm,
        "recommendation": RecommendationForm,
    },
    "femo": {
        "consultation": FemoConsultationForm,
        "current-disease": FemoCurrentDiseaseForm,
        "vital-signs": FemoVitalSignsForm,
        "physical-exam": FemoPhysicalRegionalExamForm,
        "risk-factor": FemoRiskFactorForm,
        "employement-history": FemoEmployementHistoryForm,
        "extra-laboral-activity": FemoExtraLaboralActivityForm,
        "exam-result": FemoExamResultForm,
        "diagnoses": FemoDiagnosesForm,
        "medical-fitness": FemoMedicalFitnessForWorkForm,
        "recommendation": FemoRecommendationForm,
        "retirement": FemoRetirementForm,
    },
}

interface RecordFemoUpdatePageProps {
    searchParams: { [key: string]: string | string[] | undefined },
    params: {
        recordId: string;
    }
}
const RecordFemoUpdatePage: React.FC<RecordFemoUpdatePageProps> = async ({
    searchParams,
    params
}) => {

    const recordType = typeof searchParams.type === 'string' ? searchParams.type : undefined;
    const recordKey = typeof searchParams.record === 'string' ? searchParams.record : undefined;

    const record = await retriveClientRecordMetadata(params.recordId);

    if (!recordKey || !(recordKey in updateForm)) return (
        <ModularBox>
            Formulario no definido
        </ModularBox>)

    const formDic: any = updateForm[recordKey];

    if (!recordType || !(recordType in formDic)) return (
        <ModularBox>
            Formulario no definido
        </ModularBox>)

    const Form = formDic[recordType]

    let { metadata } = record;
    if (recordKey in metadataResponseValidator) {
        metadata = metadataResponseValidator[recordKey](metadata);
    }

    return (
        <>
            <ReturnableHeader title='Formulario de Evaluación Médica Ocupacional' />
            <UpdateRecordForm
                recordId={params.recordId}
                patientDni={record.patientDni}
                data={metadata}>
                <Form />
            </UpdateRecordForm>
        </>
    )
}

export default RecordFemoUpdatePage
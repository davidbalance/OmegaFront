import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveClientRecordMetadata, retriveCorporativesOptions } from '@/server';
import { CorporativeOption } from '@/server/corporative/server-types';
import React from 'react'
import ProfessionalDataForm from '@/components/record/professional-data-form';
import MedicalFitnessForJobForm from '@/components/record/certificate/medical-fitness-for-work-form';
import RecommendationForm from '@/components/record/certificate/recommendation-form';
import StepperCompleteRecordForm from '@/components/record/stepper-complete-record-form';
import CertificateInstitutionForm from '@/components/record/certificate/certificate-institution-form';
import CertificateGeneralDataForm from '@/components/record/certificate/certificate-general-data-form';
import PreviewCertificateRecord from '@/components/record/certificate/preview-certificate-record';

const stepperHeader: { title: string, description?: string, icon: any }[] = [
    { title: 'Datos del profesional', icon: 'medicine' },
    { title: 'Datos del establecimiento', description: 'Empresa y usuario', icon: 'building' },
    { title: 'Datos generales', icon: 'license' },
    { title: 'Aptitud Médica para el Trabajo', icon: 'notebook' },
    { title: 'Recomendaciones/Observaciones', icon: 'notebook' },
    { title: 'Vista anticipada del certificado', icon: 'check' },
]

interface RecordCertificatePageProps {
    params: {
        recordId: string;
    }
}
const RecordCertificatePage: React.FC<RecordCertificatePageProps> = async ({
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

    let { metadata } = record;

    return (
        <>
            <ReturnableHeader title='Ficha de certificado' />
            <StepperCompleteRecordForm
                headers={stepperHeader}
                initialData={metadata}
                patientDni={record.patientDni}
                recordId={params.recordId}
                recordType='certificate'>
                <CertificateInstitutionForm
                    options={corporativeOptions} />
                <CertificateGeneralDataForm />
                <MedicalFitnessForJobForm />
                <RecommendationForm />
                <PreviewCertificateRecord />
            </StepperCompleteRecordForm>
        </>
    )
}

export default RecordCertificatePage
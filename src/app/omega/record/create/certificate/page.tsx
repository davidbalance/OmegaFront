import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveCorporativesOptions } from '@/server';
import { CorporativeOption } from '@/server/corporative/server-types';
import { retriveClientByDni } from '@/server';
import React from 'react'
import CertificateInstitutionForm from './_components/certificate-institution-form';
import StepperCertificateForm from './_components/stepper-certificate-record-form';
import CertificateGeneralDataForm from './_components/certificate-general-data-form';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import RecommendationForm from '@/components/record/recommendation-form';
import CertificateRetirementEvaluationForm from './_components/certificate-retirement-evaluation';
import PreviewCertificateRecord from './_components/preview-certificate-record';

interface RecordCertificatePageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordCertificatePage: React.FC<RecordCertificatePageProps> = async ({
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
            <ReturnableHeader title='Ficha certificado' />
            <StepperCertificateForm
                headers={[
                    { title: 'Datos del establecimiento', description: 'Empresa y Usuario', icon: 'building' },
                    { title: 'Datos Generales', icon: 'license' },
                    { title: 'Aptitud Medical Laboral', icon: 'notebook' },
                    { title: 'Evaluacion medica de retiro', icon: 'notebook' },
                    { title: 'Recomendacionesy/o Tratamientos', icon: 'notebook' },
                    { title: 'Vista anticipada de la ficha', icon: 'check' },
                ]}
                patientDni={patientDni}
                initialData={{
                    patientFirstName: patientFirstName,
                    patientMiddleName: patientMiddleName,
                    patientLastName: patientLastName,
                    patientSecondLastName: patientSecondLastName,
                    patientGender: patient.patientGender,
                }}>
                <CertificateInstitutionForm options={corporativeOptions} />
                <CertificateGeneralDataForm />
                <MedicalFitnessForJobForm />
                <CertificateRetirementEvaluationForm />
                <RecommendationForm />
                <PreviewCertificateRecord />
            </StepperCertificateForm>
        </>
    )
}

export default RecordCertificatePage
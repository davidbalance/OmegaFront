import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveCorporativesOptions } from '@/server';
import { CorporativeOption } from '@/server/corporative/server-types';
import { retriveClientByDni } from '@/server';
import React from 'react'
import CertificateInstitutionForm from '../../../../../components/record/certificate/certificate-institution-form';
import StepperCertificateForm from '../../../../../components/record/certificate/stepper-certificate-record-form';
import CertificateGeneralDataForm from '../../../../../components/record/certificate/certificate-general-data-form';
import PreviewCertificateRecord from '../../../../../components/record/certificate/preview-certificate-record';
import ProfessionalDataForm from '@/components/record/professional-data-form';
import MedicalFitnessForJobForm from '@/components/record/certificate/medical-fitness-for-work-form';
import RecommendationForm from '@/components/record/certificate/recommendation-form';
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';

const stepperHeader: { title: string, description?: string, icon: any }[] = [
    { title: 'Datos del profesional', icon: 'medicine' },
    { title: 'Datos del establecimiento', description: 'Empresa y usuario', icon: 'building' },
    { title: 'Datos generales', icon: 'license' },
    { title: 'Aptitud Médica para el Trabajo', icon: 'notebook' },
    { title: 'Recomendaciones/Observaciones', icon: 'notebook' },
    { title: 'Vista anticipada del certificado', icon: 'check' },
]

interface RecordCertificatePageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordCertificatePage: React.FC<RecordCertificatePageProps> = async ({
    searchParams
}) => {
    const patientDni = typeof searchParams.patientDni === 'string' ? searchParams.patientDni : undefined;

    if (!patientDni) return <>Paciente no especificado</>

    const stepperCookieKey: string = `record-certificate-${patientDni}`;

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

    const initialPatientData: Pick<CertificateRecordPayload["patient"], "firstName" | "middleName" | "lastName" | "secondLastName" | "gender"> = {
        firstName: patientFirstName,
        middleName: patientMiddleName,
        lastName: patientLastName,
        secondLastName: patientSecondLastName,
        gender: patient.patientGender
    }

    return (
        <>
            <ReturnableHeader title='Ficha de certificado' />
            <StepperCertificateForm
                headers={stepperHeader}
                patientDni={patientDni}
                tmpStoreKey={stepperCookieKey}
                initialData={{ patient: initialPatientData }}>
                <ProfessionalDataForm />
                <CertificateInstitutionForm
                    options={corporativeOptions} />
                {/* <CertificateGeneralDataForm />
                <MedicalFitnessForJobForm />
                <RecommendationForm />
                <PreviewCertificateRecord /> */}
            </StepperCertificateForm>
        </>
    )
}

export default RecordCertificatePage
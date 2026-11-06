import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveClientRecordMetadata, retriveCorporativesOptions } from '@/server';
import { CorporativeOption } from '@/server/corporative/server-types';
import React from 'react'
import CertificateInstitutionForm from '../../../../../components/record/certificate/certificate-institution-form';
import StepperCertificateForm from '../../../../../components/record/certificate/stepper-certificate-record-form';
import ProfessionalDataForm from '@/components/record/professional-data-form';
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

    const femoId = typeof searchParams.femoId === 'string' ? searchParams.femoId : undefined;

    if (!femoId) return <>Formulraio de Evaluación Médica Ocupacional no especificado</>

    const stepperCookieKey: string = `record-certificate-${femoId}`;

    const corporativeBaseOptions = await retriveCorporativesOptions();
    const corporativeOptions = corporativeBaseOptions.map<CorporativeOption>((e) => ({
        ...e,
        children: e.children.map(x => ({
            ...x,
            label: x.label.split('-')[1],
            value: x.label.split('-')[0],
        }))
    }));

    const femo = await retriveClientRecordMetadata(femoId);

    const initialPatientData: Partial<CertificateRecordPayload["patient"]> = {
        firstName: femo.metadata.patient.firstName,
        middleName: femo.metadata.patient.middleName,
        lastName: femo.metadata.patient.lastName,
        secondLastName: femo.metadata.patient.secondLastName,
        gender: femo.metadata.patient.gender
    }

    let initialAuthor: Partial<CertificateRecordPayload["author"]> = {
        dni: femo.metadata.author.dni,
        fullname: femo.metadata.author.fullname
    }

    let initialEstablishment: Partial<CertificateRecordPayload["establishment"]> = {
        healthFacility: femo.metadata.establishment.healthFacility,
        institutionName: femo.metadata.establishment.institutionName,
        ruc: femo.metadata.establishment.ruc,
        ciiu: femo.metadata.establishment.ciiu,
    }

    let initialGeneralDataEvaluation: Partial<CertificateRecordPayload["generalDataEvaluation"]> = femo.metadata.consultation.evaluationType

    let initialFitness: Partial<CertificateRecordPayload["fitness"]> = {
        type: femo.metadata.medicalAptitude.type
    }

    return (
        <>
            <ReturnableHeader title='Ficha de certificado' />
            <StepperCertificateForm
                headers={stepperHeader}
                patientDni={femo.patientDni}
                tmpStoreKey={stepperCookieKey}
                initialData={{
                    patient: initialPatientData,
                    author: initialAuthor,
                    establishment: initialEstablishment,
                    generalDataEvaluation: initialGeneralDataEvaluation,
                    fitness: initialFitness
                }}>
                <ProfessionalDataForm />
                <CertificateInstitutionForm
                    options={corporativeOptions} />
            </StepperCertificateForm>
        </>
    )
}

export default RecordCertificatePage

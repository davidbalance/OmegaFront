import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveCorporativesOptions } from '@/server';
import { CorporativeOption } from '@/server/corporative/server-types';
import { retriveClientByDni } from '@/server';
import React from 'react'
import CertificateInstitutionForm from './_components/certificate-institution-form';
import StepperCertificateForm from './_components/stepper-certificate-record-form';
import CertificateGeneralDataForm from './_components/certificate-general-data-form';
import RecommendationForm from '@/components/record/recommendation-form';
import PreviewCertificateRecord from './_components/preview-certificate-record';
import CertificateEvaluation from './_components/certificate-evaluation';
import { retriveFromTmpStore } from '@/lib/tmp-store/tmp-store.utils';
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';
import { parsedCertificate } from './_libs/parsed-certificate';
import ProfessionalDataForm from '@/components/record/professional-data-form';

interface RecordCertificatePageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordCertificatePage: React.FC<RecordCertificatePageProps> = async ({
    searchParams
}) => {
    const patientDni = typeof searchParams.patientDni === 'string' ? searchParams.patientDni : undefined;

    if (!patientDni) return <>Paciente no especificado</>

    const stepperCookieKey: string = `record-certificate-${patientDni}`;
    const tmpResult = await retriveFromTmpStore<Partial<CertificateRecordPayload>>(stepperCookieKey);
    const initialData: Partial<CertificateRecordPayload> = tmpResult.isSuccess ? parsedCertificate(tmpResult.value) : {};

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
            <ReturnableHeader title='Ficha de certificado' />
            <StepperCertificateForm
                headers={[
                    { title: 'Datos del profesional', icon: 'medicine' },
                    { title: 'Datos del establecimiento', description: 'Empresa y usuario', icon: 'building' },
                    { title: 'Datos generales', icon: 'license' },
                    { title: 'Evaluación', icon: 'notebook' },
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
                    ...initialData
                }}>
                <ProfessionalDataForm />
                <CertificateInstitutionForm options={corporativeOptions} />
                <CertificateGeneralDataForm />
                <CertificateEvaluation />
                <RecommendationForm />
                <PreviewCertificateRecord />
            </StepperCertificateForm>
        </>
    )
}

export default RecordCertificatePage
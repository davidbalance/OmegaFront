import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveCorporativesOptions } from '@/server/corporative/actions';
import { CorporativeOption } from '@/server/corporative/server_types';
import { retriveClientByDni } from '@/server/medical_client/actions';
import React from 'react'
import CertificateInstitutionForm from './_components/certificate-institution-form';
import StepperCertificateForm from './_components/stepper-certificate-record-form';
import CertificateGeneralDataForm from './_components/certificate-general-data-form';
import MedicalFitnessForJobForm from '@/components/record/medical-fitness-for-job-form';
import RecommendationForm from '@/components/record/recommendation-form';
import CertificateRetirementEvaluationForm from './_components/certificate-retirement-evaluation';
import PreviewCertificateRecord from './_components/preview-certificate-record';
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';

const testData: CertificateRecordPayload = {
    "patientFirstName": "WILLAN",
    "patientMiddleName": "HERNAN",
    "patientLastName": "FERNANDEZ",
    "patientSecondLastName": "FLORES",
    "patientGender": "male",
    "companyName": "COLEGIO MENOR",
    "companyRUC": "1791754794001",
    "companyCIU": "CIU",
    "institutionHealthFacility": "Omega Salud Ocupacional",
    "jobPosition": "SAMPLE",
    "generalData": "reintegrate",
    "medicalFitnessType": "fit-observation",
    "medicalFitnessLimitation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend.",
    "medicalFitnessObservation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend.",
    "retirementEvaluationDone": true,
    "retirementEvaluationCondition": "presuntive",
    "retirementEvaluationConditionWithJob": "yes",
    "recommendationDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec purus ut lacus mollis vestibulum. Morbi sagittis risus sem, nec vestibulum lectus vestibulum in. Praesent iaculis quam nisi, ut ultrices leo volutpat vel. Cras aliquam elit nec neque egestas, a varius lacus cursus. Vestibulum fermentum suscipit lacus eget cursus. Etiam eu molestie mi. Sed non aliquam neque. Aenean pellentesque lorem eleifend egestas tincidunt. Vestibulum eleifend leo id augue commodo gravida. Donec ultrices eros ut ligula dignissim, in ultricies erat pellentesque. Ut accumsan purus a egestas molestie. Nam fringilla a turpis sit amet eleifend."
}

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
    const patientFirstName = patient.patientName.split(' ')[0] ?? '';
    const patientMiddleName = patient.patientName.split(' ')[1] ?? '';
    const patientLastName = patient.patientLastname.split(' ')[0] ?? '';
    const patientSecondLastName = patient.patientLastname.split(' ')[1] ?? '';

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
                    ...testData,
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
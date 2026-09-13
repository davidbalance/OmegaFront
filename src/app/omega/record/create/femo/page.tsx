import React from 'react'
import ReturnableHeader from '@/components/_base/returnable-header';
import { retriveClientByDni, retriveCorporativesOptions } from '@/server';
import ProfessionalDataForm from '@/components/record/professional-data-form';
import { CorporativeOption } from '@/server/corporative/server-types';
import InitialInstitutionForm from '../../../../../components/record/femo/femo-institution-form';
import { FemoRecordPayload } from '@/server/record/create-record/femo-record';
import FemoPatientHistoryForm from '../../../../../components/record/femo/femo-personal-history-form';
import { PATIENT_GENDER_FEMALE } from '@/server/record/create-record/femo/institution.schema';
import StepperCreateFemoRecordForm from '@/components/record/femo/stepper-create-femo-record-form';
import FemoVitalSignsAndAnthropometryForm from '@/components/record/femo/femo-vital-signs-form';

interface RecordFemoPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const RecordFemoPage: React.FC<RecordFemoPageProps> = async ({
    searchParams
}) => {

    const patientDni = typeof searchParams.patientDni === 'string' ? searchParams.patientDni : undefined;

    if (!patientDni) return <>Paciente no especificado</>

    const patient = await retriveClientByDni(patientDni);

    const patientFirstName = patient.patientName.split(' ')[0] ?? ' ';
    const patientMiddleName = patient.patientName.split(' ').slice(1).join(" ") ?? ' ';
    const patientLastName = patient.patientLastname.split(' ')[0] ?? ' ';
    const patientSecondLastName = patient.patientLastname.split(' ').slice(1).join(" ") ?? ' ';

    const initialPatientData: Pick<FemoRecordPayload["patient"], "firstName" | "middleName" | "lastName" | "secondLastName" | "gender" | "birthDate"> = {
        firstName: patientFirstName,
        middleName: patientMiddleName,
        lastName: patientLastName,
        secondLastName: patientSecondLastName,
        gender: patient.patientGender,
        birthDate: patient.patientBirthday
    }

    return (
        <>
            <ReturnableHeader title='Formulario de Evaluación Médica Ocupacional' />
            <StepperCreateFemoRecordForm
                headers={[
                    { title: 'Datos del profesional', icon: 'medicine' },
                    { title: 'Constantes Vitales y Antropometría', icon: "briefcase" },
                ]}
                initialData={{ patient: initialPatientData }}
                patientDni={patientDni}>
                <ProfessionalDataForm />
                <FemoVitalSignsAndAnthropometryForm />
            </StepperCreateFemoRecordForm>
        </>
    )
}

export default RecordFemoPage
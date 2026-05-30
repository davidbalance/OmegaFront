import ReturnableHeader from '@/components/_base/returnable-header';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { retriveClientByDni } from '@/server';
import React from 'react'
import PatientNameForm from './_components/patient-name-form';

type PatientUpdateNameProps = {
    params: {
        patientDni: string;
    }
}
const PatientUpdateName: React.FC<PatientUpdateNameProps> = async ({ params }) => {

    const medicalClient = await retriveClientByDni(params.patientDni)

    return (
        <ModularLayout>
            <ReturnableHeader title='Actualización del nombre del paciente' />
            <ModularBox>
                <PatientNameForm
                    patientDni={params.patientDni}
                    patientName={medicalClient.patientName}
                    patientLastname={medicalClient.patientLastname} />
            </ModularBox>
        </ModularLayout>
    )
}

export default PatientUpdateName
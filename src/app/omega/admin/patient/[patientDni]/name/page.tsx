import ReturnableHeader from '@/components/_base/returnable-header';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { retriveClientByDni, retriveUserByDni } from '@/server';
import React from 'react'
import PatientNameForm from './_components/patient-name-form';

type PatientUpdateNameProps = {
    params: {
        dni: string;
    }
}
const PatientUpdateName: React.FC<PatientUpdateNameProps> = async ({ params }) => {

    const user = await retriveUserByDni(params.dni);
    const medicalClient = await retriveClientByDni(params.dni)

    return (
        <ModularLayout>
            <ReturnableHeader title='Actualización del nombre del paciente' />
            <ModularBox>
                <PatientNameForm
                    userId={user.userId}
                    patientDni={params.dni}
                    patientName={medicalClient.patientName}
                    patientLastname={medicalClient.patientLastname} />
            </ModularBox>
        </ModularLayout>
    )
}

export default PatientUpdateName
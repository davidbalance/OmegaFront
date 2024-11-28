import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import MedicalOrderForm from './_components/medical-order-form';
import { Box } from '@mantine/core';
import OrderSetup from './_components/order-setup';
import { retriveCorporativeGroupOptions } from '@/server/corporative-group.actions';
import { retriveMedicalOrderProcesses } from '@/server/medical-order.actions';
import { retriveDoctorOptions } from '@/server/doctor.actions';
import DoctorForm from './_components/doctor-form';

interface MedicalOrderCreatePageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const MedicalOrderCreatePage: React.FC<MedicalOrderCreatePageProps> = async ({
    searchParams
}) => {

    const patient = typeof searchParams.patient === 'string' ? searchParams.patient : undefined;

    if (!patient) {
        return <>
            <ReturnableHeader title='Paciente no escogido' />
        </>
    }

    const corporativeGroupOptions = await retriveCorporativeGroupOptions();
    const processOptions = await retriveMedicalOrderProcesses();
    const doctors = await retriveDoctorOptions();
    const doctorOptions = doctors.map(e => ({ value: e.dni, label: `${e.name} ${e.lastname}` }));

    return (
        <>
            <ReturnableHeader title='Creacion de orden medica' />
            <MedicalOrderForm
                steps={[
                    { description: 'Asignacion de localidad y proceso', icon: 'building' },
                    { description: 'Asignacion de medico', icon: 'user-check' },
                    { description: 'Asignacion de pruebas', icon: 'user-check' },
                ]}>
                <OrderSetup
                    corporativeGroupOptions={corporativeGroupOptions}
                    processOptions={processOptions} />
                <DoctorForm options={doctorOptions} />
                <Box>A</Box>
            </MedicalOrderForm>
        </>
    )
}

export default MedicalOrderCreatePage
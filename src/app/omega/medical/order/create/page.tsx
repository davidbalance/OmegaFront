import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import MedicalOrderForm from './_components/medical-order-form';
import { Box } from '@mantine/core';
import OrderSetup from './_components/order-setup';
import { retriveCorporativeGroupOptions } from '@/server/corporative-group.actions';
import { retriveMedicalOrderProcesses } from '@/server/medical-order.actions';
import { retriveDoctorOptions } from '@/server/doctor.actions';
import DoctorForm from './_components/doctor-form';
import { retriveExamTypeOptions } from '@/server/exam-type.actions';
import MedicalOrderLaboratoryRoot from './_components/medical-order-laboratory-root';
import MedicalOrderLaboratoryList from './_components/medical-order-laboratory-list';
import MedicalOrderLaboratoryForm from './_components/medical-order-laboratory-form';

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

    const labOptions = await retriveExamTypeOptions();

    return (
        <>
            <ReturnableHeader title='Creacion de orden medica' />
            <MedicalOrderForm
                patient={patient}
                steps={[
                    { description: 'Asignacion de localidad y proceso', icon: 'building' },
                    { description: 'Asignacion de medico', icon: 'doctor' },
                    { description: 'Asignacion de pruebas', icon: 'exam' },
                ]}>
                <OrderSetup
                    corporativeGroupOptions={corporativeGroupOptions}
                    processOptions={processOptions} />
                <DoctorForm options={doctorOptions} />
                <MedicalOrderLaboratoryRoot>
                    <MedicalOrderLaboratoryForm options={labOptions} />
                    <MedicalOrderLaboratoryList />
                </MedicalOrderLaboratoryRoot>
            </MedicalOrderForm>
        </>
    )
}

export default MedicalOrderCreatePage
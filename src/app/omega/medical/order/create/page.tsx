import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import StepperOrderForm from './_components/stepper-order-form';
import OrderSetup from './_components/order-setup';
import DoctorForm from './_components/doctor-form';
import { retriveCorporativesOptions } from '@/server';
import { retriveProcesses } from '@/server';
import { Option } from '@/lib/types/option.type';
import { retriveDoctorsOptions } from '@/server';

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

    const corporatives = await retriveCorporativesOptions();
    const processes = await retriveProcesses();
    const processOptions: Option[] = processes.map((e) => ({ label: e.orderProcess, value: e.orderProcess }));
    const doctorOptions = await retriveDoctorsOptions();

    const corporativeOptions = corporatives.map(e => ({
        ...e,
        children: e.children.map(e => ({
            ...e,
            value: e.label.split('-')[0],
            label: e.label.split('-')[1]
        }))
    }));

    return (
        <>
            <ReturnableHeader title='Creacion de orden medica' />
            <StepperOrderForm
                patientDni={patient}
                initialData={{ doctorFullname: 'NO ESPECIFICA', doctorDni: '0000000000' }}
                headers={[
                    { description: 'Asignacion de localidad y proceso', icon: 'building' },
                    { description: 'Asignacion de medico', icon: 'doctor' },
                ]}>
                <OrderSetup
                    corporativeOptions={corporativeOptions}
                    processOptions={processOptions} />
                <DoctorForm options={[{ label: 'NO ESPECIFICA', value: '0000000000' }, ...doctorOptions]} />
            </StepperOrderForm>
        </>
    )
}

export default MedicalOrderCreatePage
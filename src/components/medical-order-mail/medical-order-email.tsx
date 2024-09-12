import React from 'react'
import MedicalEmailProvider from './medical-email.context';
import MedicalEmailButton from './medical-email-button';
import MedicalEmailSelection from './medical-email-selection';
import { retriveMedicalClientEmail } from '@/server/medical-email.actions';

interface MedicalOrderEmailProps {
    dni: string;
    order: number;
    status: boolean;
}
const MedicalOrderEmail: React.FC<MedicalOrderEmailProps> = async ({
    dni,
    order,
    status
}) => {

    const email = await retriveMedicalClientEmail(dni);

    return (
        <MedicalEmailProvider order={order} values={email}>
            <MedicalEmailSelection />
            <MedicalEmailButton status={status} />
        </MedicalEmailProvider>
    )
}

export default MedicalOrderEmail
import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import { MedicalClient } from '@/server/medical_client/server_types';
import PatientItem from './patient_item';

interface PatientListProps {
    active?: string;
    action?: boolean;
    patients: MedicalClient[];
}
const PatientList: React.FC<PatientListProps> = ({
    active,
    action,
    patients
}) => {
    return (
        <ListTbody>
            {patients.map((e) => (<PatientItem
                key={e.patientDni}
                action={action}
                active={active === e.patientDni}
                {...e} />))}
        </ListTbody>
    )
}

export default PatientList
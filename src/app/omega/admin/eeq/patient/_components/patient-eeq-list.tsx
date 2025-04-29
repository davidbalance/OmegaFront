import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import PatientEeqItem from './patient-eeq-item'
import { MedicalClient } from '@/server/medical-client/server-types';

interface PatientEeqListProps {
    active?: string;
    action?: boolean;
    patients: MedicalClient[];
    removeQueries?: string[];
}
const PatientEeqList: React.FC<PatientEeqListProps> = ({
    active,
    action,
    patients,
    removeQueries = []
}) => {
    return (
        <ListTbody>
            {patients.map((e) => (<PatientEeqItem
                key={e.patientDni}
                action={action}
                active={active === e.patientDni}
                removeQueries={removeQueries}
                {...e} />

            ))}
        </ListTbody>
    )
}

export default PatientEeqList
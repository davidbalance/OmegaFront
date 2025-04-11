import { TableTbody } from '@mantine/core';
import React from 'react'
import DoctorItem from './doctor_item';
import { Doctor } from '@/server/doctor/server-types';

interface DoctorListProps {
    doctors: Doctor[];
}
const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
    return (
        <TableTbody>
            {doctors.map(e => <DoctorItem key={e.userId} {...e} />)}
        </TableTbody>
    )
}

export default DoctorList
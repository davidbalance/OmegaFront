import { retriveUserAttribute } from '@/server/user-attribute.actions';
import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import CompanyAttributeForm from './_components/company-attribute-form';
import { retriveLocation } from '@/server/location.actions';

interface UserActionCompanyPageProps {
    params: { id: number }
}
const DoctorActionCompanyPage: React.FC<UserActionCompanyPageProps> = async ({ params }) => {

    const groups = await retriveLocation();
    const doctorAttribute = await retriveUserAttribute(params.id, 'doctorOf');

    return (
        <>
            <ReturnableHeader title='Asignar empresa' />
            <CompanyAttributeForm
                id={params.id}
                value={doctorAttribute}
                options={groups} />
        </>
    )
}

export default DoctorActionCompanyPage
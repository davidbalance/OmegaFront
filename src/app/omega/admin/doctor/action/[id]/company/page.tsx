import { retriveCorporativeGroups } from '@/app/omega/_actions/corporative-group.actions';
import { retriveUserAttribute } from '@/app/omega/_actions/user-attribute.actions';
import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import CompanyAttributeForm from './_components/company-attribute-form';

interface UserActionCompanyPageProps {
    params: { id: number }
}
const DoctorActionCompanyPage: React.FC<UserActionCompanyPageProps> = async ({ params }) => {

    const groups = await retriveCorporativeGroups();
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
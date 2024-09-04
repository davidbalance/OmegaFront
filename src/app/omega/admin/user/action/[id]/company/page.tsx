import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CompanyAttributeForm from './_components/company-attribute-form'
import { retriveLocation } from '../../../../../../../server/location.actions'
import { retriveUserAttribute } from '../../../../../../../server/user-attribute.actions'

interface UserActionCompanyPageProps {
    params: { id: number }
}
const UserActionCompanyPage: React.FC<UserActionCompanyPageProps> = async ({ params }) => {

    const groups = await retriveLocation();
    const userCompany = await retriveUserAttribute(params.id, 'lookFor');

    return (
        <>
            <ReturnableHeader title='Asignar empresa' />
            <CompanyAttributeForm
                id={params.id}
                value={userCompany}
                options={groups} />
        </>
    )
}

export default UserActionCompanyPage
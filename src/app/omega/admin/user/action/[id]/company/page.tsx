import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CompanyAttributeForm from './_components/company-attribute-form'
import { retriveCorporativeGroups } from '../../../../../_actions/corporative-group.actions'
import { retriveUserAttribute } from '../../../../../_actions/user-attribute.actions'

interface UserActionCompanyPageProps {
    params: { id: number }
}
const UserActionCompanyPage: React.FC<UserActionCompanyPageProps> = async ({ params }) => {

    const groups = await retriveCorporativeGroups();
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
import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CompanyAttributeForm from './_components/company-attribute-form'
import { retriveCorporativeGroups } from '../../../../../_actions/corporative-group.actions'
import { retriveUserAttribute } from '../../../../../_actions/user-attribute.actions'

interface PatientActionCompanyPageProps {
    params: { id: number; }
}

const PatientActionCompanyPage: React.FC<PatientActionCompanyPageProps> = async ({ params }) => {

    const groups = await retriveCorporativeGroups();
    const attribute = await retriveUserAttribute(params.id, 'employeeOf');

    return (
        <>
            <ReturnableHeader title='Asignar empresa' />
            <CompanyAttributeForm
                id={params.id}
                value={attribute}
                options={groups} />
        </>
    )
}

export default PatientActionCompanyPage
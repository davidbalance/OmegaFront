import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CompanyAttributeForm from './_components/company-attribute-form'
import { retriveCorporativeGroupOptions } from '@/server/corporative-group.actions';
import { retriveUserAttribute } from '@/server/user-attribute.actions';

interface PatientActionCompanyPageProps {
    params: { id: number; }
}

const PatientActionCompanyPage: React.FC<PatientActionCompanyPageProps> = async ({ params }) => {

    const groups = await retriveCorporativeGroupOptions();
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
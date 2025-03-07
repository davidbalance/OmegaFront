import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CompanyAttributeForm from './_components/company-attribute-form'
import { retriveCorporativesOptions } from '@/server/corporative/actions'
import { retriveUserAttribute } from '@/server/user_attribute/actions'
import { Option } from '@/lib/types/option.type'
import { CorporativeOption } from '@/server/corporative/server_types'

interface UserActionCompanyPageProps {
    params: { id: string }
}
const UserActionCompanyPage: React.FC<UserActionCompanyPageProps> = async ({ params }) => {

    const options = await retriveCorporativesOptions();
    const attributeValue = await retriveUserAttribute({ userId: params.id, attributeName: 'look_for_company' });

    const corporativeOptions = options.map<CorporativeOption>(e => ({
        ...e,
        children: e.children.map(x => ({
            value: x.label.split('-')[0],
            label: x.label.split('-')[1],
            children: x.children
        }))
    }));

    
    const defaultCorporative = corporativeOptions.find(e => e.children.some(e => e.value === attributeValue?.attributeValue));
    const defaultCompany = defaultCorporative?.children.find(e => e.value === attributeValue?.attributeValue);
    
    return (
        <>
            <ReturnableHeader title='Asignar empresa' />
            <CompanyAttributeForm
                userId={params.id}
                options={corporativeOptions}
                corporativeValue={defaultCorporative?.value}
                companyValue={defaultCompany?.value} />
        </>
    )
}

export default UserActionCompanyPage
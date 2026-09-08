import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CompanyAttributeForm from './_components/company-attribute-form'
import { retriveCorporativesOptions, retriveUserCompanyFilter } from '@/server'
import { CorporativeOption } from '@/server/corporative/server-types'
import CompanyFilter from './_components/company-filter'
import Title from '@/components/_base/mantine/title'
import { rem } from '@mantine/core'

interface UserActionCompanyPageProps {
    params: { id: string }
}
const UserActionCompanyPage: React.FC<UserActionCompanyPageProps> = async ({ params }) => {

    const options = await retriveCorporativesOptions();
    const values = await retriveUserCompanyFilter({ userId: params.id });

    const corporativeOptions = options.map<CorporativeOption>(e => ({
        ...e,
        children: e.children.map(x => ({
            value: `${x.value}--${x.label.split('-')[0]}`,
            label: x.label.split('-')[1],
            children: x.children
        }))
    }));

    return (
        <>
            <ReturnableHeader title='Asignar empresa' />
            <CompanyAttributeForm
                userId={params.id}
                filter={values.data}
                options={corporativeOptions} />

            <Title order={4} mt={rem(16)}>Empresas Filtradas</Title>
            <CompanyFilter data={values.data} />
        </>
    )
}

export default UserActionCompanyPage
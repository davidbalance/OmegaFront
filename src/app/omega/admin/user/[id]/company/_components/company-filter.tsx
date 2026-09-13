import { ModularBox } from '@/components/modular/box/ModularBox'
import { UserCompanyFilter } from '@/server/user-attribute/server-types'
import { rem, Stack } from '@mantine/core'
import React from 'react'
import CompanyFilterItem from './company-filter-item'

type CompanyFilterProps = {
    data: UserCompanyFilter[]
}

const CompanyFilter: React.FC<CompanyFilterProps> = ({
    data
}) => {

    return (
        <Stack gap={rem(8)}>

            {data.map(e => (
                <ModularBox
                    py={rem(16)}
                    px={rem(12)}
                    key={`${e.corporativeId}-${e.companyId}`}>
                    <CompanyFilterItem {...e} />
                </ModularBox>)
            )}
        </Stack>
    )
}

export default CompanyFilter
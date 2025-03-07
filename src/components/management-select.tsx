'use client'

import React, { useMemo } from 'react'
import CascadingSelect, { CascadingSelectValue } from './cascading-select'
import { Option } from '@/lib/types/option.type'

type ManagementSelectProps = Pick<React.ComponentProps<typeof CascadingSelect>, 'onChange'> & {
    options: Option[];
    managementValue?: string;
}
const ManagementSelect: React.FC<ManagementSelectProps> = ({
    options,
    managementValue,
    ...props
}) => {
    const defaultManagement = useMemo(() => options.find(e => e.value === managementValue), [managementValue, options]);

    const managementSelectOption = defaultManagement
        ? ({ label: defaultManagement.label, value: defaultManagement.value, name: 'areaId' })
        : undefined

    return (
        <CascadingSelect
            options={options}
            names={['managementId']}
            labels={['Gerencias']}
            placeholders={["Escoge una gerencia"]}
            defaultValues={[managementSelectOption].filter(e => e !== undefined) as CascadingSelectValue[]}
            {...props}
        />
    )
}

export default ManagementSelect
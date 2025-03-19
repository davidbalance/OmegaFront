'use client'

import React, { useMemo } from 'react'
import CascadingSelect, { CascadingSelectValue } from './cascading-select'
import { Option } from '@/lib/types/option.type'

type JobPositionSelectProps = Pick<React.ComponentProps<typeof CascadingSelect>, 'onChange'> & {
    options: Option[];
    jobPositionValue?: string;
}
const JobPositionSelect: React.FC<JobPositionSelectProps> = ({
    options,
    jobPositionValue,
    ...props
}) => {
    const defaultJobPosition = useMemo(() => options.find(e => e.value === jobPositionValue), [jobPositionValue, options]);

    const jobPositionSelectOption = defaultJobPosition
        ? ({ label: defaultJobPosition.label, value: defaultJobPosition.value, name: 'jobPositionId' })
        : undefined

    return (
        <CascadingSelect
            options={options}
            names={['jobPositionId']}
            labels={['Posiciones de trabajo']}
            placeholders={["Escoge una posicion"]}
            searchable
            defaultValues={[jobPositionSelectOption].filter(e => e !== undefined) as CascadingSelectValue[]}
            {...props}
        />
    )
}

export default JobPositionSelect
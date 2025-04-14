'use client'

import React, { useMemo } from 'react'
import CascadingSelect from './cascading-select'
import { Option } from '@/lib/types/option.type'

type AreaSelectProps = Pick<React.ComponentProps<typeof CascadingSelect>, 'onChange'> & {
    options: Option[];
    areaValue?: string;
}
const AreaSelect: React.FC<AreaSelectProps> = ({
    options,
    areaValue,
    ...props
}) => {
    const defaultArea = useMemo(() => options.find(e => e.value === areaValue), [areaValue, options]);

    const areaSelectOption = defaultArea
        ? ({ name: 'areaId', label: defaultArea.label, value: defaultArea.value })
        : undefined

    return (
        <CascadingSelect
            options={options}
            names={['areaId']}
            labels={['Areas']}
            placeholders={["Escoge un area"]}
            defaultValues={areaSelectOption ? [areaSelectOption].filter(e => !!e) : []}
            searchable
            {...props}
        />
    )
}

export default AreaSelect
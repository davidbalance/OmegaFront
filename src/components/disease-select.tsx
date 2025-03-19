'use client'

import { DiseaseGroupOption } from '@/server/disease_group/server_types'
import React, { useMemo } from 'react'
import CascadingSelect, { CascadingSelectValue } from './cascading-select';

type DiseaseSelectProps = Pick<React.ComponentProps<typeof CascadingSelect>, 'onChange' | 'clean' | 'searchable'> & {
    options: DiseaseGroupOption[];
    groupValue?: string;
    diseaseValue?: string;
    useDisease?: boolean;
}
const DiseaseSelect: React.FC<DiseaseSelectProps> = ({
    options,
    groupValue,
    diseaseValue,
    useDisease,
    ...props
}) => {

    const defaultGroup = useMemo(() => options.find(e => e.value === groupValue), [options, groupValue]);
    const defaultDisease = useMemo(() => useDisease ? defaultGroup?.children.find(e => e.value === diseaseValue) : undefined, [useDisease, defaultGroup, diseaseValue]);

    const groupSelectOption = defaultGroup
        ? ({ label: defaultGroup.label, value: defaultGroup.value, name: 'diseaseGroupId' })
        : undefined

    const diseaseSelectOption = useDisease && defaultDisease
        ? ({ label: defaultDisease.label, value: defaultDisease.value, name: 'diseaseId' })
        : undefined;

    return (
        <CascadingSelect
            options={options}
            maxDepth={useDisease ? undefined : 1}
            names={['diseaseGroupId', 'diseaseId']}
            labels={['Grupo de morbilidades', 'Morbilidades']}
            placeholders={["Escoge un grupo de morbilidades", "Escoge una morbilidad"]}
            defaultValues={[groupSelectOption, diseaseSelectOption].filter(e => e !== undefined) as CascadingSelectValue[]}
            searchable
            {...props}
        />
    )
}

export default DiseaseSelect
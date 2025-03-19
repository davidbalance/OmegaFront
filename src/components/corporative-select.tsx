'use client'

import React, { useMemo } from 'react'
import CascadingSelect, { CascadingSelectValue } from './cascading-select';
import { CorporativeOption } from '@/server/corporative/server_types';

type CoporativeSelectProps = Pick<React.ComponentProps<typeof CascadingSelect>, 'onChange' | 'clean'> & {
    options: CorporativeOption[];
    corporativeValue?: string;
    companyValue?: string;
    branchValue?: string;
    useCompany?: boolean;
    useBranch?: boolean;
}
const CoporativeSelect: React.FC<CoporativeSelectProps> = ({
    options,
    corporativeValue,
    companyValue,
    branchValue,
    useCompany,
    useBranch,
    ...props
}) => {

    const defaultCorporative = useMemo(() => options.find(e => e.value === corporativeValue), [options, corporativeValue]);
    const defaultCompany = useMemo(() => defaultCorporative?.children.find(e => e.value === companyValue), [defaultCorporative, companyValue]);
    const defaultbranch = useMemo(() => defaultCompany?.children.find(e => e.value === branchValue), [defaultCompany, branchValue]);

    const corporativeSelectOption = useMemo(() => defaultCorporative
        ? ({ label: defaultCorporative.label, value: defaultCorporative.value, name: 'corporativeId' })
        : null, [defaultCorporative]);

    const companySelectOption = useMemo(() => useCompany && defaultCompany
        ? ({ label: defaultCompany.label, value: defaultCompany.value, name: 'companyId' })
        : null, [useCompany, defaultCompany]);

    const branchSelectOption = useMemo(() => useBranch && defaultbranch
        ? ({ label: defaultbranch.label, value: defaultbranch.value, name: 'branchId' })
        : null, [useBranch, defaultbranch]);

    const defaultValues: CascadingSelectValue[] = useMemo(
        () => [corporativeSelectOption, companySelectOption, branchSelectOption].filter(e => e !== null) as CascadingSelectValue[],
        [corporativeSelectOption, companySelectOption, branchSelectOption]
    );

    return (
        <CascadingSelect
            options={options}
            maxDepth={useCompany ? (useBranch ? undefined : 2) : 1}
            names={['corporativeId', 'companyId', 'branchId']}
            labels={['Grupo corporativo', 'Empresa', 'Sucursal']}
            placeholders={["Escoge un grupo corporativo", "Escoge una empresa", "Escoge una sucursal"]}
            defaultValues={defaultValues}
            searchable
            {...props}
        />
    )
}

export default CoporativeSelect
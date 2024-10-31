'use client'

import React, { useMemo, useState } from 'react'
import { CompanyOption, CorporativeGroupOption } from '@/lib/dtos/location/corporative/base.response.dto';
import { ComboboxItem, Select } from '@mantine/core';
import { Company } from '@/lib/dtos/location/company.response.dto';
import { Branch } from '@/lib/dtos/location/branch.response.dto';

const CustomSelect = ({
    options,
    onChange,
    ...props
}: {
    name: string;
    value: string | null;
    options: { label: string, value: string }[],
    label: string,
    placeholder: string,
    nothingFoundMessage: string,
    onChange: (item: ComboboxItem) => void;
}) => {
    return (
        <Select
            data={options}
            checkIconPosition="left"
            searchable
            clearable
            defaultDropdownOpened={false}
            maxDropdownHeight={200}
            onChange={(_, e) => onChange(e)}
            {...props}
        />
    );
}

interface LocationInputSelectProps {
    options: CorporativeGroupOption[];
    showCompany?: boolean;
    showBranch?: boolean;
}
const LocationInputSelect: React.FC<LocationInputSelectProps> = ({
    options,
    showBranch,
    showCompany
}) => {

    const [corporativeGroup, setCorporativeGroup] = useState<CorporativeGroupOption | null>(null);
    const [company, setCompany] = useState<CompanyOption | null>(null);
    const [branch, setBranch] = useState<Branch | null>(null);

    const handleCorporativeGroup = (item: ComboboxItem) => {
        setCorporativeGroup(options.find(e => e.name === item.value) || null);
        setCompany(null);
        setBranch(null);
    }

    const handleChangeCompany = (item: ComboboxItem) => {
        setCompany(corporativeGroup?.companies.find(e => e.ruc === item.value) || null);
        setBranch(null);
    }

    const handleChangeBranch = (item: ComboboxItem) => setBranch(company?.branches.find(e => e.name === item.value) || null);

    const groupOptions = useMemo(() => options.map(e => ({ label: e.name, value: e.name })), [options]);
    const companyOptions = useMemo(() => corporativeGroup?.companies.map(e => ({ label: e.name, value: e.ruc })) || [], [corporativeGroup]);
    const branchOptions = useMemo(() => company?.branches.map(e => ({ label: e.name, value: e.name })) || [], [company]);

    return (
        <>
            <CustomSelect
                name='corporativeName'
                label="Grupo corporativo"
                placeholder="Escoge un grupo corporativo"
                nothingFoundMessage="Grupo corporativo no encontrado..."
                options={groupOptions}
                value={corporativeGroup?.name.toString() || null}
                onChange={handleCorporativeGroup} />

            {
                showCompany && <CustomSelect
                    name='companyRuc'
                    label="Empresas"
                    placeholder="Escoge una empresa"
                    nothingFoundMessage="Empresa no encontrada..."
                    options={companyOptions}
                    value={company?.ruc.toString() || null}
                    onChange={handleChangeCompany} />
            }
            {
                showCompany && showBranch && <CustomSelect
                    name='branchName'
                    label="Sucursal"
                    placeholder="Escoge una sucursal"
                    nothingFoundMessage="Sucursal no encontrada..."
                    options={branchOptions}
                    value={branch?.name || null}
                    onChange={handleChangeBranch} />
            }
        </>
    )
}

export default LocationInputSelect
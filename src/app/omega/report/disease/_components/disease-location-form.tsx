'use client'

import React, { useMemo, useState } from 'react'
import { CorporativeGroupOption } from '@/lib/dtos/location/corporative/base.response.dto';
import { ComboboxItem, Select } from '@mantine/core';
import { Company } from '@/lib/dtos/location/company.response.dto';

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

interface DiseaseLocationFormProps {
    options: CorporativeGroupOption[]
}
const DiseaseLocationForm: React.FC<DiseaseLocationFormProps> = ({
    options
}) => {

    const [corporativeGroup, setCorporativeGroup] = useState<CorporativeGroupOption | null>(null);
    const [company, setCompany] = useState<Company | null>(null);

    const handleCorporativeGroup = (item: ComboboxItem) => {
        setCorporativeGroup(options.find(e => e.name === item.value) || null);
        setCompany(null);
    }

    const handleCompany = (item: ComboboxItem) => setCompany(corporativeGroup?.companies.find(e => e.ruc === item.value) || null);

    const groupOptions = useMemo(() => options.map(e => ({ label: e.name, value: e.name })), [options]);
    const companyOptions = useMemo(() => corporativeGroup?.companies.map(e => ({ label: e.name, value: e.ruc })) || [], [corporativeGroup]);

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

            <CustomSelect
                name='companyRuc'
                label="Empresas"
                placeholder="Escoge una empresa"
                nothingFoundMessage="Empresa no encontrada..."
                options={companyOptions}
                value={company?.ruc.toString() || null}
                onChange={handleCompany} />
        </>
    )
}

export default DiseaseLocationForm
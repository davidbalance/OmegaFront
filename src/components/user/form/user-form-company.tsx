import { CorporativeGroup } from '@/lib/dtos/location/corporative/base.response.dto';
import { SelectorOption } from '@/lib/dtos/selector/response.dto';
import { Box, Button, ComboboxItem, Select, rem } from '@mantine/core';
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

const CustomSelect = ({ onChange, ...props }: {
    value: string | undefined;
    data: { label: string, value: string }[];
    nothingFoundMessage: string;
    label: string;
    placeholder: string;
    name: string;
    onChange: (option: ComboboxItem) => void;
}) => {
    return (
        <Select
            checkIconPosition="left"
            pb={rem(16)}
            searchable
            defaultDropdownOpened={false}
            allowDeselect={false}
            maxDropdownHeight={200}
            onChange={(_, value) => onChange(value)}
            {...props}
        />
    );
}

interface UserFormCompanyProps {
    options: CorporativeGroup[];
    value?: string | undefined;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}
const UserFormCompany = React.forwardRef<HTMLFormElement, UserFormCompanyProps>(({
    value,
    options,
    onSubmit
}, ref) => {

    const [group, setGroup] = useState<CorporativeGroup | null>(null);
    const [company, setCompany] = useState<SelectorOption<string> | null>(null);

    const handleChangeEventGroup = useCallback((value: ComboboxItem) => {
        setGroup(options.find(e => e.id === Number(value.value)) || null);
        setCompany(null);
    }, [options]);

    const handleChangeEventCompany = (value: ComboboxItem) => {
        setCompany({ key: value.value, label: value.label });
    }

    useEffect(() => {
        for (const group of options) {
            for (const company of group.companies) {
                if (company.ruc === value) {
                    setGroup(group);
                    setCompany({ key: company.ruc, label: company.name });
                    return;
                }
            }
        }
    }, [value, options]);

    const groupOptions = useMemo(() => options.map(e => ({ value: e.id.toString(), label: e.name })), [options]);
    const companyOptions = useMemo(() => group?.companies.map(e => ({ value: e.ruc, label: e.name })) ?? [], [group]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={onSubmit}>
            <CustomSelect
                name='group'
                value={group?.id.toString()}
                data={groupOptions}
                onChange={handleChangeEventGroup}
                label="Grupo corporativo"
                placeholder="Escoge un grupo corporativo"
                nothingFoundMessage="Grupo de corporativo no encontrado..."
            />
            <CustomSelect
                name='company'
                value={company?.key}
                data={companyOptions}
                onChange={handleChangeEventCompany}
                label="Empresa"
                placeholder="Escoge una empresa"
                nothingFoundMessage="Empresa no encontrada..."
            />
            <Button type='submit' style={{ display: 'none' }}></Button>
        </Box>
    )
})

export { UserFormCompany }
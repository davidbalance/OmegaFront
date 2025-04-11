'use client'
import OmegaSelect from '@/components/omega_select';
import { Option } from '@/lib/types/option.type';
import { CorporativeOption } from '@/server/corporative/server-types';
import { Box, Button, ComboboxItem, rem } from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react'

interface UserFormCompanyProps extends Omit<React.HTMLProps<HTMLFormElement>, 'ref'> {
    options: CorporativeOption[];
    value?: string | undefined;
}
const UserFormCompany = React.forwardRef<HTMLFormElement, UserFormCompanyProps>(({
    value,
    options,
    ...props
}, ref) => {

    const [group, setGroup] = useState<Option & { children: Option[] } | null>(null);
    const [company, setCompany] = useState<Option | null>(null);

    const handleChangeEventGroup = useCallback((option: ComboboxItem) => {
        setGroup(options.find(e => e.value === option.value) || null);
        setCompany(null);
    }, [options]);

    const handleChangeEventCompany = (value: ComboboxItem) => {
        setCompany(value);
    }

    useEffect(() => {
        for (const group of options) {
            for (const company of group.children) {
                if (company.value === value) {
                    setGroup(group);
                    setCompany(company);
                    return;
                }
            }
        }
    }, [value, options]);

    return (
        <Box
            ref={ref}
            component='form'
            mt={rem(16)}
            px={rem(16)}
            {...props}>
            <OmegaSelect
                name='group'
                value={group?.value.toString() || null}
                data={options}
                onChange={handleChangeEventGroup}
                label="Grupo corporativo"
                placeholder="Escoge un grupo corporativo"
                nothingFoundMessage="Grupo de corporativo no encontrado..."
            />
            <OmegaSelect
                name='company'
                value={company?.value || null}
                data={group?.children}
                onChange={handleChangeEventCompany}
                label="Empresa"
                placeholder="Escoge una empresa"
                nothingFoundMessage="Empresa no encontrada..."
            />
            <Button type='submit' style={{ display: 'none' }}></Button>
        </Box>
    )
})

UserFormCompany.displayName = 'UserFormCompany';

export default UserFormCompany;
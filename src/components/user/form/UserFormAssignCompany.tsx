import { useFetch } from '@/hooks/useFetch';
import { CorporativeGroup } from '@/lib/dtos/location/corporative/group.response.dto';
import { SelectorOption } from '@/lib/dtos/selector/response.dto';
import { Box, Button, ComboboxItem, LoadingOverlay, Select, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

interface UserFormAssignCompanyProps {
    /**
     * Valor que es usado para inicializar el formulario.
     */
    value?: string;
    /**
     * Funcion que es invocada cuando es enviado el formulario.
     * @param value 
     * @returns 
     */
    onFormSubmittion?: (value: string) => void;
}
const UserFormAssignCompany = React.forwardRef<HTMLButtonElement, UserFormAssignCompanyProps>(({ value, onFormSubmittion }, ref) => {

    const [corporativeGroupSelected, setCorporativeGroupSelected] = useState<CorporativeGroup | null>(null);
    const [companySelected, setCompanySelected] = useState<SelectorOption<string> | null>(null);

    const {
        data: fetchCorporativeGroups,
        error: corporativeGroupError,
        loading: corporativeGroupLoading
    } = useFetch<CorporativeGroup[]>('/api/corporative/groups', 'GET');

    const corporativeGroupOptions = useMemo(() => fetchCorporativeGroups?.map(e => ({ value: `${e.id}`, label: e.name })) || [], [fetchCorporativeGroups]);
    const companyOptions = useMemo(() => corporativeGroupSelected?.companies.map(e => ({ value: e.ruc, label: e.name })) || [], [corporativeGroupSelected]);

    const handleChangeEventCorporativeGroup = useCallback((_: string | null, value: ComboboxItem) => {
        setCorporativeGroupSelected(fetchCorporativeGroups?.find(e => e.id === parseInt(value.value)) || null);
        setCompanySelected(null);
    }, [fetchCorporativeGroups]);

    const handleChangeEventCompany = useCallback((_: string | null, value: ComboboxItem) => {
        setCompanySelected({ key: value.value, label: value.label });
    }, []);

    const handleFormSubmittion = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (companySelected) {
            onFormSubmittion?.(companySelected.key);
        } else {
            notifications.show({ message: 'No se ha seleccionado ninguna empresa', color: 'red' });
        }
    }, [companySelected, onFormSubmittion]);

    useEffect(() => {
        if (value && fetchCorporativeGroups) {
            for (const group of fetchCorporativeGroups) {
                for (const company of group.companies) {
                    if (company.ruc === value) {
                        setCorporativeGroupSelected(group);
                        setCompanySelected({ key: company.ruc, label: company.name });
                        return;
                    }
                }
            }
        }
    }, [value, fetchCorporativeGroups])


    useEffect(() => {
        if (corporativeGroupError) notifications.show({ message: corporativeGroupError.message, color: 'red' });
    }, [corporativeGroupError]);

    return (
        <Box component='form' onSubmit={handleFormSubmittion}>
            <LoadingOverlay visible={corporativeGroupLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Select
                value={corporativeGroupSelected ? `${corporativeGroupSelected.id}` : null}
                data={corporativeGroupOptions}
                checkIconPosition="left"
                onChange={handleChangeEventCorporativeGroup}
                label="Grupo corporativo"
                pb={rem(16)}
                placeholder="Escoge un grupo corporativo"
                searchable
                defaultDropdownOpened={false}
                nothingFoundMessage="Grupo de corporativo no encontrado..."
                allowDeselect={false}
                maxDropdownHeight={200}
            />
            <Select
                value={companySelected?.key}
                data={companyOptions}
                checkIconPosition="left"
                onChange={handleChangeEventCompany}
                label="Empresa"
                pb={rem(16)}
                placeholder="Escoge una empresa"
                searchable
                defaultDropdownOpened={false}
                nothingFoundMessage="Empresa no encontrada..."
                allowDeselect={false}
                maxDropdownHeight={200}
            />
            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
})

UserFormAssignCompany.displayName = 'UserFormAssignCompany';

export { UserFormAssignCompany }
'use client'

import React, { useCallback, useMemo } from 'react'
import ModularLayout from '@/components/modular/layout/ModularLayout';
import createOrderSchema from '../_schema/create-order.schema';
import { CorporativeGroupOption } from '@/lib/dtos/location/corporative/base.response.dto';
import { Box, Select, SimpleGrid } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';

type OrderSetupProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref'> & {
    corporativeGroupOptions: CorporativeGroupOption[];
    processOptions: string[];
    data?: {
        branchName: string,
        companyName: string,
        companyRuc: string,
        corporativeName: string,
        process: string,
    }
};
const OrderSetup = React.forwardRef<HTMLFormElement, OrderSetupProps>(({
    corporativeGroupOptions,
    processOptions,
    data,
    onSubmit,
    ...props
}, ref) => {

    const form = useForm({
        initialValues: {
            corporativeName: data?.corporativeName ?? '',
            companyRuc: data?.companyRuc ?? '',
            branchName: data?.branchName ?? '',
            process: data?.process ?? '',
        },
        validate: joiResolver(createOrderSchema)
    });

    const companies = useMemo(() => corporativeGroupOptions.find(e => e.name === form.values.corporativeName)?.companies || [], [corporativeGroupOptions, form.values.corporativeName]);
    const branches = useMemo(() => companies.find(e => e.ruc === form.values.companyRuc)?.branches || [], [companies, form.values.companyRuc]);

    const handleSubmit = useCallback((data: any, event: any) => {
        onSubmit?.(event);
    }, [companies, onSubmit]);

    return (
        <Box
            component='form'
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}
            {...props}>
            <ModularLayout>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <Select
                        data={corporativeGroupOptions.map(e => ({ value: e.name, label: e.name }))}
                        label="Grupo corporativo"
                        placeholder="Escoge un grupo corporativo"
                        nothingFoundMessage="Grupo corporativo no encontrado..."
                        checkIconPosition="left"
                        defaultDropdownOpened={false}
                        clearable
                        maxDropdownHeight={200}
                        name='corporativeName'
                        {...form.getInputProps('corporativeName')} />
                    <Select
                        data={companies.map(e => ({ value: e.ruc, label: e.name }))}
                        label="Empresas"
                        placeholder="Escoge una empresa"
                        nothingFoundMessage="Empresa no encontrado..."
                        checkIconPosition="left"
                        defaultDropdownOpened={false}
                        searchable
                        clearable
                        maxDropdownHeight={200}
                        name='companyRuc'
                        {...form.getInputProps('companyRuc')} />
                    <input type='hidden' name='companyName' value={companies.find(e => form.values.companyRuc === e.ruc)?.name ?? data?.companyName ?? ''} />
                    <Select
                        data={branches.map(e => ({ value: e.name, label: e.name }))}
                        label="Sucursales"
                        placeholder="Escoge una sucursal"
                        nothingFoundMessage="Sucursal no encontrada..."
                        checkIconPosition="left"
                        clearable
                        defaultDropdownOpened={false}
                        maxDropdownHeight={200}
                        name='branchName'
                        {...form.getInputProps('branchName')} />
                </SimpleGrid>
                <Select
                    data={processOptions.map(e => ({ value: e, label: e }))}
                    checkIconPosition="left"
                    label="Proceso"
                    placeholder="Post-Ocupacional"
                    defaultDropdownOpened={false}
                    maxDropdownHeight={200}
                    name='process'
                    {...form.getInputProps('process')} />
            </ModularLayout>
        </Box>
    )
});

export default OrderSetup
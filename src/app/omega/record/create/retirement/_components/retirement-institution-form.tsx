'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import RetirementInstitutionSchema from '../_schemas/retirement-institution.schema'
import { z } from 'zod';
import { Box, Divider, rem, SimpleGrid, Stack, TextInput } from '@mantine/core';
import CorporativeSelect from '@/components/corporative-select';
import { CorporativeOption } from '@/server/corporative/server_types';
import GenderSelector from '@/components/gender-selector';
import { CascadingSelectValue } from '@/components/cascading-select';

type RetirementInstitutionFormProps = {
    data?: Partial<z.infer<typeof RetirementInstitutionSchema>>,
    options: CorporativeOption[],
    onSubmit?: (value: z.infer<typeof RetirementInstitutionSchema>) => void;
}
const RetirementInstitutionForm = React.forwardRef<HTMLFormElement, RetirementInstitutionFormProps>(({
    data,
    options,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof RetirementInstitutionSchema>>({
        initialValues: {
            companyName: data?.companyName ?? '',
            companyRUC: data?.companyRUC ?? '',
            companyCIU: data?.companyCIU ?? '',
            institutionHealthFacility: data?.institutionHealthFacility ?? 'Omega Salud Ocupacional',
            patientFirstName: data?.patientFirstName ?? '',
            patientMiddleName: data?.patientMiddleName ?? '',
            patientLastName: data?.patientLastName ?? '',
            patientSecondLastName: data?.patientSecondLastName ?? '',
            patientGender: data?.patientGender ?? 'male',
            workStartDate: new Date(),
            workingTime: 0,
            workingEndDate: new Date(),
            jobPosition: data?.jobPosition ?? '',
        },
        validate: zodResolver(RetirementInstitutionSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof RetirementInstitutionSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleCorporativeChange = useCallback((selectedPath: CascadingSelectValue[]) => form.setValues(prev => {
        const updatedValues = { ...prev };
        selectedPath.forEach(({ name, label, value }) => {
            if (name === 'companyId') {
                updatedValues.companyName = label;
                updatedValues.companyRUC = value;
            }
        });
        return updatedValues;
    }), [form]);

    const defaultCorporative = useMemo(() => options.find(e => e.children.some(x => x.value === data?.companyRUC))?.value ?? undefined, [options, data?.companyRUC]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ position: 'relative', width: '100%', height: '100%' }}>

            <input type='hidden' {...form.getInputProps('institutionHealthFacility')} />
            <input type='hidden' {...form.getInputProps('patientLastName')} />
            <input type='hidden' {...form.getInputProps('patientSecondLastName')} />
            <input type='hidden' {...form.getInputProps('patientFirstName')} />
            <input type='hidden' {...form.getInputProps('patientMiddleName')} />
            <input type='hidden' {...form.getInputProps('patientGender')} />

            <Stack gap={rem(16)}>
                <Divider label='Institucion' />
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <CorporativeSelect
                        options={options}
                        corporativeValue={defaultCorporative}
                        companyValue={data?.companyRUC}
                        useCompany
                        onChange={handleCorporativeChange} />
                    <TextInput
                        label="CIU"
                        placeholder="CIU"
                        {...form.getInputProps('companyCIU')} />
                </SimpleGrid>

                <TextInput
                    label="PUESTO DE TRABAJO"
                    placeholder='eg. Gerente'
                    {...form.getInputProps('jobPosition')} />
            </Stack>
        </Box>
    )
});

RetirementInstitutionForm.displayName = 'RetirementInstitutionForm';

export default RetirementInstitutionForm
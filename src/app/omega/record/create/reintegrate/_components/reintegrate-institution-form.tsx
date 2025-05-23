'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import ReintegrateInstitutionSchema from '../_schemas/reintegrate-institution.schema'
import { z } from 'zod';
import { Box, rem, SimpleGrid, Stack, Textarea, TextInput } from '@mantine/core';
import CorporativeSelect from '@/components/corporative-select';
import { CorporativeOption } from '@/server/corporative/server-types';
import { DateInput } from '@mantine/dates';
import { CascadingSelectValue } from '@/components/cascading-select';

type ReintegrateInstitutionFormProps = {
    data?: Partial<z.infer<typeof ReintegrateInstitutionSchema>>,
    options: CorporativeOption[],
    onSubmit?: (value: z.infer<typeof ReintegrateInstitutionSchema>) => void;
}
const ReintegrateInstitutionForm = React.forwardRef<HTMLFormElement, ReintegrateInstitutionFormProps>(({
    data,
    options,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof ReintegrateInstitutionSchema>>({
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
            patientAge: data?.patientAge ?? 0,
            jobPosition: data?.jobPosition ?? '',
            workingEndDate: data?.workingEndDate ?? new Date(),
            workingReintegrationDate: data?.workingReintegrationDate ?? new Date(),
            workingTime: data?.workingTime ?? 0,
            workingLeftCause: data?.workingLeftCause ?? '',
        },
        validate: zodResolver(ReintegrateInstitutionSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof ReintegrateInstitutionSchema>) => {
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
            <input type='hidden' {...form.getInputProps('patientFirstName')} />
            <input type='hidden' {...form.getInputProps('patientMiddleName')} />
            <input type='hidden' {...form.getInputProps('patientLastName')} />
            <input type='hidden' {...form.getInputProps('patientSecondLastName')} />
            <input type='hidden'{...form.getInputProps('patientGender')} />
            <input type='hidden'{...form.getInputProps('patientAge')} />

            <Stack gap={rem(16)}>
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

                <SimpleGrid cols={{ base: 1, sm: 4 }}>
                    <TextInput
                        label="PUESTO DE TRABAJO"
                        placeholder='eg. Gerente'
                        {...form.getInputProps('jobPosition')} />
                    <DateInput
                        label='FECHA DEL ULTIMO DIA LABORAL'
                        {...form.getInputProps('workingEndDate')} />
                    <DateInput
                        label='FECHA DE REINGRESO'
                        {...form.getInputProps('workingReintegrationDate')} />
                    <TextInput
                        label="TOTAL (dias)"
                        type='number'
                        min={0}
                        {...form.getInputProps('workingTime')} />
                </SimpleGrid>

                <Textarea
                    label="Causa de Salida"
                    rows={5}
                    {...form.getInputProps('workingLeftCause')} />
            </Stack>
        </Box>
    )
});

ReintegrateInstitutionForm.displayName = 'ReintegrateInstitutionForm';

export default ReintegrateInstitutionForm
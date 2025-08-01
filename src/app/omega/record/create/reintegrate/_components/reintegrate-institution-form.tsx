'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import ReintegrateInstitutionSchema, { adjustInitialValues } from '../_schemas/reintegrate-institution.schema'
import { z } from 'zod';
import { Box, rem, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
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
        initialValues: adjustInitialValues(data),
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
        <>
            <Title order={3}>Datos del establecimiento</Title>
            <Title order={5} c="dimmed">Empresa y usuario</Title>
            <Box
                mt={rem(16)}
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
                            label="CIIU"
                            placeholder="CIIU"
                            {...form.getInputProps('companyCIIU')} />
                    </SimpleGrid>

                    <SimpleGrid cols={{ base: 1, sm: 4 }}>
                        <TextInput
                            label="Puesto de trabajo"
                            placeholder='eg. Gerente'
                            {...form.getInputProps('jobPosition')} />
                        <DateInput
                            label='Fecha del último día laboral'
                            {...form.getInputProps('workingEndDate')} />
                        <DateInput
                            label='Fecha de reingreso'
                            {...form.getInputProps('workingReintegrationDate')} />
                        <TextInput
                            label="Total (días)"
                            type='number'
                            min={0}
                            {...form.getInputProps('workingTime')} />
                    </SimpleGrid>

                    <Textarea
                        label="Causa de salida"
                        rows={5}
                        {...form.getInputProps('workingLeftCause')} />
                </Stack>
            </Box>
        </>
    )
});

ReintegrateInstitutionForm.displayName = 'ReintegrateInstitutionForm';

export default ReintegrateInstitutionForm
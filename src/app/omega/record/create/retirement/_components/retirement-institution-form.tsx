'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import RetirementInstitutionSchema, { adjustInitialValues } from '../_schemas/retirement-institution.schema'
import { z } from 'zod';
import { Box, Divider, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import CorporativeSelect from '@/components/corporative-select';
import { CorporativeOption } from '@/server/corporative/server-types';
import { CascadingSelectValue } from '@/components/cascading-select';
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';

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
        initialValues: adjustInitialValues(data),
        validate: zodResolver(RetirementInstitutionSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof RetirementInstitutionSchema>) => {
        console.log(dayjs(value.workStartDate).diff(value.workingEndDate, 'M'));
        onSubmit?.({ ...value, workingTime: dayjs(value.workingEndDate).diff(value.workStartDate, 'M') });
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
                <input type='hidden' {...form.getInputProps('patientLastName')} />
                <input type='hidden' {...form.getInputProps('patientSecondLastName')} />
                <input type='hidden' {...form.getInputProps('patientFirstName')} />
                <input type='hidden' {...form.getInputProps('patientMiddleName')} />
                <input type='hidden' {...form.getInputProps('patientGender')} />
                <input type='hidden' {...form.getInputProps('workingTime')} />

                <Stack gap={rem(16)}>
                    <Divider label='Institución' />
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

                    <SimpleGrid cols={{ base: 1, sm: 3 }}>

                        <DateInput
                            label='Fecha de inicio de labores'
                            {...form.getInputProps('workStartDate')} />
                        <DateInput
                            label='Fecha de salida'
                            {...form.getInputProps('workingEndDate')} />
                        <TextInput
                            label="Puesto de trabajo"
                            placeholder='eg. Gerente'
                            {...form.getInputProps('jobPosition')} />

                    </SimpleGrid>
                </Stack>
            </Box>
        </>
    )
});

RetirementInstitutionForm.displayName = 'RetirementInstitutionForm';

export default RetirementInstitutionForm
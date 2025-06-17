'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import PeridicInstitutionSchema from '../_schemas/periodic-institution.schema'
import { z } from 'zod';
import { Box, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import CorporativeSelect from '@/components/corporative-select';
import { CorporativeOption } from '@/server/corporative/server-types';
import { CascadingSelectValue } from '@/components/cascading-select';

type PeriodicInstitutionFormProps = {
    data?: Partial<z.infer<typeof PeridicInstitutionSchema>>,
    options: CorporativeOption[],
    onSubmit?: (value: z.infer<typeof PeridicInstitutionSchema>) => void;
}
const PeriodicInstitutionForm = React.forwardRef<HTMLFormElement, PeriodicInstitutionFormProps>(({
    data,
    options,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof PeridicInstitutionSchema>>({
        initialValues: {
            companyName: data?.companyName ?? '',
            companyRUC: data?.companyRUC ?? '',
            companyCIIU: data?.companyCIIU ?? '',
            institutionHealthFacility: data?.institutionHealthFacility ?? 'Omega Salud Ocupacional',
            patientFirstName: data?.patientFirstName ?? '',
            patientMiddleName: data?.patientMiddleName ?? '',
            patientLastName: data?.patientLastName ?? '',
            patientSecondLastName: data?.patientSecondLastName ?? '',
            patientGender: data?.patientGender ?? 'male',
            jobPosition: data?.jobPosition ?? '',
        },
        validate: zodResolver(PeridicInstitutionSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof PeridicInstitutionSchema>) => {
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

                <input type='hidden' {...form.getInputProps('patientLastName')} />
                <input type='hidden' {...form.getInputProps('patientSecondLastName')} />
                <input type='hidden' {...form.getInputProps('patientFirstName')} />
                <input type='hidden' {...form.getInputProps('patientMiddleName')} />
                <input type='hidden' {...form.getInputProps('patientGender')} />
                <input type='hidden' {...form.getInputProps('institutionHealthFacility')} />

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

                    <TextInput
                        label="Puesto de trabajo"
                        placeholder='eg. Gerente'
                        {...form.getInputProps('jobPosition')} />
                </Stack>
            </Box>
        </>
    )
});

PeriodicInstitutionForm.displayName = 'PeriodicInstitutionForm';

export default PeriodicInstitutionForm
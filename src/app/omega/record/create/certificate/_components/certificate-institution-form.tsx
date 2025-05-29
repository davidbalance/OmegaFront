'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import CertificateInstitutionSchema, { adjustInitialValues } from '../_schemas/certificate-institution.schema'
import { z } from 'zod';
import { Box, Divider, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import CorporativeSelect from '@/components/corporative-select';
import { CorporativeOption } from '@/server/corporative/server-types';
import { CascadingSelectValue } from '@/components/cascading-select';

type CertificateInstitutionFormProps = {
    data?: Partial<z.infer<typeof CertificateInstitutionSchema>>,
    options: CorporativeOption[],
    onSubmit?: (value: z.infer<typeof CertificateInstitutionSchema>) => void;
}
const CertificateInstitutionForm = React.forwardRef<HTMLFormElement, CertificateInstitutionFormProps>(({
    data,
    options,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof CertificateInstitutionSchema>>({
        initialValues: adjustInitialValues(data),
        validate: zodResolver(CertificateInstitutionSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof CertificateInstitutionSchema>) => {
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
            <Title order={5} c="dimmed">Empresa y Usuario</Title>
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
                            label="CIIU"
                            placeholder="CIIU"
                            {...form.getInputProps('companyCIIU')} />
                    </SimpleGrid>

                    <TextInput
                        label="PUESTO DE TRABAJO"
                        placeholder='eg. Gerente'
                        {...form.getInputProps('jobPosition')} />
                </Stack>
            </Box>
        </>
    )
});

CertificateInstitutionForm.displayName = 'CertificateInstitutionForm';

export default CertificateInstitutionForm
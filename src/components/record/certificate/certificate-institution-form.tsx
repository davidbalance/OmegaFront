'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import { Box, Divider, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import CorporativeSelect from '@/components/corporative-select';
import { CorporativeOption } from '@/server/corporative/server-types';
import { CascadingSelectValue } from '@/components/cascading-select';
import InstitutionSchema, { adjustInitialValues, InstitutionSchemaType } from '@/server/record/create-record/certificate/institution.schema';

type CertificateInstitutionFormProps = {
    data?: Partial<InstitutionSchemaType>,
    options: CorporativeOption[],
    onSubmit?: (value: InstitutionSchemaType) => void;
}
const CertificateInstitutionForm = React.forwardRef<HTMLFormElement, CertificateInstitutionFormProps>(({
    data,
    options,
    onSubmit
}, ref) => {

    const { setValues, onSubmit: formSubmit, getInputProps } = useForm<InstitutionSchemaType>({
        initialValues: adjustInitialValues(data),
        validate: zodResolver(InstitutionSchema)
    });

    const handleSubmit = useCallback((value: InstitutionSchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleCorporativeChange = useCallback((selectedPath: CascadingSelectValue[]) => setValues(prev => {
        const updatedValues = { ...prev };
        selectedPath.forEach(({ name, label, value }) => {
            if (name === 'companyId') {
                updatedValues.establishment = {
                    ...updatedValues.establishment!,
                    institutionName: label,
                    ruc: value
                }
            }
        });
        return updatedValues;
    }), [setValues]);

    const defaultCorporative = useMemo(() => options.find(e => e.children.some(x => x.value === data?.establishment?.ruc))?.value ?? undefined, [options, data?.establishment?.ruc]);

    return (
        <>
            <Title order={3}>Datos del establecimiento</Title>
            <Title order={5} c="dimmed">Empresa y usuario</Title>
            <Box
                ref={ref}
                component='form'
                onSubmit={formSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>

                <input type='hidden' {...getInputProps('establishment.healthFacility')} />
                <input type='hidden' {...getInputProps('patient.firstName')} />
                <input type='hidden' {...getInputProps('patient.middleName')} />
                <input type='hidden' {...getInputProps('patient.lastName')} />
                <input type='hidden' {...getInputProps('patient.secondLastName')} />
                <input type='hidden' {...getInputProps('patient.gender')} />

                <Stack gap={rem(16)}>
                    <Divider label='Institución' />
                    <SimpleGrid cols={{ base: 1, sm: 3 }}>
                        <CorporativeSelect
                            options={options}
                            corporativeValue={defaultCorporative}
                            companyValue={data?.establishment?.ruc}
                            useCompany
                            onChange={handleCorporativeChange} />
                        <TextInput
                            label="CIIU"
                            placeholder="CIIU"
                            {...getInputProps('establishment.ciiu')} />
                    </SimpleGrid>

                    <TextInput
                        label="Puesto de trabajo"
                        placeholder='eg. Gerente'
                        {...getInputProps('patient.jobPosition')} />
                </Stack>
            </Box>
        </>
    )
});

CertificateInstitutionForm.displayName = 'CertificateInstitutionForm';

export default CertificateInstitutionForm
'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import InitialInstitutionSchema, { adjustInitialValue } from '../_schemas/initial-institution.schema'
import { z } from 'zod';
import { Box, Divider, rem, Select, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import CorporativeSelect from '@/components/corporative-select';
import { CorporativeOption } from '@/server/corporative/server-types';
import { Option } from '@/lib/types/option.type';
import { DateInput } from '@mantine/dates';
import { CascadingSelectValue } from '@/components/cascading-select';

const BloodGroupOptions: Option[] = [
    { label: 'ARh+', value: 'ARh+' },
    { label: 'ARh-', value: 'ARh-' },
    { label: 'BRh+', value: 'BRh+' },
    { label: 'BRh-', value: 'BRh-' },
    { label: 'ORh+', value: 'ORh+' },
    { label: 'ORh-', value: 'ORh-' },
    { label: 'ABRh+', value: 'ABRh+' },
    { label: 'ABRh-', value: 'ABRh-' },
    { label: 'Desconoce', value: 'Desconoce' },
]
const ReligionOptions: Option[] = [
    { label: 'Católica', value: 'catholic' },
    { label: 'Evangélica', value: 'evangelical' },
    { label: 'Testigos de Jehová', value: "jehovah's witnesses" },
    { label: 'Mormona', value: 'mormon' },
    { label: 'Otros', value: 'other' }
]
const LateralityOptions: Option[] = [
    { label: 'Diestro', value: 'right' },
    { label: 'Zurdo', value: 'left' }
]
const SexualOrientationOptions: Option[] = [
    { label: 'Heterosexual', value: 'heterosexual' },
    { label: 'Lesbiana', value: 'lesbian' },
    { label: 'Gay', value: 'gay' },
    { label: 'Bisexual', value: "bisexual" },
    { label: 'No sabe / No responde', value: 'unknown' }
]

const GenderIdentityOptions: Option[] = [
    { label: 'Masculino', value: 'male' },
    { label: 'Femenino', value: 'female' },
    { label: 'Trans femenino', value: "trans-female" },
    { label: 'Trans masculino', value: 'trans-male' },
    { label: 'No sabe / No responde', value: 'unknown' }
]

type InitialInstitutionFormProps = {
    data?: Partial<z.infer<typeof InitialInstitutionSchema>>,
    options: CorporativeOption[],
    onSubmit?: (value: z.infer<typeof InitialInstitutionSchema>) => void;
}
const InitialInstitutionForm = React.forwardRef<HTMLFormElement, InitialInstitutionFormProps>(({
    data,
    options,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof InitialInstitutionSchema>>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(InitialInstitutionSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof InitialInstitutionSchema>) => {
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
    const hasDisability = useMemo(() => form.values.patientDisabilityType && form.values.patientDisabilityType.trim().length, [form.values.patientDisabilityType])

    return (
        <>
            <Title order={3}>Datos del establecimiento</Title>
            <Title order={5} c="dimmed">Empresa y usuario</Title>
            <Box
                ref={ref}
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Stack gap={rem(16)}>
                    <input type='hidden' {...form.getInputProps('institutionHealthFacility')} />
                    <input type='hidden' {...form.getInputProps('patientLastName')} />
                    <input type='hidden' {...form.getInputProps('patientSecondLastName')} />
                    <input type='hidden' {...form.getInputProps('patientFirstName')} />
                    <input type='hidden' {...form.getInputProps('patientMiddleName')} />
                    <input type='hidden' {...form.getInputProps('patientAge')} />
                    <input type='hidden' {...form.getInputProps('patientGender')} />

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

                    <Divider label='Paciente' />
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <Select
                            data={BloodGroupOptions}
                            checkIconPosition="left"
                            label="Grupo sanguíneo"
                            placeholder="eg. A"
                            defaultDropdownOpened={false}
                            maxDropdownHeight={200}
                            {...form.getInputProps('patientBloodType')} />

                        <Select
                            data={LateralityOptions}
                            checkIconPosition="left"
                            label="Lateralidad"
                            placeholder="eg. Diestro"
                            defaultDropdownOpened={false}
                            maxDropdownHeight={200}
                            {...form.getInputProps('patientLaterality')} />
                    </SimpleGrid>

                    <SimpleGrid cols={{ base: 1, sm: 3 }}>
                        <Stack component='div' gap={rem(4)}>
                            <Select
                                data={ReligionOptions}
                                checkIconPosition="left"
                                label="Religión"
                                placeholder="eg. Catologica"
                                defaultDropdownOpened={false}
                                maxDropdownHeight={200}
                                {...form.getInputProps('patientReligion')} />
                        </Stack>
                        <Stack component='div' gap={rem(4)}>
                            <Select
                                data={SexualOrientationOptions}
                                checkIconPosition="left"
                                label="Orientación sexual"
                                placeholder="eg. Catologica"
                                defaultDropdownOpened={false}
                                maxDropdownHeight={200}
                                {...form.getInputProps('patientSexualOrientation')} />
                        </Stack>
                        <Select
                            data={GenderIdentityOptions}
                            checkIconPosition="left"
                            label="Identidad de género"
                            placeholder="eg. Masculino"
                            defaultDropdownOpened={false}
                            maxDropdownHeight={200}
                            {...form.getInputProps('patientGenderIdentity')} />
                    </SimpleGrid>

                    <SimpleGrid cols={{ base: hasDisability ? 2 : 1 }}>
                        <TextInput
                            label="Tipo de discapacidad"
                            placeholder="eg. Discapacidad..."
                            {...form.getInputProps('patientDisabilityType')} />
                        {hasDisability && <TextInput
                            label="Porcentaje de discapacidad"
                            type='number'
                            step={1}
                            min={1}
                            max={100}
                            {...form.getInputProps('patientDisabilityPercent')} />}
                    </SimpleGrid>

                    <Divider label='Trabajo' />
                    <SimpleGrid cols={{ base: 1, sm: 3 }}>
                        <DateInput
                            label='Ingreso al trabajo'
                            {...form.getInputProps('institutionJobStartDate')} />
                        <TextInput
                            label="Puesto de trabajo"
                            placeholder='eg. Gerente'
                            {...form.getInputProps('institutionJobPosition')} />
                        <TextInput
                            label="Área de trabajo"
                            placeholder='eg. Marketing'
                            {...form.getInputProps('institutionJobArea')} />
                    </SimpleGrid>

                    <Textarea
                        label="Actividad de trabajo"
                        placeholder='eg. Gestión de control...'
                        rows={5}
                        {...form.getInputProps('institutionJobActivities')} />
                </Stack>
            </Box>
        </>
    )
});

InitialInstitutionForm.displayName = 'InitialInstitutionForm';

export default InitialInstitutionForm
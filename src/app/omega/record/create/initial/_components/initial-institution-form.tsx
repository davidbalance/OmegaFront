'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import InitialInstitutionSchema from '../_schemas/initial-institution.schema'
import { z } from 'zod';
import { Box, Button, Divider, rem, ScrollArea, Select, SimpleGrid, Stack, Textarea, TextInput } from '@mantine/core';
import CorporativeSelect from '@/components/corporative-select';
import { CorporativeOption } from '@/server/corporative/server_types';
import GenderSelector from '@/components/gender-selector';
import { Option } from '@/lib/types/option.type';
import { DateInput } from '@mantine/dates';
import { CascadingSelectValue } from '@/components/cascading-select';

const BloodGroupOptions: Option[] = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
]
const ReligionOptions: Option[] = [
    { label: 'Catolica', value: 'catholic' },
    { label: 'Evangelica', value: 'evangelical' },
    { label: 'Testigos de Jeová', value: "jehovah's witnesses" },
    { label: 'Mormona', value: 'mormon' },
    { label: 'Otros', value: 'other' }
]
const SexualOrientationOptions: Option[] = [
    { label: 'Lesbica', value: 'lesbian' },
    { label: 'Gay', value: 'gay' },
    { label: 'Bisexual', value: "bisexual" },
    { label: 'Heterosexual', value: 'heterosexual' },
    { label: 'Otros', value: 'other' }
]

const GenderIdentityOptions: Option[] = [
    { label: 'Masculino', value: 'male' },
    { label: 'Femenino', value: 'female' },
    { label: 'Trans Femenino', value: "trans-female" },
    { label: 'Trans Masculino', value: 'trans-male' },
    { label: 'No sabe/No response', value: 'other' }
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
            patientReligion: data?.patientReligion ?? 'catholic',
            patientOtherReligion: data?.patientOtherReligion ?? '',
            patientBloodType: data?.patientBloodType ?? 'A+',
            patientLaterality: data?.patientLaterality ?? '',
            patientSexualOrientation: data?.patientSexualOrientation ?? 'lesbian',
            patientOtherSexualOrientation: data?.patientOtherSexualOrientation ?? '',
            patientGenderIdentity: data?.patientGenderIdentity ?? 'male',
            patientOtherGenderIdentity: data?.patientOtherGenderIdentity ?? '',
            patientDisabilityType: data?.patientDisabilityType ?? '',
            patientDisabilityPercent: data?.patientDisabilityPercent ?? 0,
            jobStartDate: data?.jobStartDate ?? new Date(),
            jobPosition: data?.jobPosition ?? '',
            jobArea: data?.jobArea ?? '',
            jobActivity: data?.jobActivity ?? '',
        },
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

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Stack gap={rem(16)}>
                <Divider label='Institucion' />
                <SimpleGrid cols={{ base: 1, sm: 4 }}>
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
                    <TextInput
                        disabled
                        label="ESTABLECIMIENTO DE SALUD"
                        placeholder="eg. Omega"
                        {...form.getInputProps('institutionHealthFacility')} />
                </SimpleGrid>

                <Divider label='Paciente - Datos Generales' />
                <SimpleGrid cols={{ base: 1, sm: 4 }}>
                    <TextInput
                        label="PRIMER APELLIDO"
                        placeholder="eg. Nuñez"
                        {...form.getInputProps('patientLastName')} />
                    <TextInput
                        label="SEGUNDO APELLIDO"
                        placeholder="eg. Nuñez"
                        {...form.getInputProps('patientSecondLastName')} />
                    <TextInput
                        label="PRIMER NOMBRE"
                        placeholder="eg. Manuel"
                        {...form.getInputProps('patientFirstName')} />
                    <TextInput
                        label="SEGUNDO NOMBRE"
                        placeholder="eg. Manuel"
                        {...form.getInputProps('patientMiddleName')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 4 }}>
                    <GenderSelector
                        label='SEXO'
                        {...form.getInputProps('patientGender')} />
                    <TextInput
                        disabled
                        label="EDAD"
                        type='number'
                        {...form.getInputProps('patientAge')} />
                    <Select
                        data={BloodGroupOptions}
                        checkIconPosition="left"
                        label="GRUPO SANGUINEO"
                        placeholder="eg. A"
                        defaultDropdownOpened={false}
                        maxDropdownHeight={200}
                        {...form.getInputProps('patientBloodType')} />
                    <TextInput
                        label="LATERALIDAD"
                        placeholder="eg. Lateralidad"
                        {...form.getInputProps('patientLaterality')} />
                </SimpleGrid>

                <Divider label='Paciente' />
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <Stack component='div' gap={rem(4)}>
                        <Select
                            data={ReligionOptions}
                            checkIconPosition="left"
                            label="RELIGION"
                            placeholder="eg. Catologica"
                            defaultDropdownOpened={false}
                            maxDropdownHeight={200}
                            {...form.getInputProps('patientReligion')} />
                        {
                            form.values.patientReligion === 'other' && <TextInput
                                label="OTRA RELIGION"
                                placeholder="eg. Pastafarianismo"
                                {...form.getInputProps('patientOtherReligion')} />
                        }
                    </Stack>
                    <Stack component='div' gap={rem(4)}>
                        <Select
                            data={SexualOrientationOptions}
                            checkIconPosition="left"
                            label="ORIENTACION SEXUAL"
                            placeholder="eg. Catologica"
                            defaultDropdownOpened={false}
                            maxDropdownHeight={200}
                            {...form.getInputProps('patientSexualOrientation')} />
                        {
                            form.values.patientSexualOrientation === 'other' && <TextInput
                                label="OTRA ORIENTACION SEXUAL"
                                placeholder="eg. Gay"
                                {...form.getInputProps('patientOtherSexualOrientation')} />
                        }
                    </Stack>
                    <Select
                        data={GenderIdentityOptions}
                        checkIconPosition="left"
                        label="IDENTIDAD DE GENERO"
                        placeholder="eg. Masculino"
                        defaultDropdownOpened={false}
                        maxDropdownHeight={200}
                        {...form.getInputProps('patientGenderIdentity')} />
                </SimpleGrid>

                <SimpleGrid cols={{ base: 2 }}>
                    <TextInput
                        label="TIPO DE DISCAPACIDAD"
                        placeholder="eg. Discapacidad..."
                        {...form.getInputProps('patientDisabilityType')} />
                    <TextInput
                        label="PORCENTAJE DE DISCAPACIDAD"
                        type='number'
                        step={0.01}
                        min={0}
                        max={100}
                        {...form.getInputProps('patientDisabilityPercent')} />
                </SimpleGrid>

                <Divider label='Trabajo' />
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <DateInput
                        label='INGRESO AL TRABAJO'
                        {...form.getInputProps('jobStartDate')} />
                    <TextInput
                        label="PUESTO DE TRABAJO"
                        placeholder='eg. Gerente'
                        {...form.getInputProps('jobPosition')} />
                    <TextInput
                        label="AREA DE TRABAJO"
                        placeholder='eg. Marketing'
                        {...form.getInputProps('jobArea')} />
                </SimpleGrid>

                <Textarea
                    label="ACTIVIDAD DE TRABAJO"
                    placeholder='eg. Gestion el control...'
                    {...form.getInputProps('jobActivity')} />
            </Stack>
        </Box>
    )
});

InitialInstitutionForm.displayName = 'InitialInstitutionForm';

export default InitialInstitutionForm
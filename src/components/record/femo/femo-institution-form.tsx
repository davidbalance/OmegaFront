'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import { Box, Checkbox, Divider, Group, rem, Select, SimpleGrid, Stack, Text, Textarea, TextInput, Title } from '@mantine/core';
import CorporativeSelect from '@/components/corporative-select';
import { CorporativeOption } from '@/server/corporative/server-types';
import { Option } from '@/lib/types/option.type';
import { CascadingSelectValue } from '@/components/cascading-select';
import InstitutionSchema, { InstitutionSchemaType, PATIENT_BLOOD_GROUP_ABRh_MINUS, PATIENT_BLOOD_GROUP_ABRh_PLUS, PATIENT_BLOOD_GROUP_ARh_MINUS, PATIENT_BLOOD_GROUP_ARh_PLUS, PATIENT_BLOOD_GROUP_BRh_MINUS, PATIENT_BLOOD_GROUP_BRh_PLUS, PATIENT_BLOOD_GROUP_ORh_MINUS, PATIENT_BLOOD_GROUP_ORh_PLUS, PATIENT_GENDER_FEMALE, PATIENT_GENDER_MALE, PATIENT_LATERALITY_LEFT, PATIENT_LATERALITY_RIGHT, PRIORITY_GROUP_CATASTROFIC_ILLNESS, PRIORITY_GROUP_DISABILITY, PRIORITY_GROUP_ELDERLY, PRIORITY_GROUP_PREGNANT, adjustInitialValue } from '@/server/record/create-record/femo/institution.schema';

const BloodGroupOptions: Option[] = [
    { label: PATIENT_BLOOD_GROUP_ARh_PLUS, value: PATIENT_BLOOD_GROUP_ARh_PLUS },
    { label: PATIENT_BLOOD_GROUP_ARh_MINUS, value: PATIENT_BLOOD_GROUP_ARh_MINUS },
    { label: PATIENT_BLOOD_GROUP_BRh_PLUS, value: PATIENT_BLOOD_GROUP_BRh_PLUS },
    { label: PATIENT_BLOOD_GROUP_BRh_MINUS, value: PATIENT_BLOOD_GROUP_BRh_MINUS },
    { label: PATIENT_BLOOD_GROUP_ORh_PLUS, value: PATIENT_BLOOD_GROUP_ORh_PLUS },
    { label: PATIENT_BLOOD_GROUP_ORh_MINUS, value: PATIENT_BLOOD_GROUP_ORh_MINUS },
    { label: PATIENT_BLOOD_GROUP_ABRh_PLUS, value: PATIENT_BLOOD_GROUP_ABRh_PLUS },
    { label: PATIENT_BLOOD_GROUP_ABRh_MINUS, value: PATIENT_BLOOD_GROUP_ABRh_MINUS }
]

const LateralityOptions: Option[] = [
    { label: 'Diestro', value: PATIENT_LATERALITY_RIGHT },
    { label: 'Zurdo', value: PATIENT_LATERALITY_LEFT }
]

const PriorityGroupOptions: Option[] = [
    { label: "Embarazada", value: PRIORITY_GROUP_PREGNANT },
    { label: "Persona con Discapacidad", value: PRIORITY_GROUP_DISABILITY },
    { label: "Enfermedad Catástrofica", value: PRIORITY_GROUP_CATASTROFIC_ILLNESS },
    { label: "Adulto Mayor", value: PRIORITY_GROUP_ELDERLY },
]

type FemoInstitutionFormProps = {
    data?: Partial<InstitutionSchemaType>,
    options: CorporativeOption[],
    onSubmit?: (value: InstitutionSchemaType) => void;
}
const FemoInstitutionForm = React.forwardRef<HTMLFormElement, FemoInstitutionFormProps>(({
    data,
    options,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, setValues, getInputProps, values } = useForm<InstitutionSchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(InstitutionSchema)
    });

    const selectedPriorityGroups: string[] = values.patient.priorityGroup ?? [];

    const handleSubmit = useCallback((value: InstitutionSchemaType) => {
        console.log(value)
        onSubmit?.(value);
    }, [onSubmit]);

    const handleCorporativeChange = (selectedPath: CascadingSelectValue[]) => setValues(prev => {
        const updatedValues = { ...prev };
        selectedPath.forEach(({ name, label, value }) => {
            if (name === 'companyId') {
                updatedValues.establishment = {
                    ...updatedValues.establishment!,
                    healthFacility: label,
                    ruc: value
                }
            }
        });
        return updatedValues;
    })

    const handlePriorityGroup = (value: string, remove: boolean) => setValues(prev => {
        let priorityGroup: string[] = []
        const currentPriorityGroup: string[] = prev.patient?.priorityGroup ?? []
        if (remove) {
            priorityGroup = currentPriorityGroup.filter(e => e != value)
        } else {
            priorityGroup = [...currentPriorityGroup, value]
        }
        return {
            ...prev, patient: {
                ...prev.patient!,
                priorityGroup: priorityGroup
            }
        }
    });

    const defaultCorporative = useMemo(() =>
        options.find(e => e.children.
            some(x => x.value === data?.establishment?.ruc))?.value ?? undefined,
        [options, data?.establishment?.ruc]);

    return (
        <>
            <Title order={3}>Datos del establecimiento</Title>
            <Title order={5} c="dimmed">Empresa y usuario</Title>
            <Box
                ref={ref}
                component='form'
                onSubmit={formSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Stack gap={rem(16)}>
                    <input type='hidden' {...getInputProps('establishment.institutionName')} />
                    <input type='hidden' {...getInputProps('patient.firstName')} />
                    <input type='hidden' {...getInputProps('patient.middleName')} />
                    <input type='hidden' {...getInputProps('patient.lastName')} />
                    <input type='hidden' {...getInputProps('patient.secondLastName')} />
                    <input type='hidden' {...getInputProps('patient.gender')} />

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

                    <Divider label='Paciente' />

                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <Group gap={16} align='center'>
                            <Text fw={700}>Grupo de Atención Prioritaria</Text>
                            <Stack gap={2}>
                                {PriorityGroupOptions.map(item => <Checkbox
                                    key={item.value}
                                    label={item.label}
                                    checked={selectedPriorityGroups.includes(item.value)}
                                    onChange={(e) => handlePriorityGroup(item.value, !e.target.checked)} />)}
                            </Stack>
                        </Group>

                        <Stack>
                            <Select
                                data={BloodGroupOptions}
                                checkIconPosition="left"
                                label="Grupo sanguíneo"
                                placeholder="eg. A"
                                defaultDropdownOpened={false}
                                maxDropdownHeight={200}
                                {...getInputProps('patient.bloodGroup')} />

                            <Select
                                data={LateralityOptions}
                                checkIconPosition="left"
                                label="Lateralidad"
                                placeholder="eg. Diestro"
                                defaultDropdownOpened={false}
                                maxDropdownHeight={200}
                                {...getInputProps('patient.laterality')} />
                        </Stack>
                    </SimpleGrid>
                </Stack>
            </Box>
        </>
    )
});

FemoInstitutionForm.displayName = 'FemoInstitutionForm';

export default FemoInstitutionForm
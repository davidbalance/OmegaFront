'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import { ActionIcon, Box, Divider, Flex, rem, Select, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import DiagnosisSchema, { DEFAULT_DIAGNOSIS, DIAGNOSIS_DEF_OPTION, DIAGNOSIS_PRE_OPTION, DiagnosisSchemaType, adjustInitialValue } from '@/server/record/create-record/femo/diagnosis.schema';
import { Option } from '@/lib/types/option.type';

const MAX_DIAGNOSES_LENGTH = 6

const diagnosesOptions: Option[] = [
    { label: "Presuntivo", value: DIAGNOSIS_PRE_OPTION },
    { label: "Definitivo", value: DIAGNOSIS_DEF_OPTION },
]

type FemoDiagnosisFormProps = {
    data?: Partial<DiagnosisSchemaType>;
    onSubmit?: (value: DiagnosisSchemaType) => void;
}
const FemoDiagnosisForm = React.forwardRef<HTMLFormElement, FemoDiagnosisFormProps>(({
    data,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, getInputProps, setValues, values: formValues } = useForm<DiagnosisSchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(DiagnosisSchema)
    });

    const diagnoses = useMemo(() => formValues.diagnoses ?? [], [formValues])

    const handleSubmit = useCallback((value: DiagnosisSchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = () => setValues(prev => (prev.diagnoses?.length ?? 0) < MAX_DIAGNOSES_LENGTH ? ({
        ...prev,
        diagnoses: [...(prev.diagnoses ?? []), DEFAULT_DIAGNOSIS]
    }) : prev);

    const handleRemove = (index: number) => setValues(prev => ({
        ...prev,
        diagnoses: [...(prev.diagnoses?.slice(0, index) ?? []), ...(prev.diagnoses?.slice(index + 1) ?? [])]
    }));

    return (
        <>
            <Title order={3}>Diagnóstico</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={formSubmit(handleSubmit)}>
                <Stack gap={rem(32)}>
                    {diagnoses.map((_, i) => (
                        <Stack key={`root-${i}`} gap={rem(16)}>
                            <Flex gap={rem(8)}>
                                {diagnoses.length - 1 === i && diagnoses.length < MAX_DIAGNOSES_LENGTH && (
                                    <ActionIcon
                                        w="100%"
                                        variant='light'
                                        onClick={handleAdd}>
                                        <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>)}
                                {diagnoses.length > 1 && i < MAX_DIAGNOSES_LENGTH && (
                                    <ActionIcon variant='light'
                                        w="100%"
                                        onClick={() => handleRemove(i)}>
                                        <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>)}
                            </Flex>
                            <Stack flex={1} style={{ minWidth: 0 }}>

                                <SimpleGrid cols={{ base: 1, md: 3 }}>
                                    <TextInput
                                        label='CIE-10'
                                        {...getInputProps(`diagnoses.${i}.cie`)} />
                                    <TextInput
                                        placeholder="eg. Lorem Ipsum..."
                                        label="Descripción"
                                        {...getInputProps(`diagnoses.${i}.description`)} />
                                    <Select
                                        data={diagnosesOptions}
                                        checkIconPosition="left"
                                        label="Diagnóstico"
                                        placeholder="eg. Presuntivo"
                                        defaultDropdownOpened={false}
                                        maxDropdownHeight={200}
                                        allowDeselect={false}
                                        {...getInputProps(`diagnoses.${i}.diagnosis`)} />
                                </SimpleGrid>
                                {(diagnoses.length > 1 && i < diagnoses.length - 1) && <Divider />}
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Box >
        </>
    )
});

FemoDiagnosisForm.displayName = 'FemoDiagnosisForm';

export default FemoDiagnosisForm
'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import { Box, Flex, Group, Radio, RadioGroup, rem, Select, Stack, Text, Title } from '@mantine/core';
import GeneralDataSchema, { adjustInitialValues, GENERAL_DATA_EVALUATION_TYPE_ENTRY, GENERAL_DATA_EVALUATION_TYPE_PERIODIC, GENERAL_DATA_EVALUATION_TYPE_RETIREMENT, GENERAL_DATA_EVALUATION_TYPE_RETURN, GeneralDataSchemaType } from '@/server/record/create-record/certificate/general-data.schema';
import { Option } from '@/lib/types/option.type';

const GeneralDataEvaluationTypeOptions: Option[] = [
    { label: 'Ingreso', value: GENERAL_DATA_EVALUATION_TYPE_ENTRY },
    { label: 'Periódico', value: GENERAL_DATA_EVALUATION_TYPE_PERIODIC },
    { label: 'Reintegro', value: GENERAL_DATA_EVALUATION_TYPE_RETURN },
    { label: 'Retiro', value: GENERAL_DATA_EVALUATION_TYPE_RETIREMENT },
]

type CertificateGeneralDataFormProps = {
    data?: Partial<GeneralDataSchemaType>,
    onSubmit?: (value: GeneralDataSchemaType) => void;
}
const CertificateGeneralDataForm = React.forwardRef<HTMLFormElement, CertificateGeneralDataFormProps>(({
    data,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, getInputProps } = useForm<GeneralDataSchemaType>({
        initialValues: adjustInitialValues(data),
        validate: zodResolver(GeneralDataSchema)
    });

    const handleSubmit = useCallback((value: GeneralDataSchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);


    return (
        <>
            <Title order={3}>Datos generales</Title>
            <Box
                mt={rem(16)}
                ref={ref}
                component='form'
                onSubmit={formSubmit(handleSubmit)}>

                <Stack gap={rem(16)}>
                    <Select
                        data={GeneralDataEvaluationTypeOptions}
                        checkIconPosition="left"
                        label="Evaluación"
                        placeholder="eg. Ingreso"
                        defaultDropdownOpened={false}
                        maxDropdownHeight={200}
                        allowDeselect={false}
                        {...getInputProps('generalDataEvaluation')} />
                </Stack>
            </Box>
        </>
    )
});

CertificateGeneralDataForm.displayName = 'CertificateGeneralDataForm';

export default CertificateGeneralDataForm
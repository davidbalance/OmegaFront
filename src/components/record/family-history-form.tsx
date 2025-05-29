'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useState } from 'react'
import FamilyHistorySchema, { adjustInitialValues } from './schemas/family-history.schema'
import { z } from 'zod';
import { Box, Flex, Grid, GridCol, rem, Stack, Switch, Textarea, Title } from '@mantine/core';

const options: z.infer<typeof FamilyHistorySchema> = {
    familyHistoryCardioVascular: "ENFERMEDAD CARDIO-VASCULAR",
    familyHistoryMetabolic: "ENFERMEDAD METABOLICA",
    familyHistoryNeurologic: "ENFERMEDAD NEUROLOGICA",
    familyHistoryOncologic: "ENFERMEDAD ONCOLOGICA",
    familyHistoryInfectious: "ENFERMEDAD INFECCIOSA",
    familyHistoryHereditary: "ENFERMEDAD HEREDITARIA / CONGENITA",
    familyHistoryDisability: "DISCAPACIDADES",
    familyHistoryOther: "OTROS",
}

type FamilyHistoryFormProps = {
    data?: Partial<z.infer<typeof FamilyHistorySchema>>;
    onSubmit?: (value: z.infer<typeof FamilyHistorySchema>) => void;
}
const FamilyHistoryForm = React.forwardRef<HTMLFormElement, FamilyHistoryFormProps>(({
    data,
    onSubmit
}, ref) => {

    const [switches, setSwitches] = useState<Record<keyof z.infer<typeof FamilyHistorySchema>, boolean>>({
        familyHistoryCardioVascular: !!data?.familyHistoryCardioVascular,
        familyHistoryMetabolic: !!data?.familyHistoryMetabolic,
        familyHistoryNeurologic: !!data?.familyHistoryNeurologic,
        familyHistoryOncologic: !!data?.familyHistoryOncologic,
        familyHistoryInfectious: !!data?.familyHistoryInfectious,
        familyHistoryHereditary: !!data?.familyHistoryHereditary,
        familyHistoryDisability: !!data?.familyHistoryDisability,
        familyHistoryOther: !!data?.familyHistoryOther,
    });

    const form = useForm<z.infer<typeof FamilyHistorySchema>>({
        initialValues: adjustInitialValues(data),
        validate: zodResolver(FamilyHistorySchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof FamilyHistorySchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleSwitchChange = useCallback((key: keyof z.infer<typeof FamilyHistorySchema>, value: boolean) => {
        setSwitches(prev => ({ ...prev, [key]: value }));
        if (!value) form.setFieldValue(key, '');
    }, [form]);

    return (
        <>
            <Title order={3}>Antecedentes Familiares</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Grid>
                    <GridCol span={4}>
                        <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                            {Object.entries(options).map(([key, value]) => (
                                <Switch
                                    key={key}
                                    label={value}
                                    checked={switches[key as keyof z.infer<typeof FamilyHistorySchema>]}
                                    onChange={e => handleSwitchChange(key as keyof z.infer<typeof FamilyHistorySchema>, e.target.checked)} />
                            ))}
                        </Flex>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(32)}
                            align='start' w='100%'>
                            {Object.entries(options).map(([key, value]) => (
                                switches[key as keyof z.infer<typeof FamilyHistorySchema>] &&
                                <Textarea
                                    key={key}
                                    w='100%'
                                    rows={5}
                                    label={value}
                                    placeholder="Escriba la observacion aqui"
                                    {...form.getInputProps(key)} />
                            ))}
                        </Stack>
                    </GridCol>
                </Grid>
            </Box>
        </>

    )
});

FamilyHistoryForm.displayName = 'FamilyHistoryForm';

export default FamilyHistoryForm
'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useState } from 'react'
import FamilyHistorySchema from './schemas/family-history.schema'
import { z } from 'zod';
import { Flex, Grid, GridCol, rem, Stack, Switch, Textarea } from '@mantine/core';

type FamilyHistoryFormProps = {
    data?: Partial<z.infer<typeof FamilyHistorySchema>>;
    onSubmit?: (value: z.infer<typeof FamilyHistorySchema>) => void;
}
const FamilyHistoryForm = React.forwardRef<HTMLFormElement, FamilyHistoryFormProps>(({
    data,
    onSubmit
}, ref) => {

    const [familyHistoryCardioVascular, setFamilyHistoryCardioVascular] = useState<boolean>(!!data?.familyHistoryCardioVascular);
    const [familyHistoryMetabolic, setFamilyHistoryMetabolic] = useState<boolean>(!!data?.familyHistoryMetabolic);
    const [familyHistoryNeurologic, setFamilyHistoryNeurologic] = useState<boolean>(!!data?.familyHistoryNeurologic);
    const [familyHistoryOncologic, setFamilyHistoryOncologic] = useState<boolean>(!!data?.familyHistoryOncologic);
    const [familyHistoryInfectious, setFamilyHistoryInfectious] = useState<boolean>(!!data?.familyHistoryInfectious);
    const [familyHistoryHereditary, setFamilyHistoryHereditary] = useState<boolean>(!!data?.familyHistoryHereditary);
    const [familyHistoryDisability, setFamilyHistoryDisability] = useState<boolean>(!!data?.familyHistoryDisability);
    const [familyHistoryOther, setFamilyHistoryOther] = useState<boolean>(!!data?.familyHistoryOther);

    const form = useForm<z.infer<typeof FamilyHistorySchema>>({
        initialValues: {
            familyHistoryCardioVascular: data?.familyHistoryCardioVascular ?? '',
            familyHistoryMetabolic: data?.familyHistoryMetabolic ?? '',
            familyHistoryNeurologic: data?.familyHistoryNeurologic ?? '',
            familyHistoryOncologic: data?.familyHistoryOncologic ?? '',
            familyHistoryInfectious: data?.familyHistoryInfectious ?? '',
            familyHistoryHereditary: data?.familyHistoryHereditary ?? '',
            familyHistoryDisability: data?.familyHistoryDisability ?? '',
            familyHistoryOther: data?.familyHistoryOther ?? '',
        },
        validate: zodResolver(FamilyHistorySchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof FamilyHistorySchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
                <GridCol span={4}>
                    <Flex direction={{ base: 'row', md: 'column' }} gap={rem(8)}>
                        <Switch
                            label="ENFERMEDAD CARDIO-VASCULAR"
                            checked={familyHistoryCardioVascular}
                            onChange={e => setFamilyHistoryCardioVascular(e.target.checked)} />
                        <Switch
                            label="ENFERMEDAD METABOLICA"
                            checked={familyHistoryMetabolic}
                            onChange={e => setFamilyHistoryMetabolic(e.target.checked)} />
                        <Switch
                            label="ENFERMEDAD NEUROLOGICA"
                            checked={familyHistoryNeurologic}
                            onChange={e => setFamilyHistoryNeurologic(e.target.checked)} />
                        <Switch
                            label="ENFERMEDAD ONCOLOGICA"
                            checked={familyHistoryOncologic}
                            onChange={e => setFamilyHistoryOncologic(e.target.checked)} />
                        <Switch
                            label="ENFERMEDAD INFECCIOSA"
                            checked={familyHistoryInfectious}
                            onChange={e => setFamilyHistoryInfectious(e.target.checked)} />
                        <Switch
                            label="ENFERMEDAD HEREDITARIA / CONGENITA"
                            checked={familyHistoryHereditary}
                            onChange={e => setFamilyHistoryHereditary(e.target.checked)} />
                        <Switch
                            label="DISCAPACIDADES"
                            checked={familyHistoryDisability}
                            onChange={e => setFamilyHistoryDisability(e.target.checked)} />
                        <Switch
                            label="OTROS"
                            checked={familyHistoryOther}
                            onChange={e => setFamilyHistoryOther(e.target.checked)} />
                    </Flex>
                </GridCol>
                <GridCol span={8}>
                    <Stack
                        gap={rem(32)}
                        align='start' w='100%'>
                        {familyHistoryCardioVascular && <Textarea
                            w='100%'
                            rows={5}
                            label="ENFERMEDAD CARDIO-VASCULAR"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('familyHistoryCardioVascular')} />}
                        {familyHistoryMetabolic && <Textarea
                            w='100%'
                            rows={5}
                            label="ENFERMEDAD METABOLICA"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('familyHistoryMetabolic')} />}
                        {familyHistoryNeurologic && <Textarea
                            w='100%'
                            rows={5}
                            label="ENFERMEDAD NEUROLOGICA"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('familyHistoryNeurologic')} />}
                        {familyHistoryOncologic && <Textarea
                            w='100%'
                            rows={5}
                            label="ENFERMEDAD ONCOLOGICA"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('familyHistoryOncologic')} />}
                        {familyHistoryInfectious && <Textarea
                            w='100%'
                            rows={5}
                            label="ENFERMEDAD INFECCIOSA"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('familyHistoryInfectious')} />}
                        {familyHistoryHereditary && <Textarea
                            w='100%'
                            rows={5}
                            label="ENFERMEDAD HEREDITARIA / CONGENITA"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('familyHistoryHereditary')} />}
                        {familyHistoryDisability && <Textarea
                            w='100%'
                            rows={5}
                            label="DISCAPACIDADES"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('familyHistoryDisability')} />}
                        {familyHistoryOther && <Textarea
                            w='100%'
                            rows={5}
                            label="OTROS"
                            placeholder="Escriba la observacion aqui"
                            {...form.getInputProps('familyHistoryOther')} />}
                    </Stack>
                </GridCol>
            </Grid>
        </form >
    )
});

FamilyHistoryForm.displayName = 'FamilyHistoryForm';

export default FamilyHistoryForm
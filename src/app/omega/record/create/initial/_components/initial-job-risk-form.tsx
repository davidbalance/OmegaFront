'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialJobRiskSchema, { defaultJobRisk } from '../_schemas/initial-job-risk.schema'
import { z } from 'zod';
import { ActionIcon, Box, Checkbox, Divider, Grid, GridCol, Group, rem, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { optionsBiological, optionsChemical, optionsErgonomic, optionsMechanical, optionsPhysical, optionsPsychosocial } from '../_libs/option-fields';

type InitialJobRiskFormProps = {
    data?: Partial<z.infer<typeof InitialJobRiskSchema>>;
    onSubmit?: (value: z.infer<typeof InitialJobRiskSchema>) => void;
}
const InitialJobRiskForm = React.forwardRef<HTMLFormElement, InitialJobRiskFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof InitialJobRiskSchema>>({
        initialValues: {
            jobRisks: data?.jobRisks ?? [defaultJobRisk]
        },
        validate: zodResolver(InitialJobRiskSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof InitialJobRiskSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = useCallback(() => {
        form.setValues(prev => ({ ...prev, jobRisks: [...(prev.jobRisks ?? []), defaultJobRisk] }));
    }, [form]);

    const handleRemove = useCallback((index: number) => {
        form.setValues(prev => ({ ...prev, jobRisks: [...(prev.jobRisks?.slice(0, index) ?? []), ...(prev.jobRisks?.slice(index + 1) ?? [])] }));
    }, [form]);

    return (
        <>
            <Title order={3}>Factores de riesgo del trabajo actual</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={rem(32)}>
                    {form.values.jobRisks.map((e, i) =>
                        <Grid key={i}>
                            <GridCol span={1}>
                                <Group
                                    h="100%"
                                    justify='center'
                                    align='center'
                                    gap={rem(8)}>
                                    {form.values.jobRisks.length - 1 === i && <ActionIcon
                                        variant='light'
                                        onClick={handleAdd}>
                                        <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>}
                                    {form.values.jobRisks.length > 1
                                        && <ActionIcon variant='light'
                                            onClick={() => handleRemove(i)}>
                                            <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                        </ActionIcon>}
                                </Group>
                            </GridCol>
                            <GridCol span={11}>
                                <SimpleGrid cols={3}>
                                    <TextInput
                                        label="Puesto de trabajo / Área"
                                        placeholder="eg. Gerente / Marketing"
                                        {...form.getInputProps(`jobRisks.${i}.name`)} />
                                    <TextInput
                                        label="Actividades"
                                        placeholder="eg. Desempeña..."
                                        {...form.getInputProps(`jobRisks.${i}.activity`)} />
                                    <TextInput
                                        label="Medidas preventivas"
                                        placeholder="eg. Desempeña..."
                                        {...form.getInputProps(`jobRisks.${i}.preventiveMeasure`)} />
                                </SimpleGrid>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Físico</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsPhysical).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsPhysical] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Mecánico</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsMechanical).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsMechanical] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Químico</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsChemical).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsChemical] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Biológico</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsBiological).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsBiological] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Ergonómico</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsErgonomic).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsErgonomic] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            <GridCol span={2}>
                                <Title mb={rem(8)} order={6}>Psicosocial</Title>
                                <Stack gap={8}>
                                    {
                                        Object.entries(optionsPsychosocial).map(([key, value]) => (
                                            <Checkbox
                                                key={key}
                                                label={value}
                                                checked={e[key as keyof typeof optionsPsychosocial] as any}
                                                {...form.getInputProps(`jobRisks.${i}.${key}`)} />
                                        ))
                                    }
                                </Stack>
                            </GridCol>
                            {form.values.jobRisks.length > 1 &&
                                <GridCol span={12}>
                                    <Divider />
                                </GridCol>}
                        </Grid>
                    )}
                </Stack>
            </Box>
        </>
    )
});

InitialJobRiskForm.displayName = 'InitialJobRiskForm';

export default InitialJobRiskForm
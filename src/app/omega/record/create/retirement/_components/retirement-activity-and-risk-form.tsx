'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import RetirementActivityAndRiskSchema from '../_schemas/retirement-activity-and-risk.schema'
import { z } from 'zod';
import { ActionIcon, Box, Button, ButtonGroup, Divider, Group, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

const defaultActivityRisk = {
    activity: '',
    risk: '',
}

type RetirementActivityAndRiskFormProps = {
    data?: Partial<z.infer<typeof RetirementActivityAndRiskSchema>>;
    onSubmit?: (value: z.infer<typeof RetirementActivityAndRiskSchema>) => void;
}
const RetirementActivityAndRiskForm = React.forwardRef<HTMLFormElement, RetirementActivityAndRiskFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof RetirementActivityAndRiskSchema>>({
        initialValues: {
            institutionActivities: data?.institutionActivities ?? [defaultActivityRisk]
        },
        validate: zodResolver(RetirementActivityAndRiskSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof RetirementActivityAndRiskSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = useCallback(() => {
        form.setValues(prev => ({ ...prev, institutionActivities: [...(prev.institutionActivities ?? []), defaultActivityRisk] }));
    }, [form]);

    const handleRemove = useCallback((index: number) => {
        form.setValues(prev => ({ ...prev, institutionActivities: [...(prev.institutionActivities?.slice(0, index) ?? []), ...(prev.institutionActivities?.slice(index + 1) ?? [])] }));
    }, [form]);

    return (
        <>
            <Title order={3}>Datos del establecimiento</Title>
            <Title order={5} c="dimmed">Actividades y Factores de Riesgo</Title>
            <Box
                mt={rem(16)}
                ref={ref}
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Stack gap={rem(32)}>
                    {form.values.institutionActivities.map((e, i) =>
                        <Stack key={i}>
                            <Group key={i} component='div' w='100%'>
                                <Stack
                                    gap={rem(16)}>
                                    {form.values.institutionActivities.length - 1 === i && <ActionIcon
                                        variant='light'
                                        onClick={handleAdd}>
                                        <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>}
                                    {form.values.institutionActivities.length > 1
                                        && <ActionIcon variant='light'
                                            onClick={() => handleRemove(i)}>
                                            <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                        </ActionIcon>}
                                </Stack>
                                <SimpleGrid cols={2} spacing={rem(32)} flex={1}>
                                    <TextInput
                                        label="ACTIVIDAD"
                                        placeholder="eg. Gerente / Marketing"
                                        {...form.getInputProps(`institutionActivities.${i}.activity`)} />
                                    <TextInput
                                        label="FACTOR DE RIESGO"
                                        placeholder="eg. Desempeña..."
                                        {...form.getInputProps(`institutionActivities.${i}.risk`)} />
                                </SimpleGrid>
                            </Group>
                            {form.values.institutionActivities.length > 1 && <Divider />}
                        </Stack>
                    )}
                </Stack>
            </Box>
        </>
    )
});

RetirementActivityAndRiskForm.displayName = 'RetirementActivityAndRiskForm';

export default RetirementActivityAndRiskForm
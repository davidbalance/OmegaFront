'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import RetirementActivityAndRiskSchema from '../_schemas/retirement-activity-and-risk.schema'
import { z } from 'zod';
import { Button, ButtonGroup, Divider, Group, rem, SimpleGrid, Stack, TextInput } from '@mantine/core';
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
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={rem(32)}>
                {form.values.institutionActivities.map((e, i) =>
                    <>
                        <Group key={i} component='div' w='100%'>
                            <ButtonGroup>
                                {form.values.institutionActivities.length - 1 === i && <Button
                                    variant='white'
                                    onClick={handleAdd}>
                                    <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                </Button>}
                                {form.values.institutionActivities.length > 1
                                    && <Button variant='white'
                                        onClick={() => handleRemove(i)}>
                                        <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                    </Button>}
                            </ButtonGroup>
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
                    </>
                )}
            </Stack>
        </form >
    )
});

RetirementActivityAndRiskForm.displayName = 'RetirementActivityAndRiskForm';

export default RetirementActivityAndRiskForm
'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialJobHistorySchema from '../_schemas/initial-job-history.schema'
import { z } from 'zod';
import { Button, ButtonGroup, Checkbox, Divider, Group, rem, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

const defaultJobHistory = {
    lastJobActivity: '',
    lastJobCompany: '',
    lastJobPosition: '',
    lastJobTime: 1,
    lastJobRiskPhysical: false,
    lastJobRiskMechanical: false,
    lastJobRiskChemical: false,
    lastJobRiskBiological: false,
    lastJobRiskErgonomic: false,
    lastJobRiskPsychosocial: false,
    lastJobObservation: ''
}

type InitialJobHistoryFormProps = {
    data?: Partial<z.infer<typeof InitialJobHistorySchema>>;
    onSubmit?: (value: z.infer<typeof InitialJobHistorySchema>) => void;
}
const InitialJobHistoryForm = React.forwardRef<HTMLFormElement, InitialJobHistoryFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof InitialJobHistorySchema>>({
        initialValues: {
            jobHistory: data?.jobHistory ?? [defaultJobHistory]
        },
        validate: zodResolver(InitialJobHistorySchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof InitialJobHistorySchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = useCallback(() => {
        form.setValues(prev => ({ ...prev, jobHistory: [...(prev.jobHistory ?? []), defaultJobHistory] }));
    }, [form]);

    const handleRemove = useCallback((index: number) => {
        form.setValues(prev => ({ ...prev, jobHistory: [...(prev.jobHistory?.slice(0, index) ?? []), ...(prev.jobHistory?.slice(index + 1) ?? [])] }));
    }, [form]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={rem(32)}>
                {form.values.jobHistory.map((e, i) =>
                    <>
                        <Group key={i} component='div' w='100%'>
                            <ButtonGroup>
                                {form.values.jobHistory.length - 1 === i && <Button
                                    variant='white'
                                    onClick={handleAdd}>
                                    <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                </Button>}
                                {form.values.jobHistory.length > 1
                                    && <Button variant='white'
                                        onClick={() => handleRemove(i)}>
                                        <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                    </Button>}
                            </ButtonGroup>
                            <SimpleGrid cols={3} spacing={rem(32)} flex={1}>
                                <Stack component='div' gap={rem(8)}>
                                    <TextInput
                                        label="EMPRESA"
                                        placeholder="eg. Omega"
                                        {...form.getInputProps(`jobHistory.${i}.lastJobActivity`)} />
                                    <TextInput
                                        label="PUESTO DE TRABAJO"
                                        placeholder="eg. Gerente"
                                        {...form.getInputProps(`jobHistory.${i}.lastJobCompany`)} />
                                    <TextInput
                                        label="ACTIVIDADES QUE DESEMPEÑA"
                                        placeholder="eg. Actividades"
                                        {...form.getInputProps(`jobHistory.${i}.lastJobPosition`)} />
                                    <TextInput
                                        label="TIEMPO DE TRABAJO (MESES)"
                                        type='number'
                                        min={1}
                                        {...form.getInputProps(`jobHistory.${i}.lastJobTime`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Riesgo</Title>
                                    <Checkbox
                                        label='FISICO'
                                        {...form.getInputProps(`jobHistory.${i}.lastJobRiskPhysical`)} />
                                    <Checkbox
                                        label='MECANICO'
                                        {...form.getInputProps(`jobHistory.${i}.lastJobRiskMechanical`)} />
                                    <Checkbox
                                        label='QUIMICO'
                                        {...form.getInputProps(`jobHistory.${i}.lastJobRiskChemical`)} />
                                    <Checkbox
                                        label='BIOLOGICO'
                                        {...form.getInputProps(`jobHistory.${i}.lastJobRiskBiological`)} />
                                    <Checkbox
                                        label='ERGONOMICO'
                                        {...form.getInputProps(`jobHistory.${i}.lastJobRiskErgonomic`)} />
                                    <Checkbox
                                        label='PSICOSOCIAL'
                                        {...form.getInputProps(`jobHistory.${i}.lastJobRiskPsychosocial`)} />
                                </Stack>
                                <Textarea
                                    label="Observacion"
                                    placeholder='eg. Lore Ipsum...'
                                    {...form.getInputProps(`jobHistory.${i}.lastJobObservation`)} />
                            </SimpleGrid>
                        </Group>
                        {form.values.jobHistory.length > 1 && <Divider />}
                    </>
                )}
            </Stack>
        </form >
    )
});

InitialJobHistoryForm.displayName = 'InitialJobHistoryForm';

export default InitialJobHistoryForm
'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialJobHistorySchema from '../_schemas/initial-job-history.schema'
import { z } from 'zod';
import { ActionIcon, Box, Button, ButtonGroup, Checkbox, Divider, Group, rem, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

const defaultJobHistory = {
    jobHistoryActivity: '',
    jobHistoryCompany: '',
    jobHistoryPosition: '',
    jobHistoryTime: 1,
    jobHistoryRiskPhysical: false,
    jobHistoryRiskMechanical: false,
    jobHistoryRiskChemical: false,
    jobHistoryRiskBiological: false,
    jobHistoryRiskErgonomic: false,
    jobHistoryRiskPsychosocial: false,
    jobHistoryObservation: ''
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
        <>
            <Title order={3}>Antecedentes de Trabajo</Title>
            <Title order={5} c="dimmed">Antecedentes de Empleos Anteriores</Title>
            <Box
                mt={rem(16)}
                ref={ref}
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={rem(32)}>
                    {!form.values.jobHistory.length
                        ? (
                            <Button
                                variant='light'
                                onClick={handleAdd}>
                                <IconPlus style={{ width: rem(16), height: rem(16) }} />
                            </Button>
                        )
                        : form.values.jobHistory.map((e, i) =>
                            <Stack
                                gap={rem(16)}
                                key={i}>
                                <Group component='div' w='100%'>
                                    <Stack>
                                        {form.values.jobHistory.length - 1 === i && (
                                            <ActionIcon
                                                variant='light'
                                                onClick={handleAdd}>
                                                <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                            </ActionIcon>
                                        )}
                                        <ActionIcon variant='light'
                                            onClick={() => handleRemove(i)}>
                                            <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                        </ActionIcon>
                                    </Stack>
                                    <SimpleGrid cols={3} spacing={rem(32)} flex={1}>
                                        <Stack component='div' gap={rem(8)}>
                                            <TextInput
                                                label="EMPRESA"
                                                placeholder="eg. Omega"
                                                {...form.getInputProps(`jobHistory.${i}.jobHistoryActivity`)} />
                                            <TextInput
                                                label="PUESTO DE TRABAJO"
                                                placeholder="eg. Gerente"
                                                {...form.getInputProps(`jobHistory.${i}.jobHistoryCompany`)} />
                                            <TextInput
                                                label="ACTIVIDADES QUE DESEMPEÑA"
                                                placeholder="eg. Actividades"
                                                {...form.getInputProps(`jobHistory.${i}.jobHistoryPosition`)} />
                                            <TextInput
                                                label="TIEMPO DE TRABAJO (MESES)"
                                                type='number'
                                                min={1}
                                                {...form.getInputProps(`jobHistory.${i}.jobHistoryTime`)} />
                                        </Stack>
                                        <Stack component='div' gap={rem(8)}>
                                            <Title order={6}>Riesgo</Title>
                                            <Checkbox
                                                label='FISICO'
                                                checked={e.jobHistoryRiskPhysical}
                                                {...form.getInputProps(`jobHistory.${i}.jobHistoryRiskPhysical`)} />
                                            <Checkbox
                                                label='MECANICO'
                                                checked={e.jobHistoryRiskMechanical}
                                                {...form.getInputProps(`jobHistory.${i}.jobHistoryRiskMechanical`)} />
                                            <Checkbox
                                                label='QUIMICO'
                                                checked={e.jobHistoryRiskChemical}
                                                {...form.getInputProps(`jobHistory.${i}.jobHistoryRiskChemical`)} />
                                            <Checkbox
                                                label='BIOLOGICO'
                                                checked={e.jobHistoryRiskBiological}
                                                {...form.getInputProps(`jobHistory.${i}.jobHistoryRiskBiological`)} />
                                            <Checkbox
                                                label='ERGONOMICO'
                                                checked={e.jobHistoryRiskErgonomic}
                                                {...form.getInputProps(`jobHistory.${i}.jobHistoryRiskErgonomic`)} />
                                            <Checkbox
                                                label='PSICOSOCIAL'
                                                checked={e.jobHistoryRiskPsychosocial}
                                                {...form.getInputProps(`jobHistory.${i}.jobHistoryRiskPsychosocial`)} />
                                        </Stack>
                                        <Textarea
                                            label="Observacion"
                                            placeholder='eg. Lore Ipsum...'
                                            {...form.getInputProps(`jobHistory.${i}.jobHistoryObservation`)} />
                                    </SimpleGrid>
                                </Group>
                                {form.values.jobHistory.length > 1 && <Divider />}
                            </Stack>
                        )}
                </Stack>
            </Box>
        </>
    )
});

InitialJobHistoryForm.displayName = 'InitialJobHistoryForm';

export default InitialJobHistoryForm
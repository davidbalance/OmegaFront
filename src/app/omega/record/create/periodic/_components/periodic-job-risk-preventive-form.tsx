'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import PeriodicJobRiskPreventionSchema from '../_schemas/periodic-job-risk-prevention.schema'
import { z } from 'zod';
import { Button, ButtonGroup, Checkbox, Divider, Group, rem, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

const defaultJobRisk = {
    name: '',
    activity: '',
    months: 0,
    preventiveMeasure: '',
    psychosocialRiskMonotony: false,
    psychosocialRiskWorkOverload: false,
    psychosocialRiskThoroughnessOfTheTask: false,
    psychosocialRiskHighResponsibility: false,
    psychosocialRiskTakingResponsibilityAutonomy: false,
    psychosocialRiskSupervision: false,
    psychosocialRiskRoleConflict: false,
    psychosocialRiskNonFunctionClarify: false,
    psychosocialRiskBadWorkDistribution: false,
    psychosocialRiskRotativeShift: false,
    psychosocialRiskIntrapersonalRelations: false,
    psychosocialRiskJobInstability: false,
    psychosocialRiskOther: '',
}

type PeriodicJobRiskPreventiveFormProps = {
    data?: Partial<z.infer<typeof PeriodicJobRiskPreventionSchema>>;
    onSubmit?: (value: z.infer<typeof PeriodicJobRiskPreventionSchema>) => void;
}
const PeriodicJobRiskPreventiveForm = React.forwardRef<HTMLFormElement, PeriodicJobRiskPreventiveFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof PeriodicJobRiskPreventionSchema>>({
        initialValues: {
            jobRiskWithPreventiveMeasure: data?.jobRiskWithPreventiveMeasure ?? [defaultJobRisk]
        },
        validate: zodResolver(PeriodicJobRiskPreventionSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof PeriodicJobRiskPreventionSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = useCallback(() => {
        form.setValues(prev => ({ ...prev, jobRiskWithPreventiveMeasure: [...(prev.jobRiskWithPreventiveMeasure ?? []), defaultJobRisk] }));
    }, [form]);

    const handleRemove = useCallback((index: number) => {
        form.setValues(prev => ({ ...prev, jobRiskWithPreventiveMeasure: [...(prev.jobRiskWithPreventiveMeasure?.slice(0, index) ?? []), ...(prev.jobRiskWithPreventiveMeasure?.slice(index + 1) ?? [])] }));
    }, [form]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={rem(32)}>
                {form.values.jobRiskWithPreventiveMeasure.map((e, i) =>
                    <>
                        <Group key={i} component='div' w='100%'>
                            <ButtonGroup>
                                {form.values.jobRiskWithPreventiveMeasure.length - 1 === i && <Button
                                    variant='white'
                                    onClick={handleAdd}>
                                    <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                </Button>}
                                {form.values.jobRiskWithPreventiveMeasure.length > 1
                                    && <Button variant='white'
                                        onClick={() => handleRemove(i)}>
                                        <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                    </Button>}
                            </ButtonGroup>
                            <SimpleGrid cols={2} spacing={rem(32)} flex={1}>
                                <Stack component='div' gap={rem(8)}>
                                    <TextInput
                                        label="PUESTO DE TRABAJO / AREA"
                                        placeholder="eg. Gerente / Marketing"
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.name`)} />
                                    <TextInput
                                        label="ACTIVIDADES"
                                        placeholder="eg. Desempeña..."
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.activity`)} />
                                    <TextInput
                                        label="TIEMPO DE TRABAJO (MESES)"
                                        type='number'
                                        min={0}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.months`)} />
                                    <Textarea
                                        label="MEDIDAS PREVENTIVAS"
                                        placeholder="eg. Desempeña..."
                                        rows={3}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.preventiveMeasure`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Psicosocial</Title>
                                    <Checkbox
                                        label='MONOTONIA DEL TRABAJO'
                                        checked={e.psychosocialRiskMonotony}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskMonotony`)} />
                                    <Checkbox
                                        label='SOBRECARGA LABORAL'
                                        checked={e.psychosocialRiskWorkOverload}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskWorkOverload`)} />
                                    <Checkbox
                                        label='MINUSCIOSIDAD DE LA TAREA'
                                        checked={e.psychosocialRiskThoroughnessOfTheTask}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskThoroughnessOfTheTask`)} />
                                    <Checkbox
                                        label='ALTA RESPONSABILIDAD'
                                        checked={e.psychosocialRiskHighResponsibility}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskHighResponsibility`)} />
                                    <Checkbox
                                        label='AUTONOMIA EN LA TOMA DE DECISIONES'
                                        checked={e.psychosocialRiskTakingResponsibilityAutonomy}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskTakingResponsibilityAutonomy`)} />
                                    <Checkbox
                                        label='SUPERVICION Y ESTILOS DE DIRECCION DEFICIENTE'
                                        checked={e.psychosocialRiskSupervision}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskSupervision`)} />
                                    <Checkbox
                                        label='CONFLICTO DE ROL'
                                        checked={e.psychosocialRiskRoleConflict}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskRoleConflict`)} />
                                    <Checkbox
                                        label='FALTA DE CLARIDAD EN LAS FUNCIONES'
                                        checked={e.psychosocialRiskNonFunctionClarify}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskNonFunctionClarify`)} />
                                    <Checkbox
                                        label='INCORRECTA DISTRIBUCION DEL TRABAJO'
                                        checked={e.psychosocialRiskBadWorkDistribution}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskBadWorkDistribution`)} />
                                    <Checkbox
                                        label='TURNOS ROTATIVOS'
                                        checked={e.psychosocialRiskRotativeShift}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskRotativeShift`)} />
                                    <Checkbox
                                        label='RELACIONES INTERPERSONALES'
                                        checked={e.psychosocialRiskIntrapersonalRelations}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskIntrapersonalRelations`)} />
                                    <Checkbox
                                        label='INESTABILIDAD PERSONAL'
                                        checked={e.psychosocialRiskJobInstability}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskJobInstability`)} />
                                    <TextInput
                                        label="OTRAS"
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskOther`)} />
                                </Stack>
                            </SimpleGrid>
                        </Group>
                        {form.values.jobRiskWithPreventiveMeasure.length > 1 && <Divider />}
                    </>
                )}
            </Stack>
        </form >
    )
});

PeriodicJobRiskPreventiveForm.displayName = 'PeriodicJobRiskPreventiveForm';

export default PeriodicJobRiskPreventiveForm
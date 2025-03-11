'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialJobRiskPreventionSchema from '../_schemas/initial-job-risk-prevention.schema'
import { z } from 'zod';
import { Button, ButtonGroup, Checkbox, Divider, Group, rem, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

const defaultJobRisk = {
    name: '',
    activity: '',
    preventiveMeasure: '',
    biologicalRiskVirus: false,
    biologicalRiskFungus: false,
    biologicalRiskBacteria: false,
    biologicalRiskParasites: false,
    biologicalRiskExposureToVectors: false,
    biologicalRiskExposureToWildlifeAnimals: false,
    biologicalRiskOther: '',
    ergonomicRiskManualHandlingLoads: false,
    ergonomicRiskRepetitiveMoves: false,
    ergonomicRiskForcedPostures: false,
    ergonomicRiskWorkWithPvd: false,
    ergonomicRiskOther: '',
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
    phychosocialRiskOther: ''
}

type InitialJobRiskPreventiveFormProps = {
    data?: Partial<z.infer<typeof InitialJobRiskPreventionSchema>>;
    onSubmit?: (value: z.infer<typeof InitialJobRiskPreventionSchema>) => void;
}
const InitialJobRiskPreventiveForm = React.forwardRef<HTMLFormElement, InitialJobRiskPreventiveFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof InitialJobRiskPreventionSchema>>({
        initialValues: {
            jobRiskWithPreventiveMeasure: data?.jobRiskWithPreventiveMeasure ?? [defaultJobRisk]
        },
        validate: zodResolver(InitialJobRiskPreventionSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof InitialJobRiskPreventionSchema>) => {
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
                            <SimpleGrid cols={4} spacing={rem(32)} flex={1}>
                                <Stack component='div' gap={rem(8)}>
                                    <TextInput
                                        label="PUESTO DE TRABAJO / AREA"
                                        placeholder="eg. Gerente / Marketing"
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.name`)} />
                                    <TextInput
                                        label="ACTIVIDADES"
                                        placeholder="eg. Desempeña..."
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.activity`)} />
                                    <Textarea
                                        label="MEDIDAS PREVENTIVAS"
                                        placeholder="eg. Desempeña..."
                                        rows={3}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.preventiveMeasure`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Biologico</Title>
                                    <Checkbox
                                        label='VIRUS'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskVirus`)} />
                                    <Checkbox
                                        label='HONGOS'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskFungus`)} />
                                    <Checkbox
                                        label='BACTERIAS'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskBacteria`)} />
                                    <Checkbox
                                        label='PARASITOS'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskParasites`)} />
                                    <Checkbox
                                        label='EXPOSICION A VECTORES'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskExposureToVectors`)} />
                                    <Checkbox
                                        label='EXPOSICION A ANIMALES SELVATICOS'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskExposureToWildlifeAnimals`)} />
                                    <TextInput
                                        label="OTRAS"
                                        type='number'
                                        min={1}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskOther`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Ergonomico</Title>
                                    <Checkbox
                                        label='MANEJO MANUAL DE CARGAS'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.ergonomicRiskManualHandlingLoads`)} />
                                    <Checkbox
                                        label='MOVIMIENTO REPETITIVOS'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.ergonomicRiskRepetitiveMoves`)} />
                                    <Checkbox
                                        label='POSTURAS FORZADAS'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.ergonomicRiskForcedPostures`)} />
                                    <Checkbox
                                        label='TRABAJOS CON PVD'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.ergonomicRiskWorkWithPvd`)} />
                                    <TextInput
                                        label="OTRAS"
                                        type='number'
                                        min={1}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.ergonomicRiskOther`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Psicosocial</Title>
                                    <Checkbox
                                        label='MONOTONIA DEL TRABAJO'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskMonotony`)} />
                                    <Checkbox
                                        label='SOBRECARGA LABORAL'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskWorkOverload`)} />
                                    <Checkbox
                                        label='MINUSCIOSIDAD DE LA TAREA'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskThoroughnessOfTheTask`)} />
                                    <Checkbox
                                        label='ALTA RESPONSABILIDAD'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskHighResponsibility`)} />
                                    <Checkbox
                                        label='AUTONOMIA EN LA TOMA DE DECISIONES'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskTakingResponsibilityAutonomy`)} />
                                    <Checkbox
                                        label='SUPERVICION Y ESTILOS DE DIRECCION DEFICIENTE'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskSupervision`)} />
                                    <Checkbox
                                        label='CONFLICTO DE ROL'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskRoleConflict`)} />
                                    <Checkbox
                                        label='FALTA DE CLARIDAD EN LAS FUNCIONES'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskNonFunctionClarify`)} />
                                    <Checkbox
                                        label='INCORRECTA DISTRIBUCION DEL TRABAJO'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskBadWorkDistribution`)} />
                                    <Checkbox
                                        label='TURNOS ROTATIVOS'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskRotativeShift`)} />
                                    <Checkbox
                                        label='RELACIONES INTERPERSONALES'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskIntrapersonalRelations`)} />
                                    <Checkbox
                                        label='INESTABILIDAD PERSONAL'
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.psychosocialRiskJobInstability`)} />
                                    <TextInput
                                        label="OTRAS"
                                        type='number'
                                        min={1}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.phychosocialRiskOther`)} />
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

InitialJobRiskPreventiveForm.displayName = 'InitialJobRiskPreventiveForm';

export default InitialJobRiskPreventiveForm
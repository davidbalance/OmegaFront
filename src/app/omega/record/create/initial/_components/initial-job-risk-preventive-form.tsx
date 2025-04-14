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
    psychosocialRiskOther: ''
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
                    <div key={i}>
                        <Group component='div' w='100%'>
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
                                        checked={e.biologicalRiskVirus}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskVirus`)} />
                                    <Checkbox
                                        label='HONGOS'
                                        checked={e.biologicalRiskFungus}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskFungus`)} />
                                    <Checkbox
                                        label='BACTERIAS'
                                        checked={e.biologicalRiskBacteria}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskBacteria`)} />
                                    <Checkbox
                                        label='PARASITOS'
                                        checked={e.biologicalRiskParasites}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskParasites`)} />
                                    <Checkbox
                                        label='EXPOSICION A VECTORES'
                                        checked={e.biologicalRiskExposureToVectors}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskExposureToVectors`)} />
                                    <Checkbox
                                        label='EXPOSICION A ANIMALES SELVATICOS'
                                        checked={e.biologicalRiskExposureToWildlifeAnimals}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskExposureToWildlifeAnimals`)} />
                                    <TextInput
                                        label="OTRAS"
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.biologicalRiskOther`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Ergonomico</Title>
                                    <Checkbox
                                        label='MANEJO MANUAL DE CARGAS'
                                        checked={e.ergonomicRiskManualHandlingLoads}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.ergonomicRiskManualHandlingLoads`)} />
                                    <Checkbox
                                        label='MOVIMIENTO REPETITIVOS'
                                        checked={e.ergonomicRiskRepetitiveMoves}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.ergonomicRiskRepetitiveMoves`)} />
                                    <Checkbox
                                        label='POSTURAS FORZADAS'
                                        checked={e.ergonomicRiskForcedPostures}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.ergonomicRiskForcedPostures`)} />
                                    <Checkbox
                                        label='TRABAJOS CON PVD'
                                        checked={e.ergonomicRiskWorkWithPvd}
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.ergonomicRiskWorkWithPvd`)} />
                                    <TextInput
                                        label="OTRAS"
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.ergonomicRiskOther`)} />
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
                    </div>
                )}
            </Stack>
        </form >
    )
});

InitialJobRiskPreventiveForm.displayName = 'InitialJobRiskPreventiveForm';

export default InitialJobRiskPreventiveForm
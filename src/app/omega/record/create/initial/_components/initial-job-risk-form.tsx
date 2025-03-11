'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialJobRiskSchema from '../_schemas/initial-job-risk.schema'
import { z } from 'zod';
import { Button, ButtonGroup, Checkbox, Divider, Group, rem, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

const defaultJobRisk = {
    name: '',
    activity: '',
    physicalRiskHighTemperature: false,
    physicalRiskLowTemperature: false,
    physicalRiskIonicRadiation: false,
    physicalRiskNonIonicRadiation: false,
    physicalRiskNoise: false,
    physicalRiskVibration: false,
    physicalRiskIllumination: false,
    physicalRiskVentilation: false,
    physicalRiskElectricFluid: false,
    physicalRiskOther: '',
    mechanicRiskEntrapmentBetweenMachines: false,
    mechanicRiskTrappingBetweenSurfaces: false,
    mechanicRiskEntrapmentBetweenObjects: false,
    mechanicRiskObjectFalling: false,
    mechanicRiskSameLevelFalling: false,
    mechanicRiskDifferentLevelFalling: false,
    mechanicRiskElectricContact: false,
    mechanicRiskSurfacesContact: false,
    mechanicRiskParticlesProjection: false,
    mechanicRiskFluidProjection: false,
    mechanicRiskJab: false,
    mechanicRiskCut: false,
    mechanicRiskHitByVehicles: false,
    mechanicRiskVehicleCollision: false,
    mechanicRiskOther: '',
    chemicalSolid: false,
    chemicalDust: false,
    chemicalSmoke: false,
    chemicalLiquid: false,
    chemicalSteam: false,
    chemicalAerosol: false,
    chemicalMist: false,
    chemicalGas: false,
    chemicalOther: ''
}

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
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={rem(32)}>
                {form.values.jobRisks.map((e, i) =>
                    <>
                        <Group key={i} component='div' w='100%'>
                            <ButtonGroup>
                                {form.values.jobRisks.length - 1 === i && <Button
                                    variant='white'
                                    onClick={handleAdd}>
                                    <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                </Button>}
                                {form.values.jobRisks.length > 1
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
                                        {...form.getInputProps(`jobRisks.${i}.name`)} />
                                    <TextInput
                                        label="ACTIVIDADES"
                                        placeholder="eg. Desempeña..."
                                        {...form.getInputProps(`jobRisks.${i}.activity`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Fisico</Title>
                                    <Checkbox
                                        label='TEMPERATURAS ALTAS'
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskHighTemperature`)} />
                                    <Checkbox
                                        label='TEMPERATURAS BAJAS'
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskLowTemperature`)} />
                                    <Checkbox
                                        label='RADIACION IONIZANTE'
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskIonicRadiation`)} />
                                    <Checkbox
                                        label='RADIACION NO IONIZANTE'
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskNonIonicRadiation`)} />
                                    <Checkbox
                                        label='RUIDO'
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskNoise`)} />
                                    <Checkbox
                                        label='VIBRACION'
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskVibration`)} />
                                    <Checkbox
                                        label='ILUMINACION'
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskIllumination`)} />
                                    <Checkbox
                                        label='VENTILACION'
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskVentilation`)} />
                                    <Checkbox
                                        label='FLUIDO ELECTRICO'
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskElectricFluid`)} />
                                    <TextInput
                                        label="OTRAS"
                                        type='number'
                                        min={1}
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskOther`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Mecanico</Title>
                                    <Checkbox
                                        label='ATRAPAMIENTO ENTRE MAQUINAS'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskEntrapmentBetweenMachines`)} />
                                    <Checkbox
                                        label='ATRAPAMIENTO ENTRE SUPERFICIES'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskTrappingBetweenSurfaces`)} />
                                    <Checkbox
                                        label='ATRAPAMIENTO ENTRE OBJETOS'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskEntrapmentBetweenObjects`)} />
                                    <Checkbox
                                        label='CAIDAS DE OBJETOS'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskObjectFalling`)} />
                                    <Checkbox
                                        label='CAIDAS AL MISMO NIVEL'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskSameLevelFalling`)} />
                                    <Checkbox
                                        label='CAIDAS A DIFERENTE NIVEL'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskDifferentLevelFalling`)} />
                                    <Checkbox
                                        label='CONTACTO ELECTRICO'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskElectricContact`)} />
                                    <Checkbox
                                        label='CONTACTO ENTRE SUPERFICIES'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskSurfacesContact`)} />
                                    <Checkbox
                                        label='PROYECCION DE PARTICULAS - FRAGMENTOS'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskParticlesProjection`)} />
                                    <Checkbox
                                        label='PROYECCION DE FLUIDOS'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskFluidProjection`)} />
                                    <Checkbox
                                        label='PINCHAZOS'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskJab`)} />
                                    <Checkbox
                                        label='CORTES'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskCut`)} />
                                    <Checkbox
                                        label='ATROPELLAMIENTO POR VEHICULOS'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskHitByVehicles`)} />
                                    <Checkbox
                                        label='CHOQUE / COLLISION VEHICULAR'
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskVehicleCollision`)} />
                                    <TextInput
                                        label="OTRAS"
                                        type='number'
                                        min={1}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskOther`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Quimico</Title>
                                    <Checkbox
                                        label='SOLIDO'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalSolid`)} />
                                    <Checkbox
                                        label='POLVOS'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalDust`)} />
                                    <Checkbox
                                        label='HUMOS'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalSmoke`)} />
                                    <Checkbox
                                        label='LIQUIDOS'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalLiquid`)} />
                                    <Checkbox
                                        label='VAPORES'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalSteam`)} />
                                    <Checkbox
                                        label='AEROSOLES'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalAerosol`)} />
                                    <Checkbox
                                        label='NEBLINAS'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalMist`)} />
                                    <Checkbox
                                        label='GASEOSAS'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalGas`)} />
                                    <TextInput
                                        label="OTRAS"
                                        type='number'
                                        min={1}
                                        {...form.getInputProps(`jobRisks.${i}.chemicalOther`)} />
                                </Stack>
                            </SimpleGrid>
                        </Group>
                        {form.values.jobRisks.length > 1 && <Divider />}
                    </>
                )}
            </Stack>
        </form >
    )
});

InitialJobRiskForm.displayName = 'InitialJobRiskForm';

export default InitialJobRiskForm
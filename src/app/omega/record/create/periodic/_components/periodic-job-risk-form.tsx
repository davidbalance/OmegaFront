'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import PeriodicJobRiskSchema from '../_schemas/periodic-job-risk.schema'
import { z } from 'zod';
import { Button, ButtonGroup, Checkbox, Divider, Group, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

const defaultJobRisk = {
    name: '',
    activity: '',
    months: 0,
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
    chemicalRiskSolid: false,
    chemicalRiskDust: false,
    chemicalRiskSmoke: false,
    chemicalRiskLiquid: false,
    chemicalRiskSteam: false,
    chemicalRiskAerosol: false,
    chemicalRiskMist: false,
    chemicalRiskGas: false,
    chemicalRiskOther: '',
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
}

type PeriodicJobRiskFormProps = {
    data?: Partial<z.infer<typeof PeriodicJobRiskSchema>>;
    onSubmit?: (value: z.infer<typeof PeriodicJobRiskSchema>) => void;
}
const PeriodicJobRiskForm = React.forwardRef<HTMLFormElement, PeriodicJobRiskFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof PeriodicJobRiskSchema>>({
        initialValues: {
            jobRisks: data?.jobRisks ?? [defaultJobRisk]
        },
        validate: zodResolver(PeriodicJobRiskSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof PeriodicJobRiskSchema>) => {
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
                            <SimpleGrid cols={6} spacing={rem(32)} flex={1}>
                                <Stack component='div' gap={rem(8)}>
                                    <TextInput
                                        label="PUESTO DE TRABAJO / AREA"
                                        placeholder="eg. Gerente / Marketing"
                                        {...form.getInputProps(`jobRisks.${i}.name`)} />
                                    <TextInput
                                        label="ACTIVIDADES"
                                        placeholder="eg. Desempeña..."
                                        {...form.getInputProps(`jobRisks.${i}.activity`)} />
                                    <TextInput
                                        label="TIEMPO DE TRABAJO (MESES)"
                                        type='number'
                                        min={0}
                                        {...form.getInputProps(`jobRisks.${i}.months`)} />
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
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskOther`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Quimico</Title>
                                    <Checkbox
                                        label='SOLIDO'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskSolid`)} />
                                    <Checkbox
                                        label='POLVOS'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskDust`)} />
                                    <Checkbox
                                        label='HUMOS'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskSmoke`)} />
                                    <Checkbox
                                        label='LIQUIDOS'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskLiquid`)} />
                                    <Checkbox
                                        label='VAPORES'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskSteam`)} />
                                    <Checkbox
                                        label='AEROSOLES'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskAerosol`)} />
                                    <Checkbox
                                        label='NEBLINAS'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskMist`)} />
                                    <Checkbox
                                        label='GASEOSAS'
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskGas`)} />
                                    <TextInput
                                        label="OTRAS"
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskOther`)} />
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
                                        {...form.getInputProps(`jobRiskWithPreventiveMeasure.${i}.ergonomicRiskOther`)} />
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

PeriodicJobRiskForm.displayName = 'PeriodicJobRiskForm';

export default PeriodicJobRiskForm
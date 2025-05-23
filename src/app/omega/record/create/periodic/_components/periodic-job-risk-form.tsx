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
                    <div key={i}>
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
                                        checked={e.physicalRiskHighTemperature}
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskHighTemperature`)} />
                                    <Checkbox
                                        label='TEMPERATURAS BAJAS'
                                        checked={e.physicalRiskLowTemperature}
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskLowTemperature`)} />
                                    <Checkbox
                                        label='RADIACION IONIZANTE'
                                        checked={e.physicalRiskIonicRadiation}
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskIonicRadiation`)} />
                                    <Checkbox
                                        label='RADIACION NO IONIZANTE'
                                        checked={e.physicalRiskNonIonicRadiation}
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskNonIonicRadiation`)} />
                                    <Checkbox
                                        label='RUIDO'
                                        checked={e.physicalRiskNoise}
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskNoise`)} />
                                    <Checkbox
                                        label='VIBRACION'
                                        checked={e.physicalRiskVibration}
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskVibration`)} />
                                    <Checkbox
                                        label='ILUMINACION'
                                        checked={e.physicalRiskIllumination}
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskIllumination`)} />
                                    <Checkbox
                                        label='VENTILACION'
                                        checked={e.physicalRiskVentilation}
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskVentilation`)} />
                                    <Checkbox
                                        label='FLUIDO ELECTRICO'
                                        checked={e.physicalRiskElectricFluid}
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskElectricFluid`)} />
                                    <TextInput
                                        label="OTRAS"
                                        {...form.getInputProps(`jobRisks.${i}.physicalRiskOther`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Mecanico</Title>
                                    <Checkbox
                                        label='ATRAPAMIENTO ENTRE MAQUINAS'
                                        checked={e.mechanicRiskEntrapmentBetweenMachines}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskEntrapmentBetweenMachines`)} />
                                    <Checkbox
                                        label='ATRAPAMIENTO ENTRE SUPERFICIES'
                                        checked={e.mechanicRiskTrappingBetweenSurfaces}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskTrappingBetweenSurfaces`)} />
                                    <Checkbox
                                        label='ATRAPAMIENTO ENTRE OBJETOS'
                                        checked={e.mechanicRiskEntrapmentBetweenObjects}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskEntrapmentBetweenObjects`)} />
                                    <Checkbox
                                        label='CAIDAS DE OBJETOS'
                                        checked={e.mechanicRiskObjectFalling}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskObjectFalling`)} />
                                    <Checkbox
                                        label='CAIDAS AL MISMO NIVEL'
                                        checked={e.mechanicRiskSameLevelFalling}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskSameLevelFalling`)} />
                                    <Checkbox
                                        label='CAIDAS A DIFERENTE NIVEL'
                                        checked={e.mechanicRiskDifferentLevelFalling}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskDifferentLevelFalling`)} />
                                    <Checkbox
                                        label='CONTACTO ELECTRICO'
                                        checked={e.mechanicRiskElectricContact}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskElectricContact`)} />
                                    <Checkbox
                                        label='CONTACTO ENTRE SUPERFICIES'
                                        checked={e.mechanicRiskSurfacesContact}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskSurfacesContact`)} />
                                    <Checkbox
                                        label='PROYECCION DE PARTICULAS - FRAGMENTOS'
                                        checked={e.mechanicRiskParticlesProjection}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskParticlesProjection`)} />
                                    <Checkbox
                                        label='PROYECCION DE FLUIDOS'
                                        checked={e.mechanicRiskFluidProjection}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskFluidProjection`)} />
                                    <Checkbox
                                        label='PINCHAZOS'
                                        checked={e.mechanicRiskJab}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskJab`)} />
                                    <Checkbox
                                        label='CORTES'
                                        checked={e.mechanicRiskCut}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskCut`)} />
                                    <Checkbox
                                        label='ATROPELLAMIENTO POR VEHICULOS'
                                        checked={e.mechanicRiskHitByVehicles}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskHitByVehicles`)} />
                                    <Checkbox
                                        label='CHOQUE / COLLISION VEHICULAR'
                                        checked={e.mechanicRiskVehicleCollision}
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskVehicleCollision`)} />
                                    <TextInput
                                        label="OTRAS"
                                        {...form.getInputProps(`jobRisks.${i}.mechanicRiskOther`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Quimico</Title>
                                    <Checkbox
                                        label='SOLIDO'
                                        checked={e.chemicalRiskSolid}
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskSolid`)} />
                                    <Checkbox
                                        label='POLVOS'
                                        checked={e.chemicalRiskDust}
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskDust`)} />
                                    <Checkbox
                                        label='HUMOS'
                                        checked={e.chemicalRiskSmoke}
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskSmoke`)} />
                                    <Checkbox
                                        label='LIQUIDOS'
                                        checked={e.chemicalRiskLiquid}
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskLiquid`)} />
                                    <Checkbox
                                        label='VAPORES'
                                        checked={e.chemicalRiskSteam}
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskSteam`)} />
                                    <Checkbox
                                        label='AEROSOLES'
                                        checked={e.chemicalRiskAerosol}
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskAerosol`)} />
                                    <Checkbox
                                        label='NEBLINAS'
                                        checked={e.chemicalRiskMist}
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskMist`)} />
                                    <Checkbox
                                        label='GASEOSAS'
                                        checked={e.chemicalRiskGas}
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskGas`)} />
                                    <TextInput
                                        label="OTRAS"
                                        {...form.getInputProps(`jobRisks.${i}.chemicalRiskOther`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Biologico</Title>
                                    <Checkbox
                                        label='VIRUS'
                                        checked={e.biologicalRiskVirus}
                                        {...form.getInputProps(`jobRisks.${i}.biologicalRiskVirus`)} />
                                    <Checkbox
                                        label='HONGOS'
                                        checked={e.biologicalRiskFungus}
                                        {...form.getInputProps(`jobRisks.${i}.biologicalRiskFungus`)} />
                                    <Checkbox
                                        label='BACTERIAS'
                                        checked={e.biologicalRiskBacteria}
                                        {...form.getInputProps(`jobRisks.${i}.biologicalRiskBacteria`)} />
                                    <Checkbox
                                        label='PARASITOS'
                                        checked={e.biologicalRiskParasites}
                                        {...form.getInputProps(`jobRisks.${i}.biologicalRiskParasites`)} />
                                    <Checkbox
                                        label='EXPOSICION A VECTORES'
                                        checked={e.biologicalRiskExposureToVectors}
                                        {...form.getInputProps(`jobRisks.${i}.biologicalRiskExposureToVectors`)} />
                                    <Checkbox
                                        label='EXPOSICION A ANIMALES SELVATICOS'
                                        checked={e.biologicalRiskExposureToWildlifeAnimals}
                                        {...form.getInputProps(`jobRisks.${i}.biologicalRiskExposureToWildlifeAnimals`)} />
                                    <TextInput
                                        label="OTRAS"
                                        {...form.getInputProps(`jobRisks.${i}.biologicalRiskOther`)} />
                                </Stack>
                                <Stack component='div' gap={rem(8)}>
                                    <Title order={6}>Ergonomico</Title>
                                    <Checkbox
                                        label='MANEJO MANUAL DE CARGAS'
                                        checked={e.ergonomicRiskManualHandlingLoads}
                                        {...form.getInputProps(`jobRisks.${i}.ergonomicRiskManualHandlingLoads`)} />
                                    <Checkbox
                                        label='MOVIMIENTO REPETITIVOS'
                                        checked={e.ergonomicRiskRepetitiveMoves}
                                        {...form.getInputProps(`jobRisks.${i}.ergonomicRiskRepetitiveMoves`)} />
                                    <Checkbox
                                        label='POSTURAS FORZADAS'
                                        checked={e.ergonomicRiskForcedPostures}
                                        {...form.getInputProps(`jobRisks.${i}.ergonomicRiskForcedPostures`)} />
                                    <Checkbox
                                        label='TRABAJOS CON PVD'
                                        checked={e.ergonomicRiskWorkWithPvd}
                                        {...form.getInputProps(`jobRisks.${i}.ergonomicRiskWorkWithPvd`)} />
                                    <TextInput
                                        label="OTRAS"
                                        {...form.getInputProps(`jobRisks.${i}.ergonomicRiskOther`)} />
                                </Stack>
                            </SimpleGrid>
                        </Group>
                        {form.values.jobRisks.length > 1 && <Divider />}
                    </div>
                )}
            </Stack>
        </form >
    )
});

PeriodicJobRiskForm.displayName = 'PeriodicJobRiskForm';

export default PeriodicJobRiskForm
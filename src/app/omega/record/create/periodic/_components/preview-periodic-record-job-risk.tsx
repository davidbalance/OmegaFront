import React, { useMemo } from 'react'
import { Box, rem, Stack, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text, Title } from '@mantine/core'
import { JobRisk } from '@/server/record/create-record/periodic-record';

type PreviewPeriodicRecordJobRiskProps = {
    jobRisks: JobRisk[];
}
const PreviewPeriodicRecordJobRisk: React.FC<PreviewPeriodicRecordJobRiskProps> = ({
    jobRisks
}) => {

    const rows = useMemo(() => jobRisks.map(e =>
        <TableTr key={crypto.randomUUID()}>
            <TableTd>{e.name}</TableTd>
            <TableTd>{e.activity}</TableTd>
            <TableTd>
                <Stack gap={0}>
                    <Text component='span' fw={e.physicalRiskHighTemperature ? 'bold' : 'lighter'}>Temperaturas altas</Text>
                    <Text component='span' fw={e.physicalRiskLowTemperature ? 'bold' : 'lighter'}>Temperaturas bajas</Text>
                    <Text component='span' fw={e.physicalRiskIonicRadiation ? 'bold' : 'lighter'}>Radiacion Ionizante</Text>
                    <Text component='span' fw={e.physicalRiskNonIonicRadiation ? 'bold' : 'lighter'}>Radiacion no Ionizante</Text>
                    <Text component='span' fw={e.physicalRiskNoise ? 'bold' : 'lighter'}>Rudio</Text>
                    <Text component='span' fw={e.physicalRiskVibration ? 'bold' : 'lighter'}>Vibracion</Text>
                    <Text component='span' fw={e.physicalRiskIllumination ? 'bold' : 'lighter'}>Iluminacion</Text>
                    <Text component='span' fw={e.physicalRiskVentilation ? 'bold' : 'lighter'}>Ventilacion</Text>
                    <Text component='span' fw={e.physicalRiskElectricFluid ? 'bold' : 'lighter'}>Fluido electrico</Text>
                    <Text component='span'>Otros: <Text component='span' fw={e.physicalRiskOther ? 'bold' : 'lighter'}>{e.physicalRiskOther}</Text></Text>
                </Stack>
            </TableTd>
            <TableTd>
                <Stack gap={0}>
                    <Text component='span' fw={e.mechanicRiskEntrapmentBetweenMachines ? 'bold' : 'lighter'}>Atrapamiento entre maquinas</Text>
                    <Text component='span' fw={e.mechanicRiskTrappingBetweenSurfaces ? 'bold' : 'lighter'}>Atrapamiento entre superficies</Text>
                    <Text component='span' fw={e.mechanicRiskEntrapmentBetweenObjects ? 'bold' : 'lighter'}>Atrapamiento entre objetos</Text>
                    <Text component='span' fw={e.mechanicRiskObjectFalling ? 'bold' : 'lighter'}>Caida de objetos</Text>
                    <Text component='span' fw={e.mechanicRiskSameLevelFalling ? 'bold' : 'lighter'}>Caidas al mismo nivel</Text>
                    <Text component='span' fw={e.mechanicRiskDifferentLevelFalling ? 'bold' : 'lighter'}>Caidas a diferente nivel</Text>
                    <Text component='span' fw={e.mechanicRiskElectricContact ? 'bold' : 'lighter'}>Contacto electrico</Text>
                    <Text component='span' fw={e.mechanicRiskSurfacesContact ? 'bold' : 'lighter'}>Contacto con superficies de trabajos</Text>
                    <Text component='span' fw={e.mechanicRiskParticlesProjection ? 'bold' : 'lighter'}>Proyeccion de particulas - fragmentos</Text>
                    <Text component='span' fw={e.mechanicRiskFluidProjection ? 'bold' : 'lighter'}>Proyeccion de fluidos</Text>
                    <Text component='span' fw={e.mechanicRiskJab ? 'bold' : 'lighter'}>Pinchazo</Text>
                    <Text component='span' fw={e.mechanicRiskCut ? 'bold' : 'lighter'}>Cortes</Text>
                    <Text component='span' fw={e.mechanicRiskVehicleCollision ? 'bold' : 'lighter'}>Atropellamientos por vehiculos</Text>
                    <Text component='span' fw={e.mechanicRiskHitByVehicles ? 'bold' : 'lighter'}>Choques / Collision vehicular</Text>
                    <Text component='span'>Otros: <Text component='span' fw={e.mechanicRiskOther ? 'bold' : 'lighter'}>{e.mechanicRiskOther}</Text></Text>
                </Stack>
            </TableTd>
            <TableTd>
                <Stack gap={0}>
                    <Text component='span' fw={e.chemicalRiskSolid ? 'bold' : 'lighter'}>Solido</Text>
                    <Text component='span' fw={e.chemicalRiskDust ? 'bold' : 'lighter'}>Polvos</Text>
                    <Text component='span' fw={e.chemicalRiskSmoke ? 'bold' : 'lighter'}>Humos</Text>
                    <Text component='span' fw={e.chemicalRiskLiquid ? 'bold' : 'lighter'}>Liquidos</Text>
                    <Text component='span' fw={e.chemicalRiskSteam ? 'bold' : 'lighter'}>Vapores</Text>
                    <Text component='span' fw={e.chemicalRiskAerosol ? 'bold' : 'lighter'}>Aerosoles</Text>
                    <Text component='span' fw={e.chemicalRiskMist ? 'bold' : 'lighter'}>Neblinas</Text>
                    <Text component='span' fw={e.chemicalRiskGas ? 'bold' : 'lighter'}>Gaseosos</Text>
                    <Text component='span'>Otros: <Text component='span' fw={e.chemicalRiskOther ? 'bold' : 'lighter'}>{e.chemicalRiskOther}</Text></Text>
                </Stack>
            </TableTd>
            <TableTd>
                <Stack gap={0}>
                    <Text component='span' fw={e.biologicalRiskVirus ? 'bold' : 'lighter'}>Virus</Text>
                    <Text component='span' fw={e.biologicalRiskFungus ? 'bold' : 'lighter'}>Hongos</Text>
                    <Text component='span' fw={e.biologicalRiskBacteria ? 'bold' : 'lighter'}>Bacterias</Text>
                    <Text component='span' fw={e.biologicalRiskParasites ? 'bold' : 'lighter'}>Parasitos</Text>
                    <Text component='span' fw={e.biologicalRiskExposureToVectors ? 'bold' : 'lighter'}>Exposicion a vectores</Text>
                    <Text component='span' fw={e.biologicalRiskExposureToWildlifeAnimals ? 'bold' : 'lighter'}>Exposicion a animales selvaticos</Text>
                    <Text component='span'>Otros: <Text component='span' fw={e.biologicalRiskOther ? 'bold' : 'lighter'}>{e.biologicalRiskOther}</Text></Text>
                </Stack>
            </TableTd>
            <TableTd>
                <Stack gap={0}>
                    <Text component='span' fw={e.ergonomicRiskManualHandlingLoads ? 'bold' : 'lighter'}>Manejo manual de cargas</Text>
                    <Text component='span' fw={e.ergonomicRiskRepetitiveMoves ? 'bold' : 'lighter'}>Movimiento repetitivos</Text>
                    <Text component='span' fw={e.ergonomicRiskForcedPostures ? 'bold' : 'lighter'}>Posturas forzadas</Text>
                    <Text component='span' fw={e.ergonomicRiskWorkWithPvd ? 'bold' : 'lighter'}>Trabajos con PVD</Text>
                    <Text component='span'>Otros: <Text component='span' fw={e.ergonomicRiskOther ? 'bold' : 'lighter'}>{e.ergonomicRiskOther}</Text></Text>
                </Stack>
            </TableTd>
        </TableTr>

    ), [jobRisks]);

    return (
        <Box px={rem(8)}>
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh>Puesto de trabajo / Área</TableTh>
                        <TableTh>Actividades</TableTh>
                        <TableTh>Físico</TableTh>
                        <TableTh>Mecánico</TableTh>
                        <TableTh>Químico</TableTh>
                        <TableTh>Biológico</TableTh>
                        <TableTh>Ergonómico</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>{rows}</TableTbody>
            </Table>
        </Box>
    )
}

export default PreviewPeriodicRecordJobRisk
import React, { useMemo } from 'react'
import { Box, rem, Stack, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text, Title } from '@mantine/core'
import { JobRiskWithPreventiveMeasure } from '@/server/record/create-record/initial-record'

type PreviewInitialRecordJobRiskPreventionProps = {
    jobRiskWithPreventiveMeasure: JobRiskWithPreventiveMeasure[];
}
const PreviewInitialRecordJobRiskPrevention: React.FC<PreviewInitialRecordJobRiskPreventionProps> = ({
    jobRiskWithPreventiveMeasure
}) => {

    const rows = useMemo(() => jobRiskWithPreventiveMeasure.map(e =>
        <TableTr key={crypto.randomUUID()}>
            <TableTd>{e.name}</TableTd>
            <TableTd>{e.activity}</TableTd>
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

            <TableTd>
                <Stack gap={0}>
                    <Text component='span' fw={e.psychosocialRiskMonotony ? 'bold' : 'lighter'}>Monotonía del trabajo</Text>
                    <Text component='span' fw={e.psychosocialRiskWorkOverload ? 'bold' : 'lighter'}>Sobrecarga laboral</Text>
                    <Text component='span' fw={e.psychosocialRiskThoroughnessOfTheTask ? 'bold' : 'lighter'}>Minuciosidad de la tarea</Text>
                    <Text component='span' fw={e.psychosocialRiskHighResponsibility ? 'bold' : 'lighter'}>Alta responsabilidad</Text>
                    <Text component='span' fw={e.psychosocialRiskTakingResponsibilityAutonomy ? 'bold' : 'lighter'}>Autonomía  en la toma de decisiones</Text>
                    <Text component='span' fw={e.psychosocialRiskSupervision ? 'bold' : 'lighter'}>Supervisión y estilos de dirección deficiente</Text>
                    <Text component='span' fw={e.psychosocialRiskRoleConflict ? 'bold' : 'lighter'}>Conflicto de rol</Text>
                    <Text component='span' fw={e.psychosocialRiskNonFunctionClarify ? 'bold' : 'lighter'}>Falta de Claridad en las funciones</Text>
                    <Text component='span' fw={e.psychosocialRiskBadWorkDistribution ? 'bold' : 'lighter'}>Incorrecta distribución del trabajo</Text>
                    <Text component='span' fw={e.psychosocialRiskRotativeShift ? 'bold' : 'lighter'}>Turnos rotativos</Text>
                    <Text component='span' fw={e.psychosocialRiskIntrapersonalRelations ? 'bold' : 'lighter'}>Relaciones interpersonales</Text>
                    <Text component='span' fw={e.psychosocialRiskJobInstability ? 'bold' : 'lighter'}>inestabilidad laboral</Text>
                    <Text component='span'>Otros: <Text component='span' fw={e.psychosocialRiskOther ? 'bold' : 'lighter'}>{e.psychosocialRiskOther}</Text></Text>
                </Stack>
            </TableTd>
            <TableTd>{e.preventiveMeasure}</TableTd>
        </TableTr>

    ), [jobRiskWithPreventiveMeasure]);

    return (
        <Box px={rem(8)}>
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh>PUESTO DE TRABAJO / AREA</TableTh>
                        <TableTh>ACTIVIDADES</TableTh>
                        <TableTh>BIOLOGICO</TableTh>
                        <TableTh>ERGONOMICO</TableTh>
                        <TableTh>PSICOSOCIAL</TableTh>
                        <TableTh>MEDIDAS PREVENTIVAS</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>{rows}</TableTbody>
            </Table>
        </Box>
    )
}

export default PreviewInitialRecordJobRiskPrevention
import React, { useMemo } from 'react'
import { Box, rem, Stack, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text } from '@mantine/core'
import { JobRisk } from '@/server/record/create-record/periodic-record';

type PreviewPeriodicRecordJobRiskPreventionProps = {
    jobRisks: JobRisk[];
}
const PreviewPeriodicRecordJobRiskPrevention: React.FC<PreviewPeriodicRecordJobRiskPreventionProps> = ({
    jobRisks
}) => {

    const rows = useMemo(() => jobRisks.map(e =>
        <TableTr key={crypto.randomUUID()}>
            <TableTd>{e.name}</TableTd>
            <TableTd>{e.activity}</TableTd>

            <TableTd>
                <Stack gap={0}>
                    <Text component='span' fw={e.psychosocialRiskMonotony ? 'bold' : 'lighter'}>Monotonía del trabajo</Text>
                    <Text component='span' fw={e.psychosocialRiskWorkOverload ? 'bold' : 'lighter'}>Sobrecarga laboral</Text>
                    <Text component='span' fw={e.psychosocialRiskThoroughnessOfTheTask ? 'bold' : 'lighter'}>Minuciosidad de la tarea</Text>
                    <Text component='span' fw={e.psychosocialRiskHighResponsibility ? 'bold' : 'lighter'}>Alta responsabilidad</Text>
                    <Text component='span' fw={e.psychosocialRiskTakingResponsibilityAutonomy ? 'bold' : 'lighter'}>Autonomía  en la toma de decisiones</Text>
                    <Text component='span' fw={e.psychosocialRiskSupervision ? 'bold' : 'lighter'}>Supervisión y estilos de dirección deficiente</Text>
                    <Text component='span' fw={e.psychosocialRiskRoleConflict ? 'bold' : 'lighter'}>Conflicto de rol</Text>
                    <Text component='span' fw={e.psychosocialRiskNonFunctionClarify ? 'bold' : 'lighter'}>Falta de claridad en las funciones</Text>
                    <Text component='span' fw={e.psychosocialRiskBadWorkDistribution ? 'bold' : 'lighter'}>Incorrecta distribución del trabajo</Text>
                    <Text component='span' fw={e.psychosocialRiskRotativeShift ? 'bold' : 'lighter'}>Turnos rotativos</Text>
                    <Text component='span' fw={e.psychosocialRiskIntrapersonalRelations ? 'bold' : 'lighter'}>Relaciones interpersonales</Text>
                    <Text component='span' fw={e.psychosocialRiskJobInstability ? 'bold' : 'lighter'}>inestabilidad laboral</Text>
                    <Text component='span'>Otros: <Text component='span' fw={e.psychosocialRiskOther ? 'bold' : 'lighter'}>{e.psychosocialRiskOther}</Text></Text>
                </Stack>
            </TableTd>
            <TableTd>{e.preventiveMeasure}</TableTd>
        </TableTr>

    ), [jobRisks]);

    return (
        <Box px={rem(8)}>
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh>Puesto de trabajo / Área</TableTh>
                        <TableTh>Actividades</TableTh>
                        <TableTh>Psicosocial</TableTh>
                        <TableTh>Medidas preventivas</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>{rows}</TableTbody>
            </Table>
        </Box>
    )
}

export default PreviewPeriodicRecordJobRiskPrevention
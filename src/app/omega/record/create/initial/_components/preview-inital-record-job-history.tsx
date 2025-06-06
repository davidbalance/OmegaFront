import React, { useMemo } from 'react'
import { Box, rem, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text, Title } from '@mantine/core'

type PreviewInitialRecordJobHistoryProps = {
    jobHistory: {
        jobHistoryCompany: string;
        jobHistoryPosition: string;
        jobHistoryActivity: string;
        jobHistoryTime: number;
        jobHistoryRiskPhysical: boolean;
        jobHistoryRiskMechanical: boolean;
        jobHistoryRiskChemical: boolean;
        jobHistoryRiskBiological: boolean;
        jobHistoryRiskErgonomic: boolean;
        jobHistoryRiskPsychosocial: boolean;
        jobHistoryObservation: string;
    }[]
}
const PreviewInitialRecordJobHistory: React.FC<PreviewInitialRecordJobHistoryProps> = ({
    jobHistory
}) => {

    const rows = useMemo(() => jobHistory.map(e =>
        <TableTr key={crypto.randomUUID()}>
            <TableTd>{e.jobHistoryCompany}</TableTd>
            <TableTd>{e.jobHistoryPosition}</TableTd>
            <TableTd>{e.jobHistoryActivity}</TableTd>
            <TableTd>{e.jobHistoryTime}</TableTd>
            <TableTd>
                <Text fw={e.jobHistoryRiskPhysical ? 'bold' : 'lighter'}>Físico</Text>
                <Text fw={e.jobHistoryRiskMechanical ? 'bold' : 'lighter'}>Mecánico</Text>
                <Text fw={e.jobHistoryRiskChemical ? 'bold' : 'lighter'}>Químico</Text>
                <Text fw={e.jobHistoryRiskBiological ? 'bold' : 'lighter'}>Biológico</Text>
                <Text fw={e.jobHistoryRiskErgonomic ? 'bold' : 'lighter'}>Ergonómico</Text>
                <Text fw={e.jobHistoryRiskPsychosocial ? 'bold' : 'lighter'}>Psicosocial</Text>
            </TableTd>
            <TableTd>{e.jobHistoryObservation}</TableTd>
        </TableTr>

    ), [jobHistory]);

    return (
        <>
            <Title component='span' order={6} fw='bolder'>Antecedentes de empleos anteriores</Title>
            <Box px={rem(8)}>
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>Empresa</TableTh>
                            <TableTh>Puesto de trabajo</TableTh>
                            <TableTh>Actividades que desempeñaba</TableTh>
                            <TableTh>Tiempo de trabajo (meses)</TableTh>
                            <TableTh>Riesgo</TableTh>
                            <TableTh>Observaciones</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>{rows}</TableTbody>
                </Table>
            </Box>
        </>
    )
}

export default PreviewInitialRecordJobHistory
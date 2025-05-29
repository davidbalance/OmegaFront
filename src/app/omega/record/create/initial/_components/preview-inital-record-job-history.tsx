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
                <Text fw={e.jobHistoryRiskPhysical ? 'bold' : 'lighter'}>FISICO</Text>
                <Text fw={e.jobHistoryRiskMechanical ? 'bold' : 'lighter'}>MECANICO</Text>
                <Text fw={e.jobHistoryRiskChemical ? 'bold' : 'lighter'}>QUIMICO</Text>
                <Text fw={e.jobHistoryRiskBiological ? 'bold' : 'lighter'}>BIOLOGICO</Text>
                <Text fw={e.jobHistoryRiskErgonomic ? 'bold' : 'lighter'}>ERGONOMICO</Text>
                <Text fw={e.jobHistoryRiskPsychosocial ? 'bold' : 'lighter'}>PSICOSOCIAL</Text>
            </TableTd>
            <TableTd>{e.jobHistoryObservation}</TableTd>
        </TableTr>

    ), [jobHistory]);

    return (
        <>
            <Title component='span' order={6} fw='bolder'>ANTECEDENTES DE EMPLEOS ANTERIORES</Title>
            <Box px={rem(8)}>
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>EMPRESA</TableTh>
                            <TableTh>PUESTO DE TRABAJO</TableTh>
                            <TableTh>ACTIVIDADES QUE DESEMPEÑABA</TableTh>
                            <TableTh>TIEMPO DE TRABAJO (meses)</TableTh>
                            <TableTh>RIESGO</TableTh>
                            <TableTh>OBSERVACIONES</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>{rows}</TableTbody>
                </Table>
            </Box>
        </>
    )
}

export default PreviewInitialRecordJobHistory
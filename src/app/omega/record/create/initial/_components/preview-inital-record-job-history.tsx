import React, { useMemo } from 'react'
import { Box, rem, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text, Title } from '@mantine/core'

type PreviewInitialRecordJobHistoryProps = {
    jobHistory: {
        lastJobCompany: string;
        lastJobPosition: string;
        lastJobActivity: string;
        lastJobTime: number;
        lastJobRiskPhysical: boolean;
        lastJobRiskMechanical: boolean;
        lastJobRiskChemical: boolean;
        lastJobRiskBiological: boolean;
        lastJobRiskErgonomic: boolean;
        lastJobRiskPsychosocial: boolean;
        lastJobObservation: string;
    }[]
}
const PreviewInitialRecordJobHistory: React.FC<PreviewInitialRecordJobHistoryProps> = ({
    jobHistory
}) => {

    const rows = useMemo(() => jobHistory.map(e =>
        <TableTr key={crypto.randomUUID()}>
            <TableTd>{e.lastJobCompany}</TableTd>
            <TableTd>{e.lastJobPosition}</TableTd>
            <TableTd>{e.lastJobActivity}</TableTd>
            <TableTd>{e.lastJobTime}</TableTd>
            <TableTd>
                <Text fw={e.lastJobRiskPhysical ? 'bold' : 'lighter'}>FISICO</Text>
                <Text fw={e.lastJobRiskMechanical ? 'bold' : 'lighter'}>MECANICO</Text>
                <Text fw={e.lastJobRiskChemical ? 'bold' : 'lighter'}>QUIMICO</Text>
                <Text fw={e.lastJobRiskBiological ? 'bold' : 'lighter'}>BIOLOGICO</Text>
                <Text fw={e.lastJobRiskErgonomic ? 'bold' : 'lighter'}>ERGONOMICO</Text>
                <Text fw={e.lastJobRiskPsychosocial ? 'bold' : 'lighter'}>PSICOSOCIAL</Text>
            </TableTd>
            <TableTd>{e.lastJobObservation}</TableTd>
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
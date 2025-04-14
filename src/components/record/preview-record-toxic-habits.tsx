import { ToxicDetail } from '@/server/record/create-record/_base'
import React, { useMemo } from 'react'
import { Box, rem, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Title } from '@mantine/core'


type PreviewRecordToxicHabitsProps = {
    habits: (Partial<ToxicDetail> & { habit: string | 'other' })[]
}
const PreviewRecordToxicHabits: React.FC<PreviewRecordToxicHabitsProps> = ({
    habits
}) => {

    const rows = useMemo(() => habits.map(e =>
        <TableTr key={e.habit}>
            <TableTd>{e.habit === 'other' ? e.other : e.habit}</TableTd>
            <TableTd>{e.consumer ? 'Si' : 'No'}</TableTd>
            <TableTd>{e.consumptionTime}</TableTd>
            <TableTd>{e.quantity}</TableTd>
            <TableTd>{e.consumed ? 'Si' : 'No'}</TableTd>
            <TableTd>{e.timeOfAbstinence}</TableTd>
        </TableTr>

    ), [habits]);

    return (
        <>
            <Title component='span' order={6} fw='bolder'>HABITOS TOXICOS</Title>
            <Box px={rem(8)}>
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>CONSUMOS NOCIVOS</TableTh>
                            <TableTh>SI/NO</TableTh>
                            <TableTh>TIEMPO DE CONSUMO (meses)</TableTh>
                            <TableTh>CANTIDAD</TableTh>
                            <TableTh>EX CONSUMIDOR</TableTh>
                            <TableTh>TIEMPO DE ABSTINENCIA (meses)</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>{rows}</TableTbody>
                </Table>
            </Box>
        </>
    )
}

export default PreviewRecordToxicHabits
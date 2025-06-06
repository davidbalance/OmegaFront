import { ToxicDetail } from '@/server/record/create-record/_base'
import React, { useMemo } from 'react'
import { Box, rem, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Title } from '@mantine/core'


type PreviewRecordToxicHabitsProps = {
    habits: (Partial<ToxicDetail>)[]
}
const PreviewRecordToxicHabits: React.FC<PreviewRecordToxicHabitsProps> = ({
    habits
}) => {

    const rows = useMemo(() => habits.map((e) =>
        <TableTr key={crypto.randomUUID()}>
            <TableTd>{e.name ?? ''}</TableTd>
            <TableTd>{e.haveConsume ? 'Si' : 'No'}</TableTd>
            <TableTd>{e.consumptionTime}</TableTd>
            <TableTd>{e.quantity}</TableTd>
            <TableTd>{e.isExConsumer ? 'Si' : 'No'}</TableTd>
            <TableTd>{e.timeOfAbstinence}</TableTd>
        </TableTr>

    ), [habits]);

    return (
        <>
            <Title component='span' order={6} fw='bolder'>Hábitos tóxicos</Title>
            <Box px={rem(8)}>
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>Consumos nocivos</TableTh>
                            <TableTh>Sí / No</TableTh>
                            <TableTh>Tiempo de consumo (meses)</TableTh>
                            <TableTh>Cantidad</TableTh>
                            <TableTh>Ex consumidor</TableTh>
                            <TableTh>Tiempo de abstinencia (meses)</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>{rows}</TableTbody>
                </Table>
            </Box>
        </>
    )
}

export default PreviewRecordToxicHabits
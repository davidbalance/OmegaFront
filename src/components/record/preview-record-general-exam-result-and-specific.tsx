import { GeneralExamResultAndSpecific } from '@/server/record/create-record/_base'
import React, { useMemo } from 'react'
import { Box, rem, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Title } from '@mantine/core'
import PreviewRecordContent from './preview-record-content'
import PreviewRecordElement from './preview-record-element'
import dayjs from 'dayjs'


type PreviewRecordGeneralExamResultAndSpecificProps = GeneralExamResultAndSpecific
const PreviewRecordGeneralExamResultAndSpecific: React.FC<PreviewRecordGeneralExamResultAndSpecificProps> = ({
    generalExamResults,
    generalExamObservation
}) => {

    const rows = useMemo(() => generalExamResults.map(e =>
        <TableTr key={crypto.randomUUID()}>
            <TableTd>{e.exam}</TableTd>
            <TableTd>{dayjs(e.date).format('YYYY/MM/DD')}</TableTd>
            <TableTd>{e.result}</TableTd>
        </TableTr>

    ), [generalExamResults]);

    return (
        <>
            <Title component='span' order={6} fw='bolder'>Hábitos tóxicos</Title>
            <Box px={rem(8)}>
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>Examen</TableTh>
                            <TableTh>Fecha</TableTh>
                            <TableTh>Resultados</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>{rows}</TableTbody>
                </Table>
            </Box>
            <PreviewRecordContent>
                <PreviewRecordElement title='Observaciones' text={generalExamObservation ?? ''} />
            </PreviewRecordContent>
        </>
    )
}

export default PreviewRecordGeneralExamResultAndSpecific
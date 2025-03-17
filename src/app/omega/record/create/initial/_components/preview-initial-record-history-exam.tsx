'use client'

import { Box, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import React, { useMemo } from 'react'

type PreviewInitialHistoryExamProps = {
  exams: {
    exam: string;
    done: boolean;
    time?: number;
    result?: string;
  }[]
}
const PreviewInitialHistoryExam: React.FC<PreviewInitialHistoryExamProps> = ({
  exams
}) => {

  const rows = useMemo(() => exams.map(e =>
    <TableTr key={e.exam}>
      <TableTd>{e.exam}</TableTd>
      <TableTd>{e.done ? 'Si' : 'No'}</TableTd>
      <TableTd>{e.time?.toString()}</TableTd>
      <TableTd>{e.result}</TableTd>
    </TableTr>

  ), [exams]);

  return (
    <Box px={8}>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh>EXAMENES REALIZADOS</TableTh>
            <TableTh>SI/NO</TableTh>
            <TableTh>TIEMPO (años)</TableTh>
            <TableTh>Resultado</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </Box>
  )
}

export default PreviewInitialHistoryExam
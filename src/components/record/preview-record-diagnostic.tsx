import { MedicalDiagnostic } from '@/server/record/create-record/_base'
import React, { useMemo } from 'react'
import { Box, rem, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core'

type PreviewRecordDiagnosticProps = {
    diagnostics: MedicalDiagnostic[];
}
const PreviewRecordDiagnostic: React.FC<PreviewRecordDiagnosticProps> = ({
    diagnostics
}) => {

    const rows = useMemo(() => diagnostics.map(e =>
        <TableTr key={crypto.randomUUID()}>
            <TableTd>{e.description}</TableTd>
            <TableTd>{e.cie}</TableTd>
            <TableTd>{e.pre ? 'Si' : 'No'}</TableTd>
            <TableTd>{e.def ? 'Si' : 'No'}</TableTd>
        </TableTr>

    ), [diagnostics]);

    return (
        <Box px={rem(8)}>
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh>DESCRIPCION</TableTh>
                        <TableTh>CIE</TableTh>
                        <TableTh>PRE</TableTh>
                        <TableTh>DEF</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>{rows}</TableTbody>
            </Table>
        </Box>
    )
}

export default PreviewRecordDiagnostic
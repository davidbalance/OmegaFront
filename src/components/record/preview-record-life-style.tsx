import { LifeStyle } from '@/server/record/create-record/_base'
import React from 'react'
import { Box, rem, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Title } from '@mantine/core'

type PreviewRecordLifeStyleProps = LifeStyle;
const PreviewRecordLifeStyle: React.FC<PreviewRecordLifeStyleProps> = ({
    lifestyleMedicationTaking,
    lifestylePhysicalActivityActive,
    lifestyleMedicationName,
    lifestyleMedicationQuantity,
    lifestylePhysicalActivityDuration,
    lifestylePhysicalActivityType
}) => {

    return (
        <>
            <Title component='span' order={6} fw='bolder'>ESTILO DE VIDA</Title>
            <Box px={rem(8)}>
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>CONSUMOS NOCIVOS</TableTh>
                            <TableTh>SI/NO</TableTh>
                            <TableTh>¿CUAL?</TableTh>
                            <TableTh>TIEMPO / CANTIDAD</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        <TableTr>
                            <TableTd>ACTVIIDAD FISICA</TableTd>
                            <TableTd>{lifestylePhysicalActivityActive ? 'Si' : 'No'}</TableTd>
                            <TableTd>{lifestylePhysicalActivityType}</TableTd>
                            <TableTd>{lifestylePhysicalActivityDuration} dias</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTd>MEDICACIÓN HABITUAL</TableTd>
                            <TableTd>{lifestyleMedicationTaking ? 'Si' : 'No'}</TableTd>
                            <TableTd>{lifestyleMedicationName}</TableTd>
                            <TableTd>{lifestyleMedicationQuantity} (unidad)</TableTd>
                        </TableTr>
                    </TableTbody>
                </Table>
            </Box>
        </>
    )
}

export default PreviewRecordLifeStyle
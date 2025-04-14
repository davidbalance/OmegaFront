import { VitalSignsAndAnthropometry } from '@/server/record/create-record/_base'
import React from 'react'
import { Box, rem, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core'

type PreviewRecordVitalSignsAndAnthropometryProps = VitalSignsAndAnthropometry
const PreviewRecordVitalSignsAndAnthropometry: React.FC<PreviewRecordVitalSignsAndAnthropometryProps> = ({
    vitalSignsBloodPressure,
    vitalSignsTemperature,
    vitalSignsHeartRate,
    vitalSignsOxygenSaturation,
    vitalSignsRespiratoryRate,
    vitalSignsWeight,
    vitalSignsSize,
    vitalSignsMassIndex,
    vitalSignsAbdominalPerimeter
}) => {

    return (
        <Box px={rem(8)}>
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh>PRESION ARTERIAL (mmHg)</TableTh>
                        <TableTh>TEMPERATURA (c)</TableTh>
                        <TableTh>FRECUENCIA CARDIACA (Lat/min)</TableTh>
                        <TableTh>SATURACION DE OXIGENO (O2%)</TableTh>
                        <TableTh>FRECUENCIA RESPIRATORIA (fr/min)</TableTh>
                        <TableTh>PESO (Kg)</TableTh>
                        <TableTh>TALLA (cm)</TableTh>
                        <TableTh>INDICE DE MASA CORPORAL (kg/m2)</TableTh>
                        <TableTh>PERIMETRO ABDOMINAL (cm)</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    <TableTr>
                        <TableTd>{vitalSignsBloodPressure}</TableTd>
                        <TableTd>{vitalSignsTemperature}</TableTd>
                        <TableTd>{vitalSignsHeartRate}</TableTd>
                        <TableTd>{vitalSignsOxygenSaturation}</TableTd>
                        <TableTd>{vitalSignsRespiratoryRate}</TableTd>
                        <TableTd>{vitalSignsWeight}</TableTd>
                        <TableTd>{vitalSignsSize}</TableTd>
                        <TableTd>{vitalSignsMassIndex}</TableTd>
                        <TableTd>{vitalSignsAbdominalPerimeter}</TableTd>
                    </TableTr>
                </TableTbody>
            </Table>
        </Box>
    )
}

export default PreviewRecordVitalSignsAndAnthropometry
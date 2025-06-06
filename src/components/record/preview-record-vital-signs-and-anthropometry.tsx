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
                        <TableTh>Presión arterial (mmHg)</TableTh>
                        <TableTh>Temperatura (°C)</TableTh>
                        <TableTh>Frecuencia cardíaca (lat/min)</TableTh>
                        <TableTh>Saturación de oxígeno (O₂ %)</TableTh>
                        <TableTh>Frecuencia respiratoria (fr/min)</TableTh>
                        <TableTh>Peso (kg)</TableTh>
                        <TableTh>Talla (cm)</TableTh>
                        <TableTh>Índice de masa corporal (kg/m²)</TableTh>
                        <TableTh>Perímetro abdominal (cm)</TableTh>
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
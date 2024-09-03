import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { Flex, Title, Text, MenuLabel, MenuItem, rem, Box } from '@mantine/core'
import React from 'react'
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto'
import MedicalDiseaseContainer from '@/components/medical/disease/container/MedicalDiseaseContainer'
import { IconDownload, IconEye, IconStethoscope, IconUpload, IconVirus } from '@tabler/icons-react'
import Link from 'next/link'
import MedicalResultDownload from './medical-result-download'
import MedicalResultMenu from './medical-result-menu'
import ActionUserProvider from '@/contexts/action-user.context'
import MedicalResultFileDelete from './medical-result-file-delete'
import MedicalReportDownload from '../medical-report/medical-report-download'

interface MedicalResultListBodyProps {
    data: MedicalResult[]
}
const MedicalResultListBody: React.FC<MedicalResultListBodyProps> = ({ data }) => {
    return (
        <ListTbody>
            {data.map((e) => (
                <ListRow
                    key={e.id}>
                    <Flex justify='space-between' align='center'>
                        <Box>
                            <Title order={6}>{e.examName}</Title>
                            <MedicalDiseaseContainer data={e.diseases || []} />
                            {!e.hasFile && <Text size='xs' c='red'>Archivo no encontrado</Text>}
                            {!e.report && <Text size='xs' c='red'>Reporte no realizado</Text>}
                        </Box>
                        <ActionUserProvider>
                            <MedicalResultMenu>
                                <MenuLabel>Misc.</MenuLabel>
                                <MenuItem
                                    component={Link}
                                    href={`patient/medical/result/${e.id}/disease`}
                                    leftSection={(
                                        <IconVirus style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Modificar morbilidades
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    href={`patient/medical/result/${e.id}/exam`}
                                    leftSection={(
                                        <IconStethoscope style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Modificar tipo de examen
                                </MenuItem>
                                <MenuLabel>Resultado medicos</MenuLabel>
                                {e.hasFile && (
                                    <MedicalResultDownload
                                        id={e.id}
                                        exam={e.examName} />
                                )}
                                {e.hasFile && (
                                    <MenuItem
                                        component={Link}
                                        href={`patient/medical/result/${e.id}/file/view`}
                                        leftSection={(
                                            <IconEye style={{ width: rem(16), height: rem(16) }} />
                                        )}>
                                        Visualizar resultado
                                    </MenuItem>
                                )}
                                <MenuItem
                                    component={Link}
                                    href={`patient/medical/result/${e.id}/file/upload`}
                                    leftSection={(
                                        <IconUpload style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Subir resultado
                                </MenuItem>
                                {e.hasFile && (
                                    <MedicalResultFileDelete id={e.id} />
                                )}
                                <MenuLabel>Reportes medicos</MenuLabel>
                                {(e.report && e.report.hasFile) && (
                                    <MedicalReportDownload
                                        id={e.report.id}
                                        exam={e.examName} />
                                )}
                                {(e.report && e.report.hasFile) && (
                                    <MenuItem
                                        component={Link}
                                        href={`patient/medical/report/${e.id}/file/view`}
                                        leftSection={(
                                            <IconEye style={{ width: rem(16), height: rem(16) }} />
                                        )}>
                                        Visualizar reporte
                                    </MenuItem>
                                )}
                            </MedicalResultMenu>
                        </ActionUserProvider>
                    </Flex>
                </ListRow >
            ))}
        </ListTbody >
    )
}

export default MedicalResultListBody
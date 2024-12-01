import React from 'react'
import { Box, Flex, Text, Title } from '@mantine/core'
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto'
import ListTbody from './_base/list/list-tbody'
import ListRow from './_base/list/list-row'
import ActionMenuProvider from '@/contexts/action-menu.context'
import ActionMenu from './_base/action-menu'
import MedicalResultMenuMiscContent from './medical-result-menu-misc-content'
import MedicalResultMenuFileContent from './medical-result-menu-file-content'
import MedicalReportMenuFileContent from './medical-report-menu-file-content'
import { retriveMedicalOrderStatus } from '@/server/medical-order.actions'

interface MedicalResultBodyProps {
    order: number | undefined;
    medicalResult: MedicalResult[];
    notShowMisc?: boolean;
    notEditResults?: boolean;
    notEditReports?: boolean;
}
const MedicalResultBody: React.FC<MedicalResultBodyProps> = async ({
    order,
    medicalResult,
    notShowMisc,
    notEditResults,
    notEditReports
}) => {

    const orderStatus = order ? await retriveMedicalOrderStatus(order) : 'not-have';

    return (
        <ListTbody>
            {medicalResult.map((e) => (
                <ListRow
                    hoverable
                    key={e.id}>
                    <Flex justify='space-between' align='center'>
                        <Box>
                            <Title order={6}>{e.examName}</Title>
                            {e.diseases?.map(e => (
                                <Box w={150} key={Math.random()}>
                                    <Text size='xs' c='neutral' truncate='end'>{e}</Text>
                                </Box>
                            ))}
                            {!e.hasFile && <Text size='xs' c={e.orderHasFile ? 'blue' : 'red'}>Archivo no encontrado</Text>}
                            {(!e.reportHasFile && !e.reportId) && <Text size='xs' c='red'>Reporte no realizado</Text>}
                        </Box>
                        <ActionMenuProvider>
                            <ActionMenu>
                                <MedicalResultMenuMiscContent result={e.id} show={orderStatus === 'created' && !notShowMisc} />
                                <MedicalResultMenuFileContent {...e} editable={orderStatus === 'created' && !notEditResults} />
                                <MedicalReportMenuFileContent
                                    result={e.id}
                                    {...e}
                                    id={e.reportId}
                                    hasFile={e.reportHasFile}
                                    editable={orderStatus === 'created' && !notEditReports} />
                            </ActionMenu>
                        </ActionMenuProvider>
                    </Flex>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default MedicalResultBody
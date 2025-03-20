import React from 'react'
import { Box, Flex, Text, Title } from '@mantine/core'
import ListRow from './_base/list/list-row'
import ActionMenuProvider from '@/contexts/action-menu.context'
import ActionMenu from './_base/action-menu'
import MedicalTestMenuMiscContent from './medical-test-menu-misc-content';
import ResultMenu from './result_menu';
import { MedicalTest } from '@/server/medical_test/server_types'
import { OrderStatus } from '@/server/medical_order/server_types'
import ReportMenu from './report_menu'

type TestItemProps = MedicalTest & {
    orderStatus: OrderStatus | undefined;
    notShowMisc?: boolean;
    notEditResults?: boolean;
    notEditReports?: boolean;
}
const TestItem: React.FC<TestItemProps> = async ({
    testId,
    examName,
    resultHasFile,
    reportHasContent,
    diseases,
    orderStatus,
    notShowMisc,
    notEditResults,
    notEditReports
}) => {
    return (
        <ListRow
            hoverable
            key={testId}>
            <Flex
                component='div'
                justify='space-between'
                align='center'>
                <Box component='div'>
                    <Title order={6}>{examName}</Title>
                    {diseases?.map(e => (
                        <Box w={150} key={Math.random()}>
                            <Text size='xs' c='neutral' truncate='end'>{e}</Text>
                        </Box>
                    ))}
                    {!resultHasFile && <Text size='xs' c={resultHasFile ? 'blue' : 'red'}>Archivo no encontrado</Text>}
                    {!reportHasContent && <Text size='xs' c='red'>Reporte no realizado</Text>}
                </Box>
                <ActionMenuProvider>
                    <ActionMenu>
                        <MedicalTestMenuMiscContent
                            testId={testId}
                            editable={orderStatus === 'created' && !notShowMisc} />
                        <ResultMenu
                            hasFile={resultHasFile}
                            testId={testId}
                            examName={examName}
                            editable={orderStatus === 'created' && !notEditResults} />
                        <ReportMenu
                            testId={testId}
                            examName={examName}
                            reportHasContent={reportHasContent}
                            editable={orderStatus === 'created' && !notEditReports} />
                    </ActionMenu>
                </ActionMenuProvider>
            </Flex>
        </ListRow>
    )
}

export default TestItem
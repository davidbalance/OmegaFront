import React from 'react'
import { Box, Flex, Group, Text, Title } from '@mantine/core'
import ListRow from './_base/list/list-row'
import ActionMenuProvider from '@/contexts/action-menu.context'
import ActionMenu from './_base/action-menu'
import MedicalTestMenuMiscContent from './medical-test-menu-misc-content';
import ResultMenu from './result-menu';
import { MedicalTest } from '@/server/medical-test/server-types'
import { OrderStatus } from '@/server/medical-order/server-types'

type TestItemProps = MedicalTest & {
    orderStatus: OrderStatus | undefined;
    notShowMisc?: boolean;
    notEditResults?: boolean;
}
const TestItem: React.FC<TestItemProps> = async ({
    testId,
    examName,
    resultHasFile,
    diseases,
    orderStatus,
    notShowMisc,
    notEditResults
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
                    <Text size='xs' c={resultHasFile ? 'blue' : 'red'}>{resultHasFile ? 'Archivo listo' : 'Archivo no encontrado'}</Text>
                </Box>
                <Group gap={4}>
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
                        </ActionMenu>
                    </ActionMenuProvider>
                </Group>

            </Flex>
        </ListRow>
    )
}

export default TestItem
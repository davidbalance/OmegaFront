import React from 'react'
import { Box, Flex, Text } from '@mantine/core'
import { ClientRecord } from '@/server/record/server-types'
import dayjs from 'dayjs'
import Title from '@/components/_base/mantine/title'
import ListRow from '@/components/_base/list/list-row'

type RecordItemProps = ClientRecord;
const RecordItem: React.FC<RecordItemProps> = async ({
    recordId,
    recordName,
    recordEmissionDate
}) => {
    return (
        <ListRow hoverable>
            <Flex
                component='div'
                justify='space-between'
                align='center'>
                <Box component='div'>
                    <Title order={6}>{recordName}</Title>
                    <Text>{dayjs(recordEmissionDate).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </Box>
                {/* <ActionMenuProvider>
                    <ActionMenu>
                        {(orderStatus === 'created' && !notShowMisc) && <MedicalResultMenuMiscContent testId={testId} />}
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
                </ActionMenuProvider> */}
            </Flex>
        </ListRow>
    )
}

export default RecordItem
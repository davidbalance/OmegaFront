import React from 'react'
import { Box, Flex, Text } from '@mantine/core'
import { ClientRecord } from '@/server/record/server-types'
import dayjs from 'dayjs'
import Title from '@/components/_base/mantine/title'
import ListRow from '@/components/_base/list/list-row'
import RecordDownload from './record-download'
import ActionMenu from '@/components/_base/action-menu'
import ActionMenuProvider from '@/contexts/action-menu.context'

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
                    <Title order={6}>{`${recordName.slice(0, 1).toUpperCase()}${recordName.slice(1)}`}</Title>
                    <Text>{dayjs(recordEmissionDate).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </Box>
                <ActionMenuProvider>
                    <ActionMenu>
                        <RecordDownload
                            recordId={recordId}
                            recordName={recordName} />
                    </ActionMenu>
                </ActionMenuProvider>
            </Flex>
        </ListRow>
    )
}

export default RecordItem
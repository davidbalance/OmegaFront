import { Grid, rem, Flex, Text } from '@mantine/core'
import events from 'events'
import React from 'react'
import { ApiKeySettings } from '../api-key-settings/ApiKeySettings'

type ApiKeyItemProps = {
    index: number;
    name: string;
    onDelete: () => void
}
const ApiKeyItem: React.FC<ApiKeyItemProps> = ({ index, name, onDelete }) => {
    return (
        <Grid
            px={rem(32)}
            py={rem(8)}
            mb={rem(8)}
            style={{
                border: '1px solid #000',
                borderRadius: 10
            }}>
            <Grid.Col span={10}>
                <Flex align='center'>
                    <Text size='xs'>
                        {name}
                    </Text>
                </Flex>
            </Grid.Col>
            <Grid.Col span={2}>
                <ApiKeySettings
                    onDelete={onDelete} />
            </Grid.Col>
        </Grid>
    )
}

export default ApiKeyItem
'use client'

import { ServerLog } from '@/lib/dtos/logs/log.response.dto'
import { Box, Collapse, Text, UnstyledButton, Grid, Divider, Title, DefaultMantineColor, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useMemo } from 'react'
import styles from './developer-log.module.css'

interface DeveloperLog extends ServerLog { }
const DeveloperLog: React.FC<DeveloperLog> = ({
    level,
    message,
    timestamp
}) => {
    const [opened, { toggle }] = useDisclosure(false);

    const logColor = useMemo((): DefaultMantineColor => {
        switch (level) {
            case 'warn':
                return 'orange';
            case 'error':
                return 'red';
            default:
                return 'cyan';
        }
    }, [level]);

    return (
        <Box className={styles.container}>
            <UnstyledButton
                className={styles.control}
                onClick={toggle}>
                <Grid>
                    <Grid.Col span={7}>
                        <Title order={5}>
                            {dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}
                        </Title>
                        <Box maw={500}>
                            <Text truncate="end">
                                {message}
                            </Text>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Flex
                            h='100%'
                            align='center'
                            justify='space-between'>
                            <Divider size="sm" orientation="vertical" />
                            <Title
                                c={logColor}
                                order={6}
                                tt='uppercase'>
                                {level}
                            </Title>
                            <Divider size="sm" orientation="vertical" />
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Flex h='100%' align='center'>
                            {opened ? <IconChevronUp /> : <IconChevronDown />}
                        </Flex>
                    </Grid.Col>
                </Grid>
            </UnstyledButton>

            <Collapse in={opened}>
                <Divider my="sm" />
                <Box className={styles.innerLog}>
                    <Text>{message}</Text>
                </Box>
            </Collapse>
        </Box>
    )
}

export default DeveloperLog
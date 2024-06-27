import { ServerLog } from '@/lib/dtos/logs/log.response.dto'
import { Box, Collapse, Text, UnstyledButton, Grid, Divider, Title, DefaultMantineColor, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useMemo } from 'react'
import classes from './DeveloperLog.module.css'

interface DeveloperLog {
    log: ServerLog
}
const DeveloperLog: React.FC<DeveloperLog> = ({ log }) => {
    const [opened, { toggle }] = useDisclosure(false);

    const logColor = useMemo((): DefaultMantineColor => {
        switch (log.level) {
            case 'warn':
                return 'orange';
            case 'error':
                return 'red';
            default:
                return 'cyan';
        }
    }, [log.level]);

    return (
        <Box className={classes.container}>
            <UnstyledButton
                className={classes.control}
                onClick={toggle}>
                <Grid>
                    <Grid.Col span={7}>
                        <Title order={5}>
                            {dayjs(log.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                        </Title>
                        <Box maw={500}>
                            <Text truncate="end">
                                {log.message}
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
                                {log.level}
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
                <Box className={classes.innerLog}>
                    <Text>{log.message}</Text>
                </Box>
            </Collapse>
        </Box>
    )
}

export { DeveloperLog }
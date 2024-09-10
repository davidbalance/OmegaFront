import { ServerLogLevel } from '@/lib/dtos/logs/log.response.dto'
import { Divider, Flex, Group, rem } from '@mantine/core';
import React from 'react'
import LogLevelButton from './log-level-button';
import LogLevelButtonAll from './log-level-button-all';

interface LogLevelProps {
    levels: ServerLogLevel[];
}
const LogLevel: React.FC<LogLevelProps> = ({
    levels
}) => {
    return (
        <>
            <Group gap={rem(8)}>
                <LogLevelButtonAll />
                <Divider size="sm" orientation="vertical" />
                {levels.map(e => <LogLevelButton key={e.level} {...e} />)}
            </Group>
        </>
    )
}

export default LogLevel
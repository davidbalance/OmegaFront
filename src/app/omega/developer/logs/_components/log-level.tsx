import { Divider, Flex, Group, rem } from '@mantine/core';
import React from 'react'
import LogLevelButton from './log-level-button';
import LogLevelButtonAll from './log-level-button-all';
import { LoggerLevel } from '@/server/logger/server-types';

interface LogLevelProps {
    levels: LoggerLevel[];
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
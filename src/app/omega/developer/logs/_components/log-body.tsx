import React from 'react'
import styles from './log-list.module.css'
import { ScrollArea, rem, Stack } from '@mantine/core'

interface LogBodyProps {
    children: React.ReactNode
}
const LogBody: React.FC<LogBodyProps> = ({
    children
}) => {
    return (
        <ScrollArea
            className={styles.container}
            h={375}>
            <Stack gap={rem(8)}>
                {children}
            </Stack>
        </ScrollArea>
    )
}

export default LogBody
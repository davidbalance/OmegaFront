'use client'

import { UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'
import styles from './log-level-button.module.css'

const LogLevelButtonAll: React.FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const params = new URLSearchParams(searchParams);
    params.delete('logLevel');

    return (
        <UnstyledButton
            className={styles.control}
            data-active={!searchParams.has('logLevel') || undefined}
            component={Link}
            href={{
                pathname: pathname,
                query: params.toString()
            }}>
            All
        </UnstyledButton>
    )
}

export default LogLevelButtonAll
'use client'

import React from 'react'
import { ServerLogLevel } from '@/lib/dtos/logs/log.response.dto'
import { UnstyledButton } from '@mantine/core'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from './log-level-button.module.css'

interface LogLevelButtonProps extends ServerLogLevel { }
const LogLevelButton: React.FC<LogLevelButtonProps> = ({
  level
}) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  params.set('logLevel', level);

  return (
    <UnstyledButton
      className={styles.control}
      data-active={searchParams.get('logLevel') === level || undefined}
      component={Link}
      href={{
        pathname: pathname,
        query: params.toString()
      }}>
      {level}
    </UnstyledButton>
  )
}

export default LogLevelButton
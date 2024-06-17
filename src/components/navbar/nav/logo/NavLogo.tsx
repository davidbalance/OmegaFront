import { Group, rem } from '@mantine/core'
import React from 'react'
import classes from './NavLogo.module.css'
import { SystemLogo } from './logos'
import { LOGO_KEY } from '@/lib/constants'
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage'

const NavLogo: React.FC = () => {
    const [logo] = useLocalStorage<keyof (typeof SystemLogo)>(LOGO_KEY, 'omega');
    const CurrentLogo: React.ElementType = SystemLogo[logo];
    return (
        <Group justify="center" align='center' className={classes.logo} gap={5}>
            <CurrentLogo style={{ width: rem(48), color: 'white' }} />
        </Group>
    )
}

export { NavLogo }
import { Group, rem } from '@mantine/core'
import React from 'react'
import classes from './NavLogo.module.css'
import { SystemLogo } from './logos'
import { useLogo } from '@/hooks/useLogo'

const NavLogo: React.FC = () => {
    const [logo] = useLogo();
    const CurrentLogo: React.ElementType = SystemLogo[logo];
    return (
        <Group justify="center" align='center' className={classes.logo} gap={5}>
            <CurrentLogo style={{ width: rem(48), color: 'white' }} />
        </Group>
    )
}

export { NavLogo }
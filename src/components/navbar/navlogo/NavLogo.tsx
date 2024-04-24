import { Group, rem, Text } from '@mantine/core'
import React from 'react'
import { Logo } from './Logo'
import classes from './NavLogo.module.css'

const NavLogo: React.FC = () => {
    return (
        <Group justify="center" align='center' className={classes.logo} gap={5}>
            <Logo style={{ width: rem(25) }} />
            <Text size='md' fw={500}>Mantine</Text>
        </Group>
    )
}

export { NavLogo }
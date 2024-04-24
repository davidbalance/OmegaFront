import { ActionIcon, Avatar, Group, Text, Tooltip, UnstyledButton, rem } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import React from 'react'
import { useAuth } from '@/hooks'
import classes from './NavFooter.module.css'

type NavFooterProps = {}

const NavFooter: React.FC<NavFooterProps> = () => {

    const { logout, user } = useAuth();

    return (
        <Group
            wrap="nowrap"
            mr={rem(8)}
            ml={rem(8)}
            pt={rem(16)}
            pb={rem(16)}
            justify='center'
            align='center'>
            <Avatar
                size={35}
                radius="xl"
                color='omegaColors'
            />
            <div className={classes.user}>
                {
                    user && <>
                        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">{`${user.lastname} ${user.name}`}</Text>
                        <Text fz="xs" c="dimmed">{user.email}</Text>
                    </>
                }
            </div>
            <Tooltip label="Cerrar sesión" position='right'>
                <ActionIcon size='lg' variant='subtle' onClick={logout}>
                    <IconLogout stroke={1.5} style={{ width: rem(18), height: rem(18) }} />
                </ActionIcon>
            </Tooltip>
        </Group>
    )
}

export { NavFooter }
import { ActionIcon, Avatar, Flex, Grid, Group, Text, Tooltip, rem } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import React from 'react'
import { useAuth } from '@/hooks'
import classes from './NavFooter.module.css'

type NavFooterProps = {}

const NavFooter: React.FC<NavFooterProps> = () => {

    const { logout, user } = useAuth();

    return (
        <Grid
            px={rem(16)}
            py={rem(16)}
            justify='center'
            align='center'>
            <Grid.Col span={2}>
                <Flex justify='center' direction='column' align='center'>
                    <Avatar
                        size={35}
                        radius="xl"
                        color='omegaColors'
                    />
                </Flex>
            </Grid.Col>
            <Grid.Col span={8} className={classes.user}>
                <Flex justify='center' direction='column' align='center'>
                    {
                        user && <>
                            <Text size="xs" tt="uppercase" fw={700} c="dimmed">{`${user.lastname} ${user.name}`}</Text>
                            <Text size="xs" c="dimmed">{user.email}</Text>
                        </>
                    }
                </Flex>
            </Grid.Col>
            <Grid.Col span={2}>
                <Flex justify='center' direction='column' align='center'>
                    <Tooltip label="Cerrar sesión" position='right'>
                        <ActionIcon size='lg' variant='subtle' onClick={logout}>
                            <IconLogout stroke={1.5} style={{ width: rem(18), height: rem(18) }} />
                        </ActionIcon>
                    </Tooltip>
                </Flex>
            </Grid.Col>

        </Grid>
    )
}

export { NavFooter }
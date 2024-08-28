import React from 'react'
import OmegaShellRoot from './omega-shell-root'
import OmegaShellHeader from './omega-shell-header'
import OmegaShellNavbar from './omega-shell-navbar'
import OmegaShellMain from './omega-shell-main'
import { ActionIcon, Avatar, Box, Flex, rem, ScrollAreaAutosize, Skeleton, Stack } from '@mantine/core'
import OmegaShellBurger from './omega-shell-burger'
import OmegaShellSection from './omega-shell-section'
import OmegaShellLock from './omega-shell-lock'
import OmegaShellLink from './omega-shell-link'

interface OmegaShellProps {
    children: React.ReactNode
}
const OmegaShell: React.FC<OmegaShellProps> = ({ children }) => {
    return (
        <OmegaShellRoot>
            <OmegaShellHeader>
                <Flex
                    w='100%'
                    h='100%'
                    align='center'>
                    <OmegaShellBurger />
                    <Box
                        maw='100%'
                        m='auto'>
                        <Skeleton
                            width={rem(40)}
                            height={rem(15)} />
                    </Box>
                    <ActionIcon
                        variant='transparent'>
                        <Avatar
                            variant='transparent'
                            color='orange' />
                    </ActionIcon>
                </Flex>
            </OmegaShellHeader>
            <OmegaShellNavbar>
                <Stack h='100%'>
                    <Box flex={1}>
                        <ScrollAreaAutosize mah={500} dir='rtl'>
                            <OmegaShellSection
                                gap={rem(4)}>
                                <OmegaShellLink
                                    label='Home'
                                    icon='user'
                                    href='/omega' />
                            </OmegaShellSection>
                        </ScrollAreaAutosize>
                    </Box>
                    <OmegaShellSection
                        mt='md'
                        visibleFrom='md'>
                        <Flex w='100%' justify='flex-end'>
                            <OmegaShellLock />
                        </Flex>
                    </OmegaShellSection>
                </Stack>
            </OmegaShellNavbar>
            <OmegaShellMain>
                {children}
            </OmegaShellMain>
        </OmegaShellRoot >
    )
}

export default OmegaShell
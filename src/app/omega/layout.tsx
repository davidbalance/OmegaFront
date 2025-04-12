<<<<<<< HEAD
import { Box, Flex, rem, ScrollAreaAutosize, Stack } from "@mantine/core"
import Footer from "@/components/footer/Footer"
import ModularLayout from "@/components/modular/layout/ModularLayout"
import OmegaLogo from "./_components/omega-logo"
import OmegaShellBurger from "./_components/omega-shell/omega-shell-burger"
import OmegaShellHeader from "./_components/omega-shell/omega-shell-header"
import OmegaShellLock from "./_components/omega-shell/omega-shell-lock"
import OmegaShellMain from "./_components/omega-shell/omega-shell-main"
import OmegaShellNavbar from "./_components/omega-shell/omega-shell-navbar"
import OmegaShellRoot from "./_components/omega-shell/omega-shell-root"
import OmegaHeaderMenu from "./_components/omega-header-menu"
import { findMe } from "@/server"
import OmegaShellSection from "./_components/omega-shell/omega-shell-section"
import OmegaShellLink from "./_components/omega-shell/omega-shell-link"

const Layout: React.FC<{
    children: React.ReactNode,
    modal: React.ReactNode,
}> = async ({
    children,
    modal
}) => {
        const me = await findMe();
        return (
            <>
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
                                <OmegaLogo logo={me.logo} />
                            </Box>
                            <OmegaHeaderMenu
                                email={me.email}
                                name={me.name}
                                lastname={me.lastname} />
                        </Flex>
                    </OmegaShellHeader>
                    <OmegaShellNavbar>
                        <Stack h='100%'>
                            <Box flex={1}>
                                <ScrollAreaAutosize mah={{ base: rem(400), md: rem(500) }} dir='rtl' w='fit-content'>
                                    <OmegaShellSection
                                        gap={rem(4)}>
                                        {me.resources.map((e) => (
                                            <OmegaShellLink
                                                key={e.label}
                                                href={e.address}
                                                label={e.label}
                                                icon={e.icon} />
                                        ))}
                                    </OmegaShellSection>
                                </ScrollAreaAutosize>
                            </Box>
                            <Flex
                                visibleFrom='md'
                                w='100%'
                                justify='flex-end'>
                                <OmegaShellLock />
                            </Flex>
                        </Stack>
                    </OmegaShellNavbar>
                    <OmegaShellMain>
                        <Box h='100%' w='100%' pos='relative'>
                            <ModularLayout>
                                {children}
                            </ModularLayout>
                        </Box>
                        {/* <Footer /> */}
                    </OmegaShellMain>
                </OmegaShellRoot>
                {modal}
            </>
        );
    }
=======
'use client'

import { Box } from "@mantine/core"
import Footer from "@/components/footer/Footer"
import { Topbar } from "@/components/navbar/topbar/Topbar"
import { useDisclosure } from "@mantine/hooks"
import classes from './layout.module.css'
import { Navbar } from "@/components/navbar/Navbar"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [opened, { toggle, close }] = useDisclosure();

    return (
        <main className={classes.wrapper}>
            <Box mah='10vh'>
                <Topbar burger={{ opened: opened, onClick: toggle }} />
            </Box>
            <Box className={classes.outer} mah='100%' pos='relative'>
                <Navbar opened={opened} onClose={close} />
                <Box h='100%' w='100%' pos='relative'>
                    {children}
                </Box>
            </Box>
            <Footer />
        </main>
    )
}
>>>>>>> main

export default Layout
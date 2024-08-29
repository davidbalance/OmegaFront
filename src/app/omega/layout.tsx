import { ActionIcon, Avatar, Box, Flex, rem, ScrollAreaAutosize, Skeleton, Stack } from "@mantine/core"
import Footer from "@/components/footer/Footer"
import ModularLayout from "@/components/modular/layout/ModularLayout"
import { Suspense } from "react"
import OmegaLogo from "./_components/omega-logo"
import OmegaShellBurger from "./_components/omega-shell/omega-shell-burger"
import OmegaShellHeader from "./_components/omega-shell/omega-shell-header"
import OmegaShellLock from "./_components/omega-shell/omega-shell-lock"
import OmegaShellMain from "./_components/omega-shell/omega-shell-main"
import OmegaShellNavbar from "./_components/omega-shell/omega-shell-navbar"
import OmegaShellRoot from "./_components/omega-shell/omega-shell-root"
import OmegaShellSection from "./_components/omega-shell/omega-shell-section"
import OmegaNavbarContent from "./_components/omega-navbar-content"
import OmegaLogoSuspense from "./_components/omega-logo.suspense"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

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
                        {/* <Suspense fallback={<OmegaLogoSuspense />}> */}
                        <OmegaLogo />
                        {/* </Suspense> */}
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
                            {/* <Suspense> */}
                            <OmegaNavbarContent />
                            {/* </Suspense> */}
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
                <Box h='100%' w='100%' pos='relative'>
                    <ModularLayout>
                        {children}
                    </ModularLayout>
                </Box>
                <Footer />
            </OmegaShellMain>
        </OmegaShellRoot>
    );
}

export default Layout
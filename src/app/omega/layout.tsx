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
import OmegaNavbarContent from "./_components/omega-navbar-content"
import OmegaHeaderMenu from "./_components/omega-header-menu"

const Layout: React.FC<{
    children: React.ReactNode,
    modal: React.ReactNode,
}> = ({
    children,
    modal
}) => {
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
                            <OmegaLogo />
                        </Box>
                        <OmegaHeaderMenu />
                    </Flex>
                </OmegaShellHeader>
                <OmegaShellNavbar>
                    <Stack h='100%'>
                        <Box flex={1}>
                            <ScrollAreaAutosize mah={{ base: rem(400), md: rem(500) }} dir='rtl' w='fit-content'>
                                <OmegaNavbarContent />
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
                            {modal}
                        </ModularLayout>
                    </Box>
                    <Footer />
                </OmegaShellMain>
            </OmegaShellRoot>
        );
    }

export default Layout
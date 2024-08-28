import { Box } from "@mantine/core"
import Footer from "@/components/footer/Footer"
import ModularLayout from "@/components/modular/layout/ModularLayout"
import OmegaShell from "./_components/omega-shell/omega-shell"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    /*     const [opened, { toggle, close }] = useDisclosure();
    
        return (
            <main className={classes.wrapper}>
                <Box mah='10vh'>
                    <Topbar burger={{ opened: opened, onClick: toggle }} />
                </Box>
                <Box className={classes.outer} mah='100%' pos='relative'>
                    <Navbar opened={opened} onClose={close} />
                    <Box h='100%' w='100%' pos='relative'>
                        <ModularLayout>
                            {children}
                        </ModularLayout>
                    </Box>
                </Box>
                <Footer />
            </main>
        ) */

    return (
        <OmegaShell>
            <Box h='100%' w='100%' pos='relative'>
                <ModularLayout>
                    {children}
                </ModularLayout>
            </Box>
            <Footer />
        </OmegaShell>
    );
}

export default Layout
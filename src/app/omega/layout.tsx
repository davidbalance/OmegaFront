'use client'

import { Box, Paper } from "@mantine/core"
import { useConfiguration } from "@/hooks"
import Footer from "@/components/footer/Footer"
import { Navbar } from '@/components/navbar'

import classes from './layout.module.css'
import { Topbar } from "@/components/navbar/topbar/Topbar"
import { useDisclosure } from "@mantine/hooks"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [opened, { toggle, close }] = useDisclosure();

    const { routes, logo } = useConfiguration();

    return (
        <main className={classes.wrapper}>
            <Box mah='10vh'>
                <Topbar burger={{ opened: opened, onClick: toggle }} />
            </Box>
            <Box className={classes.outer} mah='90vh'>
                <Navbar links={routes} logo={logo} opened={opened} onClose={close} />
                <Box h='100%' w='100%'>
                    {children}
                </Box>
            </Box>
            <Footer />
        </main>
    )
}

export default Layout
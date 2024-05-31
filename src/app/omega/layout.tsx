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
            <Topbar burger={{ opened: opened, onClick: toggle }} />
            <Box className={classes.outer}>
                <Navbar links={routes} logo={logo} opened={opened} onClose={close} />
                <Box bg='white' h='100%' w='100%'></Box>
            </Box>
            {/* <Navbar links={routes} logo={logo} />
            <Paper className={classes.inner} shadow="xs" p="lg" radius={"lg"}>
                {children}
            </Paper>
            <Footer /> */}
        </main>
    )
}

export default Layout
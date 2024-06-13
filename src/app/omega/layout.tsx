'use client'

import { Box } from "@mantine/core"
import Footer from "@/components/footer/Footer"
import { Navbar } from '@/components/navbar'
import { Topbar } from "@/components/navbar/topbar/Topbar"
import { useDisclosure } from "@mantine/hooks"
import classes from './layout.module.css'

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

export default Layout
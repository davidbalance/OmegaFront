'use client'

import { Paper } from "@mantine/core"
import { useConfiguration } from "@/hooks"
import Footer from "@/components/footer/Footer"
import { Navbar } from '@/components/navbar'

import classes from './layout.module.css'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { routes, logo } = useConfiguration();

    return (
        <main className={classes.wrapper}>
            <Navbar links={routes} logo={logo} />
            <Paper className={classes.inner} shadow="xs" p="lg" radius={"lg"}>
                {children}
            </Paper>
            <Footer />
        </main>
    )
}

export default Layout
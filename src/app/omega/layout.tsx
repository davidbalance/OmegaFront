'use client'

import styles from './layout.module.css'
import { Paper } from "@mantine/core"
import { useConfiguration } from "@/hooks"
import Footer from "@/components/footer/Footer"
import { Navbar } from '@/components/navbar'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { routes, logo } = useConfiguration();

    return (
        <main className={styles.wrapper}>
            <Navbar links={routes} logo={logo} />
            <Paper className={styles.inner} shadow="xs" p="lg" radius={"lg"}>
                {children}
            </Paper>
            <Footer />
        </main>
    )
}

export default Layout